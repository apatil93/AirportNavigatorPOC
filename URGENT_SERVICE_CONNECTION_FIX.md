# 🚨 URGENT: Service Connection Fix Guide

## ❌ **Current Error:**
```
Job DeployToDev: Step AzureWebApp input azureSubscription references service connection 
Azure-Service-Connection which could not be found. The service connection does not exist, 
has been disabled or has not been authorized for use.
```

## 🎯 **3 Quick Solutions (Choose One):**

---

### **✅ SOLUTION 1: Create Service Connection in Azure DevOps (Easiest)**

#### Step 1: Open Azure DevOps
1. Go to: `https://dev.azure.com`
2. Select your organization and project

#### Step 2: Create Service Connection
1. Click **Project Settings** (gear icon, bottom left)
2. Under **Pipelines**, click **Service connections**
3. Click **"+ New service connection"**
4. Select **"Azure Resource Manager"**
5. Click **"Next"**

#### Step 3: Automatic Setup (Recommended)
1. Select **"Service principal (automatic)"**
2. Click **"Next"**
3. Fill in:
   ```
   Scope level: Subscription
   Subscription: [Select your Azure subscription]
   Resource group: [Leave empty]
   Service connection name: Azure-Service-Connection
   Description: Airport Assistant ChatBot deployment
   ✅ Grant access permission to all pipelines
   ```
4. Click **"Verify and save"**

#### Step 4: Verify
- The connection should show "Ready" status
- Test it by clicking the connection → "Verify"

---

### **✅ SOLUTION 2: Use Simplified Pipeline (No Environments)**

Instead of the current pipeline, use the simplified version:

1. **Use this pipeline file**: `azure-pipelines-simple.yml`
2. **Benefits**: 
   - No environment dependencies
   - Clearer error messages
   - Tests service connection first

#### To switch pipelines:
1. In Azure DevOps → Pipelines
2. Select your pipeline → Edit
3. Change the YAML file reference to: `azure-pipelines-simple.yml`
4. Save and run

---

### **✅ SOLUTION 3: Manual Service Principal (Advanced)**

If automatic creation fails:

#### Step 1: Create Service Principal
```bash
# Login to Azure CLI
az login

# Create service principal
az ad sp create-for-rbac --name "airport-assistant-sp" --role "Contributor" --scopes "/subscriptions/YOUR-SUBSCRIPTION-ID"
```

#### Step 2: Manual Service Connection
1. In Azure DevOps: Service connections → New
2. Select "Azure Resource Manager"
3. Choose "Service principal (manual)"
4. Enter the details from Step 1
5. Name: `Azure-Service-Connection`

---

## 🔍 **How to Check What You Have:**

### Check Existing Service Connections:
1. Azure DevOps → Project Settings → Service connections
2. Look for any existing Azure connections
3. Note the exact name

### If you see a different name:
Update the pipeline parameter when running:
```yaml
Parameters:
  azureServiceConnection: "YourActualServiceConnectionName"
```

---

## 🎯 **Quick Test:**

### Test 1: Check Your Azure Access
```bash
az login
az account show
az account list --output table
```

### Test 2: Use Test Pipeline
Run `test-service-connection.yml` first to verify everything works.

---

## ⚡ **Fastest Fix (2 minutes):**

1. **Go to**: Azure DevOps → Project Settings → Service connections
2. **Click**: + New service connection → Azure Resource Manager → Service principal (automatic)
3. **Name**: `Azure-Service-Connection`
4. **Check**: ✅ Grant access permission to all pipelines
5. **Click**: Verify and save
6. **Re-run**: Your pipeline

---

## 🚨 **If Still Not Working:**

### Check These Common Issues:

1. **Service Connection Name Mismatch**
   - Pipeline expects: `Azure-Service-Connection`
   - Your connection is named: `????`
   - Solution: Rename connection or update pipeline parameter

2. **No Pipeline Permissions**
   - Go to Service connection → Security
   - Enable "Grant access permission to all pipelines"

3. **Subscription Access**
   - Ensure your Azure account has Contributor access
   - Check if the subscription is correct

4. **Wrong Project**
   - Verify you're in the correct Azure DevOps project
   - Service connections are project-specific

---

## 📞 **Need Immediate Help?**

### Option A: Use PowerShell Script
```powershell
.\create-service-principal.ps1 -SubscriptionId "your-sub-id"
```

### Option B: Manual Azure Portal
1. Azure Portal → Azure Active Directory → App registrations
2. New registration → Create service principal
3. Add to Azure DevOps manually

### Option C: Contact Azure Support
If you can't create service connections, you may need admin permissions.

---

## ✅ **Success Checklist:**
- [ ] Service connection exists in Azure DevOps
- [ ] Named exactly: `Azure-Service-Connection`
- [ ] Status shows "Ready" 
- [ ] Pipeline permissions granted
- [ ] Verification test passes
- [ ] Pipeline runs without authorization errors

**Once you complete any of the solutions above, your pipeline should work!** 🚀
