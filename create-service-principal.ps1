# PowerShell Script to Create Azure Service Principal for DevOps
# Run this script to create the required service principal for Azure DevOps

param(
    [Parameter(Mandatory=$true)]
    [string]$SubscriptionId,
    
    [Parameter(Mandatory=$false)]
    [string]$ServicePrincipalName = "airport-assistant-sp",
    
    [Parameter(Mandatory=$false)]
    [string]$ResourceGroupName = "",
    
    [Parameter(Mandatory=$false)]
    [switch]$ShowInstructions
)

$ErrorActionPreference = "Stop"

Write-Host "🚀 Azure Service Principal Creator for Airport Assistant ChatBot" -ForegroundColor Green
Write-Host "=================================================================" -ForegroundColor Green

try {
    # Check if Azure CLI is installed
    $azVersion = az --version 2>$null
    if (-not $azVersion) {
        throw "Azure CLI is not installed. Please install it from https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    }
    Write-Host "✅ Azure CLI is installed" -ForegroundColor Green

    # Login check
    Write-Host "🔐 Checking Azure authentication..." -ForegroundColor Blue
    $currentAccount = az account show 2>$null | ConvertFrom-Json
    if (-not $currentAccount) {
        Write-Host "Please login to Azure first..." -ForegroundColor Yellow
        az login
        $currentAccount = az account show | ConvertFrom-Json
    }
    
    Write-Host "✅ Authenticated as: $($currentAccount.user.name)" -ForegroundColor Green
    Write-Host "Current subscription: $($currentAccount.name)" -ForegroundColor Cyan

    # Set subscription
    Write-Host "🔧 Setting subscription..." -ForegroundColor Blue
    az account set --subscription $SubscriptionId
    
    $subscription = az account show | ConvertFrom-Json
    Write-Host "✅ Using subscription: $($subscription.name) ($($subscription.id))" -ForegroundColor Green

    # Determine scope
    $scope = "/subscriptions/$SubscriptionId"
    if ($ResourceGroupName) {
        $scope = "/subscriptions/$SubscriptionId/resourceGroups/$ResourceGroupName"
        Write-Host "📦 Creating service principal for resource group: $ResourceGroupName" -ForegroundColor Cyan
    } else {
        Write-Host "📋 Creating service principal for entire subscription" -ForegroundColor Cyan
    }

    # Create service principal
    Write-Host "🔨 Creating service principal..." -ForegroundColor Blue
    $sp = az ad sp create-for-rbac --name $ServicePrincipalName --role "Contributor" --scopes $scope | ConvertFrom-Json
    
    if (-not $sp) {
        throw "Failed to create service principal"
    }

    Write-Host "✅ Service principal created successfully!" -ForegroundColor Green

    # Display results
    Write-Host "" -ForegroundColor White
    Write-Host "🎉 SERVICE PRINCIPAL DETAILS" -ForegroundColor Green -BackgroundColor Black
    Write-Host "================================" -ForegroundColor Green
    Write-Host "Application ID (Client ID): $($sp.appId)" -ForegroundColor Yellow
    Write-Host "Client Secret: $($sp.password)" -ForegroundColor Yellow
    Write-Host "Tenant ID: $($sp.tenant)" -ForegroundColor Yellow
    Write-Host "Subscription ID: $SubscriptionId" -ForegroundColor Yellow
    Write-Host "Subscription Name: $($subscription.name)" -ForegroundColor Yellow
    Write-Host "" -ForegroundColor White

    # Azure DevOps instructions
    Write-Host "🔧 AZURE DEVOPS SETUP INSTRUCTIONS" -ForegroundColor Cyan -BackgroundColor Black
    Write-Host "====================================" -ForegroundColor Cyan
    Write-Host "1. Go to Azure DevOps: https://dev.azure.com" -ForegroundColor White
    Write-Host "2. Navigate to: Project Settings → Service connections" -ForegroundColor White
    Write-Host "3. Click: + New service connection" -ForegroundColor White
    Write-Host "4. Select: Azure Resource Manager" -ForegroundColor White
    Write-Host "5. Choose: Service principal (manual)" -ForegroundColor White
    Write-Host "6. Fill in the following details:" -ForegroundColor White
    Write-Host "" -ForegroundColor White
    
    Write-Host "   Environment: Azure Cloud" -ForegroundColor Gray
    Write-Host "   Scope Level: Subscription" -ForegroundColor Gray
    Write-Host "   Subscription ID: $SubscriptionId" -ForegroundColor Gray
    Write-Host "   Subscription Name: $($subscription.name)" -ForegroundColor Gray
    Write-Host "   Service Principal ID: $($sp.appId)" -ForegroundColor Gray
    Write-Host "   Service Principal Key: $($sp.password)" -ForegroundColor Gray
    Write-Host "   Tenant ID: $($sp.tenant)" -ForegroundColor Gray
    Write-Host "   Service connection name: Azure-Service-Connection" -ForegroundColor Gray
    Write-Host "" -ForegroundColor White
    
    Write-Host "7. Click: Verify and save" -ForegroundColor White
    Write-Host "8. Enable: Grant access permission to all pipelines" -ForegroundColor White

    # Save to file
    $outputFile = "service-principal-details.txt"
    $details = @"
Azure Service Principal Details
Generated: $(Get-Date)
===============================

Application ID (Client ID): $($sp.appId)
Client Secret: $($sp.password)
Tenant ID: $($sp.tenant)
Subscription ID: $SubscriptionId
Subscription Name: $($subscription.name)
Service Principal Name: $ServicePrincipalName

Azure DevOps Service Connection Configuration:
- Environment: Azure Cloud
- Scope Level: Subscription
- Subscription ID: $SubscriptionId
- Subscription Name: $($subscription.name)
- Service Principal ID: $($sp.appId)
- Service Principal Key: $($sp.password)
- Tenant ID: $($sp.tenant)
- Service connection name: Azure-Service-Connection

IMPORTANT: Store these details securely and delete this file after use!
"@

    $details | Out-File -FilePath $outputFile -Encoding UTF8
    Write-Host "💾 Details saved to: $outputFile" -ForegroundColor Green
    Write-Host "⚠️  IMPORTANT: Store these details securely and delete the file after use!" -ForegroundColor Red

    # Test the service principal
    Write-Host "" -ForegroundColor White
    Write-Host "🧪 Testing service principal..." -ForegroundColor Blue
    
    try {
        # Login with service principal to test
        az login --service-principal --username $sp.appId --password $sp.password --tenant $sp.tenant --output none
        Write-Host "✅ Service principal login test successful!" -ForegroundColor Green
        
        # Switch back to user account
        az login --output none
        az account set --subscription $SubscriptionId --output none
        
    } catch {
        Write-Host "⚠️ Service principal test failed, but it may still work in Azure DevOps" -ForegroundColor Yellow
    }

    Write-Host "" -ForegroundColor White
    Write-Host "🎉 Setup completed successfully!" -ForegroundColor Green -BackgroundColor Black
    Write-Host "Next step: Configure the service connection in Azure DevOps using the details above." -ForegroundColor White

} catch {
    Write-Host "" -ForegroundColor White
    Write-Host "❌ Setup failed!" -ForegroundColor Red -BackgroundColor Black
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "" -ForegroundColor White
    Write-Host "🔍 Troubleshooting:" -ForegroundColor Yellow
    Write-Host "1. Ensure you have Azure CLI installed" -ForegroundColor White
    Write-Host "2. Login with: az login" -ForegroundColor White
    Write-Host "3. Verify you have permissions to create service principals" -ForegroundColor White
    Write-Host "4. Check if the subscription ID is correct" -ForegroundColor White
    exit 1
}
