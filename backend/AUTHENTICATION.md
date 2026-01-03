# Authentication System Documentation

## Overview

The Chinese Writing Coach backend now has a complete JWT-based authentication system. All protected endpoints require a valid JWT token in the Authorization header.

## Features Implemented

### 1. Password Security
- Passwords are hashed using bcrypt before storage
- Plain text passwords are never stored in the database
- Secure password verification on login

### 2. JWT Token Authentication
- Access tokens expire after 24 hours (configurable)
- Tokens are signed using HS256 algorithm
- Tokens contain user ID for identification

### 3. Protected Endpoints
All essay and draft endpoints now require authentication:
- Users can only access their own data
- Proper 401 (Unauthorized) and 403 (Forbidden) responses

## API Endpoints

### Authentication Endpoints

#### Register New User
```
POST /api/users/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "password": "securepassword123",
  "target_hsk_level": 3,
  "preferred_language": "en"
}

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username",
    ...
  }
}
```

#### Login
```
POST /api/users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    ...
  }
}
```

#### Get Current User Info
```
GET /api/users/me
Authorization: Bearer <token>

Response:
{
  "id": "uuid",
  "email": "user@example.com",
  "username": "username",
  ...
}
```

### Protected Endpoints

All the following endpoints require the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

#### Essays
- `POST /api/essays/submit` - Submit essay for analysis
- `GET /api/essays` - Get user's essays
- `GET /api/essays/{essay_id}` - Get specific essay
- `GET /api/essays/{essay_id}/analysis` - Get essay analysis
- `DELETE /api/essays/{essay_id}` - Delete essay

#### Drafts
- `POST /api/drafts` - Create draft
- `GET /api/drafts` - Get user's drafts
- `GET /api/drafts/{draft_id}` - Get specific draft
- `PUT /api/drafts/{draft_id}` - Update draft
- `DELETE /api/drafts/{draft_id}` - Delete draft

#### User Settings
- `PUT /api/users/me/settings` - Update user settings

## Frontend Integration

### 1. Store Token After Login/Registration
```javascript
// After successful login or registration
const response = await fetch('/api/users/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

const data = await response.json();
// Store token in localStorage or state management
localStorage.setItem('access_token', data.access_token);
```

### 2. Include Token in Protected Requests
```javascript
const token = localStorage.getItem('access_token');

const response = await fetch('/api/essays/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(essayData)
});
```

### 3. Handle Authentication Errors
```javascript
if (response.status === 401) {
  // Token expired or invalid - redirect to login
  localStorage.removeItem('access_token');
  window.location.href = '/login';
}

if (response.status === 403) {
  // Forbidden - user doesn't have access to this resource
  alert('You do not have permission to access this resource');
}
```

## Environment Setup

### Generate Secure Secret Key

Before deploying to production, generate a secure secret key:

```bash
# Using OpenSSL
openssl rand -hex 32

# Or using Python
python -c "import secrets; print(secrets.token_hex(32))"
```

Add this to your `.env` file:

```
SECRET_KEY=<your_generated_secret_key>
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

## Security Considerations

1. **HTTPS Required**: Always use HTTPS in production to protect tokens in transit
2. **Secret Key**: Never commit your secret key to version control
3. **Token Storage**: Store tokens securely in the frontend (httpOnly cookies recommended for production)
4. **Password Requirements**: Consider adding password strength requirements in production
5. **Rate Limiting**: Consider adding rate limiting to prevent brute force attacks

## Testing Authentication

### Using cURL

```bash
# Register
curl -X POST http://localhost:8000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","username":"testuser","password":"testpass123","target_hsk_level":3}'

# Login
curl -X POST http://localhost:8000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}'

# Use token in protected endpoint
curl -X GET http://localhost:8000/api/essays \
  -H "Authorization: Bearer <your_token_here>"
```

### Using FastAPI Docs

1. Go to `http://localhost:8000/docs`
2. Click on the "Authorize" button (lock icon)
3. Enter your token in the format: `Bearer <your_token>`
4. Click "Authorize"
5. Now all protected endpoints will include the token automatically

## Files Modified

1. **backend/app/auth.py** (NEW) - Authentication utilities
2. **backend/app/api/users.py** - User registration, login, and settings
3. **backend/app/api/essays.py** - Protected essay endpoints
4. **backend/app/api/drafts.py** - Protected draft endpoints
5. **backend/app/config.py** - JWT configuration
6. **backend/requirements.txt** - Added auth dependencies

## Next Steps

1. Update frontend to handle authentication flow
2. Add refresh token mechanism for better security (optional)
3. Implement password reset functionality (optional)
4. Add email verification (optional)
5. Implement social authentication (optional)
