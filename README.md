# CampusFlow - Campus Clubs Platform

A responsive campus event automation platform with a strict black and white minimal theme.

## 🎨 Design Philosophy

- **Pure Minimalism**: Strict black (#000000) and white (#FFFFFF) color scheme
- **Premium Feel**: Modern, clean, and technical aesthetic
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Interactions**: Subtle hover animations and fade-in effects

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Images**: Next.js Image Optimization

## 📁 Project Structure

```
├── app/
│   ├── globals.css          # Global styles and Tailwind directives
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Clubs home page
│   └── club/
│       └── [clubId]/
│           └── page.tsx     # Dynamic club detail page
├── components/
│   ├── Navbar.tsx           # Top navigation bar
│   ├── ClubCard.tsx         # Reusable club card component
│   ├── ClubCardSkeleton.tsx # Loading skeleton for club cards
│   └── EmptyState.tsx       # Empty state UI
├── data/
│   └── mockClubs.ts         # Mock data (ready for Firebase)
├── types/
│   └── club.ts              # TypeScript interfaces
└── Configuration files...
```

## 🎯 Features

### Responsive Grid Layout
- **Desktop**: 4 cards per row
- **Tablet**: 2 cards per row  
- **Mobile**: 1 card per row

### Club Card Design
- 1:1 square aspect ratio images
- Club name overlay at bottom
- Upcoming events badge
- Hover effects:
  - Scale to 1.03x
  - Brightness increase
  - Smooth transitions

### UI States
- ✅ Loading skeleton cards
- ✅ Empty state with icon and message
- ✅ Fade-in page animations

### Navigation
- Top navbar with platform name
- Profile/Login button placeholder
- Click cards to navigate to `/club/{clubId}`

## 🛠️ Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## 🔥 Firebase Integration (Ready)

The data layer is structured to easily integrate with Firebase:

1. Install Firebase:
```bash
npm install firebase
```

2. Create `lib/firebase.ts` with your Firebase config

3. Replace mock data in `data/mockClubs.ts` with Firebase queries:

```typescript
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function getClubs(): Promise<Club[]> {
  const clubsCollection = collection(db, 'clubs');
  const clubsSnapshot = await getDocs(clubsCollection);
  return clubsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Club[];
}
```

## 📊 Data Structure

Each club object contains:

```typescript
interface Club {
  id: string;                // Unique identifier
  name: string;              // Club name
  imageUrl: string;          // Image URL (1:1 ratio)
  upcomingEventsCount: number; // Number of upcoming events
}
```

## 🎨 Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Background | Pure Black | `#000000` |
| Card Background | Very Dark Grey | `#111111` |
| Card Hover | Slightly Lighter | `#151515` |
| Borders | Subtle Grey | `#2A2A2A` |
| Primary Text | White | `#FFFFFF` |
| Secondary Text | Light Grey | `#BFBFBF` |

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (1 column)
- **Tablet**: 640px - 1024px (2 columns)
- **Desktop**: > 1024px (4 columns)

## ⚡ Performance

- Next.js Image Optimization for all club images
- Lazy loading for images
- Minimal JavaScript bundle
- CSS animations with GPU acceleration

## 🚫 What's NOT Included

- No bright colors or gradients
- No heavy animations or transitions
- No glassmorphism effects
- No social feed features

## 📝 License

MIT
