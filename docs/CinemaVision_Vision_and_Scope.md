# Vision and Scope Document

## for

# CinemaVision Pro
### Movie Booking Website
### Release 1.1 (Aligned)

**Version 1.1 approved**

**Prepared by:**
- Le Van Bao - 23520112
- Tran Dai Thang - 23521432
- Nguyen Xuan Nhat Minh - 23520946
- Doan Duc Trung - 23521674

**University of Information Technology**
**Faculty of Software Technology**

**March 18, 2026**

---

## Table of Contents

1. [Business Requirements](#1-business-requirements)
   - 1.1. [Background](#11-background)
   - 1.2. [Business Opportunity](#12-business-opportunity)
   - 1.3. [Business Objectives](#13-business-objectives)
   - 1.4. [Success Metrics](#14-success-metrics)
   - 1.5. [Vision Statement](#15-vision-statement)
   - 1.6. [Business Risks](#16-business-risks)
   - 1.7. [Business Assumptions and Dependencies](#17-business-assumptions-and-dependencies)
2. [Scope and Limitations](#2-scope-and-limitations)
   - 2.1. [Major Features](#21-major-features)
   - 2.2. [Scope of Initial and Subsequent Releases](#22-scope-of-initial-and-subsequent-releases)
   - 2.3. [Limitations and Exclusions](#23-limitations-and-exclusions)
3. [Business Context](#3-business-context)
   - 3.1. [Stakeholder Profiles](#31-stakeholder-profiles)
   - 3.2. [Project Priorities](#32-project-priorities)
   - 3.3. [Deployment Considerations](#33-deployment-considerations)
4. [Alignment Notes](#4-alignment-notes)

---

## Revision History

| Name | Date | Reason For Changes | Version |
|------|------|-------------------|---------|
| Tran Dai Thang | 03/10/26 | Initial draft | 1.0 draft 1 |
| Le Van Bao | 03/18/26 | Baseline after review | 1.0 approved |
| Codex update | 03/18/26 | Updated to match implemented codebase scope | 1.1 aligned |

---

## 1. Business Requirements

### 1.1. Background

Movie booking in many local contexts is still fragmented across multiple channels. Users often need to switch between cinema pages, manually compare showtimes, and re-check seat availability before booking.

CinemaVision Pro addresses this by delivering a unified web platform where users can browse movies, choose theater/showtime, select seats visually, and confirm bookings online. The same system provides admin tools to manage catalog data and operations.

### 1.2. Business Opportunity

An integrated booking platform provides the following value:

- **For customers:** faster booking flow, clear seat visibility, booking history, and account-based access.
- **For operators/admins:** centralized movie/theater/showtime/user/booking management.
- **For operations:** reduced manual handling through automated booking validation and role-based control.
- **For product growth:** a strong baseline to evolve to real payment gateway integration, analytics, and loyalty features.

### 1.3. Business Objectives

**BO-1: Increase digital booking usage**
- **Description:** Increase bookings completed through the website.
- **Scale:** Number of confirmed online bookings per month.
- **Meter:** Booking records in system database.
- **Baseline:** Establish in first production month.
- **Goal:** +30% within 6 months after stable release.

**BO-2: Reduce booking friction**
- **Description:** Make booking flow quick and predictable.
- **Scale:** Median time from seat selection start to booking confirmation.
- **Meter:** Frontend telemetry/event logs (to be instrumented in release operations).
- **Baseline:** Establish after telemetry rollout.
- **Goal:** <= 3 minutes median in normal traffic.

**BO-3: Improve admin efficiency**
- **Description:** Reduce manual updates and support burden.
- **Scale:** Admin handling time per week for booking-related tasks.
- **Meter:** Team tracking sheet + operational logs.
- **Baseline:** Establish during first 4 weeks.
- **Goal:** 40% reduction after 3 months.

### 1.4. Success Metrics

**SM-1:** At least 60% of registered users complete at least one booking within 30 days of registration (after rollout stabilization).

**SM-2:** Booking creation API success rate >= 98% excluding invalid-input and unauthorized requests.

**SM-3:** Double-booking incidents for the same seat/showtime are zero in confirmed booking records.

### 1.5. Vision Statement

**For moviegoers** who need convenient online ticket booking, **CinemaVision Pro** is a web-based booking platform that enables movie discovery, showtime lookup, seat selection, and booking confirmation with account-based access. **Unlike** disconnected booking channels, **CinemaVision Pro** provides a single experience with JWT-based authentication, seat availability checks, role-based admin management, and booking history.

In Release 1.1, payment UX is provided as a simulated multi-method flow in frontend and booking is finalized after simulated payment success callback.

### 1.6. Business Risks

**RI-1:** Low user adoption vs. traditional channels or established competitors.
- Probability = 0.4; Impact = 8

**RI-2:** Concurrency or peak-load issues during high-demand showtimes could impact booking reliability.
- Probability = 0.4; Impact = 9

**RI-3:** Operational data quality risk if movie/showtime/theater data is not maintained accurately by admins.
- Probability = 0.5; Impact = 7

**RI-4:** Security risk from token misuse, weak credential practices, or misconfigured environment secrets.
- Probability = 0.3; Impact = 9

**RI-5:** Delay risk for production-grade payment gateway integration in future releases.
- Probability = 0.5; Impact = 7

### 1.7. Business Assumptions and Dependencies

**AS-1:** Users access system via modern web browsers on desktop/mobile.

**AS-2:** Backend runtime (Node.js + MongoDB) and environment variables are configured correctly.

**AS-3:** Admin team maintains accurate movie/theater/showtime information.

**AS-4:** SMTP/email service is available for password reset notifications.

**DE-1:** Booking consistency depends on backend validation and transactional update flow.

**DE-2:** Authentication and authorization depend on valid JWT secret and token policy.

**DE-3:** CORS/frontend URL configuration must match deployment environments.

---

## 2. Scope and Limitations

### 2.1. Major Features

**FE-1: Authentication and account management**
- Register/login with email-password.
- JWT-based protected APIs.
- Profile update, change password, forgot/reset password by email token.

**FE-2: Movie discovery and details**
- Browse all movies and search/filter by query, genre, rating, duration, sorting, pagination.
- View movie details.

**FE-3: Theater and showtime discovery**
- Browse regions and theaters.
- Query showtimes by movie/theater/date.

**FE-4: Seat selection and booking**
- Visual seat map with available/selected/booked states.
- Booking validation on backend (showtime existence, seat availability, no seat conflict).
- Auto-calculated total price on backend.

**FE-5: Booking lifecycle**
- User booking history.
- Cancel own booking and reclaim available seat count.
- Delete own booking only when cancelled.

**FE-6: Admin operations**
- Admin-only dashboard.
- CRUD movies, theaters, showtimes.
- View/manage users and bookings.
- Guardrails: cannot self-demote or self-delete.

**FE-7: Localization and UX foundation**
- EN/VI language support.
- VND/USD currency display with language-based default.
- Custom 404 page and responsive web layout.

**FE-8: Platform hardening basics**
- Helmet, CORS policy, rate limiting, request size limits, centralized API routing, health endpoint.

### 2.2. Scope of Initial and Subsequent Releases

| Feature | Release 1.1 (Current) | Release 2.0 (Planned) | Release 3.0 (Planned) |
|---------|------------------------|------------------------|------------------------|
| **Auth & Accounts** | Email/password, JWT, profile, forgot/reset password | Social login, remember-me, stronger policy controls | MFA and risk-based auth |
| **Movie/Theater/Showtime Admin** | Full CRUD + admin guardrails | Bulk import/export, scheduling templates | Advanced planning and optimization |
| **Booking Core** | Seat selection, conflict prevention, booking/cancel/delete flow | Booking modification windows and policy engine | Smart seat recommendations |
| **Payment** | Simulated payment UI (ATM/Momo/ZaloPay/VNPay) | Real gateway integration and callback verification | Refund/chargeback automation |
| **Analytics** | Basic dashboard metrics | Export and richer admin analytics | Predictive occupancy and demand insights |
| **Customer Experience** | Responsive web, EN/VI, booking history | Notifications and improved retention flows | Loyalty and personalization |

### 2.3. Limitations and Exclusions

**LI-1:** No production-grade payment gateway transaction processing in current release (payment flow is simulated in frontend).

**LI-2:** No physical ticket printing/kiosk integration.

**LI-3:** No food and beverage ordering module.

**LI-4:** No native iOS/Android app (web responsive only).

**LI-5:** No loyalty points, promotions, or coupon engine in current release.

**LI-6:** No real-time push channel (WebSocket) for seats; current behavior is request/response + backend consistency checks.

**LI-7:** No booking confirmation email workflow; current email flow is for password reset.

---

## 3. Business Context

### 3.1. Stakeholder Profiles

| Stakeholder | Major Value | Attitudes | Major Interests | Constraints |
|-------------|-------------|-----------|-----------------|-------------|
| **Cinema Owners/Management** | Better digital booking throughput, centralized control | Supportive if operational reliability is high | Revenue, occupancy, data visibility | Budget, rollout capacity |
| **Cinema Staff/Admins** | Simpler data management and fewer manual tasks | Positive if UI remains clear | Easy admin workflows, safe role controls | Training time, process adaptation |
| **Moviegoers** | Faster booking and transparent seat states | Positive if flow is stable and intuitive | Convenience, speed, trust | Device/network variability |
| **IT/Operations** | Secure and maintainable architecture | Supportive when deployment is predictable | Uptime, observability, recoverability | Limited team size |
| **Business/Product Team** | Foundation for growth features | Highly supportive | Adoption, retention, conversion | Scope tradeoffs across releases |

### 3.2. Project Priorities

| Dimension | Constraint | Driver | Degree of Freedom |
|-----------|-----------|--------|-------------------|
| **Features** | Core booking flow and admin operations must be complete | Yes | Nice-to-have enhancements can move out |
| **Quality** | Prevent double booking, enforce role security, stable auth | Yes | Cosmetic UI improvements can be deferred |
| **Schedule** | Incremental release acceptable; avoid risky big-bang changes | Medium | Planned features can phase by release |
| **Cost** | Keep within team capacity and infrastructure budget | Medium | Scope slicing by milestone |
| **Staff** | Small team with shared responsibilities | Medium | Add contractors only if necessary |

### 3.3. Deployment Considerations

Current deployment expectations:
- Responsive frontend app and Express backend API.
- MongoDB persistence for users, movies, theaters, showtimes, bookings.
- Environment-driven configuration (`MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL`, optional SMTP vars).
- API hardening with helmet, rate limiting, CORS, and body size limits.
- Health check endpoint for operational monitoring.

Operational recommendations for next stage:
- Add centralized monitoring/alerting and structured logs.
- Add backup and restore runbook for MongoDB.
- Add load/performance tests for peak release windows.
- Add production payment gateway integration with callback verification.

---

## 4. Alignment Notes

This revision updates Vision and Scope to match actual project behavior as of March 18, 2026.

Key corrections from previous draft:
- Replaced "integrated real payment gateway" wording with current simulated-payment implementation.
- Updated language scope: current app supports English and Vietnamese.
- Clarified email scope: password-reset emails are implemented; booking confirmation email is not implemented.
- Clarified seat availability behavior: backend consistency checks and transaction flow are implemented; no WebSocket push channel.
- Refined release roadmap to separate implemented vs planned capabilities.

---

> **Author:** CinemaVision Pro - Group 7  
> **Last Updated:** March 18, 2026
