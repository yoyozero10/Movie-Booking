# Test Case Specification

## for

# CinemaVision Pro
### Movie Booking Website
### Release 1.0

**Version 1.0 approved**

**Prepared by:**
- Tran Dai Thang – 23521432
- Doan Duc Trung – 23521674
- Le Nguyen Hung – 22520507
- Le Nguyen Khang – 23520689

**University of Information Technology**
**Faculty of Software Technology**

**December 21, 2024**

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Test Case Summary](#2-test-case-summary)
3. [Authentication Module [AUTH]](#3-authentication-module-auth)
4. [Movie Module [MOVIE]](#4-movie-module-movie)
5. [Booking Module [BOOKING]](#5-booking-module-booking)
6. [Payment Module [PAYMENT]](#6-payment-module-payment)
7. [Admin Module [ADMIN]](#7-admin-module-admin)
8. [Profile Module [PROFILE]](#8-profile-module-profile)
9. [System Module [SYS]](#9-system-module-sys)
10. [Traceability Matrix](#10-traceability-matrix)

---

## Revision History

| Name | Date | Reason For Changes | Version |
|------|------|-------------------|---------|
| Tran Dai Thang | 12/15/24 | Initial draft | 1.0 draft 1 |
| Tran Dai Thang | 12/21/24 | Baseline following changes after inspection | 1.0 approved |

---

## 1. Introduction

This document specifies the test cases for CinemaVision Pro Release 1.0. Each test case is designed to verify specific functionality defined in the use case document and ensure compliance with business rules.

### 1.1. Purpose

The purpose of this document is to:
- Define detailed test cases for all modules
- Provide step-by-step test procedures
- Specify expected results for verification
- Enable traceability between requirements, use cases, and test cases

### 1.2. Scope

This specification covers:
- **System Test (Black-box):** 34 test cases across 7 modules
- **Integration Test (E2E):** End-to-end workflows using Playwright
- **Unit Test:** 68 test cases for utility functions

---

## 2. Test Case Summary

### 2.1. Test Cases by Module

| Module | Test Cases | Priority High | Priority Medium | Priority Low |
|--------|-----------|---------------|-----------------|--------------|
| 🔐 AUTH | 6 | 6 | 0 | 0 |
| 🎬 MOVIE | 3 | 2 | 1 | 0 |
| 🎟️ BOOKING | 5 | 5 | 0 | 0 |
| 💳 PAYMENT | 6 | 3 | 3 | 0 |
| 👨‍💼 ADMIN | 7 | 5 | 2 | 0 |
| 👤 PROFILE | 2 | 0 | 2 | 0 |
| 🔧 SYSTEM | 5 | 4 | 0 | 1 |
| **TOTAL** | **34** | **25** | **8** | **1** |

### 2.2. Test Case Status

| Status | Count | Percentage |
|--------|-------|------------|
| Passed | 28 | 82.4% |
| Failed | 4 | 11.8% |
| Skipped | 2 | 5.9% |
| **Total** | **34** | **100%** |

---

## 3. Authentication Module [AUTH]

### TC-AUTH-01: Verify Login Form Display

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-AUTH-01 |
| **Use Case** | UC-AUTH-01 |
| **Priority** | High |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - User is not logged in<br>- Website is loaded |
| **Test Data** | None |

**Test Steps:**
1. Navigate to homepage
2. Click "Login" button (data-testid="login-btn")
3. Observe modal display

**Expected Results:**
- Login modal appears
- Email input field is visible
- Password input field is visible
- "Sign in" button is visible
- "Sign up instead" button is visible

**Actual Result:** ✅ Pass

**Business Rules:** BR-9, BR-10

---

### TC-AUTH-02: Login Success

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-AUTH-02 |
| **Use Case** | UC-AUTH-02 |
| **Priority** | High |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - User account exists in system<br>- User is not logged in |
| **Test Data** | Email: `testuser@example.com`<br>Password: `password123` |

**Test Steps:**
1. Click "Login" button
2. Enter valid email
3. Enter correct password
4. Click "Sign in"
5. Wait for authentication

**Expected Results:**
- JWT token is created and stored in localStorage
- Login modal closes
- "Logout" button appears in navigation
- User is redirected to homepage

**Actual Result:** ✅ Pass

**Business Rules:** BR-9, BR-11, BR-12

---

### TC-AUTH-03: Login Failure (Wrong Password)

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-AUTH-03 |
| **Use Case** | UC-AUTH-03 |
| **Priority** | High |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - User account exists<br>- User is not logged in |
| **Test Data** | Email: `admin@cinemavision.com`<br>Password: `wrongpassword123` |

**Test Steps:**
1. Click "Login" button
2. Enter valid email
3. Enter incorrect password
4. Click "Sign in"

**Expected Results:**
- Error toast appears with message "Invalid email or password"
- Login modal remains open
- User is not logged in

**Actual Result:** ✅ Pass

**Business Rules:** BR-9, BR-10

---

### TC-AUTH-04: Register Success

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-AUTH-04 |
| **Use Case** | UC-AUTH-04 |
| **Priority** | High |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - Email is not registered<br>- User is not logged in |
| **Test Data** | Email: `newuser{timestamp}@test.com`<br>Password: `password123` |

**Test Steps:**
1. Click "Login" button
2. Click "Sign up instead"
3. Enter new email
4. Enter password
5. Click "Sign up"

**Expected Results:**
- New account is created in database
- User is automatically logged in
- JWT token is stored
- Login modal closes
- "Logout" button appears

**Actual Result:** ✅ Pass

**Business Rules:** BR-9, BR-10, BR-11

---

### TC-AUTH-05: Register Failure (Existing Email)

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-AUTH-05 |
| **Use Case** | UC-AUTH-05 |
| **Priority** | High |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - Email already exists in system |
| **Test Data** | Email: `admin@cinemavision.com`<br>Password: `password123` |

**Test Steps:**
1. Click "Login" button
2. Click "Sign up instead"
3. Enter existing email
4. Enter password
5. Click "Sign up"

**Expected Results:**
- Error toast appears with message "User already exists"
- Registration modal remains open
- No new account is created

**Actual Result:** ✅ Pass

**Business Rules:** BR-9

---

### TC-AUTH-06: Logout

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-AUTH-06 |
| **Use Case** | UC-AUTH-06 |
| **Priority** | High |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - User is logged in |
| **Test Data** | None |

**Test Steps:**
1. Verify user is logged in (Logout button visible)
2. Click "Logout" button (data-testid="logout-btn")
3. Observe UI changes

**Expected Results:**
- JWT token is removed from localStorage
- "Login" button appears
- "Logout" button disappears
- User returns to guest state

**Actual Result:** ✅ Pass

**Business Rules:** BR-11, BR-12

---

## 4. Movie Module [MOVIE]

### TC-MOVIE-01: Verify Movie List Display

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-MOVIE-01 |
| **Use Case** | UC-MOVIE-01 |
| **Priority** | High |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - Movies exist in database<br>- Homepage is loaded |
| **Test Data** | None |

**Test Steps:**
1. Navigate to homepage
2. Wait for page load
3. Observe movie cards

**Expected Results:**
- At least one movie card is visible
- Each card displays: poster, title, rating
- Cards are arranged in grid layout
- Cards are clickable

**Actual Result:** ✅ Pass

**Business Rules:** BR-1, BR-2

---

### TC-MOVIE-02: Search Movie Functionality

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-MOVIE-02 |
| **Use Case** | UC-MOVIE-02 |
| **Priority** | Medium |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - Movies exist in database<br>- Homepage is loaded |
| **Test Data** | Search term: First movie title from list |

**Test Steps:**
1. Click search icon (data-testid="search-toggle")
2. Enter movie title in search input
3. Wait for filter to apply
4. Observe results

**Expected Results:**
- Search input appears
- Movie list is filtered in real-time
- Only movies matching search term are displayed
- Non-matching movies are hidden

**Actual Result:** ✅ Pass

**Business Rules:** BR-1

---

### TC-MOVIE-03: View Movie Details

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-MOVIE-03 |
| **Use Case** | UC-MOVIE-03 |
| **Priority** | High |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - Movie exists in database<br>- Movie list is displayed |
| **Test Data** | Movie: First movie from list |

**Test Steps:**
1. Click on a movie card
2. Wait for navigation
3. Observe movie detail page

**Expected Results:**
- Page navigates to movie detail URL
- Movie title (h1) is displayed
- Storyline section is visible
- Trailer section is visible (if available)
- "Book Tickets" button is visible

**Actual Result:** ✅ Pass

**Business Rules:** BR-1, BR-2

---

## 5. Booking Module [BOOKING]

### TC-BOOKING-01: Select Showtime

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-BOOKING-01 |
| **Use Case** | UC-BOOKING-01 |
| **Priority** | High |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - User is logged in<br>- On movie detail page<br>- Showtimes exist |
| **Test Data** | User: Registered user<br>Movie: Any available movie |

**Test Steps:**
1. Login as user
2. Navigate to movie detail page
3. Click "Book Tickets"
4. Select a showtime
5. Observe navigation

**Expected Results:**
- Showtime selection interface appears
- Available showtimes are displayed
- After selection, page navigates to seat selection
- "Select Seats" heading is visible

**Actual Result:** ✅ Pass

**Business Rules:** BR-4, BR-5, BR-13

---

### TC-BOOKING-02: Display Seat Map

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-BOOKING-02 |
| **Use Case** | UC-BOOKING-02 |
| **Priority** | High |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - User selected showtime<br>- On seat selection page |
| **Test Data** | Showtime: Any available showtime |

**Test Steps:**
1. Complete TC-BOOKING-01
2. Observe seat map display
3. Check seat legend

**Expected Results:**
- Seat map is displayed in grid layout
- At least one seat is visible
- Seat legend shows: Available, Selected, Taken
- Seats have different visual states

**Actual Result:** ✅ Pass

**Business Rules:** BR-6, BR-7

---

### TC-BOOKING-03: Select Seats

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-BOOKING-03 |
| **Use Case** | UC-BOOKING-03 |
| **Priority** | High |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - Seat map is displayed<br>- Available seats exist |
| **Test Data** | Seats: Any available seats |

**Test Steps:**
1. Complete TC-BOOKING-02
2. Click on an available seat
3. Observe seat state change
4. Check total price update

**Expected Results:**
- Clicked seat changes to "selected" state
- Seat is marked with data-selected="true"
- Total price is displayed
- Total price updates correctly (seats × price)

**Actual Result:** ⏭️ Skipped (Flaky - timing issues)

**Business Rules:** BR-6, BR-8

---

### TC-BOOKING-04: Prevent Selecting Booked Seats

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-BOOKING-04 |
| **Use Case** | UC-BOOKING-04 |
| **Priority** | High |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - Seat map is displayed<br>- Booked seats exist |
| **Test Data** | Seats: Booked seats in showtime |

**Test Steps:**
1. Complete TC-BOOKING-02
2. Identify booked seats
3. Attempt to click booked seat
4. Observe behavior

**Expected Results:**
- Booked seats are visually disabled
- Booked seats have disabled attribute
- Clicking booked seat has no effect
- Booked seat cannot be selected

**Actual Result:** ✅ Pass

**Business Rules:** BR-7

---

### TC-BOOKING-05: Complete Booking

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-BOOKING-05 |
| **Use Case** | UC-BOOKING-05 |
| **Priority** | High |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - At least one seat selected<br>- Total price > 0 |
| **Test Data** | Seats: 1-3 selected seats |

**Test Steps:**
1. Complete TC-BOOKING-03
2. Click "Proceed to Payment"
3. Wait for payment modal
4. Observe payment interface

**Expected Results:**
- Payment modal appears
- Payment methods are displayed
- Total amount is shown
- Booking details are visible

**Actual Result:** ⏭️ Skipped (Depends on TC-BOOKING-03)

**Business Rules:** BR-8, BR-18, BR-19

---

## 6. Payment Module [PAYMENT]

### TC-PAYMENT-01: Display Payment Screen

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-PAYMENT-01 |
| **Use Case** | UC-PAY-01 |
| **Priority** | High |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - Seats selected<br>- Proceeded to payment |
| **Test Data** | None |

**Test Steps:**
1. Complete seat selection
2. Click "Proceed to Payment"
3. Observe payment modal

**Expected Results:**
- Payment modal is displayed
- 4 payment methods visible: Momo, ZaloPay, VNPay, ATM
- Total amount is displayed
- Momo is selected by default

**Actual Result:** ✅ Pass

**Business Rules:** BR-15, BR-16

---

### TC-PAYMENT-02: Payment with Momo

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-PAYMENT-02 |
| **Use Case** | UC-PAY-02 |
| **Priority** | High |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - Payment modal is open |
| **Test Data** | Payment method: Momo |

**Test Steps:**
1. Select Momo payment method
2. Click "Thanh Toán" button
3. Wait for processing
4. Observe result

**Expected Results:**
- Payment processes successfully
- Success toast appears: "Thanh toán thành công"
- Booking is created in database
- Selected seats change to "Booked" status

**Actual Result:** ✅ Pass

**Business Rules:** BR-15, BR-18, BR-19

---

### TC-PAYMENT-03: Payment with ZaloPay

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-PAYMENT-03 |
| **Use Case** | UC-PAY-03 |
| **Priority** | Medium |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - Payment modal is open |
| **Test Data** | Payment method: ZaloPay |

**Test Steps:**
1. Select ZaloPay payment method
2. Click "Thanh Toán" button
3. Wait for processing
4. Observe result

**Expected Results:**
- Payment processes successfully
- Success toast appears
- Booking is created

**Actual Result:** ✅ Pass

**Business Rules:** BR-15, BR-18

---

### TC-PAYMENT-04: Payment with VNPay

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-PAYMENT-04 |
| **Use Case** | UC-PAY-04 |
| **Priority** | Medium |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - Payment modal is open |
| **Test Data** | Payment method: VNPay |

**Test Steps:**
1. Select VNPay payment method
2. Click "Thanh Toán" button
3. Wait for processing
4. Observe result

**Expected Results:**
- Payment processes successfully
- Success toast appears
- Booking is created

**Actual Result:** ✅ Pass

**Business Rules:** BR-15, BR-18

---

### TC-PAYMENT-05: Payment with ATM Card

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-PAYMENT-05 |
| **Use Case** | UC-PAY-05 |
| **Priority** | Medium |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - Payment modal is open |
| **Test Data** | Card: 1234567890123456<br>Name: TEST USER<br>Expiry: 12/25<br>CVV: 123 |

**Test Steps:**
1. Select "Thẻ ATM" payment method
2. Enter card number
3. Enter cardholder name
4. Enter expiration date
5. Enter CVV
6. Click "Thanh Toán"

**Expected Results:**
- ATM card form appears
- All fields accept input
- Payment processes successfully
- Success toast appears

**Actual Result:** ✅ Pass

**Business Rules:** BR-15, BR-16, BR-18

---

### TC-PAYMENT-06: Handle Payment Error

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-PAYMENT-06 |
| **Use Case** | UC-PAY-06 |
| **Priority** | High |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - Payment modal is open |
| **Test Data** | Invalid card data or network error |

**Test Steps:**
1. Select ATM payment
2. Leave fields empty or enter invalid data
3. Click "Thanh Toán"
4. Observe error handling

**Expected Results:**
- Error message is displayed
- Payment modal remains open
- User can retry payment
- No booking is created

**Actual Result:** ✅ Pass

**Business Rules:** BR-17

---

## 7. Admin Module [ADMIN]

### TC-ADMIN-01: Admin Login

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-ADMIN-01 |
| **Use Case** | UC-ADMIN-01 |
| **Priority** | High |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - Admin account exists<br>- User not logged in |
| **Test Data** | Email: `admin@cinemavision.com`<br>Password: `admin123`<br>Role: admin |

**Test Steps:**
1. Click "Login" button
2. Enter admin email
3. Enter admin password
4. Click "Sign in"
5. Navigate to /admin

**Expected Results:**
- Login successful
- JWT token stored
- URL contains "/admin"
- Admin dashboard is accessible
- Admin tabs visible (Movies, Theaters, Showtimes, Users)

**Actual Result:** ✅ Pass

**Business Rules:** BR-3, BR-22, BR-23

---

### TC-ADMIN-02: Add New Movie

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-ADMIN-02 |
| **Use Case** | UC-ADMIN-02 |
| **Priority** | High |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - Logged in as admin<br>- On admin dashboard |
| **Test Data** | Title: "Test Movie"<br>Genre: "Action"<br>Duration: 120<br>Rating: 8.5 |

**Test Steps:**
1. Login as admin
2. Navigate to /admin
3. Click "Movies" tab
4. Click "Add" button
5. Fill in movie details
6. Click "Save"

**Expected Results:**
- Add movie form appears
- All fields accept input
- Movie is created in database
- Success message appears
- Movie appears in list

**Actual Result:** ⚠️ Flaky (Timeout on slow connections)

**Business Rules:** BR-1, BR-2, BR-3

---

### TC-ADMIN-03: Edit Movie Information

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-ADMIN-03 |
| **Use Case** | UC-ADMIN-03 |
| **Priority** | High |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - Logged in as admin<br>- Movie exists |
| **Test Data** | Modified title, description, or rating |

**Test Steps:**
1. Login as admin
2. Navigate to Movies tab
3. Click "Edit" on a movie
4. Modify movie details
5. Click "Save"

**Expected Results:**
- Edit form opens with pre-filled data
- Changes are saved to database
- Updated information is displayed
- Success message appears

**Actual Result:** ✅ Pass

**Business Rules:** BR-1, BR-2, BR-3

---

### TC-ADMIN-04: Delete Movie

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-ADMIN-04 |
| **Use Case** | UC-ADMIN-04 |
| **Priority** | Medium |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - Logged in as admin<br>- Movie exists |
| **Test Data** | Movie to delete |

**Test Steps:**
1. Login as admin
2. Navigate to Movies tab
3. Click "Delete" on a movie
4. Confirm deletion

**Expected Results:**
- Confirmation dialog appears
- Movie is removed from database
- Movie disappears from list
- Success message appears

**Actual Result:** ✅ Pass

**Business Rules:** BR-3

---

### TC-ADMIN-05: Manage Theaters

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-ADMIN-05 |
| **Use Case** | UC-ADMIN-05 |
| **Priority** | High |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - Logged in as admin |
| **Test Data** | Theater name, location, seat configuration |

**Test Steps:**
1. Login as admin
2. Navigate to Theaters tab
3. Perform CRUD operations on theaters

**Expected Results:**
- Theater management interface is accessible
- Can create, read, update, delete theaters
- Changes are persisted to database

**Actual Result:** ✅ Pass

**Business Rules:** BR-3, BR-4

---

### TC-ADMIN-06: Manage Showtimes

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-ADMIN-06 |
| **Use Case** | UC-ADMIN-06 |
| **Priority** | High |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - Logged in as admin<br>- Movies and theaters exist |
| **Test Data** | Movie, theater, date, time, price |

**Test Steps:**
1. Login as admin
2. Navigate to Showtimes tab
3. Create new showtime
4. Link movie to theater with time

**Expected Results:**
- Showtime creation interface works
- Can link movies to theaters
- Showtimes are saved correctly
- No time conflicts in same theater

**Actual Result:** ✅ Pass

**Business Rules:** BR-3, BR-4, BR-5

---

### TC-ADMIN-07: Manage Users

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-ADMIN-07 |
| **Use Case** | UC-ADMIN-07 |
| **Priority** | Medium |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - Logged in as admin |
| **Test Data** | User list |

**Test Steps:**
1. Login as admin
2. Navigate to Users tab
3. View user list
4. Check user details

**Expected Results:**
- User list is displayed
- Can view user information
- Can manage user accounts

**Actual Result:** ✅ Pass

**Business Rules:** BR-3, BR-22

---

## 8. Profile Module [PROFILE]

### TC-PROFILE-01: View Booking History

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-PROFILE-01 |
| **Use Case** | UC-PROFILE-01 |
| **Priority** | Medium |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - User is logged in |
| **Test Data** | User with or without bookings |

**Test Steps:**
1. Login as user
2. Navigate to Profile page
3. View booking history section

**Expected Results:**
- Profile page loads successfully
- Booking history section is visible
- Either shows booking list or "No bookings found"
- Each booking shows: movie, date, seats, total

**Actual Result:** ✅ Pass

**Business Rules:** BR-20

---

### TC-PROFILE-02: Update Personal Information

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-PROFILE-02 |
| **Use Case** | UC-PROFILE-02 |
| **Priority** | Medium |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - User is logged in |
| **Test Data** | New name: "Updated User Name" |

**Test Steps:**
1. Login as user
2. Navigate to Profile page
3. Click "Edit Profile"
4. Update name field
5. Click "Save Changes"

**Expected Results:**
- Edit profile modal opens
- Name field is editable
- Changes are saved to database
- Success message appears: "Profile updated successfully"
- Modal closes
- Updated name is displayed

**Actual Result:** ✅ Pass

**Business Rules:** BR-21

---

## 9. System Module [SYS]

### TC-SYS-01: Check Session Expiration

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-SYS-01 |
| **Use Case** | UC-SYS-01 |
| **Priority** | High |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - User is logged in<br>- JWT token exists |
| **Test Data** | Expired or invalid token |

**Test Steps:**
1. Login as user
2. Manually expire token or wait for expiration
3. Attempt to access protected page
4. Observe system behavior

**Expected Results:**
- System detects expired token
- Token is removed from localStorage
- User is redirected to login
- Login form is displayed

**Actual Result:** ✅ Pass

**Business Rules:** BR-12, BR-25

---

### TC-SYS-02: Protect Secure Pages

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-SYS-02 |
| **Use Case** | UC-SYS-02 |
| **Priority** | High |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - User is not logged in |
| **Test Data** | URL: /admin |

**Test Steps:**
1. Ensure user is logged out
2. Navigate to /admin
3. Observe system response

**Expected Results:**
- Access is denied
- "Access Denied" or "Unauthorized" message appears
- User cannot view admin content
- May redirect to login

**Actual Result:** ✅ Pass

**Business Rules:** BR-23, BR-24

---

### TC-SYS-03: Display 404 Page

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-SYS-03 |
| **Use Case** | UC-SYS-03 |
| **Priority** | Low |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | None |
| **Test Data** | URL: /randomxyz |

**Test Steps:**
1. Navigate to non-existent URL
2. Observe page display

**Expected Results:**
- 404 page is displayed
- "Page not found" message appears
- Home button is available
- Can navigate back to homepage

**Actual Result:** ✅ Pass

**Business Rules:** BR-29

---

### TC-SYS-04: XSS Protection

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-SYS-04 |
| **Use Case** | UC-SYS-04 |
| **Priority** | High |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | - User is logged in |
| **Test Data** | XSS payload: `<script>alert("XSS")</script>` |

**Test Steps:**
1. Login as user
2. Navigate to search or profile edit
3. Enter XSS payload in input field
4. Submit form
5. Observe behavior

**Expected Results:**
- No alert dialog appears
- Script is not executed
- Input is sanitized/escaped
- Data is safely rendered

**Actual Result:** ✅ Pass

**Business Rules:** BR-27, BR-28

---

### TC-SYS-05: Validate API Token

| Field | Details |
|-------|---------|
| **Test Case ID** | TC-SYS-05 |
| **Use Case** | UC-SYS-05 |
| **Priority** | High |
| **Test Type** | System Test (Black-box) |
| **Preconditions** | None |
| **Test Data** | API endpoint: protected endpoint |

**Test Steps:**
1. Remove token from localStorage
2. Attempt to call protected API
3. Observe response

**Expected Results:**
- API returns HTTP 401 Unauthorized
- Request is rejected
- Error message indicates authentication required
- Login form may be shown

**Actual Result:** ✅ Pass

**Business Rules:** BR-25, BR-26

---

## 10. Traceability Matrix

### 10.1. Use Case to Test Case Mapping

| Use Case | Test Cases | Status |
|----------|-----------|--------|
| UC-AUTH-01 | TC-AUTH-01 | ✅ Pass |
| UC-AUTH-02 | TC-AUTH-02, TC-AUTH-03 | ✅ Pass |
| UC-AUTH-04 | TC-AUTH-04, TC-AUTH-05 | ✅ Pass |
| UC-AUTH-06 | TC-AUTH-06 | ✅ Pass |
| UC-MOVIE-01 | TC-MOVIE-01 | ✅ Pass |
| UC-MOVIE-02 | TC-MOVIE-02 | ✅ Pass |
| UC-MOVIE-03 | TC-MOVIE-03 | ✅ Pass |
| UC-BOOKING-01 | TC-BOOKING-01 | ✅ Pass |
| UC-BOOKING-02 | TC-BOOKING-02 | ✅ Pass |
| UC-BOOKING-03 | TC-BOOKING-03 | ⏭️ Skipped |
| UC-BOOKING-04 | TC-BOOKING-04 | ✅ Pass |
| UC-BOOKING-05 | TC-BOOKING-05 | ⏭️ Skipped |
| UC-PAY-01 | TC-PAYMENT-01 | ✅ Pass |
| UC-PAY-02 | TC-PAYMENT-02 | ✅ Pass |
| UC-PAY-03 | TC-PAYMENT-03 | ✅ Pass |
| UC-PAY-04 | TC-PAYMENT-04 | ✅ Pass |
| UC-PAY-05 | TC-PAYMENT-05 | ✅ Pass |
| UC-PAY-06 | TC-PAYMENT-06 | ✅ Pass |
| UC-ADMIN-01 | TC-ADMIN-01 | ✅ Pass |
| UC-ADMIN-02 | TC-ADMIN-02 | ⚠️ Flaky |
| UC-ADMIN-03 | TC-ADMIN-03 | ✅ Pass |
| UC-ADMIN-04 | TC-ADMIN-04 | ✅ Pass |
| UC-ADMIN-05 | TC-ADMIN-05 | ✅ Pass |
| UC-ADMIN-06 | TC-ADMIN-06 | ✅ Pass |
| UC-ADMIN-07 | TC-ADMIN-07 | ✅ Pass |
| UC-PROFILE-01 | TC-PROFILE-01 | ✅ Pass |
| UC-PROFILE-02 | TC-PROFILE-02 | ✅ Pass |
| UC-SYS-01 | TC-SYS-01 | ✅ Pass |
| UC-SYS-02 | TC-SYS-02 | ✅ Pass |
| UC-SYS-03 | TC-SYS-03 | ✅ Pass |
| UC-SYS-04 | TC-SYS-04 | ✅ Pass |
| UC-SYS-05 | TC-SYS-05 | ✅ Pass |

### 10.2. Business Rule to Test Case Mapping

| Business Rule | Test Cases |
|---------------|-----------|
| BR-1, BR-2 | TC-MOVIE-01, TC-MOVIE-02, TC-MOVIE-03, TC-ADMIN-02, TC-ADMIN-03 |
| BR-3 | TC-ADMIN-01 to TC-ADMIN-07 |
| BR-4, BR-5 | TC-ADMIN-05, TC-ADMIN-06, TC-BOOKING-01 |
| BR-6, BR-7 | TC-BOOKING-02, TC-BOOKING-03, TC-BOOKING-04 |
| BR-8 | TC-BOOKING-03, TC-BOOKING-05 |
| BR-9, BR-10 | TC-AUTH-01 to TC-AUTH-05 |
| BR-11, BR-12 | TC-AUTH-02, TC-AUTH-06, TC-SYS-01 |
| BR-13 | TC-BOOKING-01 |
| BR-15, BR-16 | TC-PAYMENT-01 to TC-PAYMENT-05 |
| BR-17, BR-18 | TC-PAYMENT-02 to TC-PAYMENT-06 |
| BR-19, BR-20 | TC-BOOKING-05, TC-PROFILE-01 |
| BR-21, BR-22 | TC-PROFILE-02, TC-ADMIN-07 |
| BR-23, BR-24 | TC-ADMIN-01, TC-SYS-02 |
| BR-25, BR-26 | TC-SYS-01, TC-SYS-05 |
| BR-27, BR-28 | TC-SYS-04 |
| BR-29 | TC-SYS-03 |

---

> **Author:** CinemaVision Pro - Group 7  
> **Last Updated:** December 21, 2024
