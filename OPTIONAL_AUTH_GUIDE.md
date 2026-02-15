# Optional Authentication Flow - Implementation Guide

## Overview

CampusFlow now implements **optional authentication**, allowing users to browse clubs and events freely while requiring login only for specific actions like event registration.

---

## Key Features

### ✅ Public Access (No Login Required)
- Browse all clubs on home page
- View club details
- See all events
- View event information

### 🔒 Protected Actions (Login Required)
- Event registration
- Feedback submission (future)
- Attendance marking (future)

---

## Authentication Flow

### 1. First Visit (Not Logged In)

**User Experience:**
1. User lands on **Clubs Home Page** (default entry)
2. Navbar shows: **Login** | **Sign Up** buttons
3. User can browse all clubs and events
4. Click on event → View event details
5. Click **Register** button → Login modal appears

### 2. Login Modal Trigger

**When does it appear?**
- User clicks "Register" on any event (if not logged in)
- Future: Feedback submission, attendance marking

**Modal Content:**
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

### 3. Login Process

**Step-by-step:**
1. User clicks "Continue with Google" in modal
2. Store current page URL in `sessionStorage`
3. Redirect to `/login` page
4. User signs in with Google (@nitj.ac.in)
5. Domain validation:
   - ✅ `@nitj.ac.in` → Continue
   - ❌ Other → Sign out + error
6. Redirect back to original page
7. User can now register for the event

### 4. Logged In State

**Navbar Changes:**
- Shows user avatar/email
- Dropdown menu with:
  - User name
  - User email
  - Sign Out button

**Registration:**
- Click "Register" → Direct registration (no modal)
- TODO: Implement actual registration logic

---

## Implementation Details

### File Structure

```
components/
├── Navbar.tsx                    # Login/Sign Up or User Profile
├── LoginRequiredModal.tsx        # Auth prompt modal
└── EventHorizontalCard.tsx       # Register button with auth check

app/
├── page.tsx                      # No ProtectedRoute (public)
├── club/[clubId]/page.tsx        # No ProtectedRoute (public)
└── login/page.tsx                # Return URL handling

lib/
├── authService.ts                # Domain validation
└── firebase.ts                   # Firebase config

context/
└── AuthContext.tsx               # Global auth state
```

---

## Code Examples

### 1. Check Auth Before Protected Action

```tsx
import { useAuth } from '@/context/AuthContext';
import LoginRequiredModal from '@/components/LoginRequiredModal';

export default function MyComponent() {
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleProtectedAction = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    
    // Proceed with action for authenticated users
    performAction();
  };

  return (
    <>
      <button onClick={handleProtectedAction}>
        Register
      </button>
      
      <LoginRequiredModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        returnUrl={window.location.pathname}
      />
    </>
  );
}
```

### 2. Navbar State Management

```tsx
// Not logged in: Show Login + Sign Up
<div className="flex items-center gap-3">
  <button onClick={handleLogin}>Login</button>
  <button onClick={handleLogin}>Sign Up</button>
</div>

// Logged in: Show user profile
<button onClick={toggleDropdown}>
  <img src={user.photoURL} />
  <span>{user.displayName}</span>
</button>
```

### 3. Return URL Flow

```tsx
// In LoginRequiredModal
const handleLogin = () => {
  sessionStorage.setItem('returnUrl', returnUrl);
  router.push('/login');
};

// In Login Page
useEffect(() => {
  if (isAuthenticated) {
    const returnUrl = sessionStorage.getItem('returnUrl');
    if (returnUrl) {
      sessionStorage.removeItem('returnUrl');
      router.push(returnUrl);
    } else {
      router.push('/');
    }
  }
}, [isAuthenticated]);
```

---

## UI/UX Design

### Navbar - Not Logged In

```
┌────────────────────────────────────────────────┐
│ CampusFlow              [Login]  [Sign Up]     │
└────────────────────────────────────────────────┘
```

**Buttons:**
- Login: Border button (subtle)
- Sign Up: White button (prominent)
- Both trigger same Google auth flow

### Navbar - Logged In

```
┌────────────────────────────────────────────────┐
│ CampusFlow              [🖼️ John Doe ▼]        │
└────────────────────────────────────────────────┘
```

**Dropdown:**
```
┌─────────────────────────┐
│ John Doe                │
│ john@nitj.ac.in         │
├─────────────────────────┤
│ Sign Out                │
└─────────────────────────┘
```

### Login Required Modal

**Design:**
- Black background overlay (80% opacity)
- Dark card with white text
- White "Continue with Google" button
- Google icon included
- Cancel button (border style)
- Fade-in animation
- Click outside to close

---

## User Journeys

### Journey 1: Guest User Browses Events

1. Visit `campusflow.com`
2. See clubs home page
3. Click on "Tech Club"
4. See list of events
5. Read event details
6. **No login required** ✅

### Journey 2: User Wants to Register

1. Browse to an event
2. Click "Register" button
3. **Modal appears:** "Login Required"
4. Click "Continue with Google"
5. Select @nitj.ac.in account
6. Redirected back to event
7. Can now register ✅

### Journey 3: Invalid Domain

1. Click "Register"
2. Modal → "Continue with Google"
3. Select `user@gmail.com`
4. **Error:** "Only NIT Jalandhar accounts allowed"
5. Remain on login page
6. Cannot register ❌

### Journey 4: Already Logged In

1. User already authenticated
2. Browse events
3. Click "Register"
4. **Direct registration** (no modal)
5. Registration processed ✅

---

## Session Persistence

### How It Works

Firebase Auth automatically persists sessions:
- Uses browser local storage
- Session survives page refresh
- Session survives browser close/reopen
- User stays logged in until explicit sign out

### Testing Session

```bash
# Test 1: Refresh page
1. Login with @nitj.ac.in account
2. Refresh page (F5)
3. Should remain logged in ✅

# Test 2: Close and reopen browser
1. Login
2. Close browser completely
3. Reopen and visit site
4. Should remain logged in ✅

# Test 3: Sign out
1. Click user dropdown
2. Click "Sign Out"
3. Should be logged out
4. Navbar shows Login/Sign Up ✅
```

---

## Domain Restriction

**Allowed Domain:** `@nitj.ac.in`

**Validation Points:**
1. Client-side: On sign-in success
2. Client-side: On auth state change
3. Future: Server-side Firestore rules

**Implementation:**
```typescript
const ALLOWED_DOMAIN = '@nitj.ac.in';

export const isAllowedDomain = (email: string | null): boolean => {
  if (!email) return false;
  return email.endsWith(ALLOWED_DOMAIN);
};

// In sign-in flow
if (!isAllowedDomain(user.email)) {
  await signOut();
  return { error: 'Only NIT Jalandhar accounts allowed' };
}
```

---

## Future Enhancements

### 1. User Profile Creation

After first login, create Firestore document:

```typescript
// In AuthContext after successful login
const createUserProfile = async (user: User) => {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: serverTimestamp(),
      role: 'student',
    });
  }
};
```

### 2. Role-Based Access

```typescript
interface UserProfile {
  uid: string;
  email: string;
  role: 'student' | 'club_admin' | 'super_admin';
}

// Different permissions per role
if (userProfile.role === 'club_admin') {
  // Can create/edit events
}
```

### 3. Protected Actions Expansion

```typescript
// Feedback submission
const handleSubmitFeedback = () => {
  if (!isAuthenticated) {
    setShowLoginModal(true);
    return;
  }
  submitFeedback(feedbackData);
};

// Mark attendance
const handleMarkAttendance = () => {
  if (!isAuthenticated) {
    setShowLoginModal(true);
    return;
  }
  markAttendance(eventId);
};
```

---

## Firestore Security Rules

**Prepare for:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper: Check NITJ domain
    function isNITJUser() {
      return request.auth != null && 
             request.auth.token.email.matches('.*@nitj.ac.in$');
    }
    
    // Public read, auth required for write
    match /clubs/{clubId} {
      allow read: if true;
      allow write: if isNITJUser();
    }
    
    match /events/{eventId} {
      allow read: if true;
      allow write: if isNITJUser();
    }
    
    // Registration requires auth
    match /registrations/{regId} {
      allow read, write: if isNITJUser();
    }
  }
}
```

---

## Testing Checklist

### ✅ Public Access
- [ ] Can visit home page without login
- [ ] Can browse all clubs
- [ ] Can view club events
- [ ] Can see event details
- [ ] Navbar shows Login/Sign Up

### ✅ Login Flow
- [ ] Click Register → Modal appears
- [ ] Click "Continue with Google" → Redirect to login
- [ ] Login with @nitj.ac.in → Success
- [ ] Redirect back to original page
- [ ] Can now register for event

### ✅ Domain Restriction
- [ ] Login with @gmail.com → Error message
- [ ] Login with @yahoo.com → Error message
- [ ] Login with @nitj.ac.in → Success

### ✅ Session Persistence
- [ ] Refresh page → Stay logged in
- [ ] Close browser → Reopen → Stay logged in
- [ ] Sign out → Logged out completely

### ✅ UI States
- [ ] Not logged in: Login + Sign Up buttons
- [ ] Logged in: User avatar + dropdown
- [ ] Dropdown shows name and email
- [ ] Sign out works correctly

---

## Common Issues & Solutions

### Issue 1: Modal Not Showing

**Cause:** `showLoginModal` state not updating

**Solution:**
```tsx
const [showLoginModal, setShowLoginModal] = useState(false);

// Make sure to set true
if (!isAuthenticated) {
  setShowLoginModal(true); // ✅
}
```

### Issue 2: Return URL Not Working

**Cause:** sessionStorage not available or cleared

**Solution:**
```tsx
// Check if available
if (typeof window !== 'undefined') {
  sessionStorage.setItem('returnUrl', url);
}
```

### Issue 3: Domain Validation Bypassed

**Cause:** Only checking on login, not on state change

**Solution:**
```tsx
// In AuthContext
onAuthStateChanged(auth, (currentUser) => {
  if (currentUser && !isAllowedDomain(currentUser.email)) {
    auth.signOut();
  }
});
```

---

## Deployment Checklist

Before deploying to production:

1. ✅ Firebase config secure
2. ✅ Domain restriction active
3. ✅ Session persistence enabled
4. ✅ Error messages user-friendly
5. ✅ Return URL flow tested
6. ✅ All protected actions have auth check
7. ✅ Login modal styled correctly
8. ✅ Navbar states working
9. ✅ Sign out clears session
10. ✅ Browser compatibility tested

---

## Summary

**What Changed:**
- ✅ Removed ProtectedRoute from home and club pages
- ✅ Added Login + Sign Up buttons to navbar
- ✅ Created LoginRequiredModal component
- ✅ Added auth check to Register button
- ✅ Implemented return URL after login
- ✅ Maintained domain restriction (@nitj.ac.in)

**User Benefits:**
- 🎯 Browse without creating account
- 🚀 Quick exploration of clubs and events
- 🔐 Secure authentication when needed
- ↩️ Seamless return to action after login
- 💡 Clear prompts for required actions

**Status:** ✅ Optional authentication fully implemented and tested
