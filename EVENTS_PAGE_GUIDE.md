# Club Events Page - Documentation

## 🎯 Overview

The Club Events Page displays all events for a specific club in a horizontal card layout with strict black and white minimal design.

## 🚀 Access

**URL Format**: `/club/{clubId}`

**Example**: `/club/tech-innovators`

**Navigation**: Click any club card from the home page

## 🎨 Design Components

### Page Header

```
┌─────────────────────────────────────────────────┐
│ ← Back to Clubs                                 │
│                                                 │
│ Tech Innovators Club                           │
│ Explore upcoming events, workshops, and...     │
│                                                 │
│ Events                                         │
└─────────────────────────────────────────────────┘
```

### Horizontal Event Card Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ ┌─────┐  Annual Tech Hackathon 2024          [Registration Open]│
│ │     │  Join us for 48 hours of coding...                      │
│ │ IMG │  📍 Engineering Building, Hall A                  [Register]│
│ │     │  📅 Mar 15, 2024 • 09:00 AM - 06:00 PM                  │
│ └─────┘                                                          │
└─────────────────────────────────────────────────────────────────┘
```

## 📊 Event Status System

### Status Types (Backend Driven)

| Status | Display Text | Button Shown |
|--------|-------------|--------------|
| `REGISTRATION_OPEN` | "Registration Open" | ✅ Register |
| `REGISTRATION_CLOSED` | "Registration Closed" | ❌ None |
| `ONGOING` | "Ongoing" | ❌ None |
| `COMPLETED` | "Completed" | ❌ None |

### Status Tag Styling
- Background: `#151515` (dark grey pill)
- Text: `#FFFFFF` (white)
- Border: `#2A2A2A` (subtle)
- Rounded full (pill shape)

## 🔧 Component Structure

### EventHorizontalCard Component

**Props:**
```typescript
interface EventHorizontalCardProps {
  event: Event;
}
```

**Layout Sections:**
1. **Left**: Event poster (square, 192px x 192px on desktop)
2. **Center**: Event details (name, description, venue, date/time)
3. **Right**: Status tag and Register button

**Interactions:**
- Click card → Navigate to `/event/{eventId}`
- Click Register → Trigger registration handler (placeholder)

## 📱 Responsive Design

### Desktop (> 768px)
```
┌────────────────────────────────────────────┐
│ [IMG] Event Name           [Status] [Btn] │
│       Description                         │
│       📍 Venue                             │
│       📅 Date & Time                       │
└────────────────────────────────────────────┘
```

### Mobile (< 768px)
```
┌──────────────────────┐
│     [IMG FULL]       │
├──────────────────────┤
│ Event Name           │
│ Description          │
│ 📍 Venue             │
│ 📅 Date & Time       │
│ [Status]   [Button]  │
└──────────────────────┘
```

## 📁 File Structure

```
app/
└── club/
    └── [clubId]/
        └── page.tsx          ← Club Events Page

components/
├── EventHorizontalCard.tsx   ← Reusable event card
├── EventCardSkeleton.tsx     ← Loading skeleton
└── EventsEmptyState.tsx      ← Empty state UI

data/
└── mockEvents.ts             ← 6 sample events

types/
└── event.ts                  ← Event interface & status enum
```

## 🎯 Data Structure

```typescript
interface Event {
  id: string;
  clubId: string;
  name: string;
  description: string;
  venue: string;
  startTime: string;        // ISO 8601
  endTime: string;          // ISO 8601
  registrationDeadline: string;
  capacity: number;
  registeredCount: number;
  status: EventStatus;      // Backend-driven
  posterImageUrl: string;
}

enum EventStatus {
  REGISTRATION_OPEN = 'REGISTRATION_OPEN',
  REGISTRATION_CLOSED = 'REGISTRATION_CLOSED',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED'
}
```

## 🔥 Sample Events (6 provided)

1. **Annual Tech Hackathon 2024** - Registration Open
2. **Machine Learning Workshop** - Registration Closed
3. **Tech Talk: Future of Web Development** - Ongoing
4. **Code Sprint Championship** - Completed
5. **Full Stack Web Development Bootcamp** - Registration Open
6. **Cybersecurity Awareness Seminar** - Registration Open

## 🎨 Color Palette

| Element | Color | Usage |
|---------|-------|-------|
| Background | `#000000` | Page background |
| Card | `#111111` | Event card background |
| Card Hover | `#151515` | Card on hover |
| Border | `#2A2A2A` | Card borders |
| Text Primary | `#FFFFFF` | Event names, headings |
| Text Secondary | `#BFBFBF` | Descriptions, metadata |

## ✨ Animations

### Page Load
- Fade in: 0 → 1 opacity
- Duration: 500ms
- Easing: ease-in-out

### Card Hover
- Background: `#111111` → `#151515`
- Image brightness: 100% → 110%
- Duration: 300ms

### Loading Skeleton
- Pulse animation
- Infinite loop

## 🔗 Navigation Flow

```
Home (/) 
  → Click Club Card 
    → Club Events (/club/{clubId})
      → Click Event Card
        → Event Detail (/event/{eventId})
```

## 📋 UI States

### Loading State
- Shows 3 skeleton cards
- Simulates 800ms load time
- Pulse animation on skeletons

### Empty State
- Calendar icon
- "No events available" message
- "This club hasn't scheduled any events yet"

### Club Not Found
- Error icon
- "Club not found" message
- "Back to Home" button

## 🎯 Button Behavior

### Register Button
```typescript
// Only shown when status === REGISTRATION_OPEN
<button onClick={handleRegisterClick}>
  Register
</button>
```

**Styling:**
- White outline (2px border)
- Transparent background
- Hover: White background, black text
- Smooth transition: 200ms

## 📅 Date & Time Formatting

**Format**: `MMM DD, YYYY • HH:MM AM/PM - HH:MM AM/PM`

**Example**: `Mar 15, 2024 • 09:00 AM - 06:00 PM`

**Implementation:**
```typescript
const formatDateTime = (startTime: string, endTime: string): string => {
  // Returns formatted date and time range
}
```

## 🔥 Firebase Integration (Ready)

### Replace Mock Data

```typescript
// Current (Mock)
const clubEvents = mockEvents.filter(e => e.clubId === clubId);

// Future (Firebase)
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const eventsQuery = query(
  collection(db, 'events'),
  where('clubId', '==', clubId)
);
const snapshot = await getDocs(eventsQuery);
const events = snapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
})) as Event[];
```

## 🎨 Icon Usage

### Location Icon
- Outline style
- 16px x 16px
- Stroke width: 1.5

### Calendar Icon
- Outline style
- 16px x 16px
- Stroke width: 1.5

### Back Arrow
- Outline style
- 16px x 16px
- Stroke width: 2

## 📐 Spacing & Layout

### Card Spacing
- Gap between cards: 1rem (16px)
- Card padding: 1.5rem (24px)
- Mobile padding: 1.5rem (24px)

### Image Sizing
- Desktop: 192px x 192px (fixed)
- Mobile: Full width, 192px height

### Text Spacing
- Event name margin bottom: 0.5rem (8px)
- Description margin bottom: 0.75rem (12px)
- Venue/Date margin bottom: 0.5rem (8px)

## 🚀 Performance

### Optimizations
- Next.js Image optimization for posters
- Lazy loading for images
- Skeleton screens during load
- Smooth transitions (GPU accelerated)

## 🎯 Accessibility

- Semantic HTML structure
- Proper heading hierarchy (h1, h2, h3)
- Alt text for images
- Keyboard navigation support
- Screen reader friendly

## 🔍 Testing

### Test Scenarios
1. ✅ Load club with events
2. ✅ Load club with no events
3. ✅ Load non-existent club
4. ✅ Click event card navigation
5. ✅ Click register button
6. ✅ Responsive layout (mobile/tablet/desktop)
7. ✅ All status types display correctly

## 📝 Code Quality

✅ TypeScript strict mode  
✅ No hardcoded status logic  
✅ Backend-driven status field  
✅ Reusable components  
✅ Clean separation of concerns  
✅ Firebase-ready architecture  
✅ No code duplication  

## 🎉 Features

✅ Horizontal event cards  
✅ Backend-driven status system  
✅ Conditional register button  
✅ Loading skeletons  
✅ Empty state UI  
✅ Club not found handling  
✅ Responsive design  
✅ Smooth animations  
✅ Date/time formatting  
✅ Navigation integration  

## 🚀 Quick Start

1. **Navigate from home page**
   - Click any club card
   - URL: `/club/{clubId}`

2. **View events**
   - See all events for that club
   - Different status tags displayed

3. **Register for events**
   - Click "Register" button (if available)
   - Only shown for REGISTRATION_OPEN status

4. **View event details**
   - Click anywhere on event card
   - Navigate to `/event/{eventId}`

## 📞 Next Steps

### Implement Event Detail Page
- Full event information
- Registration form
- Attendee list
- Event timeline

### Add Filtering
- Filter by status
- Search events
- Sort by date

### Add Registration
- User authentication
- Registration form
- Capacity management
- Confirmation emails
