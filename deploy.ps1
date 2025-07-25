# PowerShell Deployment Script for Airport Assistant ChatBot
# This script deploys the infrastructure and application to Azure

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("dev", "prod")]
    [string]$Environment,
    
    [Parameter(Mandatory=$true)]
    [string]$SubscriptionId,
    
    [Parameter(Mandatory=$true)]
    [string]$ResourceGroupName,
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "East US",
    
    [Parameter(Mandatory=$false)]
    [switch]$SkipBuild,
    
    [Parameter(Mandatory=$false)]
    [switch]$InfrastructureOnly
)

# Set error action preference
$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting deployment of Airport Assistant ChatBot" -ForegroundColor Green
Write-Host "Environment: $Environment" -ForegroundColor Yellow
Write-Host "Subscription: $SubscriptionId" -ForegroundColor Yellow
Write-Host "Resource Group: $ResourceGroupName" -ForegroundColor Yellow

try {
    # Login and set subscription
    Write-Host "🔐 Authenticating to Azure..." -ForegroundColor Blue
    az login --output none
    az account set --subscription $SubscriptionId
    
    # Verify subscription
    $currentSub = az account show --query id --output tsv
    if ($currentSub -ne $SubscriptionId) {
        throw "Failed to set subscription to $SubscriptionId"
    }
    Write-Host "✅ Authenticated to subscription: $SubscriptionId" -ForegroundColor Green
    
    # Create resource group if it doesn't exist
    Write-Host "📦 Creating resource group if needed..." -ForegroundColor Blue
    az group create --name $ResourceGroupName --location $Location --output none
    Write-Host "✅ Resource group ready: $ResourceGroupName" -ForegroundColor Green
    
    # Deploy infrastructure
    Write-Host "🏗️ Deploying infrastructure..." -ForegroundColor Blue
    $templateFile = "infrastructure/azuredeploy.json"
    $parametersFile = "infrastructure/azuredeploy.parameters.$Environment.json"
    
    if (-not (Test-Path $templateFile)) {
        throw "Template file not found: $templateFile"
    }
    if (-not (Test-Path $parametersFile)) {
        throw "Parameters file not found: $parametersFile"
    }
    
    $deploymentName = "airport-assistant-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
    
    az deployment group create `
        --resource-group $ResourceGroupName `
        --template-file $templateFile `
        --parameters "@$parametersFile" `
        --name $deploymentName `
        --output json | ConvertFrom-Json | Tee-Object -Variable deploymentResult
    
    if ($LASTEXITCODE -ne 0) {
        throw "Infrastructure deployment failed"
    }
    
    Write-Host "✅ Infrastructure deployed successfully" -ForegroundColor Green
    
    # Extract outputs
    $webAppName = $deploymentResult.properties.outputs.webAppName.value
    $webAppUrl = $deploymentResult.properties.outputs.webAppUrl.value
    
    Write-Host "📱 Web App Name: $webAppName" -ForegroundColor Cyan
    Write-Host "🌐 Web App URL: $webAppUrl" -ForegroundColor Cyan
    
    if ($InfrastructureOnly) {
        Write-Host "🏁 Infrastructure-only deployment completed!" -ForegroundColor Green
        return
    }
    
    # Build application
    if (-not $SkipBuild) {
        Write-Host "🔨 Building application..." -ForegroundColor Blue
        
        if (-not (Test-Path "package.json")) {
            throw "package.json not found. Run this script from the React project root."
        }
        
        Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
        npm install
        if ($LASTEXITCODE -ne 0) {
            throw "npm install failed"
        }
        
        Write-Host "🏗️ Building for production..." -ForegroundColor Blue
        npm run build
        if ($LASTEXITCODE -ne 0) {
            throw "npm build failed"
        }
        
        Write-Host "✅ Application built successfully" -ForegroundColor Green
    }
    
    # Create deployment package
    Write-Host "📦 Creating deployment package..." -ForegroundColor Blue
    $zipFile = "airport-assistant-$Environment-$(Get-Date -Format 'yyyyMMdd-HHmmss').zip"
    
    if (Test-Path $zipFile) {
        Remove-Item $zipFile -Force
    }
    
    # Compress the dist folder
    Compress-Archive -Path "dist\*" -DestinationPath $zipFile -Force
    Write-Host "✅ Deployment package created: $zipFile" -ForegroundColor Green
    
    # Deploy application
    Write-Host "🚀 Deploying application to App Service..." -ForegroundColor Blue
    az webapp deployment source config-zip `
        --resource-group $ResourceGroupName `
        --name $webAppName `
        --src $zipFile `
        --output none
    
    if ($LASTEXITCODE -ne 0) {
        throw "Application deployment failed"
    }
    
    Write-Host "✅ Application deployed successfully" -ForegroundColor Green
    
    # Cleanup
    Write-Host "🧹 Cleaning up..." -ForegroundColor Blue
    Remove-Item $zipFile -Force
    
    # Final verification
    Write-Host "🔍 Verifying deployment..." -ForegroundColor Blue
    Start-Sleep -Seconds 30  # Wait for app to start
    
    try {
        $response = Invoke-WebRequest -Uri $webAppUrl -Method Get -TimeoutSec 30
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ Application is responding successfully" -ForegroundColor Green
        } else {
            Write-Warning "Application returned status code: $($response.StatusCode)"
        }
    } catch {
        Write-Warning "Could not verify application response: $($_.Exception.Message)"
        Write-Host "Please check the application manually at: $webAppUrl" -ForegroundColor Yellow
    }
    
    Write-Host "" -ForegroundColor White
    Write-Host "🎉 Deployment completed successfully!" -ForegroundColor Green -BackgroundColor Black
    Write-Host "" -ForegroundColor White
    Write-Host "📊 Deployment Summary:" -ForegroundColor Cyan
    Write-Host "   Environment: $Environment" -ForegroundColor White
    Write-Host "   Resource Group: $ResourceGroupName" -ForegroundColor White
    Write-Host "   Web App: $webAppName" -ForegroundColor White
    Write-Host "   URL: $webAppUrl" -ForegroundColor White
    Write-Host "" -ForegroundColor White
    Write-Host "🔗 Next Steps:" -ForegroundColor Cyan
    Write-Host "   1. Visit the application: $webAppUrl" -ForegroundColor White
    Write-Host "   2. Test AI Mode functionality" -ForegroundColor White
    Write-Host "   3. Check Application Insights for monitoring" -ForegroundColor White
    Write-Host "   4. Configure custom domain (if needed)" -ForegroundColor White
    
} catch {
    Write-Host "" -ForegroundColor White
    Write-Host "❌ Deployment failed!" -ForegroundColor Red -BackgroundColor Black
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "" -ForegroundColor White
    Write-Host "🔍 Troubleshooting steps:" -ForegroundColor Yellow
    Write-Host "   1. Check Azure CLI authentication: az account show" -ForegroundColor White
    Write-Host "   2. Verify subscription permissions" -ForegroundColor White
    Write-Host "   3. Check resource naming conflicts" -ForegroundColor White
    Write-Host "   4. Review deployment logs in Azure Portal" -ForegroundColor White
    exit 1
}
