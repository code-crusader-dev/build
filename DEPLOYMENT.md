# Deployment Guide

## 🚀 Quick Deploy

### Vercel (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit: CampusFlow Clubs Platform"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Deploy to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "Import Project"
- Select your GitHub repository
- Vercel auto-detects Next.js
- Click "Deploy"

**Done!** Your site will be live at `https://your-project.vercel.app`

### Netlify

1. **Build Settings**
```
Build command: npm run build
Publish directory: .next
```

2. **Environment Variables**
- No environment variables needed for basic setup
- Add Firebase config when integrating backend

### Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize
railway init

# Deploy
railway up
```

## 📦 Production Build

### Local Build Test
```bash
# Build for production
npm run build

# Test production build
npm start
```

### Build Output
- **Static Pages**: Pre-rendered at build time
- **Dynamic Routes**: Server-rendered on demand
- **Images**: Optimized by Next.js
- **CSS**: Minified and optimized

## 🔧 Environment Variables

### Current (None Required)
The app runs without environment variables using mock data.

### Future (Firebase Integration)
Create `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 🌐 Custom Domain

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS records as shown
4. Wait for SSL certificate (automatic)

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Update DNS records
4. Enable HTTPS (automatic)

## ⚡ Performance Optimization

### Already Implemented
✅ Next.js Image Optimization  
✅ Automatic code splitting  
✅ CSS minification  
✅ Font optimization  
✅ Static generation where possible  

### Additional Optimizations
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,
}
```

## 📊 Analytics Setup

### Vercel Analytics
```bash
npm install @vercel/analytics
```

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Google Analytics
```tsx
// Add to app/layout.tsx <head>
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
```

## 🔒 Security Headers

Add to `next.config.js`:
```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin',
        },
      ],
    },
  ]
}
```

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Images Not Loading
- Check `next.config.js` has correct image domains
- Verify external image URLs are accessible
- Check network connectivity

### Slow Build Times
- Enable SWC minifier (default in Next.js 14)
- Use `output: 'standalone'` for Docker deployments
- Enable incremental builds

## 📱 Mobile Testing

### Before Deploy
Test on multiple devices:
- iPhone (Safari)
- Android (Chrome)
- iPad (Safari)
- Android Tablet (Chrome)

### Tools
- Chrome DevTools Device Mode
- BrowserStack
- Responsive Design Mode (Firefox)

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm test
```

## 📈 Monitoring

### What to Monitor
- Page load times
- Core Web Vitals (LCP, FID, CLS)
- Error rates
- API response times (when Firebase added)
- User engagement metrics

### Tools
- Vercel Analytics (built-in)
- Google Lighthouse
- WebPageTest
- Sentry (error tracking)

## 🔐 Firebase Security Rules

When adding Firebase:

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /clubs/{clubId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /club-images/{imageId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 📋 Pre-Deploy Checklist

- [ ] Run production build locally
- [ ] Test all pages and navigation
- [ ] Verify responsive design (mobile/tablet/desktop)
- [ ] Check all images load correctly
- [ ] Test hover animations
- [ ] Verify loading states work
- [ ] Test empty state UI
- [ ] Check browser console for errors
- [ ] Test on multiple browsers
- [ ] Verify SEO metadata
- [ ] Check accessibility (ARIA labels)
- [ ] Test keyboard navigation

## 🌟 Post-Deploy

1. **Test Live Site**
   - Visit deployed URL
   - Test all functionality
   - Check on real mobile devices

2. **Monitor Performance**
   - Run Lighthouse audit
   - Check Core Web Vitals
   - Monitor error logs

3. **Share**
   - Share URL with team
   - Gather feedback
   - Plan next features

## 📞 Support

If you encounter issues:
1. Check Next.js documentation
2. Review Vercel/Netlify logs
3. Check browser console
4. Verify build logs

## 🎉 You're Ready!

Your CampusFlow Clubs Platform is production-ready and optimized for deployment.
