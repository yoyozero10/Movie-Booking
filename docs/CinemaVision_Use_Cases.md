# Use Case Document

## for

# CinemaVision Pro
### Movie Booking Website
### Release 1.0

**Version 1.0 approved**

---

**Prepared by:**
- Tran Dai Thang – 23521432
- Doan Duc Trung – 23521674
- Le Nguyen Hung – 22520507
- Le Nguyen Khang – 23520689

**University of Information Technology**
**Faculty of Software Technology**

**December 21, 2025**

---

## Revision History

| Name | Date | Reason For Changes | Version |
|------|------|-------------------|---------|
| Tran Dai Thang | 12/03/25 | Initial draft | 1.0 draft 1 |
| Tran Dai Thang | 12/21/25 | Baseline following changes after inspection | 1.0 approved |

---

## Primary Actors and Use Cases Overview

| Primary Actor | Use Cases |
|---------------|-----------|
| **Admin** | 1. Admin manages movie catalog<br>2. Admin manages theaters<br>3. Admin manages showtimes<br>4. Admin manages users<br>5. Admin monitors all bookings |
| **Guest** | 6. Guest views movie list<br>7. Guest searches movies<br>8. Guest views movie details |
| **User** | 9. User registers account<br>10. User logs in<br>11. User logs out<br>12. User selects showtime<br>13. User selects seats<br>14. User completes payment<br>15. User views booking history<br>16. User updates profile |
| **System** | 17. System validates session<br>18. System protects routes<br>19. System prevents XSS attacks<br>20. System validates API tokens |

---

## UC-1: Admin Manages Movie Catalog

| Field | Specification |
|-------|---------------|
| **ID and Name** | UC-1 Admin manages movie catalog |
| **Created By** | Tran Dai Thang |
| **Date Created** | 12/03/25 |
| **Primary Actor** | Admin |
| **Secondary Actors** | Movie Service, Database |
| **Description** | Admin manages the movie catalog by creating, updating, or deleting movies and maintaining their metadata (title, description, genre, duration, rating, poster, trailer). |
| **Trigger** | Admin selects the Movies tab from the admin dashboard. |
| **Preconditions** | PRE-1. Admin is authenticated into the system.<br>PRE-2. Admin has role = "admin". |
| **Postconditions** | POST-1. Movie entries are stored with the requested changes.<br>POST-2. Movies are visible to guests and users on the public site.<br>POST-3. Deleted movies are removed from public listings. |
| **Normal Flow** | 1.0 Maintain movie catalog<br>1. Admin opens the Admin Dashboard and clicks Movies tab.<br>2. System displays a list of movies with search functionality.<br>3. Admin clicks "Add" button.<br>4. Admin enters movie details: title, description, genre, duration, rating, release date, poster URL, trailer URL, director, cast.<br>5. System validates the input.<br>6. System creates the movie and shows it in the list.<br>7. Admin may select an existing movie to edit.<br>8. System validates edited values and saves changes.<br>9. Admin may delete a movie by clicking Delete button.<br>10. System removes movie from database. |
| **Alternative Flows** | 1.1 Edit existing movie<br>1. Admin clicks Edit on a movie card.<br>2. Form opens with pre-filled data.<br>3. Admin modifies fields and clicks Save.<br>4. System validates and saves changes. |
| **Exceptions** | 1.0.E1 Invalid movie data<br>1. System detects missing required fields.<br>2. System highlights invalid fields and shows error.<br>3. Admin corrects data and resubmits. |
| **Priority** | High |
| **Frequency of Use** | Used regularly by Admins when adding new movies. |
| **Business Rules** | BR-1: Movie must have title, genre, and duration.<br>BR-2: Rating must be between 0 and 10. |

---

## UC-2: Admin Manages Theaters

| Field | Specification |
|-------|---------------|
| **ID and Name** | UC-2 Admin manages theaters |
| **Primary Actor** | Admin |
| **Description** | Admin manages theater information including name, location, and seat configuration. |
| **Trigger** | Admin selects Theaters tab from admin dashboard. |
| **Preconditions** | PRE-1. Admin is authenticated with admin role. |
| **Postconditions** | POST-1. Theater information is stored in database.<br>POST-2. Theaters are available for showtime creation. |
| **Normal Flow** | 1. Admin opens Theaters tab.<br>2. System displays list of theaters.<br>3. Admin adds/edits/deletes theater information.<br>4. System validates and saves changes. |
| **Priority** | High |

---

## UC-3: Admin Manages Showtimes

| Field | Specification |
|-------|---------------|
| **ID and Name** | UC-3 Admin manages showtimes |
| **Primary Actor** | Admin |
| **Description** | Admin creates and manages showtimes linking movies to theaters with specific dates and times. |
| **Trigger** | Admin selects Showtimes tab from admin dashboard. |
| **Preconditions** | PRE-1. Admin is authenticated.<br>PRE-2. Movies and theaters exist in system. |
| **Postconditions** | POST-1. Showtimes are stored and available for booking.<br>POST-2. Seat availability is initialized for each showtime. |
| **Normal Flow** | 1. Admin opens Showtimes tab.<br>2. System displays existing showtimes.<br>3. Admin creates showtime by selecting movie, theater, date, time, and price.<br>4. System validates no time conflicts exist.<br>5. System creates showtime with available seats. |
| **Exceptions** | 1.0.E1 Time conflict<br>1. System detects overlapping showtime in same theater.<br>2. System shows error and prevents creation. |
| **Priority** | High |

---

## UC-4: User Registers Account

| Field | Specification |
|-------|---------------|
| **ID and Name** | UC-4 User registers account |
| **Primary Actor** | Guest |
| **Secondary Actors** | Authentication Service |
| **Description** | A guest creates a new account to access booking features. |
| **Trigger** | Guest clicks Login button and selects "Sign up instead". |
| **Preconditions** | PRE-1. Guest is not logged in.<br>PRE-2. Email is not already registered. |
| **Postconditions** | POST-1. New user account is created.<br>POST-2. User is automatically logged in.<br>POST-3. JWT token is stored in localStorage. |
| **Normal Flow** | 1. Guest clicks Login button.<br>2. System displays login modal.<br>3. Guest clicks "Sign up instead".<br>4. Guest enters email and password.<br>5. Guest clicks "Sign up".<br>6. System validates email format and password strength.<br>7. System creates account and generates JWT token.<br>8. Modal closes and user is logged in. |
| **Alternative Flows** | None |
| **Exceptions** | 1.0.E1 Email already exists<br>1. System detects email is registered.<br>2. System shows "User already exists" message.<br>3. Form remains open for correction. |
| **Priority** | High |

---

## UC-5: User Logs In

| Field | Specification |
|-------|---------------|
| **ID and Name** | UC-5 User logs in |
| **Primary Actor** | Guest |
| **Description** | User logs into the system using email and password. |
| **Trigger** | User clicks Login button on navigation. |
| **Preconditions** | PRE-1. User has an existing account.<br>PRE-2. Account is not disabled. |
| **Postconditions** | POST-1. JWT token is created and stored.<br>POST-2. UI updates to show logged-in state.<br>POST-3. Logout button appears in navigation. |
| **Normal Flow** | 1. User clicks Login button.<br>2. System displays login modal with email and password fields.<br>3. User enters credentials and clicks "Sign in".<br>4. System validates credentials.<br>5. System creates JWT session.<br>6. Modal closes and navigation shows Logout button. |
| **Exceptions** | 1.0.E1 Invalid credentials<br>1. System detects wrong email or password.<br>2. System shows "Invalid email or password".<br>3. Form remains open for retry. |
| **Priority** | High |

---

## UC-6: User Logs Out

| Field | Specification |
|-------|---------------|
| **ID and Name** | UC-6 User logs out |
| **Primary Actor** | User |
| **Description** | User logs out of the system. |
| **Trigger** | User clicks Logout button. |
| **Preconditions** | PRE-1. User is currently logged in. |
| **Postconditions** | POST-1. JWT token is removed.<br>POST-2. User returns to guest state.<br>POST-3. Login button appears in navigation. |
| **Normal Flow** | 1. User clicks Logout button.<br>2. System clears JWT token from localStorage.<br>3. UI updates to show guest state.<br>4. Login button appears in navigation. |
| **Priority** | High |

---

## UC-7: Guest Views Movie List

| Field | Specification |
|-------|---------------|
| **ID and Name** | UC-7 Guest views movie list |
| **Primary Actor** | Guest, User |
| **Description** | Visitor views the list of available movies on the homepage. |
| **Trigger** | Visitor opens the homepage. |
| **Preconditions** | PRE-1. Movies exist in database. |
| **Postconditions** | POST-1. Movie list is displayed as cards.<br>POST-2. Each card shows poster, title, and rating. |
| **Normal Flow** | 1. Visitor opens homepage.<br>2. System fetches movies from API.<br>3. System displays movie cards in grid layout.<br>4. Each card shows poster, title, and rating.<br>5. Visitor can click any card to view details. |
| **Priority** | High |

---

## UC-8: Guest Searches Movies

| Field | Specification |
|-------|---------------|
| **ID and Name** | UC-8 Guest searches movies |
| **Primary Actor** | Guest, User |
| **Description** | User searches for movies by title. |
| **Trigger** | User clicks search icon and enters keyword. |
| **Preconditions** | PRE-1. Homepage is loaded. |
| **Postconditions** | POST-1. Movie list is filtered by search term. |
| **Normal Flow** | 1. User clicks search icon.<br>2. Search input appears.<br>3. User enters movie title.<br>4. System filters movie list in real-time.<br>5. Only matching movies are displayed. |
| **Priority** | Medium |

---

## UC-9: Guest Views Movie Details

| Field | Specification |
|-------|---------------|
| **ID and Name** | UC-9 Guest views movie details |
| **Primary Actor** | Guest, User |
| **Description** | Visitor views detailed information about a specific movie. |
| **Trigger** | Visitor clicks on a movie card. |
| **Preconditions** | PRE-1. Movie exists in database. |
| **Postconditions** | POST-1. Movie detail page is displayed.<br>POST-2. Book Tickets button is visible. |
| **Normal Flow** | 1. Visitor clicks movie card.<br>2. System navigates to movie detail page.<br>3. System displays: title, poster, storyline, trailer, genre, duration, rating, director, cast.<br>4. Book Tickets button is shown. |
| **Priority** | High |

---

## UC-10: User Selects Showtime

| Field | Specification |
|-------|---------------|
| **ID and Name** | UC-10 User selects showtime |
| **Primary Actor** | User |
| **Description** | User selects a showtime for booking tickets. |
| **Trigger** | User clicks "Book Tickets" on movie detail page. |
| **Preconditions** | PRE-1. User is logged in.<br>PRE-2. Showtimes exist for the movie. |
| **Postconditions** | POST-1. Showtime is selected.<br>POST-2. User is redirected to seat selection. |
| **Normal Flow** | 1. User clicks "Book Tickets".<br>2. System displays available showtimes.<br>3. User selects date and time.<br>4. System redirects to seat selection page. |
| **Exceptions** | 1.0.E1 No showtimes available<br>1. System shows message "No showtimes available". |
| **Priority** | High |

---

## UC-11: User Selects Seats

| Field | Specification |
|-------|---------------|
| **ID and Name** | UC-11 User selects seats |
| **Primary Actor** | User |
| **Description** | User selects seats from the seat map. |
| **Trigger** | After selecting showtime. |
| **Preconditions** | PRE-1. Showtime is selected.<br>PRE-2. Available seats exist. |
| **Postconditions** | POST-1. Selected seats are marked.<br>POST-2. Total price is calculated. |
| **Normal Flow** | 1. System displays seat map.<br>2. Available seats are clickable, booked seats are disabled.<br>3. User clicks on available seats.<br>4. Seats change to "selected" state.<br>5. Total price updates automatically.<br>6. User clicks "Proceed to Payment". |
| **Exceptions** | 1.0.E1 Seat already booked<br>1. System prevents clicking booked seats.<br>2. Booked seats are visually disabled. |
| **Priority** | High |

---

## UC-12: User Completes Payment

| Field | Specification |
|-------|---------------|
| **ID and Name** | UC-12 User completes payment |
| **Primary Actor** | User |
| **Description** | User completes payment for selected tickets. |
| **Trigger** | User clicks "Proceed to Payment". |
| **Preconditions** | PRE-1. At least one seat is selected.<br>PRE-2. Total price > 0. |
| **Postconditions** | POST-1. Booking is created in database.<br>POST-2. Seats are marked as booked.<br>POST-3. Confirmation is shown to user. |
| **Normal Flow** | 1. System displays payment modal with 4 methods: Momo, ZaloPay, VNPay, ATM.<br>2. User selects payment method.<br>3. For ATM: user enters card details.<br>4. User clicks "Thanh Toán".<br>5. System processes payment.<br>6. System creates booking record.<br>7. Success message is displayed. |
| **Alternative Flows** | 1.1 Momo/ZaloPay/VNPay Payment<br>1. User selects wallet option.<br>2. User clicks pay button.<br>3. Payment processes instantly. |
| **Exceptions** | 1.0.E1 Payment failed<br>1. System shows error message.<br>2. Modal remains open for retry. |
| **Priority** | High |

---

## UC-13: User Views Booking History

| Field | Specification |
|-------|---------------|
| **ID and Name** | UC-13 User views booking history |
| **Primary Actor** | User |
| **Description** | User views list of past bookings. |
| **Trigger** | User navigates to Profile page. |
| **Preconditions** | PRE-1. User is logged in. |
| **Postconditions** | POST-1. Booking history is displayed. |
| **Normal Flow** | 1. User navigates to Profile.<br>2. System displays booking history.<br>3. Each booking shows movie, date, seats, and total. |
| **Priority** | Medium |

---

## UC-14: User Updates Profile

| Field | Specification |
|-------|---------------|
| **ID and Name** | UC-14 User updates profile |
| **Primary Actor** | User |
| **Description** | User updates personal information. |
| **Trigger** | User clicks "Edit Profile". |
| **Preconditions** | PRE-1. User is logged in. |
| **Postconditions** | POST-1. Profile information is updated. |
| **Normal Flow** | 1. User clicks "Edit Profile".<br>2. Modal opens with current information.<br>3. User modifies name.<br>4. User clicks "Save Changes".<br>5. System updates profile.<br>6. Success message displayed. |
| **Priority** | Medium |

---

## UC-15: System Validates Session

| Field | Specification |
|-------|---------------|
| **ID and Name** | UC-15 System validates session |
| **Primary Actor** | System |
| **Description** | System checks JWT token validity on protected routes. |
| **Trigger** | User attempts to access protected page. |
| **Preconditions** | PRE-1. JWT token exists in localStorage. |
| **Postconditions** | POST-1. If valid: access granted.<br>POST-2. If expired: token cleared, redirect to login. |
| **Normal Flow** | 1. User accesses protected route.<br>2. System checks JWT token.<br>3. If valid, access is granted.<br>4. If expired, token is cleared and user redirected. |
| **Priority** | High |

---

## UC-16: System Protects Routes

| Field | Specification |
|-------|---------------|
| **ID and Name** | UC-16 System protects routes |
| **Primary Actor** | System |
| **Description** | System prevents unauthorized access to admin/protected pages. |
| **Trigger** | Guest attempts to access /admin. |
| **Preconditions** | PRE-1. User is not logged in or not admin. |
| **Postconditions** | POST-1. Access denied message shown. |
| **Normal Flow** | 1. Guest navigates to /admin.<br>2. System checks authentication.<br>3. System shows "Access Denied" message. |
| **Priority** | High |

---

## UC-17: System Displays 404 Page

| Field | Specification |
|-------|---------------|
| **ID and Name** | UC-17 System displays 404 page |
| **Primary Actor** | System |
| **Description** | System shows 404 page for non-existent routes. |
| **Trigger** | User navigates to unknown URL. |
| **Postconditions** | POST-1. 404 page with home button displayed. |
| **Normal Flow** | 1. User enters invalid URL.<br>2. System shows "Page not found".<br>3. Home button is available. |
| **Priority** | Low |

---

## UC-18: System Prevents XSS Attacks

| Field | Specification |
|-------|---------------|
| **ID and Name** | UC-18 System prevents XSS attacks |
| **Primary Actor** | System |
| **Description** | System sanitizes all user input to prevent XSS. |
| **Trigger** | User submits form with potential script. |
| **Postconditions** | POST-1. Scripts are not executed.<br>POST-2. Data is escaped before rendering. |
| **Normal Flow** | 1. User enters script in input field.<br>2. System sanitizes input.<br>3. Script is escaped and not executed. |
| **Priority** | High |

---

## UC-19: System Validates API Tokens

| Field | Specification |
|-------|---------------|
| **ID and Name** | UC-19 System validates API tokens |
| **Primary Actor** | System |
| **Description** | API endpoints reject requests without valid tokens. |
| **Trigger** | Client calls protected API without token. |
| **Postconditions** | POST-1. 401 Unauthorized returned. |
| **Normal Flow** | 1. Client calls protected endpoint.<br>2. System checks Authorization header.<br>3. If missing/invalid, return 401.<br>4. Client shows login form. |
| **Priority** | High |

---

> **Author:** CinemaVision Pro - Group 7  
> **Last Updated:** December 21, 2025
