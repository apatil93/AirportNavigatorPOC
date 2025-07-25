# 🔐 Azure Service Connection Setup Guide

This guide will help you create the required Azure Service Connection in Azure DevOps to resolve the authorization error.

## ❌ Current Error:
```
The service connection Azure-Service-Connection which could not be found. 
The service connection does not exist, has been disabled or has not been authorized for use.
```

## ✅ Solution: Create Azure Service Connection

### Method 1: Automatic Service Connection (Recommended)

#### Step 1: Navigate to Azure DevOps Project Settings
1. Go to your Azure DevOps project: `https://dev.azure.com/{your-organization}/{your-project}`
2. Click on **"Project settings"** (gear icon in bottom-left)
3. Under **"Pipelines"**, click **"Service connections"**

#### Step 2: Create New Service Connection
1. Click **"+ New service connection"**
2. Select **"Azure Resource Manager"**
3. Click **"Next"**

#### Step 3: Choose Authentication Method
1. Select **"Service principal (automatic)"** (Recommended)
2. Click **"Next"**

#### Step 4: Configure Connection Details
```
Scope Level: Subscription
Subscription: [Select your Azure subscription]
Resource Group: [Leave empty for subscription-level access]
Service connection name: Azure-Service-Connection
Description: Service connection for Airport Assistant ChatBot deployment
Security: ✅ Grant access permission to all pipelines
```

#### Step 5: Verify and Create
1. Click **"Verify and save"**
2. Wait for the verification to complete
3. The service connection should now be available

### Method 2: Manual Service Principal (Advanced)

If automatic creation fails, you can create a service principal manually:

#### Step 1: Create Service Principal via Azure CLI
```bash
# Login to Azure
az login

# Set your subscription
az account set --subscription "your-subscription-id"

# Create service principal
az ad sp create-for-rbac --name "airport-assistant-sp" --role "Contributor" --scopes "/subscriptions/{your-subscription-id}"
```

This will output:
```json
{
  "appId": "12345678-1234-1234-1234-123456789012",
  "displayName": "airport-assistant-sp",
  "password": "your-generated-password",
  "tenant": "87654321-4321-4321-4321-210987654321"
}
```

#### Step 2: Create Manual Service Connection
1. In Azure DevOps, go to **Service connections**
2. Click **"+ New service connection"**
3. Select **"Azure Resource Manager"**
4. Choose **"Service principal (manual)"**
5. Fill in the details:
```
Environment: Azure Cloud
Scope Level: Subscription
Subscription ID: {your-subscription-id}
Subscription Name: {your-subscription-name}
Service Principal ID: {appId from step 1}
Service Principal Key: {password from step 1}
Tenant ID: {tenant from step 1}
Service connection name: Azure-Service-Connection
```

## 🔧 Alternative: Update Pipeline with Your Service Connection

If you prefer to use a different service connection name:

### Option 1: Update Pipeline Parameter
When running the pipeline, change the parameter:
```yaml
parameters:
  azureServiceConnection: 'YourExistingServiceConnectionName'
```

### Option 2: Update Variable in Pipeline
Edit `azure-pipelines.yml` and change:
```yaml
variables:
  azureSubscription: 'YourExistingServiceConnectionName'
```

## 🛡️ Required Permissions

Your service connection needs these Azure permissions:
- **Contributor** role on the subscription or resource group
- **App Service Contributor** (minimum for app deployments)
- **Storage Account Contributor** (for storage resources)

### To assign permissions:
1. Go to Azure Portal
2. Navigate to **Subscriptions** → **Access control (IAM)**
3. Click **"+ Add"** → **"Add role assignment"**
4. Select **"Contributor"** role
5. Assign to your service principal

## 🧪 Test Service Connection

After creating the service connection:

1. Go to **Service connections** in Azure DevOps
2. Find your **"Azure-Service-Connection"**
3. Click **"..."** → **"Verify"**
4. Ensure verification passes

## 🚀 Run Pipeline

Once the service connection is created and verified:

1. Go to **Pipelines** in Azure DevOps
2. Select your pipeline
3. Click **"Run pipeline"**
4. Set parameters:
```
Branch: developer/SM/ChatBot
azureServiceConnection: Azure-Service-Connection
```
5. Click **"Run"**

## 🔍 Troubleshooting

### Issue: "Access Denied" during verification
**Solution**: Ensure the service principal has Contributor role on the subscription

### Issue: "Subscription not found"
**Solution**: Verify the subscription ID is correct and accessible

### Issue: "Permission denied to create resources"
**Solution**: Assign appropriate roles to the service principal

### Issue: "Service connection exists but still getting error"
**Solution**: 
1. Check if the service connection is authorized for the pipeline
2. Go to Service connections → Select connection → Security
3. Enable "Grant access permission to all pipelines"

## ✅ Verification Checklist

- [ ] Service connection created with name "Azure-Service-Connection"
- [ ] Service connection verified successfully
- [ ] Permissions assigned (Contributor role)
- [ ] Pipeline access granted to all pipelines
- [ ] Subscription ID is correct
- [ ] Resource group exists (if specified)

Once completed, your pipeline should run successfully! 🎉

---

## 📞 Need Help?

If you're still having issues:
1. Check the [Azure DevOps documentation](https://docs.microsoft.com/en-us/azure/devops/pipelines/library/service-endpoints)
2. Verify your Azure subscription permissions
3. Ensure the service connection name matches exactly in the pipeline

**Next Step**: After creating the service connection, re-run your pipeline! 🚀
