# Software Development, Operations & Maintenance Plan
# Kế Hoạch Phát Triển, Vận Hành & Bảo Trì Phần Mềm

## CinemaVision Pro - Online Movie Ticket Booking System

> **Version:** 1.0
> **Prepared by:** Group 7 - SE113.Q11 - UIT
> - Le Van Bao - 23520112
> - Tran Dai Thang - 23521432
> - Nguyen Xuan Nhat Minh - 23520946
> - Doan Duc Trung - 23521674
>
> **Date:** April 12, 2026

---

## Table of Contents

- [Phần I: Phát Triển Phần Mềm (Development)](#phần-i-phát-triển-phần-mềm-development)
  - [1. Tổng Quan Dự Án](#1-tổng-quan-dự-án)
  - [2. Mô Hình Phát Triển](#2-mô-hình-phát-triển)
  - [3. Kiến Trúc Hệ Thống](#3-kiến-trúc-hệ-thống)
  - [4. Công Nghệ Sử Dụng](#4-công-nghệ-sử-dụng)
  - [5. Quy Trình Phát Triển](#5-quy-trình-phát-triển)
  - [6. Phân Công Công Việc](#6-phân-công-công-việc)
  - [7. Kiểm Thử](#7-kiểm-thử)
- [Phần II: Vận Hành Phần Mềm (Operations)](#phần-ii-vận-hành-phần-mềm-operations)
  - [8. Môi Trường Triển Khai](#8-môi-trường-triển-khai)
  - [9. Quy Trình Triển Khai (CI/CD)](#9-quy-trình-triển-khai-cicd)
  - [10. Giám Sát & Logging](#10-giám-sát--logging)
  - [11. Quản Lý Cấu Hình](#11-quản-lý-cấu-hình)
  - [12. Backup & Khôi Phục Dữ Liệu](#12-backup--khôi-phục-dữ-liệu)
  - [13. Bảo Mật Vận Hành](#13-bảo-mật-vận-hành)
- [Phần III: Bảo Trì Phần Mềm (Maintenance)](#phần-iii-bảo-trì-phần-mềm-maintenance)
  - [14. Phân Loại Bảo Trì](#14-phân-loại-bảo-trì)
  - [15. Quy Trình Xử Lý Lỗi](#15-quy-trình-xử-lý-lỗi)
  - [16. Kế Hoạch Cập Nhật & Nâng Cấp](#16-kế-hoạch-cập-nhật--nâng-cấp)
  - [17. Quản Lý Nợ Kỹ Thuật](#17-quản-lý-nợ-kỹ-thuật)
  - [18. Tài Liệu Hóa](#18-tài-liệu-hóa)
- [Phần IV: Đánh Giá & Kết Luận](#phần-iv-đánh-giá--kết-luận)
  - [19. Rủi Ro & Biện Pháp Giảm Thiểu](#19-rủi-ro--biện-pháp-giảm-thiểu)
  - [20. Tiến Độ Tổng Thể](#20-tiến-độ-tổng-thể)
  - [21. Bài Học Kinh Nghiệm](#21-bài-học-kinh-nghiệm)
  - [22. Kết Luận](#22-kết-luận)

---

# Phần I: Phát Triển Phần Mềm (Development)

## 1. Tổng Quan Dự Án

### 1.1 Mô tả sản phẩm

**CinemaVision Pro** là một hệ thống đặt vé xem phim trực tuyến full-stack, cho phép người dùng duyệt phim, xem suất chiếu, chọn ghế tương tác, thanh toán và nhận vé điện tử QR Code.

### 1.2 Phạm vi

| Hạng mục | Mô tả |
|---|---|
| **Loại dự án** | Đồ án học thuật - Môn SE113.Q11 |
| **Quy mô nhóm** | 4 thành viên |
| **Thời gian** | ~12 tuần |
| **Kiến trúc** | Full-stack Monorepo (Frontend + Backend) |
| **Mô hình** | Client-Server, SPA + REST API |

### 1.3 Tính năng chính đã triển khai

| # | Module | Tính năng | Trạng thái |
|---|---|---|---|
| 1 | **Authentication** | Register, Login, JWT, Forgot/Reset Password, Change Password | ✅ Hoàn thành |
| 2 | **Movie** | Browse, Search, Filter (genre/rating), Movie Details | ✅ Hoàn thành |
| 3 | **Theater** | Browse by Region, Theater Details, Theater-Movie-Showtime flow | ✅ Hoàn thành |
| 4 | **Showtime** | View by Movie/Theater, Filter by Date | ✅ Hoàn thành |
| 5 | **Booking** | Seat Selection, Payment Simulation, QR Ticket, Cancel, History | ✅ Hoàn thành |
| 6 | **Admin** | Dashboard Stats, CRUD Movies/Theaters/Showtimes, User/Booking Mgmt | ✅ Hoàn thành |
| 7 | **i18n** | EN/VI Language Switch, VND/USD Currency | ✅ Hoàn thành |
| 8 | **Security** | Helmet, Rate Limiting, CORS, Input Sanitization | ✅ Hoàn thành |

---

## 2. Mô Hình Phát Triển

### 2.1 Methodology: Agile-Scrum (Simplified)

Nhóm áp dụng mô hình **Agile-Scrum** đơn giản hóa, phù hợp với quy mô nhóm nhỏ (4 người) và dự án học thuật.

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ Sprint 1│───►│ Sprint 2│───►│ Sprint 3│───►│ Sprint 4│
│ (2 tuần)│    │ (3 tuần)│    │ (3 tuần)│    │ (3 tuần)│
│ Setup & │    │ Backend │    │ Frontend│    │ Polish &│
│ Design  │    │  Core   │    │  Core   │    │ Testing │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
     │              │              │              │
     ▼              ▼              ▼              ▼
  Backlog       API Done      UI Done       Release
  Created       DB Setup     Integration    Deployed
```

### 2.2 Các nguyên tắc Agile áp dụng

| Nguyên tắc | Áp dụng trong dự án |
|---|---|
| **Iterative Development** | Phát triển qua 4 sprint, mỗi sprint có deliverable rõ ràng |
| **Working Software** | Mỗi sprint kết thúc bằng phiên bản chạy được |
| **Collaboration** | Họp nhóm hàng tuần, review code qua GitHub |
| **Responding to Change** | Linh hoạt điều chỉnh features giữa các sprint |
| **Simplicity** | Ưu tiên MVP trước, bổ sung tính năng nâng cao sau |

### 2.3 Quản lý Source Code

| Tool | Mục đích |
|---|---|
| **Git** | Version control |
| **GitHub** | Remote repository, collaboration |
| **Branching Strategy** | `main` (production) ← `feature/*` branches |
| **Code Review** | Pull Request review trước khi merge |

---

## 3. Kiến Trúc Hệ Thống

### 3.1 Tổng quan kiến trúc

```
┌──────────────────────────────────────────────────────────────┐
│                    CINEMAVISION PRO                           │
├──────────────────────┬───────────────────────────────────────┤
│                      │                                       │
│   ┌──────────────┐   │   ┌──────────────┐                   │
│   │   Frontend    │   │   │   Backend    │                   │
│   │              │   │   │              │                   │
│   │  React 19    │   │   │  Express 5.0 │                   │
│   │  TypeScript  │───┼──►│  Node.js     │                   │
│   │  Vite        │   │   │  JWT Auth    │                   │
│   │  Tailwind    │◄──┼───│  Mongoose    │                   │
│   │              │   │   │              │                   │
│   └──────────────┘   │   └──────┬───────┘                   │
│                      │          │                            │
│   Netlify/Vercel     │          │ MongoDB Protocol           │
│                      │          │                            │
│                      │   ┌──────▼───────┐                   │
│                      │   │ MongoDB Atlas│                   │
│                      │   │ (Cloud DB)   │                   │
│                      │   └──────────────┘                   │
├──────────────────────┴───────────────────────────────────────┤
│  Monorepo Structure: npm workspaces                          │
│  frontend/ (package) + backend/ (package)                    │
└──────────────────────────────────────────────────────────────┘
```

### 3.2 Phân lớp (Layered Architecture)

| Layer | Thành phần | Vai trò |
|---|---|---|
| **Presentation** | React Components, Tailwind CSS | Giao diện người dùng, form validation |
| **Application** | React Router, Auth Context, API Client | Điều hướng, quản lý state, gọi API |
| **Business Logic** | Express Controllers | Xử lý nghiệp vụ (booking rules, auth logic) |
| **Data Access** | Mongoose Models, Routes | CRUD operations, data validation |
| **Infrastructure** | Middleware (auth, adminAuth, helmet, rate-limit) | Security, logging, error handling |
| **Persistence** | MongoDB Atlas | Lưu trữ dữ liệu |

### 3.3 Cấu trúc Monorepo

```
movie_booking_website/
├── frontend/                    # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/          # 28 UI Components + admin/
│   │   ├── lib/                 # 11 Utility modules
│   │   ├── App.tsx              # Root + Routing
│   │   └── index.css            # Global styles
│   └── tests/                   # Jest (unit) + Playwright (E2E)
├── backend/                     # Node.js + Express 5.0
│   └── server/
│       ├── controllers/         # 6 Controllers
│       ├── middleware/          # 2 Middleware (auth, adminAuth)
│       ├── models/              # 5 Mongoose Models
│       ├── routes/              # 6 Route files
│       ├── utils/               # Email service
│       ├── server.js            # Entry point
│       └── seedData.js          # Database seeder
├── docs/                        # Documentation
├── logs/                        # Server logs
├── .env.example                 # Env template
└── package.json                 # Root workspace config
```

---

## 4. Công Nghệ Sử Dụng

### 4.1 Frontend Stack

| Công nghệ | Version | Vai trò |
|---|---|---|
| React | 19.x | Component-based UI library |
| TypeScript | ~5.7 | Type safety |
| Vite | 6.x | Build tool + Dev server (HMR) |
| Tailwind CSS | 3.x | Utility-first CSS framework |
| React Router | 7.x | Client-side SPA routing |
| Lucide React | 0.546+ | Icon set |
| Sonner | 2.x | Toast notifications |
| qrcode.react | 4.x | QR Code generation cho vé |
| clsx + tailwind-merge | Latest | Conditional CSS class composition |

### 4.2 Backend Stack

| Công nghệ | Version | Vai trò |
|---|---|---|
| Node.js | LTS | JavaScript runtime |
| Express.js | 5.0 | Web framework (REST API) |
| MongoDB | Atlas | NoSQL cloud database |
| Mongoose | 8.x | ODM (Object-Document Mapper) |
| bcryptjs | 3.x | Password hashing (bcrypt) |
| jsonwebtoken | 9.x | JWT authentication |
| Helmet | 8.x | Secure HTTP headers |
| express-rate-limit | 8.x | API rate limiting |
| cors | 2.x | Cross-Origin Resource Sharing |
| Nodemailer | 8.x | Email service (password reset) |
| dotenv | 16.x | Environment variable management |

### 4.3 Testing & Quality

| Công nghệ | Vai trò |
|---|---|
| Jest | Unit testing (currency, validation, date utils) |
| Playwright | E2E testing (login, booking, admin flows) |
| ESLint | Code linting |
| Prettier | Code formatting |
| TypeScript Compiler | Static type checking |

---

## 5. Quy Trình Phát Triển

### 5.1 Sprint Breakdown

#### Sprint 1: Setup & Design (Tuần 1-2)

| Task | Deliverable |
|---|---|
| Phân tích yêu cầu | SRS Document v1.0 |
| Thiết kế database schema | 5 Mongoose Models (User, Movie, Theater, Showtime, Booking) |
| Khởi tạo project | Monorepo structure, npm workspaces |
| Setup dev environment | .env.example, README, Git repo |
| UI/UX wireframe | Glassmorphism design system |

#### Sprint 2: Backend Core (Tuần 3-5)

| Task | Deliverable |
|---|---|
| Auth API | Register, Login, JWT middleware |
| Movie CRUD API | GET/POST/PUT/DELETE /api/movies |
| Theater CRUD API | GET/POST/PUT/DELETE /api/theaters |
| Showtime API | CRUD + filter by movie/theater |
| Security middleware | Helmet, rate-limit, CORS |
| Seed data script | seedData.js với sample data |

#### Sprint 3: Frontend Core + Integration (Tuần 6-8)

| Task | Deliverable |
|---|---|
| Auth UI | Login/Register forms, AuthContext |
| Movie browsing | MovieList, MovieDetails, SearchBar, FilterPanel |
| Theater flow | RegionSelector, TheaterList, TheaterMovies |
| Seat selection | Interactive SeatSelection component |
| Booking flow | PaymentModal, QR Code ticket |
| Admin dashboard | AdminLayout, MovieManagement, TheaterManagement, etc. |

#### Sprint 4: Polish, Testing & Deploy (Tuần 9-12)

| Task | Deliverable |
|---|---|
| Forgot/Reset password | ForgotPassword, ResetPassword + Nodemailer |
| i18n | Language switcher EN/VI, currency VND/USD |
| Profile management | UserProfile, EditProfileModal, ChangePasswordModal |
| Booking history | MyBookings, BookingHistory, Cancel/Delete |
| Unit tests | Jest test suite (currency, validation) |
| E2E tests | Playwright tests (login, booking flows) |
| Deployment | Netlify + Render + MongoDB Atlas |
| Documentation | SRS v2.0, Business Rules, Test Plan, Context Diagram |

### 5.2 Git Workflow

```
main ◄──────────────────────────────────────── Production
  │
  ├── feature/auth ──────── merge ──────────►
  ├── feature/movies ────── merge ──────────►
  ├── feature/booking ───── merge ──────────►
  ├── feature/admin ─────── merge ──────────►
  ├── feature/i18n ──────── merge ──────────►
  ├── fix/seat-conflict ─── merge ──────────►
  └── feature/email ─────── merge ──────────►
```

**Quy trình:**
1. Tạo branch `feature/*` hoặc `fix/*` từ `main`
2. Commit thường xuyên với message rõ ràng
3. Push và tạo Pull Request
4. Code review bởi ít nhất 1 thành viên khác
5. Merge vào `main` sau khi approve

---

## 6. Phân Công Công Việc

### 6.1 Vai trò trong nhóm

| Thành viên | MSSV | Vai trò chính | Modules phụ trách |
|---|---|---|---|
| **Le Van Bao** | 23520112 | Tech Lead / Full-stack | Kiến trúc, Backend core, Documentation |
| **Tran Dai Thang** | 23521432 | Backend Developer / Tester | API development, Testing, Database |
| **Nguyen Xuan Nhat Minh** | 23520946 | Frontend Developer | UI Components, i18n, Responsive design |
| **Doan Duc Trung** | 23521674 | Frontend Developer / DevOps | Admin Dashboard, Deployment, CI/CD |

### 6.2 RACI Matrix

| Task | Le Van Bao | Tran Dai Thang | Nguyen X.N. Minh | Doan Duc Trung |
|---|---|---|---|---|
| Kiến trúc hệ thống | **R/A** | C | I | C |
| Backend Auth API | **R** | R | I | I |
| Backend Movie/Theater API | C | **R/A** | I | I |
| Backend Booking API | **R/A** | R | I | I |
| Frontend Auth UI | I | I | **R** | C |
| Frontend Movie/Theater UI | I | I | **R/A** | C |
| Frontend Booking/Payment | I | C | **R** | R |
| Admin Dashboard | I | C | C | **R/A** |
| i18n & Localization | C | I | **R/A** | I |
| Unit Testing | C | **R/A** | I | C |
| E2E Testing | I | **R/A** | C | C |
| Deployment | C | I | I | **R/A** |
| Documentation | **R/A** | R | C | C |

> **R** = Responsible, **A** = Accountable, **C** = Consulted, **I** = Informed

---

## 7. Kiểm Thử

### 7.1 Chiến lược kiểm thử

```
┌─────────────────────────────────────────────────────┐
│                  Testing Pyramid                     │
│                                                     │
│                    ┌─────┐                           │
│                   │ E2E │  Playwright                │
│                  │ Tests│  (Core flows)              │
│                 └───────┘                            │
│               ┌───────────┐                          │
│              │ Integration│  API endpoint             │
│             │   Tests    │  testing                  │
│            └─────────────┘                           │
│          ┌─────────────────┐                         │
│         │    Unit Tests    │  Jest                    │
│        │  (currency, date, │ (Utility functions)     │
│       │    validation)     │                         │
│      └─────────────────────┘                         │
└─────────────────────────────────────────────────────┘
```

### 7.2 Các loại kiểm thử

| Loại | Tool | Phạm vi | Vị trí |
|---|---|---|---|
| **Unit Test** | Jest | Currency formatting, validation, date utils | `frontend/tests/lab2/` |
| **E2E Test** | Playwright | Login flow, booking flow, admin CRUD | `frontend/tests/lab1/` |
| **Manual Test** | Browser | UI/UX, responsive, cross-browser | Thủ công |
| **Security Test** | Manual | JWT, rate limiting, CORS, injection | Thủ công |

### 7.3 Lệnh chạy test

```bash
npm test              # Chạy unit tests (Jest)
npm run test:watch    # Chạy Jest ở watch mode
npm run test:coverage # Chạy Jest với coverage report
npm run lint          # TypeScript type check + Vite build check
```

---

# Phần II: Vận Hành Phần Mềm (Operations)

## 8. Môi Trường Triển Khai

### 8.1 Tổng quan các môi trường

| Môi trường | Mục đích | Nền tảng |
|---|---|---|
| **Development** | Phát triển & debug | localhost (Vite :5173 + Express :5000) |
| **Production** | Người dùng truy cập | Netlify/Vercel + Render + MongoDB Atlas |

### 8.2 Infrastructure Stack

```
┌─────────────────────────────────────────────────────────┐
│                   PRODUCTION ENVIRONMENT                 │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Netlify/   │  │    Render    │  │   MongoDB    │  │
│  │   Vercel     │  │              │  │   Atlas      │  │
│  │              │  │              │  │              │  │
│  │  Static SPA  │  │  Express API │  │  Cloud DB    │  │
│  │  (React)     │  │  (Node.js)   │  │  (NoSQL)     │  │
│  │              │  │              │  │              │  │
│  │  Free tier   │  │  Free tier   │  │  Free tier   │  │
│  │  100GB BW    │  │  750h/month  │  │  512MB       │  │
│  └──────────────┘  └──────┬───────┘  └──────────────┘  │
│                           │                             │
│                    ┌──────▼───────┐                     │
│                    │  SMTP Server │                     │
│                    │ (Nodemailer) │                     │
│                    └──────────────┘                     │
└─────────────────────────────────────────────────────────┘
```

### 8.3 Thông số vận hành

| Metric | Target | Thực tế |
|---|---|---|
| Uptime | 99% | ~99% (phụ thuộc Render free tier) |
| Cold start (Render) | < 30s | ~15-30s sau 15 phút idle |
| API response time | < 500ms | ~100-300ms (normal operations) |
| Max request rate | 1000 req/15min/IP | Enforced by express-rate-limit |
| DB storage limit | 512MB (Free) | Đủ cho scope dự án |

---

## 9. Quy Trình Triển Khai (CI/CD)

### 9.1 Deployment Pipeline

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Code    │    │  Build   │    │  Test    │    │  Deploy  │
│  Push    │───►│  Check   │───►│  Run     │───►│  Live    │
│          │    │          │    │          │    │          │
│ git push │    │ npm lint │    │ npm test │    │ Auto     │
│ to main  │    │ tsc      │    │ jest     │    │ Deploy   │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
```

### 9.2 Deployment Steps

#### Frontend (Netlify/Vercel)

```bash
# 1. Build production bundle
npm run build -w frontend

# 2. Output: frontend/dist/
# 3. Netlify/Vercel auto-deploys on push to main
```

**Cấu hình Vercel:**
- Build Command: `npm run vercel-build`
- Output Directory: `frontend/dist`
- Environment: `VITE_API_BASE_URL` → Backend URL

#### Backend (Render)

```bash
# Start command
node backend/server/server.js
```

**Cấu hình Render (`render.yaml`):**
- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variables: `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `FRONTEND_URL`, `PORT`

#### Database (MongoDB Atlas)

- Cluster type: M0 (Free shared)
- Region: Southeast Asia
- Connection: SRV connection string trong `MONGODB_URI`

### 9.3 Rollback Strategy

| Tình huống | Chiến lược |
|---|---|
| Frontend lỗi sau deploy | Netlify/Vercel: rollback to previous deploy (1 click) |
| Backend lỗi sau deploy | Render: rollback to previous commit |
| Database corrupted | Chạy `npm run seed` để khôi phục dữ liệu mẫu |

---

## 10. Giám Sát & Logging

### 10.1 Backend Logging

Hệ thống sử dụng custom logger ghi log vào **cả console và file**:

```javascript
// server/server.js
const logger = {
  info: (message) => {
    const logMessage = `[${timestamp}] INFO: ${message}`;
    console.log(logMessage);           // Console output
    logStream.write(logMessage + '\n'); // File: logs/server.log
  },
  error: (message) => {
    const logMessage = `[${timestamp}] ERROR: ${message}`;
    console.error(logMessage);
    logStream.write(logMessage + '\n');
  }
};
```

### 10.2 Log Categories

| Log Level | Ví dụ | Mục đích |
|---|---|---|
| **INFO** | `✅ Connected to MongoDB (Atlas)` | Tracking hoạt động bình thường |
| **INFO** | `🚀 Server running on port 5000` | Startup confirmation |
| **INFO** | `404 - Route not found: GET /api/xyz` | Invalid route attempts |
| **ERROR** | `❌ MongoDB connection error` | Database issues |
| **ERROR** | `Rate limit exceeded for IP: x.x.x.x` | Security alerts |

### 10.3 Health Check

```bash
# Endpoint: GET /api/health
# Response:
{
  "status": "OK",
  "timestamp": "2026-04-12T07:00:00.000Z"
}
```

- Dùng để monitor uptime
- Có thể tích hợp với UptimeRobot hoặc Render health checks

### 10.4 Đọc logs

```bash
# Script đọc log
node read-logs.mjs

# Hoặc trực tiếp
cat logs/server.log
```

---

## 11. Quản Lý Cấu Hình

### 11.1 Environment Variables

| Variable | Mô tả | Required |
|---|---|---|
| `MONGODB_URI` | MongoDB connection string | ✅ |
| `JWT_SECRET` | Secret key cho JWT signing | ✅ |
| `JWT_EXPIRES_IN` | Token expiry (default: `7d`) | ❌ |
| `PORT` | Backend port (default: `5000`) | ❌ |
| `FRONTEND_URL` | Allowed CORS origin | ✅ |
| `VITE_API_BASE_URL` | Backend API URL for frontend | ✅ |
| `EMAIL_HOST` | SMTP host | ❌ (cho password reset) |
| `EMAIL_PORT` | SMTP port | ❌ |
| `EMAIL_USER` | SMTP username | ❌ |
| `EMAIL_PASS` | SMTP password | ❌ |

### 11.2 Configuration Files

| File | Mục đích |
|---|---|
| `.env` | Environment variables (gitignored) |
| `.env.example` | Template cho team members |
| `render.yaml` | Render deployment configuration |
| `frontend/vite.config.ts` | Vite build configuration |
| `frontend/tailwind.config.js` | Tailwind CSS customization |
| `frontend/tsconfig.json` | TypeScript configuration |
| `frontend/playwright.config.ts` | Playwright E2E config |
| `frontend/jest.config.cjs` | Jest unit test config |

---

## 12. Backup & Khôi Phục Dữ Liệu

### 12.1 Database Backup

| Phương pháp | Mô tả | Tần suất |
|---|---|---|
| **MongoDB Atlas Auto-Backup** | Cloud backup tự động | Liên tục (Atlas managed) |
| **Seed Data Script** | `npm run seed` tạo lại dữ liệu mẫu | Khi cần reset |
| **Manual Export** | `mongodump` / `mongoexport` | Trước mỗi deployment lớn |

### 12.2 Khôi phục (Recovery)

| Tình huống | Quy trình |
|---|---|
| Database bị corrupt | 1. Restore từ Atlas backup → 2. Hoặc `npm run seed` |
| Mất dữ liệu seed | Chạy `node backend/server/seedData.js` |
| Environment variables bị mất | Tham khảo `.env.example` để tạo lại |
| Source code bị mất | Clone lại từ GitHub remote repo |

---

## 13. Bảo Mật Vận Hành

### 13.1 Security Layers

```
┌─────────────────────────────────────────────────────┐
│                 Security Architecture                │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Layer 1: Transport Security                        │
│  ├── HTTPS (Netlify/Render managed)                 │
│  └── CORS (whitelist FRONTEND_URL)                  │
│                                                     │
│  Layer 2: API Gateway Security                      │
│  ├── Helmet (secure HTTP headers)                   │
│  ├── Rate Limiting (1000 req/15min/IP)              │
│  └── Body Size Limit (10MB)                         │
│                                                     │
│  Layer 3: Authentication                            │
│  ├── JWT (7-day expiry, configurable)              │
│  ├── bcryptjs (password hashing)                    │
│  └── Reset token (hashed, 1-hour expiry)           │
│                                                     │
│  Layer 4: Authorization                             │
│  ├── Role-based access (user/admin)                 │
│  ├── Admin self-protection (no self-demote/delete) │
│  └── Booking ownership validation                   │
│                                                     │
│  Layer 5: Data Security                             │
│  ├── No raw password storage                        │
│  ├── No credit card data storage                    │
│  └── Input sanitization (profile update)           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# Phần III: Bảo Trì Phần Mềm (Maintenance)

## 14. Phân Loại Bảo Trì

### 14.1 Bốn loại bảo trì áp dụng

| Loại | Mô tả | Ví dụ trong dự án | Tỷ trọng |
|---|---|---|---|
| **Corrective** (Sửa lỗi) | Sửa bugs/defects sau khi phát hiện | Fix race condition đặt ghế, fix booking ref collision | ~30% |
| **Adaptive** (Thích ứng) | Thay đổi theo môi trường mới | Upgrade Express 4→5, cập nhật Mongoose, chuyển hosting | ~20% |
| **Perfective** (Hoàn thiện) | Cải tiến tính năng, hiệu năng | Thêm i18n, tối ưu admin dashboard, thêm QR Code | ~35% |
| **Preventive** (Phòng ngừa) | Ngăn chặn lỗi tương lai | Thêm rate limiting, helmet, input sanitization, logging | ~15% |

### 14.2 Ví dụ cụ thể đã thực hiện

#### Corrective Maintenance

| Bug | Root Cause | Fix |
|---|---|---|
| Hai user đặt cùng ghế | Thiếu conflict check | Thêm duplicate seat validation trên backend |
| Booking ref trùng | UUID collision | Thêm retry mechanism khi generate bookingRef |
| Admin tự xóa account | Thiếu self-protection check | Thêm guard: admin cannot delete self |

#### Adaptive Maintenance

| Thay đổi | Lý do | Tác động |
|---|---|---|
| Express 4 → 5 | Performance + async support | Cập nhật route syntax |
| Monorepo restructure | Tổ chức code rõ ràng hơn | Tách `src/`+`server/` → `frontend/`+`backend/` |
| Thêm Nodemailer | Yêu cầu password reset qua email | Thêm `utils/emailService.js` |

#### Perfective Maintenance

| Cải tiến | Trước | Sau |
|---|---|---|
| i18n | Chỉ tiếng Anh | EN/VI switch + auto currency |
| Admin Dashboard | Không có | Stats + 5 management modules |
| Booking flow | Chỉ booking đơn giản | + Payment simulation + QR Code + Cancel |

#### Preventive Maintenance

| Biện pháp | Mục đích |
|---|---|
| Helmet middleware | Ngăn XSS, clickjacking, MIME sniffing |
| Rate limiting | Ngăn brute-force, DDoS |
| Input sanitization | Ngăn NoSQL injection |
| File-based logging | Audit trail, debug dễ dàng |
| Graceful shutdown | Tránh data corruption khi server stop |

---

## 15. Quy Trình Xử Lý Lỗi

### 15.1 Bug Lifecycle

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│   New    │───►│ Assigned │───►│ In Fix   │───►│ Testing  │───►│  Closed  │
│  (Found) │    │          │    │          │    │ (Verify) │    │          │
└──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
                                     │                              ▲
                                     │         ┌──────────┐         │
                                     └────────►│ Reopened │─────────┘
                                               │(If fail) │
                                               └──────────┘
```

### 15.2 Phân loại mức độ

| Priority | Mô tả | Response Time | Ví dụ |
|---|---|---|---|
| 🔴 **Critical** | Hệ thống không hoạt động | < 2 giờ | Server crash, DB down |
| 🟠 **High** | Chức năng chính bị ảnh hưởng | < 1 ngày | Không thể đặt vé, login fail |
| 🟡 **Medium** | Chức năng phụ bị ảnh hưởng | < 3 ngày | i18n sai text, UI misalignment |
| 🟢 **Low** | Cosmetic/minor issues | Next sprint | Typo, minor style issue |

### 15.3 Quy trình xử lý

1. **Phát hiện:** Qua testing, user report, hoặc log monitoring
2. **Ghi nhận:** Tạo GitHub Issue với label (bug, priority)
3. **Phân tích:** Xác định root cause, impact scope
4. **Fix:** Tạo branch `fix/*`, code fix, unit test
5. **Review:** Code review bởi teammate
6. **Verify:** Test lại trên staging/local
7. **Deploy:** Merge to main → auto deploy
8. **Close:** Đóng issue, cập nhật documentation nếu cần

---

## 16. Kế Hoạch Cập Nhật & Nâng Cấp

### 16.1 Roadmap tương lai

| Phase | Thời gian | Tính năng | Loại bảo trì |
|---|---|---|---|
| **v1.1** | +1 tháng | Real payment gateway (PayOS/VNPay) | Perfective |
| **v1.2** | +2 tháng | WebSocket real-time seat locking | Perfective |
| **v1.3** | +3 tháng | Booking confirmation email | Perfective |
| **v2.0** | +6 tháng | Mobile responsive redesign, PWA | Adaptive + Perfective |

### 16.2 Dependency Update Strategy

| Tần suất | Hành động |
|---|---|
| **Hàng tháng** | Kiểm tra `npm outdated`, cập nhật patch versions |
| **Hàng quý** | Cập nhật minor versions, review changelogs |
| **Khi cần** | Major version upgrades (cẩn trọng, test kỹ) |

### 16.3 Quy trình nâng cấp dependency

```
1. npm outdated                    # Kiểm tra outdated packages
2. npm update                     # Cập nhật theo semver range
3. npm test                       # Chạy test suite
4. npm run lint                   # Check TypeScript errors
5. Manual testing                 # Kiểm tra UI/UX
6. git commit & push              # Deploy if all pass
```

---

## 17. Quản Lý Nợ Kỹ Thuật

### 17.1 Technical Debt hiện tại

| ID | Nợ kỹ thuật | Mức độ | Kế hoạch giải quyết |
|---|---|---|---|
| TD-1 | Payment là simulation, chưa tích hợp gateway thật | Medium | v1.1 — tích hợp PayOS |
| TD-2 | Chưa có WebSocket cho real-time seat locking | Medium | v1.2 — Socket.IO |
| TD-3 | Input sanitization chỉ áp dụng ở profile update | Low | Mở rộng sang tất cả input fields |
| TD-4 | README chưa cập nhật theo monorepo mới hoàn toàn | Low | Cập nhật documentation |
| TD-5 | Chưa có audit log cho admin actions | Low | Thêm activity log collection |
| TD-6 | Token lưu localStorage (không phải httpOnly cookie) | Low | Cân nhắc chuyển sang cookie nếu cần |

### 17.2 Chiến lược xử lý

- **Boy Scout Rule:** Mỗi lần chạm vào code, cải thiện một chút
- **Allocate 20% sprint time:** Dành 20% thời gian mỗi sprint cho technical debt
- **Prioritize by impact:** Ưu tiên các debt ảnh hưởng security/performance

---

## 18. Tài Liệu Hóa

### 18.1 Danh sách tài liệu dự án

| # | Tài liệu | File | Trạng thái |
|---|---|---|---|
| 1 | Software Requirements Specification | `CinemaVision_SRS.md` | ✅ Hoàn thành |
| 2 | Business Rules | `CinemaVision_Business_Rules.md` | ✅ Hoàn thành |
| 3 | Vision and Scope | `CinemaVision_Vision_and_Scope.md` | ✅ Hoàn thành |
| 4 | Use Cases | `CinemaVision_Use_Cases.md` + `USECASE_DOCUMENT.md` | ✅ Hoàn thành |
| 5 | Test Plan | `Group7_Test-Plan_Updated.md` | ✅ Hoàn thành |
| 6 | Test Case Specification | `CinemaVision_Test_Case_Specification.md` | ✅ Hoàn thành |
| 7 | Requirements List | `CinemaVision_Requirements_List.md` | ✅ Hoàn thành |
| 8 | Feasibility Report | `CinemaVision_Feasibility_Report.md` | ✅ Hoàn thành |
| 9 | Context Diagram | `CinemaVision_Context_Diagram.md` | ✅ Hoàn thành |
| 10 | System Diagrams | `CinemaVision_Diagrams.md` | ✅ Hoàn thành |
| 11 | **Dev/Ops/Maintenance Plan** | `CinemaVision_DevOps_Maintenance_Plan.md` | ✅ **File này** |

### 18.2 Code Documentation

| Loại | Công cụ/Phương pháp |
|---|---|
| API Documentation | Tài liệu endpoints trong SRS §7 |
| Code Comments | Inline comments trong code phức tạp |
| README | Hướng dẫn cài đặt, chạy, deploy |
| .env.example | Template cho environment variables |
| Type Definitions | TypeScript interfaces (`lib/types.ts`) |

---

# Phần IV: Đánh Giá & Kết Luận

## 19. Rủi Ro & Biện Pháp Giảm Thiểu

| # | Rủi ro | Xác suất | Tác động | Biện pháp |
|---|---|---|---|---|
| R1 | Render free tier cold start | High | Low | Chấp nhận; upgrade nếu cần |
| R2 | Race condition đặt ghế | Medium | High | ✅ Đã xử lý: duplicate seat check |
| R3 | MongoDB Atlas downtime | Low | High | Atlas SLA 99.95%; có seed script |
| R4 | Dependency có CVE | Medium | Medium | Định kỳ `npm audit`, update patches |
| R5 | JWT token bị đánh cắp | Low | High | Token có expiry 7d; HTTPS enforced |
| R6 | Mất source code | Very Low | Critical | GitHub remote backup; multiple clones |

---

## 20. Tiến Độ Tổng Thể

```
Phase 1: Planning & Design    ████████████████████                  100%  ✅
Phase 2: Backend Development   ████████████████████                  100%  ✅
Phase 3: Frontend Development  ████████████████████                  100%  ✅
Phase 4: Integration           ████████████████████                  100%  ✅
Phase 5: Testing               ████████████████████                  100%  ✅
Phase 6: Deployment            ████████████████████                  100%  ✅
Phase 7: Documentation         ████████████████████                  100%  ✅
─────────────────────────────────────────────────────────────────────────
Overall Progress               ████████████████████                  100%  ✅
```

---

## 21. Bài Học Kinh Nghiệm

### 21.1 Những điều làm tốt

| # | Bài học | Chi tiết |
|---|---|---|
| 1 | **Monorepo structure** | Quản lý frontend + backend trong 1 repo giúp đơn giản hóa dev workflow |
| 2 | **TypeScript** | Phát hiện lỗi sớm tại compile time, giảm runtime bugs |
| 3 | **Tài liệu đầy đủ** | SRS, Business Rules, Test Plan giúp nhóm có chung understanding |
| 4 | **Security-first** | Tích hợp Helmet, rate-limit, JWT từ đầu, không phải retrofit |
| 5 | **Seed data script** | `npm run seed` giúp bất kỳ ai cũng setup được môi trường nhanh |

### 21.2 Những điều cần cải thiện

| # | Bài học | Cải thiện |
|---|---|---|
| 1 | **Testing coverage** | Viết test nhiều hơn, sớm hơn (TDD approach) |
| 2 | **CI/CD pipeline** | Setup GitHub Actions để auto-test trước merge |
| 3 | **Real-time features** | Nên nghiên cứu WebSocket từ đầu cho seat locking |
| 4 | **API documentation** | Nên dùng Swagger/OpenAPI cho interactive API docs |
| 5 | **Error monitoring** | Nên tích hợp Sentry hoặc tương tự cho production error tracking |

---

## 22. Kết Luận

### Tổng kết

Dự án **CinemaVision Pro** đã được phát triển, triển khai và bảo trì thành công qua 12 tuần với đầy đủ các giai đoạn trong vòng đời phần mềm:

| Giai đoạn | Kết quả |
|---|---|
| **Phát triển** | Full-stack application hoàn chỉnh với 8 modules, 30+ API endpoints, 35+ components |
| **Vận hành** | Triển khai trên cloud (Netlify + Render + Atlas), logging, health check, security layers |
| **Bảo trì** | Quy trình xử lý lỗi, kế hoạch nâng cấp, quản lý technical debt, tài liệu đầy đủ |

### Metrics

| Metric | Giá trị |
|---|---|
| Tổng số files source code | ~60+ files |
| Backend API endpoints | 30+ endpoints |
| Frontend components | 35+ components |
| Mongoose models | 5 models |
| Tài liệu dự án | 11 documents |
| Test coverage | Unit + E2E |
| Ngôn ngữ hỗ trợ | 2 (EN/VI) |
| Security layers | 5 layers |
| Deploy platforms | 3 (Netlify + Render + Atlas) |

---

**Prepared by:** Group 7 - SE113.Q11 - UIT
- Le Van Bao - 23520112
- Tran Dai Thang - 23521432
- Nguyen Xuan Nhat Minh - 23520946
- Doan Duc Trung - 23521674

**Last Updated:** April 12, 2026
