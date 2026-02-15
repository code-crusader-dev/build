# CampusFlow - Campus Event Automation Platform

A modern, minimal black & white event management platform for campus clubs and events.

**🔐 Authentication**: Optional - Browse freely, login only for registration  
**🔒 Domain Restriction**: Only @nitj.ac.in Google accounts allowed  
**🎨 Design**: Strict black & white minimal theme  
**⚡ Tech Stack**: Next.js 14 + TypeScript + Firebase + Tailwind CSS

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Google account with @nitj.ac.in email (for event registration)

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit: **http://localhost:3000**

**Note**: You can browse clubs and events without login. Authentication is only required for event registration and other protected actions.

---

## 📁 Project Structure

```
campus-clubs-platform/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Clubs Home Page (/)
│   ├── club/[clubId]/page.tsx    # Club Events Page (/club/:id)
│   ├── event/[eventId]/page.tsx  # Event Details Page (/event/:id)
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/                   # Reusable UI components
│   ├── Navbar.tsx                # Top navigation bar
│   ├── ClubCard.tsx              # Club card component
│   ├── ClubCardSkeleton.tsx      # Loading skeleton
│   ├── EmptyState.tsx            # Empty clubs state
│   ├── EventHorizontalCard.tsx   # Horizontal event card
│   ├── EventCardSkeleton.tsx     # Event loading skeleton
│   └── EventsEmptyState.tsx      # Empty events state
├── data/                         # Mock data (Firebase ready)
│   ├── mockClubs.ts              # Sample clubs data
│   └── mockEvents.ts             # Sample events data
├── types/                        # TypeScript interfaces
│   ├── club.ts                   # Club type definition
│   └── event.ts                  # Event type & status enum
├── package.json
├── tailwind.config.js            # Tailwind + custom theme
├── tsconfig.json
└── next.config.js
```

---

## 🎨 Design System

### Color Palette (Black & White Only)
```css
Background:        #000000 (pure black)
Card Background:   #111111 / #151515 (dark grey)
Borders:           #2A2A2A (subtle grey)
Primary Text:      #FFFFFF (white)
Secondary Text:    #BFBFBF (light grey)
Hover State:       #1A1A1A (slightly lighter)
```

### Typography
- Modern, clean sans-serif
- Smooth antialiasing
- High contrast for readability

### Animations
- Subtle fade-in on page load (0.5s)
- Card hover: scale(1.03) + brightness boost
- Loading skeleton pulse animation

---

## 📄 Pages Overview

### 0. Login Page (`/login`) 🔐
**Route:** `/login`

**Features:**
- Google Sign-In with OAuth popup
- Domain restriction: Only @nitj.ac.in emails allowed
- Auto-redirect if already authenticated
- Return URL support (redirects back after login)
- Error message for invalid domains
- Minimal black & white design
- Loading states during authentication

**Authentication Flow:**
1. User clicks "Register" on event (or "Login" in navbar)
2. Redirected to login page
3. Google OAuth popup appears
4. User selects account
5. Domain validation:
   - ✅ @nitj.ac.in → Success, redirect back to original page
   - ❌ Other domains → Sign out + error message

**Components:**
- Google Sign-In button with icon
- Error display
- Loading indicator

---

### 1. Clubs Home Page (`/`) 🌍
**Route:** `/`
**Protection:** Public (no login required)

**Features:**
- Responsive grid layout
  - Desktop: 4 columns
  - Tablet: 2 columns  
  - Mobile: 1 column
- Top navbar with platform name and profile button
- Page title: "Campus Clubs"
- 8 sample club cards with:
  - Square club image (1:1 ratio)
  - Club name overlay
  - "Upcoming: X events" badge
- Click card → Navigate to `/club/{clubId}`
- Loading skeleton cards
- Empty state if no clubs

**Components:**
- `Navbar`
- `ClubCard`
- `ClubCardSkeleton`
- `EmptyState`

---

### 2. Club Events Page (`/club/[clubId]`) 🌍
**Route:** `/club/{clubId}`
**Protection:** Public (no login required for browsing)

**Features:**
- Back button (← Back to Clubs)
- Club name header
- Club description subtitle
- Horizontal event cards (stacked vertically)
- Each card shows:
  - Left: Event poster (square)
  - Center: Name, description, venue, date/time
  - Right: Status tag + Register button
- Click card → Navigate to `/event/{eventId}`
- Loading skeleton horizontal cards
- Empty state if no events

**Event Status System:**
- `REGISTRATION_OPEN` → "Registration Open" (Register button visible)
- `REGISTRATION_CLOSED` → "Registration Closed" (no button)
- `ONGOING` → "Ongoing" (no button)
- `COMPLETED` → "Completed" (no button)

**Registration Protection:**
- Not logged in: Click "Register" → Login modal appears
- Logged in: Click "Register" → Direct registration

**Components:**
- `EventHorizontalCard` (with auth check)
- `EventCardSkeleton`
- `EventsEmptyState`
- `LoginRequiredModal`

---

### 3. Event Details Page (`/event/[eventId]`)
**Route:** `/event/{eventId}`

**Features:**
- Placeholder page showing event ID
- Ready for future development

---

## 🗄️ Data Structure

### Club Interface
```typescript
interface Club {
  id: string;
  name: string;
  imageUrl: string;
  upcomingEventsCount: number;
}
```

### Event Interface
```typescript
enum EventStatus {
  REGISTRATION_OPEN = 'REGISTRATION_OPEN',
  REGISTRATION_CLOSED = 'REGISTRATION_CLOSED',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED'
}

interface Event {
  id: string;
  clubId: string;
  name: string;
  description: string;
  venue: string;
  startTime: string; // ISO 8601
  endTime: string;
  registrationDeadline: string;
  capacity: number;
  registeredCount: number;
  status: EventStatus; // Backend-driven
  posterImageUrl: string;
}
```

---

## 🔐 Authentication System

### Optional Authentication Flow

**Public Access (No Login):**
- Browse all clubs
- View club details  
- See all events
- Read event information

**Protected Actions (Login Required):**
- Event registration
- Feedback submission (future)
- Attendance marking (future)

### How It Works

1. **First Visit**: Users land on Clubs Home Page, can browse freely
2. **Protected Action**: Click "Register" → Login modal appears if not authenticated
3. **Login Flow**: Google Sign-In → Domain validation → Return to original page
4. **Post-Login**: Can perform protected actions without prompts

### Navbar States

**Not Logged In:**
```
CampusFlow              [Login]  [Sign Up]
```

**Logged In:**
```
CampusFlow              [👤 John Doe ▼]
                        ┌─────────────────┐
                        │ John Doe        │
                        │ john@nitj.ac.in │
                        ├─────────────────┤
                        │ Sign Out        │
                        └─────────────────┘
```

### Login Required Modal

When user tries to register without authentication:

```
┌─────────────────────────────────────┐
│  Login Required                     │
│                                     │
│  Please login with your NITJ        │
│  account to register for events.    │
│                                     │
│  [Continue with Google]  [Cancel]   │
└─────────────────────────────────────┘
```

For detailed authentication documentation, see [OPTIONAL_AUTH_GUIDE.md](OPTIONAL_AUTH_GUIDE.md)

---

## 🔥 Firebase Integration (Ready)

The codebase is structured for easy Firebase integration:

### Step 1: Install Firebase
```bash
npm install firebase
```

### Step 2: Create Firebase Config
```typescript
// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

### Step 3: Replace Mock Data
```typescript
// Replace in app/page.tsx
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Fetch clubs
const clubsSnapshot = await getDocs(collection(db, 'clubs'));
const clubs = clubsSnapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
}));

// Fetch events
const eventsSnapshot = await getDocs(collection(db, 'events'));
const events = eventsSnapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
}));
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Deploy on Vercel**
- Visit [vercel.com](https://vercel.com)
- Import your GitHub repository
- Vercel auto-detects Next.js
- Click "Deploy"

3. **Environment Variables** (if using Firebase)
Add in Vercel dashboard:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod
```

---

## 🛠️ Development Scripts

```bash
# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## 🎯 Features Implemented

### Optional Authentication System ✅
- [x] Public browsing without login
- [x] Login/Sign Up buttons in navbar (not logged in)
- [x] User avatar/dropdown in navbar (logged in)
- [x] Login required modal for protected actions
- [x] Return URL after login
- [x] Domain restriction (@nitj.ac.in only)
- [x] Session persistence across page refreshes
- [x] Seamless sign out

### Clubs Home Page ✅
- [x] Responsive 4/2/1 column grid
- [x] Navbar with platform name & profile button
- [x] 8 sample club cards
- [x] Club name overlay on images
- [x] "Upcoming events" badge
- [x] Hover animation (scale + brightness)
- [x] Click navigation to club page
- [x] Loading skeleton cards
- [x] Empty state UI
- [x] Fade-in page animation

### Club Events Page ✅
- [x] Back button to clubs page
- [x] Club name header + description
- [x] Horizontal event cards (responsive)
- [x] Event poster, name, description, venue, date/time
- [x] Status tag system (4 statuses)
- [x] Register button (conditional)
- [x] Click navigation to event page
- [x] Loading skeleton cards
- [x] Empty state UI
- [x] Fade-in animation

### Code Quality ✅
- [x] Component-based architecture
- [x] Reusable ClubCard component
- [x] Reusable EventHorizontalCard component
- [x] TypeScript interfaces
- [x] Clean folder structure
- [x] Firebase-ready data layer
- [x] No code duplication

---

## 📱 Responsive Breakpoints

```css
Mobile:  < 640px   (1 column)
Tablet:  640-1024px (2 columns)
Desktop: > 1024px  (4 columns)
```

---

## 🎨 Component Showcase

### ClubCard Component
- Square image with 1:1 aspect ratio
- Name overlay at bottom with dark gradient
- Event count badge
- Rounded corners (16px)
- Subtle border (#2A2A2A)
- Hover: scale(1.03) + brightness

### EventHorizontalCard Component
- Left: Square poster image
- Center: Event details (name, desc, venue, time)
- Right: Status tag + register button
- Full width on desktop, stacked on mobile
- Subtle hover effect
- Click navigates to event details

---

## 🔒 Best Practices

1. **Status-Driven UI**: Event status controls button visibility
2. **Loading States**: Always show skeleton during data fetch
3. **Empty States**: Clear messaging when no data
4. **Accessibility**: Semantic HTML, proper contrast ratios
5. **Performance**: Next.js Image optimization, lazy loading
6. **Scalability**: Firebase-ready, component-based

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
npm run dev
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### Image Not Loading
- Check image URLs in mock data
- Ensure domains are added to `next.config.js`
- Use placeholder images from unsplash.com

---

## 📦 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** SVG line icons
- **Image Optimization:** Next.js Image component
- **Routing:** File-based routing
- **State:** React hooks
- **Future Backend:** Firebase (Firestore, Storage, Auth)

---

## 🎯 Next Steps

1. **Implement Event Details Page**
   - Full event information
   - Registration form
   - Attendance tracking

2. **Add Firebase Backend**
   - Firestore for data
   - Firebase Auth for users
   - Cloud Storage for images

3. **User Authentication**
   - Login/Signup
   - Profile management
   - Role-based access

4. **Registration System**
   - Form validation
   - Capacity management
   - Email confirmations

5. **Admin Dashboard**
   - Create/edit clubs
   - Manage events
   - Analytics

---

## 📞 Support

For issues or questions:
- Check code comments
- Review component structure
- Test in development mode first

---

## 📚 Documentation

- **[README.md](README.md)** - Main project documentation (you are here)
- **[AUTHENTICATION.md](AUTHENTICATION.md)** - Firebase authentication setup
- **[OPTIONAL_AUTH_GUIDE.md](OPTIONAL_AUTH_GUIDE.md)** - Optional auth flow guide

---

## 📝 License

Private campus project - All rights reserved.

---

**Built with ⚡ by CampusFlow Team**
