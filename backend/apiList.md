
---

## Authentication

All protected routes require authentication using **JWT stored in HTTP-only cookies**.

---

## API LIST (ALL IN ONE PLACE)

---

### Auth APIs

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/auth/signup` | Register new user |
| POST | `/auth/login` | Login user |
| POST | `/auth/logout` | Logout user |
| GET  | `/auth/me` | Get logged-in user |

---

### Profile APIs

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/profile/view` | View own profile |
| PATCH | `/profile/edit` | Edit profile |
| PATCH | `/profile/password` | Change password |
| PATCH | `/profile/photo` | Update profile photo |

---

### Connection Request APIs

**Status Values**


ignored | interested | accepted | rejected


| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/request/send/interested/:userId` | Like a user |
| POST | `/request/send/ignored/:userId` | Ignore a user |
| POST | `/request/review/accepted/:requestId` | Accept request |
| POST | `/request/review/rejected/:requestId` | Reject request |

---

### User APIs

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/user/feed` | Get swipe feed |
| GET | `/user/requests` | Get incoming requests |
| GET | `/user/connections` | Get matched users |

---

### Match APIs

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/matches` | Get all matches |
| GET | `/matches/:matchId` | Get match details |
| DELETE | `/matches/:matchId` | Unmatch user |

---

### Chat APIs

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/chats/:matchId` | Get chat messages |
| POST | `/chats/:matchId` | Send message |
| DELETE | `/chats/message/:messageId` | Delete message |

---

### Safety APIs

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/block/:userId` | Block user |
| POST | `/report/:userId` | Report user |
| GET | `/blocked-users` | Get blocked users |

---

### Utility APIs

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/health` | Health check |
| POST | `/feedback` | Submit feedback |

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Cookie-based Sessions

---

## Rules & Notes

- Only matched users can chat.
- Blocked or ignored users never appear in feed.
- Duplicate requests are prevented.
- Passwords are stored using hashing.
- JWT is stored in HTTP-only cookies.

---

## Author

Mahesh Ramdas Gite
