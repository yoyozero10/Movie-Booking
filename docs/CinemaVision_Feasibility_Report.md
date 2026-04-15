# Feasibility Report (Báo Cáo Khả Thi)

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

- [1. Executive Summary](#1-executive-summary)
- [2. Project Overview](#2-project-overview)
  - [2.1 Problem Statement](#21-problem-statement)
  - [2.2 Proposed Solution](#22-proposed-solution)
  - [2.3 Project Objectives](#23-project-objectives)
- [3. Technical Feasibility](#3-technical-feasibility)
  - [3.1 Technology Stack](#31-technology-stack)
  - [3.2 System Architecture](#32-system-architecture)
  - [3.3 Technical Skills Assessment](#33-technical-skills-assessment)
  - [3.4 Technical Risks and Mitigation](#34-technical-risks-and-mitigation)
  - [3.5 Technical Feasibility Conclusion](#35-technical-feasibility-conclusion)
- [4. Economic Feasibility](#4-economic-feasibility)
  - [4.1 Development Costs](#41-development-costs)
  - [4.2 Operational Costs](#42-operational-costs)
  - [4.3 Cost-Benefit Analysis](#43-cost-benefit-analysis)
  - [4.4 Economic Feasibility Conclusion](#44-economic-feasibility-conclusion)
- [5. Operational Feasibility](#5-operational-feasibility)
  - [5.1 User Acceptance](#51-user-acceptance)
  - [5.2 Organizational Impact](#52-organizational-impact)
  - [5.3 Maintainability](#53-maintainability)
  - [5.4 Operational Feasibility Conclusion](#54-operational-feasibility-conclusion)
- [6. Schedule Feasibility](#6-schedule-feasibility)
  - [6.1 Project Timeline](#61-project-timeline)
  - [6.2 Milestones](#62-milestones)
  - [6.3 Schedule Feasibility Conclusion](#63-schedule-feasibility-conclusion)
- [7. Legal and Compliance Feasibility](#7-legal-and-compliance-feasibility)
- [8. Risk Analysis](#8-risk-analysis)
  - [8.1 Risk Matrix](#81-risk-matrix)
  - [8.2 Risk Mitigation Strategies](#82-risk-mitigation-strategies)
- [9. Alternatives Considered](#9-alternatives-considered)
- [10. Conclusion and Recommendation](#10-conclusion-and-recommendation)

---

## 1. Executive Summary

Báo cáo khả thi này đánh giá tính khả thi của việc phát triển **CinemaVision Pro** — một hệ thống đặt vé xem phim trực tuyến dạng full-stack web application. Dự án được thực hiện trong khuôn khổ môn học **SE113.Q11** tại **Trường Đại học Công nghệ Thông tin (UIT)**.

Sau khi phân tích toàn diện các khía cạnh kỹ thuật, kinh tế, vận hành, tiến độ và pháp lý, nhóm kết luận rằng dự án **hoàn toàn khả thi** để thực hiện với các nguồn lực hiện có. Hệ thống sử dụng các công nghệ mã nguồn mở phổ biến (React, Express.js, MongoDB), triển khai trên nền tảng cloud miễn phí, và phù hợp với quy mô cũng như năng lực của nhóm phát triển gồm 4 thành viên.

**Kết luận:** ✅ Dự án được đánh giá **KHẢ THI** trên tất cả các tiêu chí.

---

## 2. Project Overview

### 2.1 Problem Statement

Hiện nay, việc đặt vé xem phim tại nhiều rạp chiếu phim vẫn còn gặp nhiều bất tiện:

- Khách hàng phải đến trực tiếp quầy vé hoặc gọi điện để đặt vé, tốn thời gian xếp hàng.
- Không có cách kiểm tra suất chiếu và tình trạng ghế trống **theo thời gian thực**.
- Thiếu hệ thống quản lý tập trung cho rạp chiếu phim (phim, suất chiếu, đặt vé, người dùng).
- Trải nghiệm người dùng chưa được tối ưu, đặc biệt trên thiết bị di động.

### 2.2 Proposed Solution

Xây dựng **CinemaVision Pro** — một nền tảng web hiện đại cho phép:

- **Khách truy cập:** Duyệt phim, tìm kiếm, lọc theo thể loại/đánh giá, xem suất chiếu theo rạp và khu vực.
- **Người dùng đã đăng ký:** Chọn ghế tương tác, đặt vé, thanh toán (mô phỏng), nhận vé điện tử QR Code, quản lý lịch sử đặt vé.
- **Quản trị viên:** Quản lý toàn diện phim, rạp, suất chiếu, người dùng, và đơn đặt vé thông qua Admin Dashboard.

### 2.3 Project Objectives

| # | Mục tiêu | Mô tả |
|---|---|---|
| O1 | Xây dựng hệ thống full-stack | Phát triển ứng dụng frontend (React) và backend API (Express.js) hoàn chỉnh |
| O2 | Đảm bảo bảo mật | Triển khai xác thực JWT, mã hóa mật khẩu, bảo vệ API |
| O3 | Trải nghiệm người dùng | Giao diện responsive, đa ngôn ngữ (EN/VI), thiết kế Glassmorphism |
| O4 | Quản trị hệ thống | Dashboard quản lý đầy đủ các module với phân quyền role-based |
| O5 | Đảm bảo chất lượng | Unit testing (Jest) và E2E testing (Playwright) |
| O6 | Triển khai cloud | Deploy trên Netlify/Vercel + Render + MongoDB Atlas |

---

## 3. Technical Feasibility

### 3.1 Technology Stack

#### Frontend

| Công nghệ | Phiên bản | Mục đích | Khả thi? |
|---|---|---|---|
| React | 19.x | UI Library - Component-based SPA | ✅ Phổ biến, tài liệu phong phú |
| TypeScript | ~5.7 | Type safety cho JavaScript | ✅ Tăng chất lượng code |
| Vite | 6.x | Build tool & Dev server | ✅ Nhanh, hiện đại |
| Tailwind CSS | 3.x | Utility-first CSS framework | ✅ Linh hoạt, responsive dễ dàng |
| React Router | 7.x | Client-side routing | ✅ Chuẩn mực cho React SPA |
| Lucide React | 0.546+ | Icon library | ✅ Nhẹ, đẹp, đa dạng |
| Sonner | 2.x | Toast notifications | ✅ API đơn giản |
| qrcode.react | 4.x | QR Code generation | ✅ Tích hợp dễ dàng |

#### Backend

| Công nghệ | Phiên bản | Mục đích | Khả thi? |
|---|---|---|---|
| Node.js | LTS | JavaScript runtime | ✅ Phổ biến, ecosystem lớn |
| Express.js | 5.0 | Web framework | ✅ Nhẹ, linh hoạt |
| MongoDB | Atlas | NoSQL database | ✅ Free tier đủ cho dự án |
| Mongoose | 8.x | ODM cho MongoDB | ✅ Schema validation tốt |
| bcryptjs | 3.x | Password hashing | ✅ Bảo mật chuẩn |
| jsonwebtoken | 9.x | JWT authentication | ✅ Chuẩn xác thực phổ biến |
| Helmet | 8.x | HTTP security headers | ✅ Bảo mật HTTP |
| express-rate-limit | 8.x | Rate limiting | ✅ Chống brute-force |
| Nodemailer | 8.x | Email service | ✅ Gửi email reset password |

#### Testing & DevOps

| Công nghệ | Mục đích | Khả thi? |
|---|---|---|
| Jest | Unit testing | ✅ Framework phổ biến nhất |
| Playwright | E2E testing | ✅ Cross-browser, mạnh mẽ |
| ESLint + Prettier | Code quality | ✅ Chuẩn hóa code style |
| npm workspaces | Monorepo management | ✅ Native Node.js support |

### 3.2 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      SYSTEM ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐     HTTPS/REST     ┌──────────────────┐       │
│  │   Frontend   │ ─────────────────► │     Backend      │       │
│  │  React SPA   │ ◄───────────────── │  Express.js API  │       │
│  │  (Vite)      │    JSON Response   │                  │       │
│  └──────┬───────┘                    └────────┬─────────┘       │
│         │                                     │                 │
│         │ Hosted on                           │ Mongoose ODM    │
│         │ Netlify/Vercel                      │                 │
│         │                                     ▼                 │
│         │                            ┌──────────────────┐       │
│         │                            │  MongoDB Atlas   │       │
│         │                            │  (Cloud DB)      │       │
│         │                            └──────────────────┘       │
│         │                                     │                 │
│         │                                     │ Nodemailer      │
│         │                                     ▼                 │
│         │                            ┌──────────────────┐       │
│         │                            │   SMTP Server    │       │
│         │                            │  (Email Service) │       │
│         │                            └──────────────────┘       │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────┐                                                │
│  │   Browser    │  Chrome / Firefox / Safari / Edge              │
│  │   Client     │  Desktop & Mobile                             │
│  └─────────────┘                                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Đánh giá kiến trúc:**

- **Decoupled architecture:** Frontend và Backend hoàn toàn tách biệt, giao tiếp qua REST API → dễ bảo trì, scale độc lập.
- **Monorepo structure:** Sử dụng npm workspaces → quản lý dependencies tập trung, đơn giản hóa CI/CD.
- **Cloud-native deployment:** Tận dụng các nền tảng cloud có free tier → không cần quản lý infrastructure.

### 3.3 Technical Skills Assessment

| Kỹ năng | Mức độ nhóm | Đánh giá |
|---|---|---|
| HTML / CSS / JavaScript | Tốt | ✅ Nền tảng vững |
| React + TypeScript | Khá | ✅ Có kinh nghiệm từ các dự án trước |
| Node.js / Express.js | Khá | ✅ Đã thực hành trong môn học |
| MongoDB / Mongoose | Trung bình - Khá | ✅ Cần nghiên cứu thêm schema design |
| Git / GitHub | Tốt | ✅ Sử dụng thành thạo |
| Testing (Jest, Playwright) | Trung bình | ⚠️ Cần học thêm nhưng khả thi |
| Cloud Deployment | Trung bình | ⚠️ Có hướng dẫn chi tiết từ platforms |

### 3.4 Technical Risks and Mitigation

| Risk | Impact | Probability | Mitigation |
|---|---|---|---|
| Xung đột ghế khi đặt vé đồng thời | High | Medium | Kiểm tra duplicate seats trên backend trước khi confirm booking |
| MongoDB Atlas free tier bị giới hạn | Medium | Low | 512MB storage đủ cho scope dự án học thuật |
| Express 5.0 còn tương đối mới | Medium | Low | API tương thích ngược với v4, tài liệu đầy đủ |
| Render free tier cold start chậm | Low | High | Chấp nhận được cho mục đích demo, không ảnh hưởng chức năng |
| Payment integration phức tạp | High | N/A | Sử dụng payment simulation cho release 1.0, tích hợp thật ở phiên bản sau |

### 3.5 Technical Feasibility Conclusion

> ✅ **KHẢ THI.** Tất cả công nghệ được lựa chọn đều là mã nguồn mở, có tài liệu phong phú, cộng đồng lớn, và phù hợp với năng lực kỹ thuật của nhóm. Kiến trúc hệ thống đơn giản, rõ ràng, và đã được chứng minh hiệu quả trong nhiều dự án tương tự.

---

## 4. Economic Feasibility

### 4.1 Development Costs

| Hạng mục | Chi phí | Ghi chú |
|---|---|---|
| Nhân lực (4 sinh viên) | 0 VND | Dự án học thuật, không trả lương |
| IDE & Tools | 0 VND | VS Code (miễn phí), Git (miễn phí) |
| Frameworks & Libraries | 0 VND | Tất cả đều open-source (MIT/Apache License) |
| Domain name | 0 VND | Sử dụng subdomain miễn phí từ Netlify/Vercel |
| **Tổng Development** | **0 VND** | |

### 4.2 Operational Costs

| Dịch vụ | Free Tier | Giới hạn | Chi phí vượt mức |
|---|---|---|---|
| **Netlify/Vercel** (Frontend hosting) | ✅ Có | 100GB bandwidth/tháng | Không cần nâng cấp |
| **Render** (Backend hosting) | ✅ Có | 750 giờ/tháng, auto sleep sau 15 phút | Không cần nâng cấp |
| **MongoDB Atlas** (Database) | ✅ Có | 512MB storage, Shared cluster | Không cần nâng cấp |
| **GitHub** (Source control) | ✅ Có | Unlimited repos | Không cần nâng cấp |
| **Email SMTP** (Gmail/Mailtrap) | ✅ Có | 500 emails/ngày (Gmail) | Không cần nâng cấp |
| **Tổng Operational/tháng** | | | **0 VND** |

### 4.3 Cost-Benefit Analysis

| Lợi ích | Mô tả |
|---|---|
| **Học thuật** | Sinh viên tích lũy kinh nghiệm thực tế về full-stack development, testing, deployment |
| **Kỹ năng** | Thành thạo React, Express.js, MongoDB, JWT authentication, CI/CD |
| **Portfolio** | Dự án hoàn chỉnh có thể trình bày trong CV và phỏng vấn |
| **Teamwork** | Rèn luyện kỹ năng làm việc nhóm, quản lý dự án với Git |
| **Scalable** | Kiến trúc cho phép mở rộng thành sản phẩm thực tế nếu cần |

### 4.4 Economic Feasibility Conclusion

> ✅ **KHẢ THI.** Toàn bộ chi phí phát triển và vận hành là **0 VND** nhờ sử dụng hoàn toàn công nghệ mã nguồn mở và các nền tảng cloud có free tier. Đây là lợi thế lớn cho dự án học thuật.

---

## 5. Operational Feasibility

### 5.1 User Acceptance

| Nhóm người dùng | Mức độ chấp nhận | Lý do |
|---|---|---|
| **Khách xem phim** | ✅ Cao | Giao diện trực quan, dễ sử dụng, responsive trên mobile |
| **Quản trị viên rạp** | ✅ Cao | Admin Dashboard tập trung, CRUD đầy đủ, thao tác đơn giản |
| **Nhà phát triển** | ✅ Cao | Codebase modular, tài liệu đầy đủ, CI/CD pipeline |

**Các yếu tố tăng khả năng chấp nhận:**

- 🌐 **Đa ngôn ngữ:** Hỗ trợ Tiếng Anh và Tiếng Việt, tự động chuyển đổi tiền tệ (USD/VND).
- 🎨 **Thiết kế hiện đại:** Glassmorphism design, dark theme, micro-animations.
- 📱 **Responsive:** Tương thích hoàn toàn trên desktop, tablet, và mobile.
- 🔒 **Bảo mật:** JWT authentication, password hashing, rate limiting.
- 📧 **Tự phục vụ:** Quên mật khẩu → reset qua email, không cần liên hệ admin.

### 5.2 Organizational Impact

Đây là dự án học thuật nên tác động tổ chức chủ yếu liên quan đến nhóm phát triển:

- **Phân công công việc:** 4 thành viên chia theo module (Frontend, Backend, Testing, Documentation).
- **Quy trình làm việc:** Git-based workflow với branch management.
- **Giao tiếp:** Nhóm sử dụng các công cụ quen thuộc (Discord/Zalo, GitHub Issues).

### 5.3 Maintainability

| Tiêu chí | Đánh giá | Chi tiết |
|---|---|---|
| Code modularity | ✅ Tốt | Monorepo rõ ràng: `frontend/` + `backend/`, MVC pattern |
| Documentation | ✅ Tốt | SRS, Business Rules, Use Cases, Test Plan đầy đủ |
| Configuration | ✅ Tốt | `.env` files, `.env.example` template |
| Data seeding | ✅ Tốt | Script `npm run seed` tạo dữ liệu mẫu |
| Logging | ✅ Tốt | File-based logging (`server.log`) + console output |
| Error handling | ✅ Tốt | Global error middleware, custom 404 page |

### 5.4 Operational Feasibility Conclusion

> ✅ **KHẢ THI.** Hệ thống được thiết kế hướng đến trải nghiệm người dùng cuối, dễ sử dụng, dễ bảo trì, và có tài liệu hướng dẫn đầy đủ. Kiến trúc modular cho phép mở rộng và bảo trì dễ dàng trong tương lai.

---

## 6. Schedule Feasibility

### 6.1 Project Timeline

| Giai đoạn | Thời gian | Tuần | Trạng thái |
|---|---|---|---|
| **Phase 1:** Lập kế hoạch & Thiết kế | Tuần 1-2 | 2 tuần | ✅ Hoàn thành |
| **Phase 2:** Phát triển Backend Core | Tuần 3-5 | 3 tuần | ✅ Hoàn thành |
| **Phase 3:** Phát triển Frontend Core | Tuần 4-7 | 4 tuần | ✅ Hoàn thành |
| **Phase 4:** Tích hợp & Tính năng nâng cao | Tuần 7-9 | 3 tuần | ✅ Hoàn thành |
| **Phase 5:** Testing & Bug fixing | Tuần 9-11 | 3 tuần | ✅ Hoàn thành |
| **Phase 6:** Deployment & Documentation | Tuần 11-12 | 2 tuần | ✅ Hoàn thành |
| **Tổng thời gian** | | **~12 tuần** | |

### 6.2 Milestones

| # | Milestone | Deliverables | Deadline |
|---|---|---|---|
| M1 | Thiết kế hoàn tất | SRS, ERD, Use Case Diagram, Wireframes | Tuần 2 |
| M2 | Backend API functional | Auth + CRUD APIs + Database models | Tuần 5 |
| M3 | Frontend MVP | Movie browsing, Login/Register, Seat selection | Tuần 7 |
| M4 | Feature complete | Admin Dashboard, Payment simulation, QR Code, i18n | Tuần 9 |
| M5 | Quality assurance | Unit tests + E2E tests passing | Tuần 11 |
| M6 | Production release | Deployed on cloud, documentation complete | Tuần 12 |

### 6.3 Schedule Feasibility Conclusion

> ✅ **KHẢ THI.** Timeline 12 tuần phù hợp với quy mô dự án và số lượng thành viên (4 người). Việc sử dụng các framework/library có sẵn giúp tăng tốc đáng kể quá trình phát triển. Phân chia frontend/backend độc lập cho phép phát triển song song.

---

## 7. Legal and Compliance Feasibility

| Hạng mục | Đánh giá | Chi tiết |
|---|---|---|
| **Open-source licenses** | ✅ Tuân thủ | Tất cả libraries sử dụng MIT/Apache/ISC License — cho phép sử dụng miễn phí và thương mại |
| **Bảo mật dữ liệu cá nhân** | ✅ Tuân thủ | Mật khẩu hash bằng bcrypt, token hashed, không lưu thông tin thẻ tín dụng |
| **GDPR / PDPA** | ⚠️ Cơ bản | Dự án học thuật, không thu thập dữ liệu thực. Nếu triển khai thực tế, cần bổ sung Privacy Policy |
| **Payment regulations** | ✅ N/A | Thanh toán hiện tại là mô phỏng, không xử lý giao dịch thật |
| **Content rating** | ✅ Tuân thủ | Hệ thống hiển thị nhãn phân loại tuổi cho phim (C13, C18, ...) |
| **Academic integrity** | ✅ Tuân thủ | Dự án tự phát triển, sử dụng công cụ và framework hợp pháp |

> ✅ **KHẢ THI.** Không có rào cản pháp lý nào trong phạm vi dự án học thuật. Tất cả công nghệ đều có giấy phép mã nguồn mở cho phép sử dụng tự do.

---

## 8. Risk Analysis

### 8.1 Risk Matrix

| ID | Rủi ro | Xác suất | Tác động | Mức độ |
|---|---|---|---|---|
| R1 | Thành viên nhóm bận/vắng mặt | Medium | Medium | 🟡 Medium |
| R2 | Lỗi bảo mật trong xác thực | Low | High | 🟡 Medium |
| R3 | MongoDB Atlas downtime | Low | High | 🟡 Medium |
| R4 | Render free tier cold start chậm (~30s) | High | Low | 🟢 Low |
| R5 | Xung đột merge code trên Git | Medium | Low | 🟢 Low |
| R6 | Race condition khi đặt ghế | Medium | High | 🔴 High |
| R7 | Kiến thức testing chưa đủ | Medium | Medium | 🟡 Medium |
| R8 | Thay đổi yêu cầu giữa chừng | Low | Medium | 🟢 Low |

### 8.2 Risk Mitigation Strategies

| ID | Chiến lược giảm thiểu |
|---|---|
| R1 | Phân công rõ ràng, tài liệu đầy đủ để bất kỳ ai cũng có thể tiếp quản. Sử dụng GitHub Issues để track tiến độ. |
| R2 | Sử dụng thư viện đã được kiểm chứng (bcryptjs, jsonwebtoken). Implement rate limiting và Helmet middleware. |
| R3 | MongoDB Atlas có SLA 99.95% cho M0 free tier. Dữ liệu có thể seed lại qua `npm run seed`. |
| R4 | Chấp nhận cáo cho demo/đồ án. Nếu cần, upgrade sang paid plan (~$7/tháng). |
| R5 | Sử dụng Git branching strategy (feature branches). Code review trước khi merge. |
| R6 | **Đã giải quyết:** Backend kiểm tra confirmed bookings trước khi tạo booking mới, reject seat conflicts. Booking reference tự retry khi trùng. |
| R7 | Tự học qua tài liệu Jest/Playwright. Bắt đầu với test đơn giản, tăng dần độ phức tạp. |
| R8 | SRS đã được phê duyệt. Mọi thay đổi phải qua review và cập nhật tài liệu. |

---

## 9. Alternatives Considered

| Phương án | Ưu điểm | Nhược điểm | Quyết định |
|---|---|---|---|
| **Next.js (SSR)** thay React SPA | SEO tốt hơn, server-side rendering | Phức tạp hơn, overkill cho dự án đặt vé | ❌ Không chọn |
| **NestJS** thay Express.js | Cấu trúc chặt chẽ, TypeScript native | Learning curve cao, quá nặng cho scope dự án | ❌ Không chọn |
| **PostgreSQL** thay MongoDB | ACID transactions, relational data | Schema cứng, cần ORM phức tạp hơn | ❌ Không chọn |
| **Firebase** (BaaS) | Nhanh, real-time, auth tích hợp | Vendor lock-in, giới hạn customization | ❌ Không chọn |
| **React + Vite + Express + MongoDB** | Linh hoạt, phổ biến, tài liệu nhiều, free hosting | Cần tự xây dựng nhiều thành phần | ✅ **Đã chọn** |

**Lý do chọn phương án hiện tại:**
- Cân bằng giữa **tính đơn giản** và **tính mở rộng**.
- Tất cả thành viên đều có kiến thức nền tảng về JavaScript ecosystem.
- Phù hợp với yêu cầu môn học và quy mô dự án.
- Dễ dàng chuyển sang production nếu cần.

---

## 10. Conclusion and Recommendation

### Tổng kết đánh giá khả thi

| Tiêu chí | Kết quả | Ghi chú |
|---|---|---|
| 🔧 **Technical Feasibility** | ✅ Khả thi | Công nghệ mã nguồn mở, phổ biến, phù hợp năng lực nhóm |
| 💰 **Economic Feasibility** | ✅ Khả thi | Chi phí = 0 VND (toàn bộ free tier & open-source) |
| ⚙️ **Operational Feasibility** | ✅ Khả thi | UX tốt, bảo trì dễ, tài liệu đầy đủ |
| 📅 **Schedule Feasibility** | ✅ Khả thi | 12 tuần phù hợp, có thể phát triển song song |
| ⚖️ **Legal Feasibility** | ✅ Khả thi | Không rào cản pháp lý, license hợp lệ |

### Khuyến nghị

> **Nhóm khuyến nghị TIẾN HÀNH phát triển dự án CinemaVision Pro** với phương án công nghệ đã chọn. Dự án hoàn toàn khả thi về mặt kỹ thuật, kinh tế, vận hành, tiến độ và pháp lý.

**Lưu ý cho phát triển tương lai (ngoài scope dự án):**
- Tích hợp payment gateway thật (PayOS/VNPay) thay thế simulation.
- Triển khai WebSocket cho real-time seat locking.
- Thêm email xác nhận đặt vé thành công.
- Bổ sung audit log cho admin actions.
- Nâng cấp lên paid hosting nếu triển khai thương mại.

---

**Prepared by:** Group 7 - SE113.Q11 - UIT
- Le Van Bao - 23520112
- Tran Dai Thang - 23521432
- Nguyen Xuan Nhat Minh - 23520946
- Doan Duc Trung - 23521674

**Last Updated:** April 12, 2026
