# Quick Start Guide

## Installation & Setup

1. **Install Dependencies**
```bash
npm install
```

2. **Run Development Server**
```bash
npm run dev
```

3. **Open in Browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## What You'll See

### Home Page (`/`)
- Black background with white text
- Top navbar with "CampusFlow" logo and Profile button
- "Campus Clubs" page title
- Grid of 8 club cards:
  - Desktop: 4 per row
  - Tablet: 2 per row
  - Mobile: 1 per row

### Hover Effects
- Cards scale to 1.03x on hover
- Image brightness increases slightly
- Smooth transitions

### Loading State
- Shows 8 skeleton cards with pulsing animation
- Simulates 1-second load time

### Click Interaction
- Click any club card to navigate to `/club/{clubId}`
- Example: `/club/tech-innovators`

## File Overview

### Core Pages
- `app/page.tsx` - Main clubs listing page
- `app/club/[clubId]/page.tsx` - Individual club detail page

### Components
- `components/Navbar.tsx` - Top navigation
- `components/ClubCard.tsx` - Individual club card (reusable)
- `components/ClubCardSkeleton.tsx` - Loading skeleton
- `components/EmptyState.tsx` - No clubs available state

### Data
- `data/mockClubs.ts` - 8 sample clubs with Unsplash images
- `types/club.ts` - TypeScript interface

## Customization

### Change Platform Name
Edit `components/Navbar.tsx` line 13:
```tsx
CampusFlow → Your Platform Name
```

### Add More Clubs
Edit `data/mockClubs.ts` and add new club objects:
```typescript
{
  id: 'your-club-id',
  name: 'Your Club Name',
  imageUrl: 'https://your-image-url.jpg',
  upcomingEventsCount: 3,
}
```

### Modify Colors
Edit `tailwind.config.js` in the `extend.colors` section

### Change Grid Layout
Edit `app/page.tsx` grid classes:
```tsx
grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
```

## Next Steps - Firebase Integration

When ready to connect to Firebase:

1. Install Firebase:
```bash
npm install firebase
```

2. Create `lib/firebase.ts` with your config

3. Update `app/page.tsx` to fetch from Firestore instead of mock data

4. See comments in `data/mockClubs.ts` for Firebase query example

## Troubleshooting

**Port already in use?**
```bash
# Kill process on port 3000
npx kill-port 3000
npm run dev
```

**Build errors?**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

**Images not loading?**
- Check `next.config.js` has correct image domains
- Verify internet connection for Unsplash images
