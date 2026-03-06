# Vision and Scope Document

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

---

## Revision History

| Name | Date | Reason For Changes | Version |
|------|------|-------------------|---------|
| Tran Dai Thang | 12/03/24 | Initial draft | 1.0 draft 1 |
| Tran Dai Thang | 12/21/24 | Baseline following changes after inspection | 1.0 approved |

---

## 1. Business Requirements

### 1.1. Background

Movie enthusiasts currently face a fragmented experience when booking cinema tickets. They must visit multiple websites or physical box offices, manually check seat availability, and often encounter sold-out shows or inconvenient payment processes. The booking experience is scattered across different cinema chains, making it difficult to compare showtimes, prices, and seat availability in one place.

Cinema operators manage bookings through legacy systems or manual processes, spending significant time on seat allocation, payment processing, and customer service. There is no unified platform where customers can (a) browse current movies, (b) view real-time seat availability, (c) select specific seats visually, and (d) complete secure online payments, all while cinema administrators can manage movie catalogs, theaters, showtimes, and monitor bookings through a single dashboard.

### 1.2. Business Opportunity

A web-based cinema booking platform that combines movie browsing, real-time seat selection, and integrated payment processing would:

- **Help moviegoers** book tickets conveniently from home with visual seat selection and instant confirmation
- **Allow cinema operators** to manage movie schedules, theaters, and showtimes centrally instead of using scattered systems
- **Provide detailed booking analytics** and occupancy statistics, enabling data-driven scheduling decisions
- **Reduce operational overhead** by automating seat allocation, payment processing, and booking confirmation
- **Increase revenue** through improved customer experience and reduced no-shows with advance online bookings

### 1.3. Business Objectives

**BO-1: Increase online booking adoption**
- **Description:** Increase the proportion of total ticket sales made through the online platform
- **Scale:** Percentage of total tickets sold online vs. box office
- **Meter:** System booking records vs. total cinema sales
- **Past:** 15% (baseline from manual tracking)
- **Goal:** ≥ 40% within 6 months after initial release
- **Stretch:** ≥ 60% within 12 months

**BO-2: Improve customer satisfaction**
- **Description:** Increase customer satisfaction with the booking experience
- **Scale:** Average rating on post-booking satisfaction survey (1-5 scale)
- **Meter:** In-app satisfaction surveys after booking completion
- **Past:** 3.2/5 (from previous manual surveys)
- **Goal:** ≥ 4.0/5 within 6 months
- **Stretch:** ≥ 4.5/5 within 12 months

**BO-3: Reduce administrative workload**
- **Description:** Decrease time staff spend on manual booking management and customer service
- **Scale:** Average hours per week spent on booking-related tasks
- **Meter:** Time-tracking and staff surveys
- **Past:** 20 hours/week (manual processes)
- **Goal:** ≤ 8 hours/week within 6 months
- **Stretch:** ≤ 5 hours/week with automation in later releases

### 1.4. Success Metrics

**SM-1:** At least 70% of registered users complete at least one booking within 30 days of registration, within 6 months following initial release.

**SM-2:** The average booking completion time (from movie selection to payment confirmation) is reduced to under 3 minutes, measured within 3 months after release.

**SM-3:** At least 85% of booked seats result in actual attendance (reduced no-show rate), measured by comparing bookings to actual ticket scans.

### 1.5. Vision Statement

**For moviegoers** who need a convenient way to book cinema tickets with real-time seat selection, **CinemaVision Pro** is a web-based movie booking platform that lets users browse current movies, view showtimes, select specific seats visually, and complete secure online payments, while cinema administrators manage movie catalogs, theaters, showtimes, and monitor all bookings. **Unlike** fragmented booking systems, physical box offices, and third-party aggregators with limited seat selection, **CinemaVision Pro** provides an integrated environment with secure JWT-based authentication, real-time seat availability, visual seat maps, multiple payment options (Momo, ZaloPay, VNPay, ATM), and comprehensive booking history for both customers and cinema operators.

### 1.6. Business Risks

**RI-1:** Low user adoption (customers continue using traditional box office or competitor platforms) could reduce ROI
- Probability = 0.4; Impact = 8

**RI-2:** Payment gateway failures or security incidents could damage trust and force system suspension
- Probability = 0.2; Impact = 9

**RI-3:** Insufficient movie content or theater partnerships might limit platform usefulness
- Probability = 0.3; Impact = 7

**RI-4:** Technical issues during peak booking times (new movie releases) could cause lost sales and customer frustration
- Probability = 0.5; Impact = 8

**RI-5:** Competition from established booking platforms with larger market share
- Probability = 0.6; Impact = 7

### 1.7. Business Assumptions and Dependencies

**AS-1:** Reliable payment gateway infrastructure (Momo, ZaloPay, VNPay, ATM) is available and properly configured

**AS-2:** Cinema operators will provide and maintain accurate movie schedules, theater configurations, and pricing information

**AS-3:** Users have access to Internet and modern browsers compatible with the platform

**AS-4:** Email infrastructure is available for sending booking confirmations and notifications

**DE-1:** The platform depends on real-time database updates for seat availability to prevent double bookings

**DE-2:** Payment processing depends on third-party payment gateway APIs remaining stable and available

**DE-3:** Data protection and privacy regulations must be followed for storage of user information and payment data

---

## 2. Scope and Limitations

### 2.1. Major Features

**FE-1: Movie catalog management**
Administrators manage the movie catalog including titles, descriptions, genres, ratings, posters, trailers, directors, and cast information.

**FE-2: Theater and showtime management**
Administrators manage theater configurations (seat layouts) and create showtimes linking movies to specific theaters with dates, times, and pricing.

**FE-3: User authentication and account management**
Users register accounts, log in securely using JWT tokens, manage profiles, and view booking history.

**FE-4: Movie browsing and search**
Guests and users browse available movies, search by title, view detailed movie information including trailers and showtimes.

**FE-5: Real-time seat selection**
Users view visual seat maps showing available, selected, and booked seats in real-time, preventing double bookings.

**FE-6: Integrated payment processing**
Users complete bookings through multiple payment methods (Momo, ZaloPay, VNPay, ATM Card) with secure transaction handling.

**FE-7: Booking management and history**
Users view their booking history with details; administrators monitor all bookings and generate reports.

**FE-8: Admin dashboard**
Administrators access a comprehensive dashboard to manage movies, theaters, showtimes, users, and view booking analytics.

All features above are realized through the defined use cases for Guest, User, Admin, and System actors.

### 2.2. Scope of Initial and Subsequent Releases

| Feature | Release 1.0 | Release 2.0 | Release 3.0 |
|---------|------------|-------------|-------------|
| **FE-1 – Movie catalog** | Basic CRUD operations for movies with essential metadata | Bulk import/export; advanced filtering and categorization | Movie recommendations based on user preferences |
| **FE-2 – Theater & showtimes** | Manual showtime creation; basic seat layout configuration | Recurring showtime templates; conflict detection | Dynamic pricing based on demand |
| **FE-3 – Authentication** | Email/password registration and login with JWT | Social login (Google, Facebook); "Remember me" feature | Two-factor authentication; enhanced security monitoring |
| **FE-4 – Movie browsing** | Basic search and filter by title/genre | Advanced filters (rating, release date, language) | Personalized movie suggestions |
| **FE-5 – Seat selection** | Visual seat map with real-time availability | Seat preferences (aisle, center); group booking optimization | VR theater preview |
| **FE-6 – Payment** | 4 payment methods (Momo, ZaloPay, VNPay, ATM) | Wallet integration; saved payment methods | Loyalty points and discounts |
| **FE-7 – Booking management** | Basic booking history and confirmation emails | Booking modification and cancellation | QR code tickets; mobile wallet integration |
| **FE-8 – Admin dashboard** | Basic monitoring and reporting | Advanced analytics dashboards; export capabilities | Predictive analytics for occupancy |

### 2.3. Limitations and Exclusions

**LI-1:** The platform will not handle physical ticket printing or kiosk integration in Release 1.0

**LI-2:** Food and beverage ordering is out of scope for all planned releases

**LI-3:** Integration with external movie rating APIs (IMDB, Rotten Tomatoes) is not included in initial scope

**LI-4:** Mobile native applications (iOS/Android) are not part of Release 1.0; web-responsive design will be provided

**LI-5:** Loyalty programs, membership tiers, and promotional codes are deferred to later releases

**LI-6:** Multi-language support beyond English is not included in Release 1.0

---

## 3. Business Context

### 3.1. Stakeholder Profiles

| Stakeholder | Major Value | Attitudes | Major Interests | Constraints |
|-------------|-------------|-----------|-----------------|-------------|
| **Cinema Owners/Management** | Increased revenue; reduced operational costs; better customer insights | Supportive if platform demonstrates clear ROI and acceptable risk | Revenue growth; occupancy rates; customer satisfaction metrics | Limited budget; must integrate with existing systems |
| **Cinema Staff/Operators** | Simplified booking management; reduced manual work; easier customer service | Positive if system is intuitive and reduces repetitive tasks | Easy-to-use admin interface; reliable system; clear reporting | Need training; limited technical expertise |
| **Moviegoers/Customers** | Convenient booking; seat selection; secure payment; booking history | Enthusiastic if system is fast, reliable, and user-friendly | Simple UX; mobile-friendly; instant confirmation; flexible payment | Need Internet access; varying technical literacy |
| **IT/Operations Team** | Stable, secure, maintainable system; monitoring and backup capabilities | Supportive if tech stack is manageable and well-documented | Security; uptime; scalability; logging and monitoring | Limited staff; must align with existing infrastructure |
| **Payment Gateway Providers** | Transaction volume; integration reliability | Neutral; focused on technical compliance | API stability; transaction success rate; security compliance | Must meet PCI-DSS standards |

### 3.2. Project Priorities

| Dimension | Constraint | Driver | Degree of Freedom |
|-----------|-----------|--------|-------------------|
| **Features** | Core booking flow (browse, select, pay) must be in Release 1.0 | ✔ Essential booking features are primary driver | Advanced features (analytics, recommendations) can move to later releases |
| **Quality** | Secure payment handling; no double bookings; 95% uptime during business hours | ✔ Quality (reliability & security) is critical for trust | Certain UI enhancements can be postponed |
| **Schedule** | | ✔ Initial release targeted for holiday season; modest delays acceptable with approval | Exact dates for Release 2 and 3 have flexibility |
| **Cost** | Budget must stay within agreed limits; 10% overrun acceptable with review | | Resource allocation can be adjusted to control cost |
| **Staff** | Core team: 1 product owner, 3 developers, 1 tester, 1 DevOps | | Additional contractors can be considered if deadlines at risk |

### 3.3. Deployment Considerations

The platform will initially be deployed as a responsive web application accessible via modern browsers on desktop and mobile devices. The server environment must support:

- Secure HTTPS connections
- Database storage for users, movies, theaters, showtimes, bookings, and seat availability
- Integration with payment gateway APIs
- Real-time seat availability updates to prevent double bookings
- Automated email notifications for booking confirmations

**Infrastructure Requirements:**
- Load balancing for handling peak traffic during new movie releases
- Database replication and backup strategy for data integrity
- Monitoring and logging for security and performance tracking
- CDN for serving movie posters and trailers efficiently

**Training and Documentation:**
- User guides for customers (how to register, book tickets, select seats)
- Admin manuals for cinema staff (managing movies, theaters, showtimes)
- Video tutorials for common tasks
- FAQ and troubleshooting documentation

Future releases may introduce native mobile applications if justified by usage patterns and customer demand.

---

> **Author:** CinemaVision Pro - Group 7  
> **Last Updated:** December 21, 2024
