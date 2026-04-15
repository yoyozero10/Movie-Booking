# CinemaVision Pro - Diagrams (Sơ Đồ Hệ Thống)

> **Project:** CinemaVision Pro - Online Movie Ticket Booking System
> **Group:** 7 - SE113.Q11 - UIT
> **Date:** April 12, 2026

---

## Table of Contents

- [1. Context Diagram (Level 0 DFD)](#1-context-diagram-level-0-dfd)
- [2. Simplified Context Diagram](#2-simplified-context-diagram)
- [3. Visitor ↔ System Data Flows](#3-visitor--system-data-flows)
- [4. Registered User ↔ System Data Flows](#4-registered-user--system-data-flows)
- [5. Administrator ↔ System Data Flows](#5-administrator--system-data-flows)
- [6. System ↔ MongoDB Atlas](#6-system--mongodb-atlas)
- [7. System ↔ Email SMTP Server](#7-system--email-smtp-server)
- [8. System ↔ Web Browser](#8-system--web-browser)
- [9. Level 1 DFD — Decomposition](#9-level-1-dfd--decomposition)
- [10. Process 1.0: Authentication & User Management](#10-process-10-authentication--user-management)
- [11. Process 4.0: Booking Management](#11-process-40-booking-management)
- [12. Booking Flow — Detailed Flowchart](#12-booking-flow--detailed-flowchart)

---

## 1. Context Diagram (Level 0 DFD)

```mermaid
graph TB
    subgraph External Entities
        V["👤 Visitor<br/>(Unauthenticated)"]
        U["👤 Registered User<br/>(Authenticated)"]
        A["👑 Administrator<br/>(Admin Role)"]
        DB[("🗄️ MongoDB Atlas<br/>(Cloud Database)")]
        EMAIL["📧 Email SMTP Server<br/>(Nodemailer)"]
        BROWSER["🌐 Web Browser<br/>(Client Device)"]
    end

    subgraph System Boundary
        SYS(("🎬 CinemaVision Pro<br/>Movie Booking System<br/>(Process 0)"))
    end

    V -->|"Register / Login Request<br/>Search & Browse Movies<br/>View Showtimes<br/>Forgot Password Request"| SYS
    SYS -->|"Movie Listings<br/>Showtime Data<br/>Registration Confirmation<br/>JWT Token<br/>Password Reset Email Trigger"| V

    U -->|"Auth Token (JWT)<br/>Profile Update<br/>Seat Selection<br/>Booking Request<br/>Cancel Booking<br/>Change Password"| SYS
    SYS -->|"Profile Data<br/>Booking Confirmation<br/>QR Code Ticket<br/>Booking History<br/>Cancellation Confirmation"| U

    A -->|"Auth Token (JWT + Admin)<br/>CRUD Movies/Theaters/Showtimes<br/>Manage Users/Bookings<br/>Dashboard Stats Request"| SYS
    SYS -->|"Dashboard Statistics<br/>User Lists<br/>Booking Reports<br/>CRUD Confirmation"| A

    SYS -->|"Read/Write Documents<br/>(Users, Movies, Theaters,<br/>Showtimes, Bookings)"| DB
    DB -->|"Query Results<br/>Document Data"| SYS

    SYS -->|"Password Reset Email<br/>(Reset Token Link)"| EMAIL
    EMAIL -->|"Delivery Status"| SYS

    BROWSER -->|"HTTP/HTTPS Requests"| SYS
    SYS -->|"HTML/CSS/JS Bundle<br/>API JSON Responses"| BROWSER
```

---

## 2. Simplified Context Diagram

```mermaid
flowchart LR
    V["👤 Visitor"] -- "Browse / Register / Login" --> SYS
    U["👤 User"] -- "Book / Cancel / Profile" --> SYS
    A["👑 Admin"] -- "CRUD / Manage / Stats" --> SYS

    SYS(("🎬<br/>CinemaVision<br/>Pro"))

    SYS -- "Store / Query" --> DB[("MongoDB Atlas")]
    SYS -- "Send Email" --> EMAIL["📧 SMTP Server"]

    SYS --> V
    SYS --> U
    SYS --> A

    style SYS fill:#4f46e5,stroke:#312e81,color:#fff,stroke-width:3px
    style V fill:#059669,stroke:#064e3b,color:#fff
    style U fill:#0891b2,stroke:#164e63,color:#fff
    style A fill:#dc2626,stroke:#7f1d1d,color:#fff
    style DB fill:#d97706,stroke:#78350f,color:#fff
    style EMAIL fill:#7c3aed,stroke:#4c1d95,color:#fff
```

---

## 3. Visitor ↔ System Data Flows

```mermaid
flowchart LR
    V["👤 Visitor"] -->|"D1.1"| SYS(("CinemaVision Pro"))
    V -->|"D1.2"| SYS
    V -->|"D1.3"| SYS
    V -->|"D1.4"| SYS
    V -->|"D1.5"| SYS
    SYS -->|"D1.6"| V
    SYS -->|"D1.7"| V
    SYS -->|"D1.8"| V
    SYS -->|"D1.9"| V
```

---

## 4. Registered User ↔ System Data Flows

```mermaid
flowchart LR
    U["👤 Registered User"] -->|"D2.1"| SYS(("CinemaVision Pro"))
    U -->|"D2.2"| SYS
    U -->|"D2.3"| SYS
    U -->|"D2.4"| SYS
    U -->|"D2.5"| SYS
    U -->|"D2.6"| SYS
    SYS -->|"D2.7"| U
    SYS -->|"D2.8"| U
    SYS -->|"D2.9"| U
    SYS -->|"D2.10"| U
```

---

## 5. Administrator ↔ System Data Flows

```mermaid
flowchart LR
    A["👑 Administrator"] -->|"D3.1"| SYS(("CinemaVision Pro"))
    A -->|"D3.2"| SYS
    A -->|"D3.3"| SYS
    A -->|"D3.4"| SYS
    A -->|"D3.5"| SYS
    SYS -->|"D3.6"| A
    SYS -->|"D3.7"| A
    SYS -->|"D3.8"| A
    SYS -->|"D3.9"| A
```

---

## 6. System ↔ MongoDB Atlas

```mermaid
flowchart LR
    SYS(("CinemaVision Pro")) -->|"D4.1"| DB[("MongoDB Atlas")]
    DB -->|"D4.2"| SYS
```

---

## 7. System ↔ Email SMTP Server

```mermaid
flowchart LR
    SYS(("CinemaVision Pro")) -->|"D5.1"| EMAIL["📧 SMTP Server"]
    EMAIL -->|"D5.2"| SYS
```

---

## 8. System ↔ Web Browser

```mermaid
flowchart LR
    BROWSER["🌐 Web Browser"] -->|"D6.1"| SYS(("CinemaVision Pro"))
    SYS -->|"D6.2"| BROWSER
```

---

## 9. Level 1 DFD — Decomposition

```mermaid
flowchart TB
    V["👤 Visitor"]
    U["👤 Registered User"]
    A["👑 Administrator"]
    DB[("MongoDB Atlas")]
    EMAIL["📧 SMTP Server"]

    subgraph "System Boundary — CinemaVision Pro"
        P1["1.0<br/>Authentication<br/>& User Management"]
        P2["2.0<br/>Movie<br/>Management"]
        P3["3.0<br/>Theater & Showtime<br/>Management"]
        P4["4.0<br/>Booking<br/>Management"]
        P5["5.0<br/>Admin<br/>Dashboard"]
        P6["6.0<br/>Localization<br/>(i18n)"]

        DS1[("D1: User Store")]
        DS2[("D2: Movie Store")]
        DS3[("D3: Theater Store")]
        DS4[("D4: Showtime Store")]
        DS5[("D5: Booking Store")]
    end

    V -->|"Register/Login/Reset"| P1
    P1 -->|"JWT Token"| V
    P1 -->|"Reset Email"| EMAIL

    V -->|"Browse/Search"| P2
    U -->|"View Details"| P2
    P2 -->|"Movie Data"| V
    P2 -->|"Movie Data"| U

    V -->|"View Theaters"| P3
    U -->|"View Showtimes"| P3
    P3 -->|"Showtime Data"| V
    P3 -->|"Showtime Data"| U

    U -->|"Book/Cancel/History"| P4
    P4 -->|"Confirmation/QR"| U

    A -->|"CRUD Movies"| P2
    A -->|"CRUD Theaters/Showtimes"| P3
    A -->|"Manage Bookings"| P4
    A -->|"Manage Users"| P1
    A -->|"View Stats"| P5
    P5 -->|"Statistics"| A

    P1 <-->|"Read/Write"| DS1
    P2 <-->|"Read/Write"| DS2
    P3 <-->|"Read/Write"| DS3
    P3 <-->|"Read/Write"| DS4
    P4 <-->|"Read/Write"| DS5
    P4 <-->|"Update Seats"| DS4
    P5 <-->|"Aggregate"| DS1
    P5 <-->|"Aggregate"| DS2
    P5 <-->|"Aggregate"| DS5

    DS1 <-.->|"Sync"| DB
    DS2 <-.->|"Sync"| DB
    DS3 <-.->|"Sync"| DB
    DS4 <-.->|"Sync"| DB
    DS5 <-.->|"Sync"| DB
```

---

## 10. Process 1.0: Authentication & User Management

```mermaid
flowchart LR
    subgraph "Process 1.0"
        P11["1.1 Register"]
        P12["1.2 Login"]
        P13["1.3 Profile"]
        P14["1.4 Change Password"]
        P15["1.5 Forgot Password"]
        P16["1.6 Reset Password"]
    end

    V["Visitor"] -->|"name, email, password"| P11
    P11 -->|"JWT + user data"| V

    V -->|"email, password"| P12
    P12 -->|"JWT + user data"| V

    U["User"] -->|"JWT"| P13
    P13 -->|"profile data"| U

    U -->|"currentPwd, newPwd"| P14
    P14 -->|"success msg"| U

    V -->|"email"| P15
    P15 -->|"generic success msg"| V
    P15 -->|"reset email"| EMAIL["📧 SMTP"]

    V -->|"token, newPwd"| P16
    P16 -->|"success msg"| V
```

---

## 11. Process 4.0: Booking Management

```mermaid
flowchart LR
    subgraph "Process 4.0"
        P41["4.1 View Booked Seats"]
        P42["4.2 Create Booking"]
        P43["4.3 View Own Bookings"]
        P44["4.4 Cancel Booking"]
        P45["4.5 Delete Booking"]
    end

    ANY["Any User"] -->|"showtimeId"| P41
    P41 -->|"booked seats[]"| ANY

    U["Reg. User"] -->|"showtimeId, seats[]"| P42
    P42 -->|"booking + QR code"| U

    U -->|"JWT"| P43
    P43 -->|"booking list"| U

    U -->|"bookingId"| P44
    P44 -->|"updated booking"| U

    U -->|"bookingId (cancelled)"| P45
    P45 -->|"deletion confirm"| U
```

---

## 12. Booking Flow — Detailed Flowchart

```mermaid
flowchart TD
    START["User chọn ghế & xác nhận"] --> A["Gửi POST /api/bookings"]
    A --> B{"JWT hợp lệ?"}
    B -->|"Không"| ERR1["401 Unauthorized"]
    B -->|"Có"| C{"Showtime tồn tại?"}
    C -->|"Không"| ERR2["404 Not Found"]
    C -->|"Có"| D{"availableSeats >= seats.length?"}
    D -->|"Không"| ERR3["400 Not Enough Seats"]
    D -->|"Có"| E{"Seats conflict với<br/>confirmed bookings?"}
    E -->|"Có"| ERR4["409 Seat Already Booked"]
    E -->|"Không"| F["Tính totalPrice =<br/>seats.length × showtime.price"]
    F --> G["Generate bookingRef"]
    G --> H{"bookingRef trùng?"}
    H -->|"Có"| G
    H -->|"Không"| I["Lưu Booking (status: confirmed)"]
    I --> J["Giảm showtime.availableSeats"]
    J --> K["Trả booking data + QR Code"]
    K --> END["✅ Booking thành công"]

    style END fill:#059669,color:#fff
    style ERR1 fill:#dc2626,color:#fff
    style ERR2 fill:#dc2626,color:#fff
    style ERR3 fill:#dc2626,color:#fff
    style ERR4 fill:#dc2626,color:#fff
```

---

**Prepared by:** Group 7 - SE113.Q11 - UIT
**Last Updated:** April 12, 2026
