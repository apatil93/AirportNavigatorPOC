#!/bin/bash

# Bash Deployment Script for Airport Assistant ChatBot
# This script deploys the infrastructure and application to Azure

set -e  # Exit on any error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${BLUE}$1${NC}"
}

print_success() {
    echo -e "${GREEN}$1${NC}"
}

print_warning() {
    echo -e "${YELLOW}$1${NC}"
}

print_error() {
    echo -e "${RED}$1${NC}"
}

print_header() {
    echo -e "${CYAN}$1${NC}"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 <environment> <subscription-id> <resource-group-name> [options]"
    echo ""
    echo "Arguments:"
    echo "  environment          Environment (dev|prod)"
    echo "  subscription-id      Azure subscription ID"
    echo "  resource-group-name  Azure resource group name"
    echo ""
    echo "Options:"
    echo "  --location LOCATION     Azure region (default: East US)"
    echo "  --skip-build           Skip npm build step"
    echo "  --infrastructure-only  Deploy only infrastructure"
    echo "  --help                 Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 dev 12345678-1234-1234-1234-123456789012 rg-airport-assistant-dev"
    echo "  $0 prod 12345678-1234-1234-1234-123456789012 rg-airport-assistant-prod --location 'West US 2'"
}

# Parse command line arguments
if [[ $# -lt 3 ]]; then
    show_usage
    exit 1
fi

ENVIRONMENT="$1"
SUBSCRIPTION_ID="$2"
RESOURCE_GROUP_NAME="$3"
LOCATION="East US"
SKIP_BUILD=false
INFRASTRUCTURE_ONLY=false

# Validate environment
if [[ "$ENVIRONMENT" != "dev" && "$ENVIRONMENT" != "prod" ]]; then
    print_error "Error: Environment must be 'dev' or 'prod'"
    exit 1
fi

# Parse optional arguments
shift 3
while [[ $# -gt 0 ]]; do
    case $1 in
        --location)
            LOCATION="$2"
            shift 2
            ;;
        --skip-build)
            SKIP_BUILD=true
            shift
            ;;
        --infrastructure-only)
            INFRASTRUCTURE_ONLY=true
            shift
            ;;
        --help)
            show_usage
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            show_usage
            exit 1
            ;;
    esac
done

# Main deployment function
deploy() {
    print_header "🚀 Starting deployment of Airport Assistant ChatBot"
    echo "Environment: $ENVIRONMENT"
    echo "Subscription: $SUBSCRIPTION_ID"
    echo "Resource Group: $RESOURCE_GROUP_NAME"
    echo "Location: $LOCATION"
    echo ""

    # Check prerequisites
    print_info "🔍 Checking prerequisites..."
    
    if ! command -v az &> /dev/null; then
        print_error "Azure CLI is not installed. Please install it first."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install Node.js and npm first."
        exit 1
    fi
    
    print_success "✅ Prerequisites check passed"

    # Login and set subscription
    print_info "🔐 Authenticating to Azure..."
    az login --output none
    az account set --subscription "$SUBSCRIPTION_ID"
    
    # Verify subscription
    current_sub=$(az account show --query id --output tsv)
    if [[ "$current_sub" != "$SUBSCRIPTION_ID" ]]; then
        print_error "Failed to set subscription to $SUBSCRIPTION_ID"
        exit 1
    fi
    print_success "✅ Authenticated to subscription: $SUBSCRIPTION_ID"
    
    # Create resource group if it doesn't exist
    print_info "📦 Creating resource group if needed..."
    az group create --name "$RESOURCE_GROUP_NAME" --location "$LOCATION" --output none
    print_success "✅ Resource group ready: $RESOURCE_GROUP_NAME"
    
    # Deploy infrastructure
    print_info "🏗️ Deploying infrastructure..."
    template_file="infrastructure/azuredeploy.json"
    parameters_file="infrastructure/azuredeploy.parameters.$ENVIRONMENT.json"
    
    if [[ ! -f "$template_file" ]]; then
        print_error "Template file not found: $template_file"
        exit 1
    fi
    
    if [[ ! -f "$parameters_file" ]]; then
        print_error "Parameters file not found: $parameters_file"
        exit 1
    fi
    
    deployment_name="airport-assistant-$(date +%Y%m%d-%H%M%S)"
    
    deployment_result=$(az deployment group create \
        --resource-group "$RESOURCE_GROUP_NAME" \
        --template-file "$template_file" \
        --parameters "@$parameters_file" \
        --name "$deployment_name" \
        --output json)
    
    if [[ $? -ne 0 ]]; then
        print_error "Infrastructure deployment failed"
        exit 1
    fi
    
    print_success "✅ Infrastructure deployed successfully"
    
    # Extract outputs
    web_app_name=$(echo "$deployment_result" | jq -r '.properties.outputs.webAppName.value')
    web_app_url=$(echo "$deployment_result" | jq -r '.properties.outputs.webAppUrl.value')
    
    print_header "📱 Web App Name: $web_app_name"
    print_header "🌐 Web App URL: $web_app_url"
    
    if [[ "$INFRASTRUCTURE_ONLY" == true ]]; then
        print_success "🏁 Infrastructure-only deployment completed!"
        return
    fi
    
    # Build application
    if [[ "$SKIP_BUILD" != true ]]; then
        print_info "🔨 Building application..."
        
        if [[ ! -f "package.json" ]]; then
            print_error "package.json not found. Run this script from the React project root."
            exit 1
        fi
        
        print_info "📦 Installing dependencies..."
        npm install
        
        print_info "🏗️ Building for production..."
        npm run build
        
        print_success "✅ Application built successfully"
    fi
    
    # Create deployment package
    print_info "📦 Creating deployment package..."
    zip_file="airport-assistant-$ENVIRONMENT-$(date +%Y%m%d-%H%M%S).zip"
    
    if [[ -f "$zip_file" ]]; then
        rm "$zip_file"
    fi
    
    # Create zip package
    cd dist && zip -r "../$zip_file" . && cd ..
    print_success "✅ Deployment package created: $zip_file"
    
    # Deploy application
    print_info "🚀 Deploying application to App Service..."
    az webapp deployment source config-zip \
        --resource-group "$RESOURCE_GROUP_NAME" \
        --name "$web_app_name" \
        --src "$zip_file" \
        --output none
    
    if [[ $? -ne 0 ]]; then
        print_error "Application deployment failed"
        exit 1
    fi
    
    print_success "✅ Application deployed successfully"
    
    # Cleanup
    print_info "🧹 Cleaning up..."
    rm "$zip_file"
    
    # Final verification
    print_info "🔍 Verifying deployment..."
    sleep 30  # Wait for app to start
    
    response_code=$(curl -s -o /dev/null -w "%{http_code}" "$web_app_url" || echo "000")
    if [[ "$response_code" == "200" ]]; then
        print_success "✅ Application is responding successfully"
    else
        print_warning "Application returned status code: $response_code"
        print_warning "Please check the application manually at: $web_app_url"
    fi
    
    echo ""
    print_success "🎉 Deployment completed successfully!"
    echo ""
    print_header "📊 Deployment Summary:"
    echo "   Environment: $ENVIRONMENT"
    echo "   Resource Group: $RESOURCE_GROUP_NAME"
    echo "   Web App: $web_app_name"
    echo "   URL: $web_app_url"
    echo ""
    print_header "🔗 Next Steps:"
    echo "   1. Visit the application: $web_app_url"
    echo "   2. Test AI Mode functionality"
    echo "   3. Check Application Insights for monitoring"
    echo "   4. Configure custom domain (if needed)"
}

# Error handling
trap 'print_error "❌ Deployment failed! Check the error messages above for details."' ERR

# Run deployment
deploy
