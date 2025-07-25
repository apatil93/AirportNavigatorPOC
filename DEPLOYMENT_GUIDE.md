# 🚀 Azure Deployment Guide - Airport Assistant ChatBot

This guide provides complete instructions for deploying the Airport Assistant ChatBot to Azure using ARM templates and Azure DevOps pipelines.

## 📋 Prerequisites

### Azure Requirements
- **Azure Subscription** with contributor access
- **Resource Group** (or permissions to create one)
- **Azure DevOps Organization** with project access
- **Service Principal** or **Service Connection** configured

### Local Development Requirements
- **Azure CLI** installed and authenticated
- **PowerShell** (for What-If analysis)
- **Git** for version control

## 🏗️ Infrastructure Overview

### 📦 Azure Resources Created
- **App Service Plan** (Linux-based, Node.js 18.x)
- **App Service** (Web App for hosting React application)
- **Application Insights** (Monitoring and analytics)
- **Log Analytics Workspace** (Centralized logging)
- **Storage Account** (For static assets and backups)

### 🌍 Environments
- **Development** (`dev`) - F1 Free tier for testing
- **Production** (`prod`) - S1 Standard tier for production workloads

## 📁 File Structure

```
d:\React\
├── azure-pipelines.yml              # Main CI/CD pipeline
├── infrastructure-pipeline.yml      # Infrastructure deployment pipeline
└── infrastructure/
    ├── azuredeploy.json             # ARM template
    ├── azuredeploy.parameters.dev.json    # Dev environment parameters
    └── azuredeploy.parameters.prod.json   # Prod environment parameters
```

## 🔧 Setup Instructions

### Step 1: Configure Azure DevOps Service Connection

1. **Navigate to Azure DevOps Project Settings**
2. **Go to Service Connections**
3. **Create New Service Connection**
   - Type: Azure Resource Manager
   - Authentication: Service Principal (automatic)
   - Scope: Subscription
   - Name: `Azure-Service-Connection`

### Step 2: Update Pipeline Variables

Edit the following files to match your environment:

#### `azure-pipelines.yml`
```yaml
variables:
  azureSubscription: 'YOUR-SERVICE-CONNECTION-NAME'
  webAppName: 'your-app-name'
  resourceGroupName: 'your-resource-group'
```

#### `infrastructure-pipeline.yml`
```yaml
variables:
  azureSubscription: 'YOUR-SERVICE-CONNECTION-NAME'
  resourceGroupName: 'rg-your-app-name-${{ parameters.environment }}'
  location: 'East US'  # Change to your preferred region
```

### Step 3: Customize ARM Template Parameters

#### Development Environment (`azuredeploy.parameters.dev.json`)
```json
{
  "parameters": {
    "appName": { "value": "your-airport-assistant" },
    "environment": { "value": "dev" },
    "sku": { "value": "F1" },
    "skuCapacity": { "value": 1 }
  }
}
```

#### Production Environment (`azuredeploy.parameters.prod.json`)
```json
{
  "parameters": {
    "appName": { "value": "your-airport-assistant" },
    "environment": { "value": "prod" },
    "sku": { "value": "S1" },
    "skuCapacity": { "value": 2 }
  }
}
```

## 🚀 Deployment Process

### Method 1: Automated Deployment via Azure DevOps

#### Infrastructure Deployment
1. **Push changes to repository**
2. **Navigate to Azure DevOps Pipelines**
3. **Run Infrastructure Pipeline**
   ```
   Pipeline: infrastructure-pipeline.yml
   Parameters:
   - environment: dev/prod
   - deployInfrastructure: true
   ```

#### Application Deployment
1. **Automatic trigger on branch push**
   - `main` branch → Production deployment
   - `developer/SM/ChatBot` branch → Development deployment

### Method 2: Manual Azure CLI Deployment

#### Deploy Infrastructure
```bash
# Login to Azure
az login

# Set subscription
az account set --subscription "your-subscription-id"

# Create resource group
az group create --name "rg-airport-assistant-dev" --location "East US"

# Deploy ARM template
az deployment group create \
  --resource-group "rg-airport-assistant-dev" \
  --template-file "infrastructure/azuredeploy.json" \
  --parameters "@infrastructure/azuredeploy.parameters.dev.json"
```

#### Deploy Application
```bash
# Build the application
npm install
npm run build

# Create deployment package
zip -r airport-assistant.zip dist/*

# Deploy to App Service
az webapp deployment source config-zip \
  --resource-group "rg-airport-assistant-dev" \
  --name "airport-assistant-chatbot-dev" \
  --src "airport-assistant.zip"
```

## 🔍 Verification Steps

### 1. Check Deployed Resources
```bash
# List all resources in resource group
az resource list --resource-group "rg-airport-assistant-dev" --output table

# Check App Service status
az webapp show --resource-group "rg-airport-assistant-dev" --name "airport-assistant-chatbot-dev"
```

### 2. Test Application
- **Navigate to App Service URL**
- **Verify AI Mode toggle functionality**
- **Test airport service searches**
- **Check responsive design on mobile**

### 3. Monitor Application
- **Application Insights Dashboard**
- **App Service Logs**
- **Performance Metrics**

## 📊 Environment Specifications

### Development Environment
- **SKU**: F1 (Free)
- **Instances**: 1
- **Features**: Basic monitoring
- **SSL**: Enabled
- **Custom Domain**: Not configured

### Production Environment
- **SKU**: S1 (Standard)
- **Instances**: 2
- **Features**: Full monitoring, auto-scaling
- **SSL**: Enabled
- **Custom Domain**: Configurable

## 🔐 Security Features

### Implemented Security
- ✅ **HTTPS Only** enforcement
- ✅ **TLS 1.2** minimum version
- ✅ **FTPS Only** for deployment
- ✅ **Managed Identity** support
- ✅ **Application Insights** monitoring

### Additional Security (Optional)
- 🔧 **Custom Domain** with SSL certificate
- 🔧 **IP Restrictions** for admin access
- 🔧 **Authentication/Authorization** providers
- 🔧 **Key Vault** integration for secrets

## 🚨 Troubleshooting

### Common Issues

#### 1. Service Connection Authentication
```
Error: The subscription could not be found
Solution: Verify service connection permissions and subscription access
```

#### 2. App Name Conflicts
```
Error: The app name is already taken
Solution: Use unique app names across all Azure regions
```

#### 3. SKU Limitations
```
Error: Cannot create more than X instances of SKU F1
Solution: Use B1 or higher SKU for multiple instances
```

### Deployment Logs
- **Azure DevOps Pipeline Logs**
- **App Service Deployment Logs**
- **Application Insights Live Metrics**

## 🔄 CI/CD Pipeline Features

### Build Stage
- ✅ **Node.js 18.x** setup
- ✅ **Dependency caching**
- ✅ **Unit tests** execution
- ✅ **Code coverage** reporting
- ✅ **Production build** optimization

### Deploy Stage
- ✅ **Environment-specific** deployment
- ✅ **Blue-green** deployment support
- ✅ **Health checks** post-deployment
- ✅ **Rollback** capabilities

### Monitoring
- ✅ **Application Insights** integration
- ✅ **Performance** monitoring
- ✅ **Error tracking**
- ✅ **User analytics**

## 📞 Support & Maintenance

### Monitoring URLs
- **Application**: `https://airport-assistant-chatbot-{env}.azurewebsites.net`
- **Application Insights**: Available in Azure Portal
- **App Service Logs**: Available in Azure Portal

### Update Process
1. **Push changes** to appropriate branch
2. **Pipeline automatically** builds and deploys
3. **Monitor deployment** through Azure DevOps
4. **Verify functionality** on deployed environment

---

## 🎉 Deployment Complete!

Your Airport Assistant ChatBot with Gen AI integration is now deployed to Azure with:
- ✅ **Production-ready infrastructure**
- ✅ **Automated CI/CD pipeline**
- ✅ **Comprehensive monitoring**
- ✅ **Security best practices**
- ✅ **Scalable architecture**

**Next Steps**: Configure custom domain, set up alerts, and monitor user feedback! 🚀
