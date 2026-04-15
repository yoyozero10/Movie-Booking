# Business Rules for CinemaVision Pro

> Version: 1.1  
> Updated: March 18, 2026  
> Project: CinemaVision Pro - Online Movie Ticket Booking System  
> Status: Aligned with current codebase (frontend + backend)

---

## 1) Alignment Review Result

The previous version (1.0) was **not fully complete** compared to the current project implementation.

Main gaps found and fixed in this version:
- Added missing rules for forgot/reset password flow.
- Added missing rules for booking cancellation and deletion constraints.
- Added missing rules for admin self-protection (cannot self-demote, cannot self-delete).
- Added API gateway rules now implemented in backend (rate limit, CORS, body size, health check).
- Added theater-region and localization rules implemented in frontend/backend.
- Corrected showtime conflict rule: current implementation enforces unique `(movieId, theaterId, date, startTime)`, not generic overlapping interval detection.
- Clarified payment reality: current production code uses simulated client-side payment UI and creates booking only after simulated success.
- Clarified input sanitization: utility exists and is used in profile update flow, not globally enforced on every field.

---

## 2) Business Rules Matrix (v1.1)

| ID | Rule Definition | Type | Static/Dynamic | Source |
|----|-----------------|------|----------------|--------|
| BR-1 | Movie must include: title, description, genre, duration, rating, posterUrl, releaseDate. | Constraint | Static | Product Owner |
| BR-2 | Movie duration must be >= 1 minute. | Constraint | Static | Product Owner |
| BR-3 | Movie rating must be in range 0..10. | Constraint | Static | Product Owner |
| BR-4 | Only admin can create, update, delete movies. | Constraint | Static | Security Policy |
| BR-5 | Theater must include: name, location, region, totalSeats. | Constraint | Static | Product Owner |
| BR-6 | Theater totalSeats must be >= 1. | Constraint | Static | Product Owner |
| BR-7 | Only admin can create, update, delete theaters. | Constraint | Static | Security Policy |
| BR-8 | Showtime must belong to exactly one movie and one theater. | Fact | Static | Product Owner |
| BR-9 | Showtime must include: date, startTime, price, availableSeats. | Constraint | Static | Product Owner |
| BR-10 | Showtime price must be >= 0. | Constraint | Static | Product Owner |
| BR-11 | For a theater/movie/date/time slot, showtime must be unique. | Constraint | Dynamic | System Architect |
| BR-12 | If availableSeats is not provided when creating showtime, default to theater.totalSeats. | Action | Dynamic | System Architect |
| BR-13 | Only admin can create, update, delete showtimes. | Constraint | Static | Security Policy |
| BR-14 | Booking must reference exactly one user and one showtime. | Fact | Static | Product Owner |
| BR-15 | Booking must contain at least one selected seat. | Constraint | Static | Product Owner |
| BR-16 | Booking status enum is: confirmed, cancelled, refunded (default: confirmed). | Fact | Static | System Architect |
| BR-17 | Booking reference must be unique system-wide. | Constraint | Dynamic | System Architect |
| BR-18 | On duplicate booking reference collision, server retries with a regenerated reference. | Action | Dynamic | System Architect |
| BR-19 | Booking creation requires authenticated user. | Constraint | Static | Security Policy |
| BR-20 | Server recalculates total booking price as `seatCount * showtime.price` and does not trust client totalPrice. | Computation | Dynamic | System Architect |
| BR-21 | Booking cannot be created if showtime does not exist. | Constraint | Dynamic | Product Owner |
| BR-22 | Booking cannot be created if showtime.availableSeats < requested seats. | Constraint | Dynamic | Product Owner |
| BR-23 | Booking cannot be created if any requested seat is already confirmed in another booking of the same showtime. | Constraint | Dynamic | System Architect |
| BR-24 | On successful booking creation, showtime.availableSeats is decremented by selected seat count. | Action | Dynamic | System Architect |
| BR-25 | User can cancel only their own booking. | Constraint | Dynamic | Security Policy |
| BR-26 | Cancelling a booking changes status to cancelled and returns seat count to showtime.availableSeats. | Action | Dynamic | Product Owner |
| BR-27 | User can delete only their own booking and only when status is cancelled. | Constraint | Dynamic | Product Owner |
| BR-28 | Endpoint to query booked seats by showtime is public and returns seats from confirmed bookings only. | Fact | Static | Product Owner |
| BR-29 | User email must be unique. | Constraint | Static | Security Policy |
| BR-30 | User password minimum length is 6. | Constraint | Static | Security Policy |
| BR-31 | User role enum is: user, admin (default: user). | Fact | Static | Security Policy |
| BR-32 | Password is hashed with bcrypt before save. | Constraint | Dynamic | Security Policy |
| BR-33 | Register fails when email already exists. | Constraint | Dynamic | Security Policy |
| BR-34 | Login succeeds only with valid email/password pair. | Constraint | Dynamic | Security Policy |
| BR-35 | JWT is issued at login/register with configurable expiry (`JWT_EXPIRES_IN`, default 7d). | Fact | Dynamic | System Architect |
| BR-36 | Protected APIs require `Authorization: Bearer <token>`. | Constraint | Static | System Architect |
| BR-37 | Invalid/missing/expired token returns HTTP 401. | Action | Dynamic | System Architect |
| BR-38 | Authenticated user can read and update only their own profile via profile endpoints. | Constraint | Static | Security Policy |
| BR-39 | Change password requires currentPassword + newPassword; new password must differ from current one. | Constraint | Dynamic | Security Policy |
| BR-40 | Forgot-password always returns generic success message for unknown emails to prevent account enumeration. | Constraint | Dynamic | Security Policy |
| BR-41 | Reset-password token is random, stored hashed, and expires after 1 hour. | Constraint | Dynamic | Security Policy |
| BR-42 | Admin routes require authenticated admin role. | Constraint | Static | Security Policy |
| BR-43 | Non-admin access to admin routes is denied with HTTP 403. | Action | Dynamic | Security Policy |
| BR-44 | Admin can view dashboard stats, all users, all bookings. | Fact | Static | Product Owner |
| BR-45 | Admin can update user role but cannot self-demote from admin to user. | Constraint | Dynamic | Security Policy |
| BR-46 | Admin can delete user but cannot delete own account. | Constraint | Dynamic | Security Policy |
| BR-47 | Admin can update booking status only to confirmed/cancelled. | Constraint | Dynamic | Product Owner |
| BR-48 | API is protected by global rate limit: max 1000 requests/IP per 15 minutes. | Constraint | Dynamic | System Architect |
| BR-49 | API allows CORS only from configured frontend origin (`FRONTEND_URL`). | Constraint | Static | Security Policy |
| BR-50 | JSON request body size is limited to 10MB. | Constraint | Static | System Architect |
| BR-51 | System exposes health endpoint at `/api/health`. | Fact | Static | System Architect |
| BR-52 | Unknown backend route returns HTTP 404 with `Route not found`. | Action | Dynamic | System Architect |
| BR-53 | Frontend stores JWT token in localStorage and includes it in API requests. | Fact | Static | System Architect |
| BR-54 | Frontend restricts access to booking/profile/admin UI for unauthenticated users; admin screens require admin role. | Constraint | Dynamic | Product Owner |
| BR-55 | Frontend supports EN/VI language switch; language preference is persisted in localStorage. | Fact | Static | Product Owner |
| BR-56 | Currency auto-switches by language (VI->VND, EN->USD) and is stored in localStorage. | Fact | Dynamic | Product Owner |
| BR-57 | Frontend has custom 404 page with Home navigation action. | Fact | Static | Product Owner |
| BR-58 | Current payment implementation is simulated on frontend (ATM/Momo/ZaloPay/VNPay UI); booking is finalized only after simulated success callback. | Fact | Dynamic | System Architect |
| BR-59 | ATM payment form requires cardNumber, cardName, expiryDate, CVV with client-side format checks. | Constraint | Dynamic | Product Owner |
| BR-60 | Input sanitization utility exists; currently applied in profile update flow (not globally enforced across all inputs). | Fact | Static | Security Policy |

---

## 3) Traceability to Implemented Modules

- Authentication and profile: `backend/server/controllers/authController.js`, `backend/server/middleware/auth.js`, `frontend/src/lib/auth.tsx`
- Authorization and admin guard: `backend/server/middleware/adminAuth.js`, `backend/server/routes/adminRoutes.js`, `frontend/src/components/ProtectedRoute.tsx`
- Movies: `backend/server/models/Movie.js`, `backend/server/controllers/movieController.js`, `backend/server/routes/movies.js`
- Theaters and regions: `backend/server/models/Theater.js`, `backend/server/controllers/theaterController.js`, `backend/server/routes/theaters.js`
- Showtimes: `backend/server/models/Showtime.js`, `backend/server/routes/showtimes.js`
- Booking flow: `backend/server/models/Booking.js`, `backend/server/controllers/bookingController.js`, `backend/server/routes/bookings.js`, `frontend/src/components/SeatSelection.tsx`
- Payment UI simulation: `frontend/src/components/PaymentModal.tsx`
- Platform-level API policies: `backend/server/server.js`
- Localization and currency: `frontend/src/lib/i18n.ts`, `frontend/src/lib/LocaleContext.tsx`, `frontend/src/lib/currency.ts`
- 404 UX: `frontend/src/components/NotFound.tsx`

---

## 4) Notes for Next Revision

These are recommended for the next rule revision if the team upgrades implementation:
- Add server-side payment gateway verification and webhook confirmation rules.
- Add explicit policy for cancelling only before showtime start time.
- Add standardized input sanitization/validation enforcement at backend middleware level.
- Add audit log rules for admin actions (role updates, user deletion, booking status updates).

---

Author: CinemaVision Pro - Group 7  
Last Updated: March 18, 2026
