# Quick Deploy Reference

## 🌐 Live URL
**https://lowedavid02.github.io/BitForge_IT_services_Management/**

## 🚀 Deploy Command
```bash
npm run deploy
```

## 📝 Full Workflow
```bash
# 1. Make your changes
# 2. Test locally
npm run dev

# 3. Commit changes
git add .
git commit -m "Your message"
git push origin main

# 4. Deploy to GitHub Pages
npm run deploy
```

## 🔑 Admin Access
- **Username**: admin
- **Password**: BitForge2026!

## ✅ Deployment Checklist
- [ ] Changes committed to git
- [ ] Pushed to main branch
- [ ] Run `npm run deploy`
- [ ] Wait 1-2 minutes
- [ ] Test live site
- [ ] Clear cache if needed (Ctrl+Shift+R)

## 🛠️ Quick Fixes

### Assets not loading?
Check `vite.config.js` has:
```javascript
base: '/BitForge_IT_services_Management/'
```

### Changes not showing?
```bash
# Clear cache and hard reload
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

### Deployment failed?
```bash
# Try manual deployment
npm run build
npx gh-pages -d dist
```

## 📊 Project Structure
```
bitforge-project/
├── src/              # Source code
├── dist/             # Build output (auto-generated)
├── public/           # Static assets
├── package.json      # Dependencies & scripts
└── vite.config.js    # Vite configuration
```

## 🔗 Important Links
- **Repository**: https://github.com/LoweDavid02/BitForge_IT_services_Management
- **Live Site**: https://lowedavid02.github.io/BitForge_IT_services_Management/
- **Settings**: https://github.com/LoweDavid02/BitForge_IT_services_Management/settings/pages
