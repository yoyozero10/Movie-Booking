# MINISTRY OF EDUCATION AND TRAINING
# UNIVERSITY OF INFORMATION TECHNOLOGY
# FACULTY OF SOFTWARE TECHNOLOGY

---

# SOFTWARE TESTING
# TEST PLAN FOR MOVIE BOOKING WEBSITE

**Group 7 - Class: SE113.Q11**

| Role | Name | Student ID |
|------|------|------------|
| Test Leader | Tran Dai Thang | 23521432 |
| Tester 1 | Doan Duc Trung | 23521674 |
| Tester 2 | Le Nguyen Hung | 22520507 |
| Tester 3 | Le Nguyen Khang | 23520689 |

**HO CHI MINH CITY, December 3, 2025**

---

## INDEX

1. [OVERVIEW](#1-overview)
2. [TEST PLAN OBJECTIVE](#2-test-plan-objective)
3. [TESTING STRATEGY](#3-testing-strategy)
4. [HARDWARE / SOFTWARE RESOURCES](#4-hardware--software-resources)
5. [TYPES OF TESTING](#5-types-of-testing)
6. [RISKS & CONTINGENCIES](#6-risks--contingencies)
7. [SUSPENSION CRITERIA AND RESUMPTION REQUIREMENTS](#7-suspension-criteria-and-resumption-requirements)
8. [TEST SCHEDULE AND RESOURCES](#8-test-schedule-and-resources)
9. [ROLES AND RESPONSIBILITIES](#9-roles-and-responsibilities)
10. [DELIVERABLES](#10-deliverables)
11. [APPENDIX A: USE CASE TO TEST CASE TRACEABILITY](#11-appendix-a-use-case-to-test-case-traceability)

---

## 1. OVERVIEW

### 1.1. PRODUCT NAME
**"Movie Booking Website"** (CinemaVision Pro)

### 1.2. PRODUCT REVISION
Release 1.0 - Last version

### 1.3. PROJECT LEAD
**Tran Dai Thang** - 23521432

### 1.4. TEST PROJECT STAFF

| Name | Student ID | Role |
|------|------------|------|
| Tran Dai Thang | 23521432 | Test Leader |
| Doan Duc Trung | 23521674 | Tester 1 |
| Le Nguyen Hung | 22520507 | Tester 2 |
| Le Nguyen Khang | 23520689 | Tester 3 |

### 1.5. PRODUCT OVERVIEW

Movie Booking Website is a centralized web platform allowing users to browse movies, check showtimes, select seats through a visual seat-map, and book tickets with online payment options (PayOS). Users can view booking history and manage accounts. Admins can manage movie listings, theaters, showtimes, bookings, and user accounts.

**Technology Stack:**
- **Frontend:** React (Vite + Tailwind CSS + TypeScript)
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens)
- **Testing:** Jest (Unit), Playwright (E2E)
- **Deployment:** Netlify (Frontend), Render (Backend), MongoDB Atlas (Database)

---

## 2. TEST PLAN OBJECTIVE

The primary objective of this test plan is to ensure the Movie Booking Website meets all functional and non-functional requirements as specified in the SRS (Software Requirements Specification).

**Specific Goals:**
- Verify that users can successfully browse movies, select seats, and book tickets
- Ensure the integrity of the seat selection process (preventing double bookings)
- Confirm that administrative changes are reflected accurately in the user interface
- Validate authentication and authorization mechanisms
- Test internationalization (i18n) features (English/Vietnamese)
- Verify security requirements (XSS protection, input sanitization)

---

## 3. TESTING STRATEGY

The testing scope encompasses the entire application lifecycle, from user registration to the final booking confirmation.

### 3.1. System Test (E2E)

System testing will verify the complete, end-to-end behavior of the system using **Playwright** framework.

**Typical scenarios based on SRS Use Cases:**

| SRS Use Case | Test Scenario |
|--------------|---------------|
| UC-V-1: Explore and Search Movies | Browse movie list, search by title |
| UC-V-2: View Showings | View showtimes for selected movie |
| UC-V-3: Register for an Account | User registration flow |
| UC-V-4: Log In | User login with valid/invalid credentials |
| UC-U-1: Manage User Profile | View and update profile |
| UC-U-2: Book Ticket | Complete booking flow |
| UC-U-3: View Booking History | View past bookings |
| UC-A-1: Manage Movies (CRUD) | Admin movie management |
| UC-A-2: Manage Showings (CRUD) | Admin showtime management |
| UC-A-3: Manage Bookings (CRUD) | Admin booking management |
| UC-A-4: Manage Users | Admin user management |

### 3.2. Performance Test

Performance tests will determine whether the system meets response time expectations under expected load.

**Focus Areas:**
- Seat-map rendering latency
- Simultaneous booking attempts on popular showtimes
- Payment confirmation responsiveness
- Dashboard query performance

**Targets:**
- Page navigation and seat map updates should remain responsive
- Booking confirmation should complete without timeout
- System should handle typical peak load without degradation

### 3.3. Recovery Test

Recovery tests will force failures to ensure data integrity.

**Test Scenarios:**
- Browser refresh/disconnect during seat selection or payment
- Server restart during booking
- Payment cancellation or partial submission
- Database restart or temporary loss of connectivity

**Expected Outcomes:**
- No duplicate charges or double bookings
- Seat locking logic releases abandoned reservations
- Users can continue a booking where possible
- Database records remain consistent

### 3.4. Installation / Compatibility Test

**Compatibility Checks:**
- Successful installation and deployment
- Correct configuration of environment variables
- Normal operation across supported browsers (Chrome/Edge/Firefox)
- Consistent display on different screen resolutions
- Support for development and production environments

### 3.5. General Testing Process Approach

1. Review functional requirements (SRS) and repository documentation
2. Develop the test plan and define testing scope
3. Design test cases for core modules and edge cases
4. Prepare necessary test data and environments
5. Execute tests and collect evidence/logs
6. Record and prioritize defects
7. Perform regression testing after fixes
8. Compile the final test report

### 3.6. Items to be Tested

Based on SRS Requirements:
- Authentication and authorization (JWT based) - FR-V-3.x, FR-V-4.x
- Movie information listing and filtering - FR-V-1.x
- Theater and showtime management - FR-V-2.x
- Seat selection and seat-locking logic - FR-U-2.x
- Booking creation and payment processing - FR-U-2.5, FR-U-4.x
- Booking history and ticket information - FR-U-3.x
- Administrative management - FR-A-1.x to FR-A-4.x
- Internationalization (i18n) - FR-SYS-1.x
- Security features - SEC-1 to SEC-4

### 3.7. Items NOT to be Tested

- Mobile applications (not included in this release)
- Loyalty programs, vouchers, coupons (future scope)
- External movie rating APIs
- Hardware-based ticket scanners
- Third-party service performance (PayOS servers)

---

## 4. HARDWARE / SOFTWARE RESOURCES

### 4.1. Hardware Requirements

| Component | Minimum Requirement |
|-----------|---------------------|
| CPU | ≥ 2 Cores |
| RAM | ≥ 8 GB |
| Internet | ≥ 10 Mbps |
| Storage | ≥ 10 GB free space |

### 4.2. Software Requirements

| Software | Version |
|----------|---------|
| Operating System | Windows / Linux / macOS |
| Browsers | Chrome, Edge, Firefox (latest) |
| Node.js | v20+ |
| MongoDB | v6+ |
| NPM/Yarn | Latest |
| Postman | For API validation |
| VS Code | For development |
| Git | For version control |

### 4.3. Standards/Reference Material

- IEEE Std 830-1998 (Software Requirements Specifications)
- ISO/IEC/IEEE 29119 (Software Testing)
- Payment API Documentation (PayOS)
- REST API conventions
- Playwright Documentation
- Jest Documentation

---

## 5. TYPES OF TESTING

### 5.1. FEATURE TEST

#### 5.1.1. Features to be Tested (Mapped to SRS)

##### Authentication Module (SRS Section 3.1)

| SRS Requirement | Feature | Test Scope |
|-----------------|---------|------------|
| FR-V-3.1 | Registration form | Validate form fields |
| FR-V-3.2 | Input validation | Email format, password strength |
| FR-V-3.3 | Duplicate email check | Error handling |
| FR-V-3.4 | POST /api/auth/register | API integration |
| FR-V-3.5 | Password hashing | Security verification |
| FR-V-4.1 | Login form | Form display |
| FR-V-4.2 | POST /api/auth/login | API integration |
| FR-V-4.3 | JWT token generation | Token validation |
| FR-V-4.4 | Token storage | localStorage security |

##### Movie Module (SRS Section 3.1)

| SRS Requirement | Feature | Test Scope |
|-----------------|---------|------------|
| FR-V-1.1 | Movie gallery display | Now Playing, Coming Soon |
| FR-V-1.2 | Search bar | Search by title |
| FR-V-1.3 | Filter options | By genre, rating |
| FR-V-1.4 | Movie details page | Synopsis, cast, trailer |
| FR-V-2.1 | Showtime list | Available showtimes |
| FR-V-2.2 | Date filter | Filter by date |
| FR-V-2.3 | Theater filter | Group by theater |

##### Booking Module (SRS Section 3.2)

| SRS Requirement | Feature | Test Scope |
|-----------------|---------|------------|
| FR-U-2.1 | Login requirement | Redirect to login |
| FR-U-2.2 | Interactive seating map | Visual seat display |
| FR-U-2.3 | Seat differentiation | Available/Occupied/Selected |
| FR-U-2.4 | Multiple seat selection | Select multiple seats |
| FR-U-2.5 | POST /api/bookings | Booking creation |
| FR-U-2.6 | Concurrency handling | Prevent double booking |

##### Payment Module (SRS Section 3.2)

| SRS Requirement | Feature | Test Scope |
|-----------------|---------|------------|
| FR-U-4.1 | Payment modal | PayOS integration |
| FR-U-4.2 | Status update | pending → confirmed |
| FR-U-4.3 | QR Code generation | Booking reference |
| FR-U-4.4 | Timeout handling | 15-minute release |

##### Profile Module (SRS Section 3.2)

| SRS Requirement | Feature | Test Scope |
|-----------------|---------|------------|
| FR-U-1.1 | Profile page access | User profile display |
| FR-U-1.2 | GET /api/auth/profile | Fetch user details |
| FR-U-1.3 | Update profile | Change name, password |
| FR-U-3.1 | My Bookings section | Booking history |
| FR-U-3.2 | Booking list | Display all bookings |

##### Admin Module (SRS Section 3.3)

| SRS Requirement | Feature | Test Scope |
|-----------------|---------|------------|
| FR-A-1.1 | Admin Dashboard | Secure admin interface |
| FR-A-1.2 | Create movie | Add new movie entry |
| FR-A-1.3 | Update movie | Edit movie details |
| FR-A-1.4 | Delete movie | Remove movie |
| FR-A-2.1 | Create showing | Associate movie/theater/time |
| FR-A-2.2 | View showings | List all showings |
| FR-A-2.3 | Update/Delete showing | Modify showings |
| FR-A-3.1 | View bookings | Filter by user/movie |
| FR-A-3.2 | Cancel/Modify booking | Issue refunds |
| FR-A-4.1 | User list | Pagination support |
| FR-A-4.2 | Lock/Unlock user | Account management |
| FR-A-4.3 | Role assignment | Admin role management |

##### System/Security Module (SRS Section 6)

| SRS Requirement | Feature | Test Scope |
|-----------------|---------|------------|
| SEC-1 | JWT expiration | Token management |
| SEC-2 | Helmet headers | Secure HTTP headers |
| SEC-3 | Rate limiting | 1000 req/15min/IP |
| SEC-4 | Input sanitization | NoSQL injection prevention |
| FR-SYS-1.1 | Language toggle | EN/VI switch |
| FR-SYS-1.2 | Currency format | USD/VND display |

#### 5.1.2. Features NOT to be Tested

- Bulk theater migration scripts
- External payment dispute process
- Performance of third-party services (PayOS servers)
- Loyalty programs and vouchers

### 5.2. UNIT TESTING

Unit tests are implemented using **Jest** framework for testing utility functions.

| Test File | Module | Function Tested |
|-----------|--------|-----------------|
| calculateTotalPrice.test.ts | Booking | Price calculation |
| convertCurrency.test.ts | i18n | USD/VND conversion |
| currency.test.ts | i18n | Currency formatting |
| formatDate.test.ts | Utils | Date formatting |
| formatTime.test.ts | Utils | Time formatting |
| generateBookingReference.test.ts | Booking | Reference generation |
| isValidDate.test.ts | Validation | Date validation |
| sanitizeInput.test.ts | Security | XSS prevention |
| validateEmail.test.ts | Auth | Email validation |
| validatePassword.test.ts | Auth | Password strength |
| validateSeatSelection.test.ts | Booking | Seat validation |

### 5.3. INSTALLATION TEST

Installation tests validate that the system can be successfully set up and operated.

**Activities:**
- Deploy backend (Node.js + Express + MongoDB) and frontend (React/Vite)
- Verify environment configuration (.env files)
- Launch web application in supported browsers
- Validate logging and error-handling
- Confirm cleanup procedures

---

## 6. RISKS & CONTINGENCIES

| Risk | Probability | Impact | Contingency |
|------|-------------|--------|-------------|
| High concurrency seat conflict | Medium | High | Implement atomic DB operations; queue transactions |
| Payment failures | Medium | High | Retry logic; confirm non-duplicate charge |
| Seat lock remains after interruption | Medium | Medium | Auto-expiry system (time-based release) |
| MongoDB outage | Low | Critical | Backup + reconnect logic |
| Unauthorized admin access | Low | Critical | RBAC test suite + DB seed sanitization |
| User abandons payment mid-process | High | Medium | Partial reservation cleanup logic |
| Browser compatibility issues | Medium | Medium | Cross-browser testing with Playwright |
| API rate limiting triggered | Low | Low | Implement request throttling |

---

## 7. SUSPENSION CRITERIA AND RESUMPTION REQUIREMENTS

### 7.1. Suspension Criteria

Testing will be suspended if:
- Booking flow blocked due to fatal bug (Critical)
- MongoDB unavailable (Critical)
- Payment sandbox inaccessible (High)
- Admin dashboard unresponsive (High)
- Authentication system failure (Critical)
- More than 50% of test cases blocked (High)

### 7.2. Resumption Requirements

Testing may resume when:
- Fix deployed and verified in test environment
- Core flows pass smoke testing
- No open Critical defects
- Infrastructure restored and verified
- Test data integrity confirmed

---

## 8. TEST SCHEDULE AND RESOURCES

### 8.1. Test Schedule

| Phase | Activity | Start Date | End Date | Owner |
|-------|----------|------------|----------|-------|
| 1 | Test Plan Development | 20/10/2025 | 27/10/2025 | Tran Dai Thang |
| 2 | Test Case Design | 28/10/2025 | 29/10/2025 | Doan Duc Trung, Le Nguyen Khang |
| 3 | Test Case Review | 29/10/2025 | 30/10/2025 | Tran Dai Thang, Le Nguyen Hung |
| 4 | Test Environment Setup | 01/11/2025 | 05/11/2025 | Le Nguyen Hung |
| 5 | Manual Test - Cycle 1 | 07/11/2025 | 08/11/2025 | Tran Dai Thang, Doan Duc Trung |
| 6 | Defect Reports - Cycle 1 | 08/11/2025 | 10/11/2025 | Doan Duc Trung |
| 7 | Regression - Cycle 2 | 21/11/2025 | 22/11/2025 | Le Nguyen Hung, Le Nguyen Khang |
| 8 | Defect Reports - Cycle 2 | 22/11/2025 | 24/11/2025 | Le Nguyen Khang |
| 9 | Performance & Recovery Test | 28/11/2025 | 30/11/2025 | Le Nguyen Hung |
| 10 | UAT & Sign-off | 12/12/2025 | 15/12/2025 | Tran Dai Thang |
| 11 | Final Test Report | 24/12/2025 | 24/12/2025 | Tran Dai Thang |

### 8.2. Resources

| Resource | Quantity | Purpose |
|----------|----------|---------|
| Test Leader | 1 | Tran Dai Thang - Management & oversight |
| Testers | 3 | Test execution & defect reporting |
| Test Environment | 1 | Staging server for testing |
| Test Data | - | Seed data for movies, theaters, users |

---

## 9. ROLES AND RESPONSIBILITIES

### Test Leader: Tran Dai Thang (23521432)
**Allocation:** 100%

**Responsibilities:**
- Provide technical direction and test strategy
- Acquire and manage appropriate resources
- Status reporting and risk escalation
- Ensure environments, data, and test assets are provisioned
- Approve entry/exit criteria and sign-off
- Final test report compilation

### Test Designer / Tester: Doan Duc Trung (23521674)
**Allocation:** 80%

**Responsibilities:**
- Generate and review test cases (E2E/functional)
- Define acceptance criteria and traceability to SRS
- Prepare/seed test data and fixtures
- Execute authentication and booking module tests
- Document defects and evidence

### Test Designer / Tester: Le Nguyen Hung (22520507)
**Allocation:** 80%

**Responsibilities:**
- Design test cases for admin and system modules
- Environment setup and configuration
- Performance and recovery testing
- Cross-browser compatibility testing
- Regression testing coordination

### Tester: Le Nguyen Khang (23520689)
**Allocation:** 70%

**Responsibilities:**
- Execute test cases as assigned
- Capture evidence (screenshots, logs)
- File and track defects
- Perform error recovery and reruns
- Verify fixes and run targeted regression
- Maintain execution reports

---

## 10. DELIVERABLES

| Deliverable | Responsibility | Completion Date | Status |
|-------------|----------------|-----------------|--------|
| Test Plan Document | Tran Dai Thang | 27/10/2025 | ✅ Complete |
| Test Cases (Functional Suite v1) | Doan Duc Trung, Le Nguyen Khang | 28/10/2025 | ✅ Complete |
| Test Case Review & Approval | Tran Dai Thang, Le Nguyen Hung | 29/10/2025 | ✅ Complete |
| Test Environment Setup | Le Nguyen Hung | 05/11/2025 | ✅ Complete |
| Execute Manual Tests - Cycle 1 | Tran Dai Thang, Doan Duc Trung | 07/11/2025 | ✅ Complete |
| Defect Reports - Cycle 1 | Doan Duc Trung | 08/11/2025 | ✅ Complete |
| Execute Regression - Cycle 2 | Le Nguyen Hung, Le Nguyen Khang | 21/11/2025 | ✅ Complete |
| Defect Reports - Cycle 2 | Le Nguyen Khang | 22/11/2025 | ✅ Complete |
| Performance & Recovery Test Report | Le Nguyen Hung | 28/11/2025 | ⏳ In Progress |
| UAT Checklist & Sign-off | Tran Dai Thang | 12/12/2025 | ⏳ Pending |
| Final Test Report & Handover | Tran Dai Thang | 24/12/2025 | ⏳ Pending |

---

## 11. APPENDIX A: USE CASE TO TEST CASE TRACEABILITY

### Mapping SRS Use Cases to Test Cases

| SRS Use Case ID | Use Case Name | Test File | Test Case ID | Priority |
|-----------------|---------------|-----------|--------------|----------|
| **Visitor Use Cases** |
| UC-V-1 | Explore and Search Movies | movie.spec.ts | [MOVIE]-01, [MOVIE]-02 | High |
| UC-V-2 | View Showings | booking.spec.ts | [BOOKING]-01 | High |
| UC-V-3 | Register for an Account | auth.spec.ts | [AUTH]-04, [AUTH]-05 | High |
| UC-V-4 | Log In | auth.spec.ts | [AUTH]-01, [AUTH]-02, [AUTH]-03 | High |
| **Registered User Use Cases** |
| UC-U-1 | Manage User Profile | profile.spec.ts | [PROFILE]-01, [PROFILE]-02 | Medium |
| UC-U-2 | Book Ticket | booking.spec.ts | [BOOKING]-02 to [BOOKING]-05 | High |
| UC-U-3 | View Booking History | profile.spec.ts | [PROFILE]-01 | Medium |
| UC-U-4 | Payment & Ticket Generation | payment.spec.ts | [PAYMENT]-01 to [PAYMENT]-06 | High |
| **Administrator Use Cases** |
| UC-A-1 | Manage Movies (CRUD) | admin.spec.ts | [ADMIN]-02, [ADMIN]-03, [ADMIN]-04 | High |
| UC-A-2 | Manage Showings (CRUD) | admin.spec.ts | [ADMIN]-06 | High |
| UC-A-3 | Manage Bookings (CRUD) | admin.spec.ts | (Implied) | Medium |
| UC-A-4 | Manage Users | admin.spec.ts | [ADMIN]-07 | Medium |
| **System Use Cases** |
| SYS-1 | Internationalization (i18n) | system.spec.ts | (Manual) | Medium |
| SEC-1 | Token Management | system.spec.ts | [SYS]-01, [SYS]-05 | High |
| SEC-2 | Secure Headers | system.spec.ts | [SYS]-02 | High |
| SEC-4 | Input Sanitization | system.spec.ts | [SYS]-04 | High |

### Test Case Details by Module

#### Authentication Module [AUTH]

| Test ID | Description | SRS Ref | Status |
|---------|-------------|---------|--------|
| [AUTH]-01 | Verify Login Form Display | FR-V-4.1 | ✅ Implemented |
| [AUTH]-02 | Login Success | FR-V-4.2, FR-V-4.3 | ✅ Implemented |
| [AUTH]-03 | Login Failure (Wrong Password) | FR-V-4.3 | ✅ Implemented |
| [AUTH]-04 | Register Success | FR-V-3.1 to FR-V-3.5 | ✅ Implemented |
| [AUTH]-05 | Register Failure (Existing Email) | FR-V-3.3 | ✅ Implemented |
| [AUTH]-06 | Logout | (Implied) | ✅ Implemented |

#### Movie Module [MOVIE]

| Test ID | Description | SRS Ref | Status |
|---------|-------------|---------|--------|
| [MOVIE]-01 | Verify Movie List Display | FR-V-1.1 | ✅ Implemented |
| [MOVIE]-02 | Search Movie Functionality | FR-V-1.2 | ✅ Implemented |
| [MOVIE]-03 | View Movie Details | FR-V-1.4 | ✅ Implemented |

#### Booking Module [BOOKING]

| Test ID | Description | SRS Ref | Status |
|---------|-------------|---------|--------|
| [BOOKING]-01 | Chọn suất chiếu | FR-V-2.1 | ✅ Implemented |
| [BOOKING]-02 | Hiển thị sơ đồ ghế | FR-U-2.2 | ✅ Implemented |
| [BOOKING]-03 | Chọn ghế | FR-U-2.3, FR-U-2.4 | ⏸️ Skipped |
| [BOOKING]-04 | Không chọn được ghế đã đặt | FR-U-2.6 | ✅ Implemented |
| [BOOKING]-05 | Hoàn tất đặt vé | FR-U-2.5 | ⏸️ Skipped |

#### Payment Module [PAYMENT]

| Test ID | Description | SRS Ref | Status |
|---------|-------------|---------|--------|
| [PAYMENT]-01 | Hiển thị màn hình thanh toán | FR-U-4.1 | ✅ Implemented |
| [PAYMENT]-02 to 05 | Payment Methods | FR-U-4.1 | ✅ Implemented |
| [PAYMENT]-06 | Xử lý lỗi thanh toán | FR-U-4.4 | ✅ Implemented |

#### Admin Module [ADMIN]

| Test ID | Description | SRS Ref | Status |
|---------|-------------|---------|--------|
| [ADMIN]-01 | Đăng nhập admin | FR-A-1.1 | ✅ Implemented |
| [ADMIN]-02 | Thêm phim mới | FR-A-1.2 | ✅ Implemented |
| [ADMIN]-03 | Sửa thông tin phim | FR-A-1.3 | ✅ Implemented |
| [ADMIN]-04 | Xóa phim | FR-A-1.4 | ✅ Implemented |
| [ADMIN]-05 | Quản lý rạp | FR-A-2.x | ✅ Implemented |
| [ADMIN]-06 | Quản lý suất chiếu | FR-A-2.x | ✅ Implemented |
| [ADMIN]-07 | Quản lý người dùng | FR-A-4.x | ✅ Implemented |

#### System Module [SYS]

| Test ID | Description | SRS Ref | Status |
|---------|-------------|---------|--------|
| [SYS]-01 | Kiểm thử phiên đăng nhập hết hạn | SEC-1 | ✅ Implemented |
| [SYS]-02 | Truy cập trang bảo mật khi chưa đăng nhập | SEC-2 | ✅ Implemented |
| [SYS]-03 | Kiểm thử link không tồn tại (404) | UI-4 | ✅ Implemented |
| [SYS]-04 | Bảo mật - Nhập mã độc XSS | SEC-4 | ✅ Implemented |
| [SYS]-05 | Bảo mật - Gọi API không có token | SEC-1 | ✅ Implemented |

#### Profile Module [PROFILE]

| Test ID | Description | SRS Ref | Status |
|---------|-------------|---------|--------|
| [PROFILE]-01 | Xem lịch sử đặt vé | FR-U-3.1, FR-U-3.2 | ✅ Implemented |
| [PROFILE]-02 | Cập nhật thông tin cá nhân | FR-U-1.3 | ✅ Implemented |

---

## 12. APPENDIX B: TEST METRICS

### Target Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Test Case Pass Rate | ≥ 95% | TBD |
| Critical Defects at Release | 0 | TBD |
| High Defects at Release | ≤ 2 | TBD |
| Test Coverage (E2E) | ≥ 80% | ~85% |
| Unit Test Coverage | ≥ 70% | TBD |
| Defect Detection Efficiency | ≥ 85% | TBD |

### Test Summary

| Module | Total Tests | Passed | Failed | Skipped | Pass Rate |
|--------|-------------|--------|--------|---------|-----------|
| AUTH | 6 | - | - | 0 | TBD |
| MOVIE | 3 | - | - | 0 | TBD |
| BOOKING | 5 | - | - | 2 | TBD |
| PAYMENT | 6 | - | - | - | TBD |
| ADMIN | 7 | - | - | - | TBD |
| PROFILE | 2 | - | - | - | TBD |
| SYSTEM | 5 | - | - | - | TBD |
| **TOTAL** | **34** | - | - | - | TBD |

---

**Document Version:** 2.0  
**Last Updated:** December 14, 2025  
**Author:** Tran Dai Thang (Test Leader)  
**Reviewed By:** Group 7 Team
