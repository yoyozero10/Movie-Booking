# Business Rules for CinemaVision Pro

> **Version:** 1.0  
> **Created:** December 21, 2024  
> **Project:** CinemaVision Pro - Online Movie Ticket Booking System

---

| ID | Rule Definition | Type of Rule | Static or Dynamic | Source |
|----|-----------------|--------------|-------------------|--------|
| BR-1 | Each movie must have complete required information: title, genre, duration, and poster. | Fact | Static | Product Owner |
| BR-2 | Movie rating must be within the range of 0 to 10. | Constraint | Static | Product Owner |
| BR-3 | Only users with "admin" role can add, edit, or delete movies in the system. | Constraint | Static | Product Owner |
| BR-4 | Each showtime must belong to exactly one movie and one theater. | Fact | Static | Product Owner |
| BR-5 | Cannot create two showtimes with overlapping time in the same theater. | Constraint | Dynamic | System Architect |
| BR-6 | Each seat in a showtime can only be in one of three states: Available, Selected, or Booked. | Fact | Static | Product Owner |
| BR-7 | A booked seat cannot be selected again by another user. | Constraint | Dynamic | System Architect |
| BR-8 | Total booking price is calculated by multiplying the number of selected seats by the showtime ticket price. | Computation | Dynamic | Product Owner |
| BR-9 | User email addresses must be unique across the entire system. | Constraint | Static | Security Policy |
| BR-10 | User password must have a minimum length of 6 characters. | Constraint | Static | Security Policy |
| BR-11 | JWT token is created upon successful login and stored in browser's localStorage. | Fact | Static | System Architect |
| BR-12 | JWT token has an expiration time; after expiration, users must log in again. | Constraint | Dynamic | Security Policy |
| BR-13 | Only logged-in users can perform ticket booking and payment. | Constraint | Static | Security Policy |
| BR-14 | Guests can only view movie list, search, and view movie details without logging in. | Constraint | Static | Product Owner |
| BR-15 | The system supports 4 payment methods: Momo, ZaloPay, VNPay, and ATM Card. | Fact | Static | Product Owner |
| BR-16 | ATM card payment requires users to enter: card number, cardholder name, expiration date, and CVV. | Fact | Static | Product Owner |
| BR-17 | When payment fails, the payment modal remains open for users to retry. | Action | Dynamic | Product Owner |
| BR-18 | After successful payment, booking is created and selected seats change to Booked status. | Action | Dynamic | System Architect |
| BR-19 | Each booking must have a unique booking reference code. | Constraint | Static | System Architect |
| BR-20 | User's booking history is stored and can be reviewed in the Profile page. | Fact | Static | Product Owner |
| BR-21 | Users can only update their own personal information, not others'. | Constraint | Static | Security Policy |
| BR-22 | Admin has permission to view and manage information of all users in the system. | Constraint | Static | Product Owner |
| BR-23 | The admin page (/admin) can only be accessed by users with "admin" role. | Constraint | Static | Security Policy |
| BR-24 | When an unauthenticated user attempts to access the admin page, display "Access Denied" message. | Action | Dynamic | Security Policy |
| BR-25 | All protected APIs require a valid JWT token in the Authorization header. | Constraint | Static | System Architect |
| BR-26 | API returns HTTP 401 Unauthorized when calling protected endpoints without a valid token. | Action | Dynamic | System Architect |
| BR-27 | All user input must be sanitized to prevent XSS attacks. | Constraint | Static | Security Policy |
| BR-28 | Malicious scripts entered into forms will be escaped and not executed. | Constraint | Dynamic | Security Policy |
| BR-29 | Non-existent URLs will display a 404 page with "Page not found" message and a home button. | Action | Static | Product Owner |
| BR-30 | Network connections must use HTTPS to protect user data. | Constraint | Static | Security Policy |

---

## Business Rules Classification

### By Type of Rule

| Type | Count | Description |
|------|-------|-------------|
| **Fact** | 10 | Rules describing facts about the system |
| **Constraint** | 16 | Constraints that the system must comply with |
| **Computation** | 1 | Calculation formulas |
| **Action** | 3 | Actions performed by the system |

### By Static/Dynamic

| Type | Count | Description |
|------|-------|-------------|
| **Static** | 21 | Fixed rules that do not change over time |
| **Dynamic** | 9 | Rules that can change depending on system state |

### By Source

| Source | Count | Description |
|--------|-------|-------------|
| **Product Owner** | 14 | Requirements from product owner |
| **Security Policy** | 10 | Security policies |
| **System Architect** | 6 | System architecture requirements |

---

## Mapping Business Rules to Use Cases

| Business Rule | Related Use Cases |
|---------------|-------------------|
| BR-1, BR-2, BR-3 | UC-ADMIN-02, UC-ADMIN-03, UC-ADMIN-04 |
| BR-4, BR-5 | UC-ADMIN-06, UC-BOOKING-01 |
| BR-6, BR-7 | UC-BOOKING-02, UC-BOOKING-03, UC-BOOKING-04 |
| BR-8 | UC-BOOKING-03, UC-BOOKING-05 |
| BR-9, BR-10 | UC-AUTH-04, UC-AUTH-05 |
| BR-11, BR-12 | UC-AUTH-02, UC-SYS-01 |
| BR-13, BR-14 | UC-BOOKING-01, UC-MOVIE-01, UC-MOVIE-02, UC-MOVIE-03 |
| BR-15, BR-16, BR-17, BR-18 | UC-PAY-01 → UC-PAY-06 |
| BR-19, BR-20 | UC-BOOKING-05, UC-PROFILE-01 |
| BR-21, BR-22 | UC-PROFILE-02, UC-ADMIN-07 |
| BR-23, BR-24 | UC-ADMIN-01, UC-SYS-02 |
| BR-25, BR-26 | UC-SYS-05 |
| BR-27, BR-28 | UC-SYS-04 |
| BR-29 | UC-SYS-03 |
| BR-30 | All Use Cases |

---

> **Author:** CinemaVision Pro - Group 7  
> **Last Updated:** December 21, 2024
