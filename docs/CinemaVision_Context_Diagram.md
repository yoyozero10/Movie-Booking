# Context Diagram (Sơ Đồ Ngữ Cảnh)

## CinemaVision Pro - Online Movie Ticket Booking System

> **Version:** 1.0
> **Prepared by:** Group 7 - SE113.Q11 - UIT
> - Le Van Bao - 23520112
> - Tran Dai Thang - 23521432
> - Nguyen Xuan Nhat Minh - 23520946
> - Doan Duc Trung - 23521674
>
> **Date:** April 12, 2026
>
> **Sơ đồ:** Xem tất cả sơ đồ tại [CinemaVision_Diagrams.md](CinemaVision_Diagrams.md)

---

## Table of Contents

- [1. Giới thiệu](#1-giới-thiệu)
- [2. System Context Diagram](#2-system-context-diagram)
- [3. Mô tả các thực thể bên ngoài](#3-mô-tả-các-thực-thể-bên-ngoài)
- [4. Mô tả các luồng dữ liệu](#4-mô-tả-các-luồng-dữ-liệu)
  - [4.1 Visitor ↔ System](#41-visitor--system)
  - [4.2 Registered User ↔ System](#42-registered-user--system)
  - [4.3 Administrator ↔ System](#43-administrator--system)
  - [4.4 System ↔ MongoDB Atlas](#44-system--mongodb-atlas)
  - [4.5 System ↔ Email SMTP Server](#45-system--email-smtp-server)
  - [4.6 System ↔ Web Browser](#46-system--web-browser)
- [5. Data Flow Summary Table](#5-data-flow-summary-table)
- [6. Level 1 DFD — Decomposition](#6-level-1-dfd--decomposition)
- [7. Detailed Process Descriptions](#7-detailed-process-descriptions)

---

## 1. Giới thiệu

### Mục đích

Tài liệu này mô tả **Sơ đồ ngữ cảnh (Context Diagram)** của hệ thống CinemaVision Pro — một hệ thống đặt vé xem phim trực tuyến. Sơ đồ ngữ cảnh thể hiện hệ thống dưới dạng một tiến trình duy nhất (Process 0) và các tương tác của nó với các thực thể bên ngoài (External Entities).

### Phạm vi

Sơ đồ ngữ cảnh bao gồm:
- Xác định ranh giới hệ thống (System Boundary).
- Liệt kê tất cả các thực thể bên ngoài tương tác với hệ thống.
- Mô tả các luồng dữ liệu (Data Flows) giữa hệ thống và các thực thể bên ngoài.

> [!NOTE]
> Tất cả sơ đồ Mermaid được tách riêng tại file [CinemaVision_Diagrams.md](CinemaVision_Diagrams.md).

---

## 2. System Context Diagram

> 📊 **Sơ đồ:** [§1 Context Diagram (Level 0 DFD)](CinemaVision_Diagrams.md#1-context-diagram-level-0-dfd) | [§2 Simplified Context Diagram](CinemaVision_Diagrams.md#2-simplified-context-diagram)

### Mô tả

Hệ thống CinemaVision Pro được biểu diễn như một tiến trình duy nhất (Process 0) nằm ở trung tâm, tương tác với 6 thực thể bên ngoài:

- **3 Actor (Human):** Visitor, Registered User, Administrator
- **3 System (External):** MongoDB Atlas, Email SMTP Server, Web Browser

### Kiến trúc tổng quan

```
┌─────────────────────────────────────────────────────────────────┐
│                      SYSTEM ARCHITECTURE                        │
│                                                                 │
│  ┌─────────────┐     HTTPS/REST     ┌──────────────────┐       │
│  │   Frontend   │ ─────────────────► │     Backend      │       │
│  │  React SPA   │ ◄───────────────── │  Express.js API  │       │
│  │  (Vite)      │    JSON Response   │                  │       │
│  └──────┬───────┘                    └────────┬─────────┘       │
│         │                                     │                 │
│         │ Hosted on                           │ Mongoose ODM    │
│         │ Netlify/Vercel                      │                 │
│         │                            ┌────────▼─────────┐       │
│         │                            │  MongoDB Atlas   │       │
│         │                            └──────────────────┘       │
│         │                                     │                 │
│         │                                     │ Nodemailer      │
│         │                            ┌────────▼─────────┐       │
│         │                            │   SMTP Server    │       │
│         ▼                            └──────────────────┘       │
│  ┌─────────────┐                                                │
│  │   Browser    │  Chrome / Firefox / Safari / Edge              │
│  └─────────────┘                                                │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Mô tả các thực thể bên ngoài

| # | Thực thể | Loại | Mô tả |
|---|---|---|---|
| E1 | **Visitor** (Khách truy cập) | Actor - Human | Người dùng chưa đăng nhập. Có thể duyệt phim, tìm kiếm, xem suất chiếu, đăng ký tài khoản, đăng nhập, và yêu cầu reset mật khẩu. |
| E2 | **Registered User** (Người dùng đã đăng ký) | Actor - Human | Người dùng đã xác thực qua JWT. Có thể thực hiện tất cả chức năng của Visitor, cộng thêm đặt vé, chọn ghế, xem lịch sử, hủy đặt vé, quản lý profile, đổi mật khẩu. |
| E3 | **Administrator** (Quản trị viên) | Actor - Human | Người dùng có `role=admin`. Quản lý toàn bộ hệ thống: CRUD phim/rạp/suất chiếu, quản lý người dùng và đơn đặt vé, xem thống kê dashboard. |
| E4 | **MongoDB Atlas** | System - External | Cơ sở dữ liệu NoSQL trên cloud, lưu trữ toàn bộ dữ liệu hệ thống (Users, Movies, Theaters, Showtimes, Bookings). |
| E5 | **Email SMTP Server** | System - External | Máy chủ email (cấu hình qua Nodemailer) dùng để gửi email reset mật khẩu chứa token link. |
| E6 | **Web Browser** | System - External | Trình duyệt web trên thiết bị người dùng (Chrome, Firefox, Safari, Edge) — nơi chạy React SPA. |

---

## 4. Mô tả các luồng dữ liệu

### 4.1 Visitor ↔ System

> 📊 **Sơ đồ:** [§3 Visitor Data Flows](CinemaVision_Diagrams.md#3-visitor--system-data-flows)

| ID | Hướng | Luồng dữ liệu | Mô tả |
|---|---|---|---|
| D1.1 | Visitor → System | Movie Browse/Search Request | Yêu cầu danh sách phim, tìm kiếm theo tiêu đề, lọc theo thể loại/rating |
| D1.2 | Visitor → System | Showtime View Request | Yêu cầu xem suất chiếu theo phim, rạp, khu vực |
| D1.3 | Visitor → System | Registration Data | Thông tin đăng ký: name, email, password |
| D1.4 | Visitor → System | Login Credentials | Email + password để đăng nhập |
| D1.5 | Visitor → System | Forgot Password Request | Email để yêu cầu reset mật khẩu |
| D1.6 | System → Visitor | Movie Data | Danh sách phim, chi tiết phim (poster, synopsis, cast, trailer, rating) |
| D1.7 | System → Visitor | Showtime Data | Suất chiếu: rạp, ngày/giờ, giá, số ghế trống |
| D1.8 | System → Visitor | Auth Token (JWT) | Token xác thực sau khi register/login thành công |
| D1.9 | System → Visitor | Generic Response | Thông báo thành công/lỗi (registration, forgot password) |

### 4.2 Registered User ↔ System

> 📊 **Sơ đồ:** [§4 Registered User Data Flows](CinemaVision_Diagrams.md#4-registered-user--system-data-flows)

| ID | Hướng | Luồng dữ liệu | Mô tả |
|---|---|---|---|
| D2.1 | User → System | Profile View/Update Request | Xem thông tin cá nhân, cập nhật tên (kèm JWT) |
| D2.2 | User → System | Change Password Request | Mật khẩu cũ + mật khẩu mới (kèm JWT) |
| D2.3 | User → System | Booking Request | Showtime ID + danh sách ghế đã chọn (kèm JWT) |
| D2.4 | User → System | Cancel Booking Request | Booking ID cần hủy (kèm JWT) |
| D2.5 | User → System | Delete Booking Request | Xóa booking đã cancelled (kèm JWT) |
| D2.6 | User → System | Booking History Request | Yêu cầu xem lịch sử đặt vé (kèm JWT) |
| D2.7 | System → User | Profile Data | Thông tin user: name, email, role |
| D2.8 | System → User | Booking Confirmation | Booking details: bookingRef, seats, totalPrice, status + QR Code |
| D2.9 | System → User | Booking History | Danh sách toàn bộ bookings kèm thông tin chi tiết |
| D2.10 | System → User | Action Confirmation | Xác nhận hủy/xóa booking, đổi mật khẩu thành công |

### 4.3 Administrator ↔ System

> 📊 **Sơ đồ:** [§5 Administrator Data Flows](CinemaVision_Diagrams.md#5-administrator--system-data-flows)

| ID | Hướng | Luồng dữ liệu | Mô tả |
|---|---|---|---|
| D3.1 | Admin → System | Movie CRUD Data | Tạo/sửa/xóa phim: title, description, genre, duration, rating, posterUrl, ... |
| D3.2 | Admin → System | Theater CRUD Data | Tạo/sửa/xóa rạp: name, location, city, totalSeats |
| D3.3 | Admin → System | Showtime CRUD Data | Tạo/sửa/xóa suất chiếu: movieId, theaterId, date, startTime, price |
| D3.4 | Admin → System | User Management Request | Xem danh sách users, cập nhật role, xóa user (kèm JWT Admin) |
| D3.5 | Admin → System | Booking Management Request | Xem tất cả bookings, cập nhật status (confirmed/cancelled) |
| D3.6 | System → Admin | Dashboard Statistics | Tổng số: movies, theaters, users, bookings |
| D3.7 | System → Admin | User List | Danh sách tất cả người dùng (name, email, role, createdAt) |
| D3.8 | System → Admin | Booking Reports | Danh sách tất cả đơn đặt vé kèm thông tin chi tiết |
| D3.9 | System → Admin | CRUD Confirmation | Xác nhận tạo/sửa/xóa thành công hoặc thông báo lỗi |

### 4.4 System ↔ MongoDB Atlas

> 📊 **Sơ đồ:** [§6 MongoDB Data Flows](CinemaVision_Diagrams.md#6-system--mongodb-atlas)

| ID | Hướng | Luồng dữ liệu | Mô tả |
|---|---|---|---|
| D4.1 | System → MongoDB | CRUD Operations | Insert, Update, Delete documents trong các collections: Users, Movies, Theaters, Showtimes, Bookings |
| D4.2 | MongoDB → System | Query Results | Kết quả truy vấn: danh sách documents, single document, aggregation results |

**Collections:**

| Collection | Mô tả | Trường chính |
|---|---|---|
| `users` | Tài khoản người dùng | name, email, password (hashed), role, resetPasswordToken |
| `movies` | Thông tin phim | title, description, genre, duration, rating, posterUrl, cast |
| `theaters` | Thông tin rạp chiếu | name, location, city, totalSeats |
| `showtimes` | Suất chiếu | movieId, theaterId, date, startTime, price, availableSeats |
| `bookings` | Đơn đặt vé | userId, showtimeId, seats[], totalPrice, bookingRef, status |

### 4.5 System ↔ Email SMTP Server

> 📊 **Sơ đồ:** [§7 Email Data Flows](CinemaVision_Diagrams.md#7-system--email-smtp-server)

| ID | Hướng | Luồng dữ liệu | Mô tả |
|---|---|---|---|
| D5.1 | System → SMTP | Password Reset Email | Email chứa reset link với token có thời hạn 1 giờ |
| D5.2 | SMTP → System | Delivery Status | Trạng thái gửi email (success/failure) |

### 4.6 System ↔ Web Browser

> 📊 **Sơ đồ:** [§8 Browser Data Flows](CinemaVision_Diagrams.md#8-system--web-browser)

| ID | Hướng | Luồng dữ liệu | Mô tả |
|---|---|---|---|
| D6.1 | Browser → System | HTTP/HTTPS Requests | Tất cả requests từ React SPA đến Express API (GET, POST, PUT, DELETE) kèm headers (Authorization, Content-Type) |
| D6.2 | System → Browser | HTTP Responses | Static assets (HTML/CSS/JS bundle) từ Netlify/Vercel + JSON API responses từ Render backend |

---

## 5. Data Flow Summary Table

| ID | Source | Destination | Data | Protocol | Auth |
|---|---|---|---|---|---|
| D1.1-D1.5 | Visitor | System | Search, Register, Login, Forgot Password | HTTPS | No |
| D1.6-D1.9 | System | Visitor | Movies, Showtimes, JWT, Messages | HTTPS | No |
| D2.1-D2.6 | Registered User | System | Profile, Booking, Cancel, History | HTTPS | JWT |
| D2.7-D2.10 | System | Registered User | Profile, Confirmation, QR Code, History | HTTPS | JWT |
| D3.1-D3.5 | Administrator | System | CRUD Operations, Management | HTTPS | JWT + Admin |
| D3.6-D3.9 | System | Administrator | Stats, Lists, Reports, Confirmation | HTTPS | JWT + Admin |
| D4.1 | System | MongoDB Atlas | CRUD Documents | MongoDB Protocol (TLS) | Connection String |
| D4.2 | MongoDB Atlas | System | Query Results | MongoDB Protocol (TLS) | Connection String |
| D5.1 | System | SMTP Server | Reset Email Content | SMTP/TLS | SMTP Credentials |
| D5.2 | SMTP Server | System | Delivery Status | SMTP/TLS | SMTP Credentials |
| D6.1 | Web Browser | System | HTTP Requests | HTTPS | Varies |
| D6.2 | System | Web Browser | HTML/CSS/JS + JSON | HTTPS | N/A |

---

## 6. Level 1 DFD — Decomposition

> 📊 **Sơ đồ:** [§9 Level 1 DFD](CinemaVision_Diagrams.md#9-level-1-dfd--decomposition)

Phân rã hệ thống (Process 0) thành các tiến trình con (Sub-processes):

| Process | Tên | Mô tả | API Routes |
|---|---|---|---|
| **1.0** | Authentication & User Management | Xử lý đăng ký, đăng nhập, JWT, profile, change/reset password, admin user management | `/api/auth/*`, `/api/admin/users/*` |
| **2.0** | Movie Management | Hiển thị, tìm kiếm, lọc phim. Admin CRUD movies | `/api/movies/*` |
| **3.0** | Theater & Showtime Management | Quản lý rạp theo khu vực, suất chiếu. Admin CRUD theaters & showtimes | `/api/theaters/*`, `/api/showtimes/*` |
| **4.0** | Booking Management | Đặt vé, chọn ghế, hủy, xóa, xem lịch sử. Admin quản lý bookings | `/api/bookings/*`, `/api/admin/bookings/*` |
| **5.0** | Admin Dashboard | Thống kê tổng hợp (đếm movies, theaters, users, bookings) | `/api/admin/stats` |
| **6.0** | Localization (i18n) | Chuyển đổi ngôn ngữ EN/VI, hiển thị tiền tệ VND/USD | Frontend-only (client-side) |

---

## 7. Detailed Process Descriptions

### Process 1.0: Authentication & User Management

> 📊 **Sơ đồ:** [§10 Auth Process](CinemaVision_Diagrams.md#10-process-10-authentication--user-management)

| Sub-process | Input | Output | Mô tả |
|---|---|---|---|
| 1.1 Register | name, email, password | JWT + user data | Đăng ký tài khoản mới, hash password, trả JWT |
| 1.2 Login | email, password | JWT + user data | Xác thực credentials, trả JWT |
| 1.3 Profile | JWT | profile data / update confirm | Xem/cập nhật thông tin cá nhân |
| 1.4 Change Password | JWT, currentPwd, newPwd | success message | Đổi mật khẩu (verify current → hash new) |
| 1.5 Forgot Password | email | generic success msg + email | Tạo reset token → gửi email qua SMTP |
| 1.6 Reset Password | token, newPwd | success message | Verify token → hash new password → save |

### Process 4.0: Booking Management

> 📊 **Sơ đồ:** [§11 Booking Process](CinemaVision_Diagrams.md#11-process-40-booking-management) | [§12 Booking Flowchart](CinemaVision_Diagrams.md#12-booking-flow--detailed-flowchart)

| Sub-process | Input | Output | Mô tả |
|---|---|---|---|
| 4.1 View Booked Seats | showtimeId | booked seats[] | Trả danh sách ghế đã đặt (public endpoint) |
| 4.2 Create Booking | JWT, showtimeId, seats[] | booking + QR code | Validate → check conflicts → compute price → generate ref → save |
| 4.3 View Own Bookings | JWT | booking list | Trả danh sách bookings của user |
| 4.4 Cancel Booking | JWT, bookingId | updated booking | Verify ownership → change status → restore seats |
| 4.5 Delete Booking | JWT, bookingId | deletion confirm | Verify ownership + status=cancelled → delete |

**Luồng đặt vé (Process 4.2) — Tóm tắt:**

1. ✅ Verify JWT hợp lệ
2. ✅ Validate showtime tồn tại
3. ✅ Check `availableSeats >= seats.length`
4. ✅ Check seat conflicts (không trùng confirmed bookings)
5. ✅ Compute `totalPrice = seats.length × showtime.price`
6. ✅ Generate unique `bookingRef` (retry on collision)
7. ✅ Save booking (status: confirmed)
8. ✅ Decrement `showtime.availableSeats`
9. ✅ Return booking data + QR Code

---

**Prepared by:** Group 7 - SE113.Q11 - UIT
- Le Van Bao - 23520112
- Tran Dai Thang - 23521432
- Nguyen Xuan Nhat Minh - 23520946
- Doan Duc Trung - 23521674

**Last Updated:** April 12, 2026
