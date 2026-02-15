# Visual Guide - CampusFlow Clubs Page

## 🎨 Color Scheme Preview

```
┌─────────────────────────────────────────┐
│ Background: #000000 (Pure Black)        │
│ ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Card: #111111 (Very Dark Grey)          │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Border: #2A2A2A (Subtle Grey)           │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Text Primary: #FFFFFF (White)           │
│                                         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Text Secondary: #BFBFBF (Light Grey)    │
│ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │
└─────────────────────────────────────────┘
```

## 📐 Layout Structure

### Desktop View (1024px+) - 4 columns
```
┌─────────────────────────────────────────────────────────────────┐
│  CampusFlow                                        [Profile]     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Campus Clubs                                                   │
│                                                                  │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                        │
│  │ Tech │  │Robot │  │Photo │  │Debate│                        │
│  │ Innov│  │ics   │  │graph │  │ Team │                        │
│  │      │  │      │  │  y   │  │      │                        │
│  └──────┘  └──────┘  └──────┘  └──────┘                        │
│                                                                  │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                        │
│  │Music │  │Entre │  │ Art  │  │ Env  │                        │
│  │Ensem │  │preneur│  │Collec│  │Action│                        │
│  │ble   │  │ship  │  │tive  │  │      │                        │
│  └──────┘  └──────┘  └──────┘  └──────┘                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Tablet View (640px - 1024px) - 2 columns
```
┌──────────────────────────────────────┐
│  CampusFlow              [Profile]   │
├──────────────────────────────────────┤
│                                      │
│  Campus Clubs                        │
│                                      │
│  ┌──────────┐  ┌──────────┐         │
│  │   Tech   │  │ Robotics │         │
│  │Innovators│  │ Society  │         │
│  │          │  │          │         │
│  └──────────┘  └──────────┘         │
│                                      │
│  ┌──────────┐  ┌──────────┐         │
│  │   Photo  │  │  Debate  │         │
│  │   graphy │  │   Team   │         │
│  └──────────┘  └──────────┘         │
│                                      │
└──────────────────────────────────────┘
```

### Mobile View (<640px) - 1 column
```
┌─────────────────────────┐
│ CampusFlow   [Profile]  │
├─────────────────────────┤
│                         │
│ Campus Clubs            │
│                         │
│ ┌─────────────────────┐ │
│ │                     │ │
│ │   Tech Innovators   │ │
│ │                     │ │
│ └─────────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │                     │ │
│ │  Robotics Society   │ │
│ │                     │ │
│ └─────────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │                     │ │
│ │  Photography Club   │ │
│ │                     │ │
│ └─────────────────────┘ │
│                         │
└─────────────────────────┘
```

## 🎴 Club Card Detail

```
┌─────────────────────────────┐
│                             │
│        [CLUB IMAGE]         │
│         (Square)            │
│                             │
│  ╔═══════════════════════╗  │
│  ║  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ║  │ ← Gradient overlay
│  ║                       ║  │
│  ║  Tech Innovators Club ║  │ ← Club Name (white)
│  ║  Upcoming: 3 events   ║  │ ← Badge (light grey)
│  ╚═══════════════════════╝  │
└─────────────────────────────┘
     ↑                     ↑
  12-16px              1px border
  rounded             (#2A2A2A)
```

### Card States

**Normal State:**
- Scale: 1.0
- Border: #2A2A2A
- Background: #111111

**Hover State:**
- Scale: 1.03 (smooth transition)
- Brightness: 110%
- Background: #151515
- Cursor: pointer
- Transition: 300ms ease

**Click:**
- Navigate to `/club/{clubId}`

## 🔄 Loading State

```
┌────────────────────────────────────────────────┐
│  Campus Clubs                                  │
│                                                │
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐          │
│  │▓▓▓▓▓│  │▓▓▓▓▓│  │▓▓▓▓▓│  │▓▓▓▓▓│          │
│  │▓▓▓▓▓│  │▓▓▓▓▓│  │▓▓▓▓▓│  │▓▓▓▓▓│          │
│  │▓▓▓▓▓│  │▓▓▓▓▓│  │▓▓▓▓▓│  │▓▓▓▓▓│          │
│  │▓▓▓  │  │▓▓▓  │  │▓▓▓  │  │▓▓▓  │  ← Pulse │
│  │▓    │  │▓    │  │▓    │  │▓    │            │
│  └─────┘  └─────┘  └─────┘  └─────┘          │
│                                                │
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐          │
│  │▓▓▓▓▓│  │▓▓▓▓▓│  │▓▓▓▓▓│  │▓▓▓▓▓│          │
│  │▓▓▓▓▓│  │▓▓▓▓▓│  │▓▓▓▓▓│  │▓▓▓▓▓│          │
│  └─────┘  └─────┘  └─────┘  └─────┘          │
└────────────────────────────────────────────────┘
```

## 📭 Empty State

```
┌─────────────────────────────────────────┐
│                                         │
│               ┌─────┐                   │
│               │     │                   │
│               │  📦 │  ← Archive Icon   │
│               │     │                   │
│               └─────┘                   │
│                                         │
│        No clubs available               │
│                                         │
│   Check back soon for new campus        │
│   clubs and organizations               │
│                                         │
└─────────────────────────────────────────┘
```

## 🎭 Animations

### Page Load
```
Opacity: 0 → 1
Transform: translateY(10px) → translateY(0)
Duration: 500ms
Easing: ease-in-out
```

### Card Hover
```
Scale: 1.0 → 1.03
Brightness: 100% → 110%
Duration: 300ms
Easing: ease
```

### Skeleton Pulse
```
Opacity: 0.5 → 1 → 0.5
Duration: 1500ms
Infinite loop
```

## 📱 Responsive Breakpoints

| Breakpoint | Width | Columns | Gap |
|------------|-------|---------|-----|
| Mobile | < 640px | 1 | 1.5rem |
| Tablet | 640px - 1024px | 2 | 1.5rem |
| Desktop | > 1024px | 4 | 1.5rem |

## 🎯 Interactive Elements

### Navbar Profile Button
```
┌──────────┐
│ Profile  │  ← Border: #2A2A2A
└──────────┘    Padding: 16px
    ↓
  Hover
    ↓
┌──────────┐
│ Profile  │  ← Background: #151515
└──────────┘    Transition: 200ms
```

### Club Card Click Area
- Entire card is clickable
- Cursor changes to pointer on hover
- Visual feedback through scale + brightness
- Smooth navigation to detail page

## 🔤 Typography

```
Page Title (Campus Clubs):
- Size: 2.25rem (36px)
- Weight: Bold (700)
- Color: #FFFFFF
- Margin Bottom: 2rem

Club Name:
- Size: 1.125rem (18px)
- Weight: Semibold (600)
- Color: #FFFFFF

Badge Text (Upcoming events):
- Size: 0.75rem (12px)
- Weight: Normal (400)
- Color: #BFBFBF

Platform Name (CampusFlow):
- Size: 1.25rem (20px)
- Weight: Semibold (600)
- Color: #FFFFFF
```

## ✨ Key Visual Features

1. **Pure Minimalism**: No colors except black/white/grey
2. **High Contrast**: White text on pure black background
3. **Subtle Borders**: 1px #2A2A2A for definition
4. **Smooth Transitions**: All animations use ease curves
5. **Square Images**: 1:1 aspect ratio for consistency
6. **Gradient Overlays**: Ensure text readability on images
7. **Rounded Corners**: 12-16px for modern feel
8. **Clean Spacing**: Consistent padding and gaps
9. **Premium Feel**: Technical and sophisticated aesthetic
10. **Touch-Friendly**: Large tap targets for mobile

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

All animations use GPU acceleration via `transform` and `opacity` properties.
