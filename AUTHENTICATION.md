# Firebase Authentication Guide

## Overview

CampusFlow uses Firebase Authentication with Google Sign-In and domain restriction to ensure only NIT Jalandhar students can access the platform.

---

## Configuration

### Firebase Project Details
```
Project ID: driven-catalyst-487504-f5
Auth Domain: driven-catalyst-487504-f5.firebaseapp.com
```

### Domain Restriction
**Only emails ending with `@nitj.ac.in` are allowed.**

---

## Authentication Flow

### 1. User Visits App
- If not authenticated → Redirect to `/login`
- If authenticated → Access granted

### 2. Login Process
1. User clicks "Sign in with Google"
2. Google OAuth popup appears
3. User selects Google account
4. Email domain validation:
   - ✅ `@nitj.ac.in` → Login successful
   - ❌ Other domains → Sign out + Error message

### 3. Session Management
- Auth state persists across page refreshes
- User info stored in Firebase Auth
- Protected routes require authentication

### 4. Sign Out
- User clicks profile dropdown → "Sign Out"
- Firebase signs out user
- Redirect to `/login`

---

## File Structure

```
lib/
├── firebase.ts              # Firebase config & initialization
└── authService.ts           # Auth functions & domain validation

context/
└── AuthContext.tsx          # Auth state management

app/
├── login/page.tsx           # Login page with Google Sign-In
├── layout.tsx               # AuthProvider wrapper
└── page.tsx                 # Protected home page

components/
├── ProtectedRoute.tsx       # Auth guard component
└── Navbar.tsx               # User profile & sign out
```

---

## Key Components

### 1. Firebase Configuration (`lib/firebase.ts`)
```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCPoY53fAw2Wh39XNC2_F1DjYBIWDldbI4",
  authDomain: "driven-catalyst-487504-f5.firebaseapp.com",
  projectId: "driven-catalyst-487504-f5",
  // ... other config
};

export const auth = getAuth(app);
```

### 2. Auth Service (`lib/authService.ts`)
```typescript
const ALLOWED_DOMAIN = '@nitj.ac.in';

export const isAllowedDomain = (email: string | null): boolean => {
  return email?.endsWith(ALLOWED_DOMAIN) ?? false;
};

export const signInWithGoogle = async () => {
  // 1. Sign in with Google popup
  // 2. Validate email domain
  // 3. If invalid → Sign out immediately
  // 4. Return success/error
};
```

### 3. Auth Context (`context/AuthContext.tsx`)
Provides global auth state:
```typescript
const { user, loading, isAuthenticated } = useAuth();
```

### 4. Protected Route (`components/ProtectedRoute.tsx`)
Wraps pages that require authentication:
```tsx
<ProtectedRoute>
  <YourPageContent />
</ProtectedRoute>
```

### 5. Login Page (`app/login/page.tsx`)
- Black background minimal design
- Google Sign-In button
- Error message display
- Auto-redirect if already authenticated

### 6. Navbar (`components/Navbar.tsx`)
- Shows user avatar & name when authenticated
- Dropdown with sign out option
- "Login" button when not authenticated

---

## Usage Examples

### Protect a Page
```tsx
import ProtectedRoute from '@/components/ProtectedRoute';

export default function MyPage() {
  return (
    <ProtectedRoute>
      {/* Your page content */}
    </ProtectedRoute>
  );
}
```

### Get Current User
```tsx
import { useAuth } from '@/context/AuthContext';

export default function MyComponent() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Not logged in</div>;

  return <div>Welcome {user?.displayName}</div>;
}
```

### Manual Sign Out
```tsx
import { signOut } from '@/lib/authService';

const handleSignOut = async () => {
  await signOut();
  router.push('/login');
};
```

---

## Security Features

### Client-Side Protection
1. **Domain Validation**: Checks email domain on sign-in
2. **Auth State Monitoring**: Auto-validates on auth state change
3. **Protected Routes**: Redirects unauthorized users
4. **Immediate Sign Out**: Invalid domains signed out instantly

### Future Backend Protection (Firestore Rules)
```javascript
// Example Firestore security rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function
    function isNITJUser() {
      return request.auth != null && 
             request.auth.token.email.matches('.*@nitj.ac.in$');
    }
    
    // Protect collections
    match /clubs/{clubId} {
      allow read: if isNITJUser();
      allow write: if isNITJUser() && 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /events/{eventId} {
      allow read: if isNITJUser();
      allow write: if isNITJUser() && 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

---

## Testing

### Test Valid Login
1. Navigate to `http://localhost:3000`
2. Should redirect to `/login`
3. Click "Sign in with Google"
4. Select `yourname@nitj.ac.in` account
5. Should redirect to home page
6. Navbar shows your profile

### Test Invalid Login
1. Navigate to `/login`
2. Click "Sign in with Google"
3. Select non-NITJ account (e.g., `user@gmail.com`)
4. Should see error: "Only NIT Jalandhar accounts are allowed"
5. Should remain on login page

### Test Protected Routes
1. Sign out
2. Try to access `/` directly
3. Should redirect to `/login`

### Test Session Persistence
1. Sign in successfully
2. Refresh page
3. Should remain authenticated
4. Close browser and reopen
5. Should remain authenticated

---

## Error Handling

### Common Errors

**Popup Blocked**
```
Error: The popup has been closed by the user
```
Solution: Enable popups for the site

**Network Error**
```
Error: Firebase: Error (auth/network-request-failed)
```
Solution: Check internet connection

**Invalid Domain**
```
Error: Only NIT Jalandhar accounts are allowed
```
Solution: Use @nitj.ac.in email

---

## Environment Setup

### Local Development
Firebase config is hardcoded in `lib/firebase.ts` (already set up)

### Production Deployment
For production, consider using environment variables:

1. Create `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCPoY53fAw2Wh39XNC2_F1DjYBIWDldbI4
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=driven-catalyst-487504-f5.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=driven-catalyst-487504-f5
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=driven-catalyst-487504-f5.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1052946637970
NEXT_PUBLIC_FIREBASE_APP_ID=1:1052946637970:web:c0b97602c9293730bdf24b
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-QLFHKS9FD5
```

2. Update `lib/firebase.ts`:
```typescript
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // ... etc
};
```

---

## Firebase Console Setup

### Enable Google Authentication
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: `driven-catalyst-487504-f5`
3. Navigate to **Authentication** → **Sign-in method**
4. Enable **Google** provider
5. Add authorized domain if deploying to production

### Configure OAuth Consent Screen
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select project
3. **APIs & Services** → **OAuth consent screen**
4. Configure app name, logo, support email
5. Add authorized domains

---

## Next Steps

### Recommended Enhancements

1. **User Profile Storage**
   - Create Firestore `/users/{uid}` collection
   - Store additional user info (name, roll number, branch)
   - Store on first login

2. **Role-Based Access Control**
   - Add user roles (student, club admin, super admin)
   - Different permissions for different roles

3. **Email Verification**
   - Verify email after sign-in (optional)
   - Send welcome email

4. **Account Linking**
   - Link multiple providers if needed
   - Phone authentication backup

5. **Analytics**
   - Track login events
   - Monitor failed login attempts
   - User engagement metrics

---

## Troubleshooting

### Authentication Not Working

**Check 1: Firebase SDK Installed**
```bash
npm list firebase
```

**Check 2: Firebase Initialized**
Look for console errors in browser DevTools

**Check 3: Auth Domain Configured**
Verify in Firebase Console → Authentication → Settings

**Check 4: Google Provider Enabled**
Firebase Console → Authentication → Sign-in method → Google

### Redirect Loop

**Cause**: ProtectedRoute redirecting while AuthContext is loading

**Solution**: Already handled with loading state check

### User Signed Out Unexpectedly

**Cause**: Email domain validation failing

**Solution**: Check `isAllowedDomain()` function

---

## Best Practices

1. ✅ **Never store credentials in code**
2. ✅ **Use environment variables for production**
3. ✅ **Validate domain on both client and server**
4. ✅ **Handle loading states properly**
5. ✅ **Provide clear error messages**
6. ✅ **Test with both valid and invalid accounts**
7. ✅ **Implement proper sign-out flow**
8. ✅ **Monitor authentication errors**

---

## Support

For Firebase-related issues:
- [Firebase Documentation](https://firebase.google.com/docs/auth)
- [Firebase Support](https://firebase.google.com/support)

For domain restriction issues:
- Contact NIT Jalandhar IT department
- Verify email domain spelling

---

**Status**: ✅ Authentication fully implemented and ready for testing
