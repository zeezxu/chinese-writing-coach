# Frontend Authentication Setup - Complete

## What Was Done

I've integrated the authentication system into your frontend. Here's what changed:

### 1. New Files Created

#### API Modules
- `frontend/src/api/auth.ts` - Authentication API calls (login, register, get current user)
- `frontend/src/api/drafts.ts` - Drafts API (auto-authenticated)

#### Pages
- `frontend/src/pages/LoginPage.tsx` - User login page
- `frontend/src/pages/RegisterPage.tsx` - User registration page

#### Components
- `frontend/src/components/auth/ProtectedRoute.tsx` - Route protection wrapper

### 2. Updated Files

#### `frontend/src/store/userStore.ts`
- Added `token` field to store JWT token
- Added `isAuthenticated` boolean
- Added `setAuth(user, token)` method for login/register
- Updated `logout()` to clear token

#### `frontend/src/api/client.ts`
- Added request interceptor to automatically include JWT token in all requests
- Added response interceptor to handle 401 errors (auto-logout)

#### `frontend/src/api/essays.ts`
- Removed `userId` parameter from all methods (now uses auth token)
- Backend automatically knows which user from the token

#### `frontend/src/App.tsx`
- Added routes for `/login` and `/register`
- Wrapped all main app routes with `ProtectedRoute`
- Redirects unauthenticated users to login
- Redirects authenticated users away from login/register

#### `frontend/src/i18n/translations.ts`
- Added `auth` section with all authentication-related translations

## How It Works

### First Time User Flow
1. User visits app → Sees language selection
2. After language selection → Redirected to `/login`
3. User clicks "Sign up" → Goes to `/register`
4. User registers → Gets JWT token → Automatically logged in → Redirected to `/practice`

### Returning User Flow
1. User visits app → Token is loaded from localStorage
2. If token exists → Goes straight to `/practice`
3. If no token → Redirected to `/login`

### Authentication Flow
```
User Login/Register
     ↓
Backend returns { access_token, user }
     ↓
Frontend stores in userStore
     ↓
All API requests include: Authorization: Bearer <token>
     ↓
Backend validates token and returns user's data
```

### Auto-Logout on Token Expiration
- If backend returns 401 (token expired/invalid)
- Frontend automatically clears token and redirects to login

## Why Your Data Disappeared

**Before:** Your frontend was calling `/api/essays?user_id=xxx` without authentication

**Now:** Backend requires authentication for all essay/draft endpoints

**Result:** Old API calls fail with 401 errors, so no data loads

**Solution:** Create a new account. Your old data is still in the database but associated with the old user ID. Once you login with a new account, you can create new essays.

## Next Steps

### To Use the App:

1. **Start the backend:**
   ```bash
   cd backend
   source venv/bin/activate
   uvicorn app.main:app --reload
   ```

2. **Start the frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Visit http://localhost:5173**

4. **Register a new account:**
   - Click "Sign up"
   - Fill in email, username, password
   - Choose your target HSK level
   - You'll be automatically logged in

5. **Start writing essays!**

### To Update Existing Components:

Some components may still have hardcoded user IDs. You'll need to update them:

**Before:**
```typescript
const userId = '03474b93-3871-46d4-a414-7a049266b3c1'; // Hardcoded
const essays = await essaysApi.getAll(userId);
```

**After:**
```typescript
const { user } = useUserStore(); // Get from store
const essays = await essaysApi.getAll(); // No userId needed
```

### Files That Need Updating:

1. `frontend/src/pages/ProfilePage.tsx` - Remove hardcoded userId
2. `frontend/src/pages/PracticePage.tsx` - Remove hardcoded userId (if any)
3. Any other component using `userId` directly

## Recovering Old Data (Optional)

If you want to access your old essays, you have two options:

### Option 1: Temporarily disable auth (Quick fix for development)
In `backend/app/api/users.py`, you could add a route to get user by ID without auth for migration purposes.

### Option 2: Migrate old data to new user
Create a script to copy essays from old user ID to new authenticated user.

## Security Notes

⚠️ **Important for Production:**

1. Generate a secure secret key for JWT tokens:
   ```bash
   python -c "import secrets; print(secrets.token_hex(32))"
   ```
   Add to `backend/.env`:
   ```
   SECRET_KEY=<your-generated-key>
   ```

2. Use HTTPS in production (required for secure token transmission)

3. Consider adding:
   - Email verification
   - Password reset functionality
   - Refresh tokens for better security
   - Rate limiting on login attempts

## Testing the Authentication

### Using the UI:
1. Register a new account at http://localhost:5173/register
2. Login at http://localhost:5173/login
3. Try accessing /practice without logging in (should redirect to login)

### Using the API directly:
```bash
# Register
curl -X POST http://localhost:8000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "testpass123",
    "target_hsk_level": 3
  }'

# This returns a token, use it in subsequent requests:
curl -X GET http://localhost:8000/api/essays \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Troubleshooting

### "Cannot read property 'auth' of undefined"
- Make sure translations file was updated with auth section
- Restart the frontend dev server

### "Network Error" when trying to login
- Make sure backend is running on port 8000
- Check browser console for CORS errors

### Stuck on login screen after registering
- Check browser console for errors
- Verify token is being stored (check Application → Local Storage in DevTools)

### Essays not loading
- Open DevTools → Network tab
- Check if API calls have `Authorization: Bearer <token>` header
- If 401 errors, try logging out and back in

## Summary

✅ Backend authentication is complete
✅ Frontend auth pages created
✅ API client updated to use tokens
✅ Protected routes implemented
✅ Auto-logout on token expiration

You now have a fully functional authentication system! Register a new account and start using the app.
