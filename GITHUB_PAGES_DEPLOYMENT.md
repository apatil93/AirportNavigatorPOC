# 🚀 GitHub Pages Deployment Guide

## 📦 **Prerequisites**

✅ **gh-pages package installed** - Already done!
```bash
npm install gh-pages --save-dev
```

✅ **Deployment scripts added** - Already configured!

---

## 🔧 **Setup Steps**

### **1. Update Homepage URL**
Edit `package.json` and update the homepage field:
```json
{
  "homepage": "https://your-github-username.github.io/your-repository-name"
}
```

**Example:**
```json
{
  "homepage": "https://johndoe.github.io/airport-assistant"
}
```

### **2. Ensure Repository is Public**
- Go to your GitHub repository
- Settings → General → Change repository visibility to **Public** (if needed)

### **3. Configure Vite for GitHub Pages**
Create or update `vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/your-repository-name/', // Replace with your actual repo name
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
```

---

## 🚀 **Deployment Commands**

### **Build and Deploy**
```bash
npm run deploy
```

This command will:
1. Build the project (`npm run build`)
2. Deploy to GitHub Pages (`gh-pages -d dist`)

### **Manual Steps**
```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

---

## ⚙️ **GitHub Repository Settings**

### **Enable GitHub Pages**
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Set **Source** to "Deploy from a branch"
5. Select **Branch**: `gh-pages`
6. Select **Folder**: `/ (root)`
7. Click **Save**

### **Access Your Deployed Site**
Your site will be available at:
```
https://your-github-username.github.io/your-repository-name
```

---

## 📝 **Current Package.json Configuration**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build", 
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "devDependencies": {
    "gh-pages": "^6.3.0"
  }
}
```

---

## 🔍 **Troubleshooting**

### **Common Issues**

#### **1. 404 Error on Deployment**
- Check that `base` in `vite.config.js` matches your repository name
- Verify homepage URL in `package.json`

#### **2. Assets Not Loading**
- Ensure `base` path is correctly set in vite config
- Check that all asset paths are relative

#### **3. Deployment Fails**
```bash
# Clear gh-pages cache
rm -rf node_modules/.cache/gh-pages

# Try deploying again
npm run deploy
```

#### **4. Build Errors**
```bash
# Clean build and try again
rm -rf dist
npm run build
npm run deploy
```

---

## 🌐 **Deployment Workflow**

### **First Time Setup**
1. Update homepage in `package.json`
2. Configure `vite.config.js`
3. Run `npm run deploy`
4. Configure GitHub Pages in repository settings

### **Subsequent Deployments**
1. Make your changes
2. Commit to your main branch
3. Run `npm run deploy`
4. Site updates automatically

---

## 📊 **Deployment Status**

After deployment, you can check:
- ✅ Build status in terminal output
- ✅ GitHub Pages settings show "Your site is live at..."
- ✅ Visit the URL to verify the site works

---

## 🔒 **Security Note**

- GitHub Pages serves static files only
- All API keys should be in environment variables
- Don't commit sensitive data to the repository

---

Ready to deploy your Airport Assistant to GitHub Pages! 🛫
