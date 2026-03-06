# 📋 BẢNG MÔ TẢ CHI TIẾT CÁC USECASE - CINEMAVISION PRO

> **Phiên bản:** 1.0  
> **Ngày tạo:** 15/12/2024  
> **Dự án:** CinemaVision Pro - Hệ thống đặt vé xem phim trực tuyến

---

## 📊 BẢNG TỔNG HỢP TẤT CẢ USECASE

| STT | Module | ID | Tên Usecase | Mô tả | Actor chính | Trigger | Preconditions | Postconditions | Priority | Test Case |
|-----|--------|-------|-------------|-------|-------------|---------|---------------|----------------|----------|-----------|
| 1 | AUTH | UC-AUTH-01 | Hiển thị form đăng nhập | Người dùng truy cập và xem form đăng nhập/đăng ký | Guest | Người dùng nhấn nút "Login" trên navigation | Người dùng chưa đăng nhập; Trang web đã tải hoàn chỉnh | Modal đăng nhập hiển thị thành công; Các trường input và button có thể tương tác | High | `[AUTH]-01` |
| 2 | AUTH | UC-AUTH-02 | Đăng nhập thành công | Người dùng đăng nhập vào hệ thống với thông tin hợp lệ | Guest | Người dùng điền form và nhấn "Sign in" | Form đăng nhập đang hiển thị; Tài khoản đã tồn tại trong hệ thống | Người dùng được đăng nhập; JWT token được lưu; UI cập nhật trạng thái đăng nhập | High | `[AUTH]-02` |
| 3 | AUTH | UC-AUTH-03 | Đăng nhập thất bại | Xử lý khi email/password không đúng | System | Email/password không đúng khi đăng nhập | Form đăng nhập đang hiển thị | Hiển thị thông báo "Invalid email or password"; Form vẫn mở để người dùng thử lại | High | `[AUTH]-03` |
| 4 | AUTH | UC-AUTH-04 | Đăng ký tài khoản thành công | Người dùng tạo tài khoản mới | Guest | Người dùng nhấn "Sign up instead" và điền form | Form đăng nhập đang hiển thị; Email chưa tồn tại trong hệ thống | Tài khoản mới được tạo; Người dùng được đăng nhập tự động | High | `[AUTH]-04` |
| 5 | AUTH | UC-AUTH-05 | Đăng ký thất bại | Xử lý khi email đã tồn tại | System | Email đã tồn tại khi đăng ký | Form đăng ký đang hiển thị | Hiển thị thông báo "User already exists"; Form vẫn mở để người dùng sửa | High | `[AUTH]-05` |
| 6 | AUTH | UC-AUTH-06 | Đăng xuất | Người dùng đăng xuất khỏi hệ thống | User | Người dùng nhấn nút "Logout" | Người dùng đang đăng nhập | Token bị xóa; Người dùng trở về trạng thái Guest | High | `[AUTH]-06` |
| 7 | MOVIE | UC-MOVIE-01 | Xem danh sách phim | Hiển thị danh sách các phim đang chiếu | Guest, User | Người dùng truy cập trang chủ | Trang web đã tải hoàn chỉnh; Database có dữ liệu phim | Danh sách phim được hiển thị; Mỗi card có thể click để xem chi tiết | High | `[MOVIE]-01` |
| 8 | MOVIE | UC-MOVIE-02 | Tìm kiếm phim | Tìm kiếm phim theo tên | Guest, User | Người dùng nhập từ khóa vào ô tìm kiếm | Trang chủ đã tải; Có ô tìm kiếm trên navigation | Danh sách phim được lọc theo từ khóa; Chỉ hiển thị phim có tên chứa từ khóa | Medium | `[MOVIE]-02` |
| 9 | MOVIE | UC-MOVIE-03 | Xem chi tiết phim | Xem thông tin chi tiết của một phim | Guest, User | Người dùng click vào movie card | Danh sách phim đang hiển thị; Phim tồn tại trong database | Trang chi tiết phim được hiển thị; Nút đặt vé có thể tương tác | High | `[MOVIE]-03` |
| 10 | BOOKING | UC-BOOKING-01 | Chọn suất chiếu | Người dùng chọn suất chiếu cho phim | User | Người dùng nhấn "Book Tickets" trên trang chi tiết phim | Người dùng đã đăng nhập; Đang ở trang chi tiết phim; Có suất chiếu khả dụng | Suất chiếu được chọn; Chuyển đến trang sơ đồ ghế | High | `[BOOKING]-01` |
| 11 | BOOKING | UC-BOOKING-02 | Xem sơ đồ ghế | Hiển thị sơ đồ ghế ngồi của rạp | User | Sau khi chọn suất chiếu | Suất chiếu đã được chọn; Thông tin rạp và ghế có sẵn | Sơ đồ ghế hiển thị đầy đủ; Trạng thái ghế được phân biệt rõ ràng | High | `[BOOKING]-02` |
| 12 | BOOKING | UC-BOOKING-03 | Chọn ghế | Người dùng chọn ghế ngồi | User | Người dùng click vào ghế trống | Sơ đồ ghế đang hiển thị; Có ghế trống (available) | Ghế được đánh dấu selected; Tổng tiền hiển thị chính xác | High | `[BOOKING]-03` |
| 13 | BOOKING | UC-BOOKING-04 | Kiểm tra ghế đã đặt | Hệ thống ngăn không cho chọn ghế đã được đặt | System | Người dùng cố click vào ghế đã đặt | Có ghế đã được đặt trong suất chiếu | Ghế đã đặt không thể chọn; Tránh xung đột đặt vé | High | `[BOOKING]-04` |
| 14 | BOOKING | UC-BOOKING-05 | Hoàn tất đặt vé | Người dùng xác nhận và tiến hành thanh toán | User | Người dùng nhấn "Proceed to Payment" | Đã chọn ít nhất 1 ghế; Tổng tiền > 0 | Booking được tạo trong database; Ghế bị đánh dấu đã đặt; Hiển thị chi tiết vé | High | `[BOOKING]-05` |
| 15 | PAYMENT | UC-PAY-01 | Hiển thị màn hình thanh toán | Hiển thị các phương thức thanh toán có sẵn | User | Sau khi chọn ghế và nhấn tiếp tục | Đã chọn ghế ngồi; Có tổng tiền cần thanh toán | Modal thanh toán hiển thị đầy đủ; Người dùng có thể chọn phương thức | High | `[PAYMENT]-01` |
| 16 | PAYMENT | UC-PAY-02 | Thanh toán Momo | Thanh toán qua ví Momo | User | Người dùng chọn Momo và nhấn Thanh Toán | Modal thanh toán đang hiển thị | Thanh toán hoàn tất; Booking được xác nhận; Vé được tạo | High | `[PAYMENT]-02` |
| 17 | PAYMENT | UC-PAY-03 | Thanh toán ZaloPay | Thanh toán qua ví ZaloPay | User | Người dùng chọn ZaloPay và nhấn Thanh Toán | Modal thanh toán đang hiển thị | Thanh toán hoàn tất; Booking được xác nhận; Vé được tạo | Medium | `[PAYMENT]-03` |
| 18 | PAYMENT | UC-PAY-04 | Thanh toán VNPay | Thanh toán qua ví VNPay | User | Người dùng chọn VNPay và nhấn Thanh Toán | Modal thanh toán đang hiển thị | Thanh toán hoàn tất; Booking được xác nhận; Vé được tạo | Medium | `[PAYMENT]-04` |
| 19 | PAYMENT | UC-PAY-05 | Thanh toán thẻ ATM | Thanh toán qua thẻ ATM nội địa | User | Người dùng nhập thông tin thẻ và nhấn Thanh Toán | Modal thanh toán đang hiển thị; Có form nhập thông tin thẻ | Thanh toán hoàn tất; Booking được xác nhận; Vé được tạo | Medium | `[PAYMENT]-05` |
| 20 | PAYMENT | UC-PAY-06 | Xử lý lỗi thanh toán | Xử lý khi có lỗi trong quá trình thanh toán | System | Lỗi mạng hoặc thông tin không hợp lệ | Đang trong quá trình thanh toán | Hiển thị thông báo lỗi; Modal thanh toán vẫn mở; Người dùng có thể thử lại | High | `[PAYMENT]-06` |
| 21 | ADMIN | UC-ADMIN-01 | Đăng nhập Admin | Quản trị viên đăng nhập vào trang quản trị | Admin | Admin truy cập /admin hoặc đăng nhập với tài khoản admin | Tài khoản có role = "admin"; Đang ở trang chủ hoặc trang login | Admin truy cập được trang quản trị; Hiển thị các chức năng quản lý | High | `[ADMIN]-01` |
| 22 | ADMIN | UC-ADMIN-02 | Thêm phim mới | Thêm phim mới vào hệ thống | Admin | Admin nhấn nút "Add" trong tab Movies | Đã đăng nhập với quyền Admin; Đang ở trang quản lý phim | Phim được lưu vào database; Danh sách phim được cập nhật | High | `[ADMIN]-02` |
| 23 | ADMIN | UC-ADMIN-03 | Sửa thông tin phim | Chỉnh sửa thông tin phim đã có | Admin | Admin nhấn nút "Edit" trên movie card | Phim đã tồn tại trong hệ thống; Đang ở trang quản lý phim | Thông tin phim được cập nhật; Danh sách phim phản ánh thay đổi | High | `[ADMIN]-03` |
| 24 | ADMIN | UC-ADMIN-04 | Xóa phim | Xóa phim khỏi hệ thống | Admin | Admin nhấn nút "Delete" trên movie card | Phim đã tồn tại trong hệ thống; Đang ở trang quản lý phim | Phim bị xóa khỏi database; Danh sách phim được cập nhật | Medium | `[ADMIN]-04` |
| 25 | ADMIN | UC-ADMIN-05 | Quản lý rạp | Thêm, sửa, xóa thông tin rạp chiếu | Admin | Admin truy cập tab Theaters | Đã đăng nhập với quyền Admin | Thông tin rạp được cập nhật trong database | High | `[ADMIN]-05` |
| 26 | ADMIN | UC-ADMIN-06 | Quản lý suất chiếu | Thêm, sửa, xóa suất chiếu phim | Admin | Admin truy cập tab Showtimes | Đã đăng nhập với quyền Admin; Có phim và rạp trong hệ thống | Thông tin suất chiếu được cập nhật trong database | High | `[ADMIN]-06` |
| 27 | ADMIN | UC-ADMIN-07 | Quản lý người dùng | Xem, sửa thông tin người dùng | Admin | Admin truy cập tab Users | Đã đăng nhập với quyền Admin | Thông tin người dùng được cập nhật trong database | Medium | `[ADMIN]-07` |
| 28 | PROFILE | UC-PROFILE-01 | Xem lịch sử đặt vé | Xem danh sách các vé đã đặt | User | Người dùng truy cập trang Profile | Người dùng đã đăng nhập | Hiển thị danh sách vé hoặc thông báo "No bookings found" | Medium | `[PROFILE]-01` |
| 29 | PROFILE | UC-PROFILE-02 | Cập nhật thông tin cá nhân | Chỉnh sửa thông tin profile | User | Người dùng nhấn "Edit Profile" | Người dùng đã đăng nhập; Đang ở trang Profile | Hiển thị "Profile updated successfully"; Thông tin được cập nhật | Medium | `[PROFILE]-02` |
| 30 | SYSTEM | UC-SYS-01 | Kiểm tra session hết hạn | Xử lý khi JWT token hết hạn | System | Token trong localStorage hết hạn | Người dùng đang đăng nhập; Token đã hết hạn | Xóa token và redirect về trang login; Hiển thị form đăng nhập | High | `[SYS]-01` |
| 31 | SYSTEM | UC-SYS-02 | Bảo vệ trang bảo mật | Ngăn truy cập trang admin/profile khi chưa đăng nhập | System | Guest cố truy cập trang bảo mật | Người dùng chưa đăng nhập; Cố truy cập trang yêu cầu xác thực | Hiển thị "Access Denied" hoặc redirect về login | High | `[SYS]-02` |
| 32 | SYSTEM | UC-SYS-03 | Hiển thị trang 404 | Hiển thị trang 404 khi truy cập URL không tồn tại | Guest, User | User truy cập URL không tồn tại | URL không tồn tại trong hệ thống | Hiển thị trang 404 với thông báo "Page not found"; Có nút quay về trang chủ | Low | `[SYS]-03` |
| 33 | SYSTEM | UC-SYS-04 | Bảo vệ XSS | Ngăn chặn tấn công XSS | System | Attacker cố nhập script độc hại vào input | Input form đang khả dụng | Script không được thực thi; Dữ liệu được escape trước khi render | High | `[SYS]-04` |
| 34 | SYSTEM | UC-SYS-05 | Xác thực API Token | Từ chối API call không có token hợp lệ | System | Client gọi API protected mà không có token | API endpoint yêu cầu xác thực | Server trả về 401 Unauthorized; Client hiển thị form đăng nhập | High | `[SYS]-05` |

---

## 📈 THỐNG KÊ USECASE THEO MODULE

| Module | Số lượng UC | High Priority | Medium Priority | Low Priority |
|--------|-------------|---------------|-----------------|--------------|
| 🔐 **AUTH** | 6 | 6 | 0 | 0 |
| 🎬 **MOVIE** | 3 | 2 | 1 | 0 |
| 🎟️ **BOOKING** | 5 | 5 | 0 | 0 |
| 💳 **PAYMENT** | 6 | 3 | 3 | 0 |
| 👨‍💼 **ADMIN** | 7 | 5 | 2 | 0 |
| 👤 **PROFILE** | 2 | 0 | 2 | 0 |
| 🔧 **SYSTEM** | 5 | 4 | 0 | 1 |
| **TỔNG CỘNG** | **34** | **25** | **8** | **1** |

---

## 👥 THỐNG KÊ USECASE THEO ACTOR

| Actor | Mô tả | Số lượng UC liên quan |
|-------|-------|----------------------|
| 👤 **Guest** | Khách truy cập chưa đăng nhập | 9 |
| 👥 **User** | Người dùng đã đăng nhập | 16 |
| 👨‍💼 **Admin** | Quản trị viên hệ thống | 7 |
| 🔧 **System** | Hệ thống tự động | 10 |

---

## 📝 CHI TIẾT LUỒNG XỬ LÝ CHÍNH (MAIN FLOW)

### 🔐 MODULE AUTHENTICATION

| UC ID | Luồng xử lý chính |
|-------|-------------------|
| UC-AUTH-01 | 1. Truy cập trang chủ → 2. Nhấn "Login" → 3. Modal hiển thị → 4. Form hiển thị Email/Password → 5. Hiển thị nút "Sign in" và "Sign up instead" |
| UC-AUTH-02 | 1. Nhập email hợp lệ → 2. Nhập password đúng → 3. Nhấn "Sign in" → 4. Hệ thống xác thực → 5. Tạo JWT token → 6. Modal đóng → 7. Nút "Logout" xuất hiện |
| UC-AUTH-03 | 1. Email/password không đúng → 2. Hiển thị "Invalid email or password" → 3. Form vẫn mở để thử lại |
| UC-AUTH-04 | 1. Nhấn "Sign up instead" → 2. Form chuyển chế độ → 3. Nhập email mới → 4. Nhập password → 5. Nhấn "Sign up" → 6. Tạo tài khoản → 7. Tự động đăng nhập → 8. Modal đóng |
| UC-AUTH-05 | 1. Email đã tồn tại → 2. Hiển thị "User already exists" → 3. Form vẫn mở để sửa |
| UC-AUTH-06 | 1. Nhấn "Logout" → 2. Xóa JWT token → 3. UI về trạng thái Guest → 4. Nút "Login" xuất hiện |

### 🎬 MODULE MOVIE

| UC ID | Luồng xử lý chính |
|-------|-------------------|
| UC-MOVIE-01 | 1. Truy cập trang chủ → 2. Gọi API lấy danh sách phim → 3. Hiển thị movie cards dạng grid → 4. Mỗi card hiển thị: poster, tên phim, rating |
| UC-MOVIE-02 | 1. Nhấn icon tìm kiếm → 2. Ô tìm kiếm xuất hiện → 3. Nhập tên phim → 4. Lọc danh sách phim → 5. Hiển thị kết quả |
| UC-MOVIE-03 | 1. Click vào movie card → 2. Điều hướng đến trang chi tiết → 3. Hiển thị: tên phim, storyline, trailer → 4. Hiển thị nút "Book Tickets" |

### 🎟️ MODULE BOOKING

| UC ID | Luồng xử lý chính |
|-------|-------------------|
| UC-BOOKING-01 | 1. Nhấn "Book Tickets" → 2. Hiển thị danh sách suất chiếu → 3. Chọn suất chiếu → 4. Chuyển sang trang chọn ghế |
| UC-BOOKING-02 | 1. Tải thông tin ghế → 2. Hiển thị sơ đồ ghế theo hàng/cột → 3. Hiển thị chú thích: Available, Selected, Taken → 4. Ghế đã đặt bị disabled |
| UC-BOOKING-03 | 1. Click vào ghế trống → 2. Ghế đổi màu "selected" → 3. Tổng tiền cập nhật → 4. Có thể chọn nhiều ghế |
| UC-BOOKING-04 | 1. Đánh dấu ghế đã đặt là "taken" → 2. Ghế bị disabled → 3. Click không có phản hồi |
| UC-BOOKING-05 | 1. Xác nhận ghế đã chọn → 2. Nhấn "Proceed to Payment" → 3. Chuyển sang màn hình thanh toán → 4. Hoàn tất thanh toán → 5. Hiển thị thông báo thành công |

### 💳 MODULE PAYMENT

| UC ID | Luồng xử lý chính |
|-------|-------------------|
| UC-PAY-01 | 1. Modal thanh toán hiển thị → 2. Hiển thị 4 phương thức → 3. Hiển thị tổng tiền → 4. Momo được chọn mặc định |
| UC-PAY-02 | 1. Click Momo → 2. Nhấn "Thanh Toán" → 3. Xử lý thanh toán → 4. Hiển thị "Thanh toán thành công" |
| UC-PAY-03 | 1. Click ZaloPay → 2. Nhấn "Thanh Toán" → 3. Xử lý thanh toán → 4. Hiển thị "Thanh toán thành công" |
| UC-PAY-04 | 1. Click VNPay → 2. Nhấn "Thanh Toán" → 3. Xử lý thanh toán → 4. Hiển thị "Thanh toán thành công" |
| UC-PAY-05 | 1. Click Thẻ ATM → 2. Nhập số thẻ, tên, ngày hết hạn, CVV → 3. Nhấn "Thanh Toán" → 4. Hiển thị "Thanh toán thành công" |
| UC-PAY-06 | 1. Thanh toán thất bại → 2. Hiển thị thông báo lỗi → 3. Modal vẫn mở → 4. Có thể thử lại |

### 👨‍💼 MODULE ADMIN

| UC ID | Luồng xử lý chính |
|-------|-------------------|
| UC-ADMIN-01 | 1. Nhấn Login → 2. Nhập email/password admin → 3. Xác thực và kiểm tra role → 4. Chuyển hướng /admin → 5. Hiển thị Dashboard |
| UC-ADMIN-02 | 1. Click tab "Movies" → 2. Nhấn "Add" → 3. Điền form thông tin phim → 4. Nhấn "Save" → 5. Hiển thị thông báo thành công |
| UC-ADMIN-03 | 1. Hover vào movie card → 2. Nút "Edit" xuất hiện → 3. Click "Edit" → 4. Form chỉnh sửa mở → 5. Chỉnh sửa → 6. Nhấn "Save" |
| UC-ADMIN-04 | 1. Hover vào movie card → 2. Nút "Delete" xuất hiện → 3. Click "Delete" → 4. Xác nhận xóa → 5. Phim bị xóa |
| UC-ADMIN-05 | 1. Click tab "Theaters" → 2. Thêm/sửa/xóa rạp → 3. Lưu thay đổi |
| UC-ADMIN-06 | 1. Click tab "Showtimes" → 2. Thêm/sửa/xóa suất chiếu → 3. Lưu thay đổi |
| UC-ADMIN-07 | 1. Click tab "Users" → 2. Xem danh sách người dùng → 3. Sửa thông tin nếu cần |

### 👤 MODULE PROFILE

| UC ID | Luồng xử lý chính |
|-------|-------------------|
| UC-PROFILE-01 | 1. Click "Profile" → 2. Lấy danh sách booking → 3. Hiển thị danh sách vé hoặc "No bookings found" |
| UC-PROFILE-02 | 1. Vào trang Profile → 2. Nhấn "Edit Profile" → 3. Modal chỉnh sửa xuất hiện → 4. Điền thông tin → 5. Nhấn "Save Changes" |

### 🔧 MODULE SYSTEM

| UC ID | Luồng xử lý chính |
|-------|-------------------|
| UC-SYS-01 | 1. Token hết hạn → 2. Cố truy cập trang bảo mật → 3. Phát hiện token invalid → 4. Xóa token và redirect → 5. Hiển thị form đăng nhập |
| UC-SYS-02 | 1. Guest truy cập /admin → 2. Kiểm tra không có token → 3. Hiển thị "Access Denied" hoặc redirect |
| UC-SYS-03 | 1. Truy cập URL không tồn tại → 2. Hiển thị trang 404 → 3. Hiển thị "Page not found" → 4. Có nút quay về trang chủ |
| UC-SYS-04 | 1. Cố nhập script độc hại → 2. Sanitize input → 3. Script không thực thi → 4. Dữ liệu được escape |
| UC-SYS-05 | 1. Gọi API protected không có token → 2. Server trả 401 → 3. Hiển thị form đăng nhập |

---

## 🔗 MA TRẬN QUAN HỆ USECASE

### Quan hệ Include (<<include>>)

| UC Chính | Include UC |
|----------|------------|
| UC-AUTH-02 | UC-AUTH-01 |
| UC-AUTH-04 | UC-AUTH-01 |
| UC-BOOKING-02 | UC-BOOKING-01 |
| UC-BOOKING-03 | UC-BOOKING-02 |
| UC-BOOKING-05 | UC-BOOKING-03 |
| UC-PAY-02 | UC-PAY-01 |
| UC-PAY-03 | UC-PAY-01 |
| UC-PAY-04 | UC-PAY-01 |
| UC-PAY-05 | UC-PAY-01 |
| UC-ADMIN-02 | UC-ADMIN-01 |
| UC-ADMIN-03 | UC-ADMIN-01 |
| UC-ADMIN-04 | UC-ADMIN-01 |
| UC-ADMIN-05 | UC-ADMIN-01 |
| UC-ADMIN-06 | UC-ADMIN-01 |
| UC-ADMIN-07 | UC-ADMIN-01 |

### Quan hệ Extend (<<extend>>)

| UC Mở rộng | Extend từ UC |
|------------|--------------|
| UC-AUTH-03 | UC-AUTH-02 |
| UC-AUTH-05 | UC-AUTH-04 |
| UC-BOOKING-04 | UC-BOOKING-03 |
| UC-PAY-06 | UC-PAY-01 |
| UC-MOVIE-02 | UC-MOVIE-01 |
| UC-MOVIE-03 | UC-MOVIE-01 |

---

> **Tác giả:** CinemaVision Pro Team  
> **Cập nhật lần cuối:** 15/12/2024
