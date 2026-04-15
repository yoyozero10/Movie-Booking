# BIÊN BẢN CUỘC HỌP NGHIỆM THU SẢN PHẨM

---

**BỘ GIÁO DỤC VÀ ĐÀO TẠO**
**TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN — ĐHQG TP.HCM**
**KHOA CÔNG NGHỆ PHẦN MỀM**

**Môn học:** Phát triển, Vận hành và Bảo trì Phần mềm
**Dự án:** CinemaVision Pro — Hệ thống đặt vé xem phim trực tuyến

---

## I. THÔNG TIN CUỘC HỌP

| Hạng mục | Chi tiết |
|---|---|
| Ngày họp | Thứ Hai, ngày 14 tháng 04 năm 2026 |
| Thời gian | 19:00 — 20:30 (90 phút) |
| Hình thức | Họp trực tuyến qua Google Meet |
| Chủ đề | Nghiệm thu hoàn thành các yêu cầu tính năng |
| Chủ trì | Le Van Bao — Nhóm 15 (Nhóm phát triển) |
| Thư ký | Nguyen Xuan Nhat Minh — Nhóm 15 |

---

## II. THÀNH PHẦN THAM DỰ

### 1. Nhóm 15 — Nhóm Phát Triển

| STT | Họ và tên | MSSV | Vai trò | Có mặt |
|---|---|---|---|---|
| 1 | Le Van Bao | 23520112 | Trưởng nhóm / Tech Lead | Có |
| 2 | Tran Dai Thang | 23521432 | Backend Developer / Tester | Có |
| 3 | Nguyen Xuan Nhat Minh | 23520946 | Frontend Developer / Thư ký | Có |
| 4 | Doan Duc Trung | 23521674 | Frontend Developer / DevOps | Có |

### 2. Nhóm 16 — Nhóm Khách Hàng

| STT | Họ và tên | MSSV | Vai trò | Có mặt |
|---|---|---|---|---|
| 1 | (Thành viên 1) | (MSSV) | Đại diện khách hàng | Có |
| 2 | (Thành viên 2) | (MSSV) | Thành viên | Có |
| 3 | (Thành viên 3) | (MSSV) | Thành viên | Có |
| 4 | (Thành viên 4) | (MSSV) | Thành viên | Có |

*(Cần cập nhật tên và MSSV thực tế của các thành viên Nhóm 16.)*

---

## III. MỤC ĐÍCH CUỘC HỌP

1. Trình bày kết quả phát triển sản phẩm CinemaVision Pro theo các yêu cầu tính năng do Nhóm 16 (Nhóm khách hàng) đặt ra.
2. Demo trực tiếp các tính năng đã hoàn thành trên môi trường production.
3. Nhóm khách hàng xác nhận nghiệm thu từng tính năng.
4. Ghi nhận phản hồi, đánh giá và kết luận về mức độ hoàn thành dự án.

---

## IV. NỘI DUNG CUỘC HỌP

### 4.1. Khai mạc (19:00 — 19:10)

Le Van Bao (Nhóm 15) mở đầu cuộc họp, giới thiệu thành phần tham dự và nêu mục đích cuộc họp. Đại diện Nhóm 16 xác nhận sẵn sàng nghiệm thu. Hai bên thống nhất quy trình: demo từng nhóm tính năng, khách hàng xác nhận, ghi nhận phản hồi.

### 4.2. Tổng quan sản phẩm (19:10 — 19:20)

Le Van Bao trình bày tổng quan sản phẩm:

- **Tên sản phẩm:** CinemaVision Pro — Hệ thống đặt vé xem phim trực tuyến.
- **Kiến trúc:** Full-stack Monorepo. Frontend sử dụng React 19, TypeScript, Vite, Tailwind CSS. Backend sử dụng Express 5.0, MongoDB (Mongoose), JWT.
- **Triển khai:** Netlify/Vercel (Frontend), Render (Backend), MongoDB Atlas (Database).
- **Trạng thái hiện tại:** Đã hoàn thành toàn bộ yêu cầu tính năng.

### 4.3. Demo và nghiệm thu tính năng (19:20 — 20:00)

---

#### A. Nhóm tính năng 1: Xác thực và Quản lý tài khoản

| Mã | Yêu cầu tính năng | Kết quả demo | KL |
|---|---|---|---|
| FR-01 | Đăng ký tài khoản mới (name, email, password) | Hoạt động đúng. Validate email trùng, password tối thiểu 6 ký tự. | Đạt |
| FR-02 | Đăng nhập bằng email và password | Trả JWT token, lưu vào localStorage, redirect về trang chính. | Đạt |
| FR-03 | Đăng xuất | Xóa JWT, reset trạng thái ứng dụng, redirect về homepage. | Đạt |
| FR-04 | Quên mật khẩu (gửi email chứa link reset) | Gửi email chứa reset link, token tự động hết hạn sau 1 giờ. | Đạt |
| FR-05 | Đặt lại mật khẩu qua link email | Xác minh token hợp lệ, cho phép đặt mật khẩu mới. | Đạt |
| FR-06 | Xem và cập nhật thông tin cá nhân | Modal chỉnh sửa tên, hiển thị email và role. | Đạt |
| FR-07 | Đổi mật khẩu (yêu cầu nhập mật khẩu cũ) | Xác minh mật khẩu cũ, mật khẩu mới phải khác mật khẩu cũ. | Đạt |

**Nhận xét của Nhóm 16:** Các tính năng xác thực hoạt động ổn định, cơ chế bảo mật đầy đủ, luồng reset mật khẩu qua email hoạt động tốt.

---

#### B. Nhóm tính năng 2: Duyệt phim và Tìm kiếm

| Mã | Yêu cầu tính năng | Kết quả demo | KL |
|---|---|---|---|
| FR-08 | Hiển thị danh sách phim dạng gallery | Grid layout hiển thị poster, tiêu đề, thể loại, rating, thời lượng. | Đạt |
| FR-09 | Tìm kiếm phim theo tiêu đề | Tìm kiếm realtime, không phân biệt hoa thường. | Đạt |
| FR-10 | Lọc phim theo thể loại và đánh giá | Bộ lọc kết hợp hoạt động đúng. | Đạt |
| FR-11 | Xem chi tiết phim | Hiển thị đầy đủ: tóm tắt nội dung, diễn viên, trailer, rating, thời lượng. | Đạt |
| FR-12 | Hiển thị phim nổi bật trên trang chủ | Hero section và danh sách phim nổi bật hiển thị chính xác. | Đạt |

**Nhận xét của Nhóm 16:** Giao diện duyệt phim trực quan, trải nghiệm tìm kiếm và lọc mượt mà.

---

#### C. Nhóm tính năng 3: Rạp chiếu và Suất chiếu

| Mã | Yêu cầu tính năng | Kết quả demo | KL |
|---|---|---|---|
| FR-13 | Duyệt rạp chiếu theo khu vực/thành phố | Chọn khu vực, hiển thị danh sách rạp theo vùng. | Đạt |
| FR-14 | Xem phim đang chiếu tại rạp cụ thể | Liệt kê danh sách phim và suất chiếu tương ứng. | Đạt |
| FR-15 | Xem suất chiếu theo phim | Hiển thị rạp, ngày, giờ chiếu, giá vé và số ghế trống. | Đạt |
| FR-16 | Lọc suất chiếu theo ngày | Bộ lọc ngày hoạt động chính xác. | Đạt |

**Nhận xét của Nhóm 16:** Luồng duyệt từ khu vực đến rạp đến suất chiếu rõ ràng, logic và dễ sử dụng.

---

#### D. Nhóm tính năng 4: Đặt vé và Thanh toán

| Mã | Yêu cầu tính năng | Kết quả demo | KL |
|---|---|---|---|
| FR-17 | Chọn ghế qua sơ đồ ghế tương tác | Phân biệt rõ ghế trống, đã đặt và đang chọn bằng mã màu. | Đạt |
| FR-18 | Hiển thị tóm tắt đơn hàng (ghế, giá, tổng tiền) | Cập nhật realtime khi người dùng chọn/bỏ chọn ghế. | Đạt |
| FR-19 | Xử lý xung đột ghế (đặt đồng thời) | Backend kiểm tra conflict, từ chối nếu ghế đã được xác nhận bởi người khác. | Đạt |
| FR-20 | Thanh toán mô phỏng (ATM, Momo, ZaloPay, VNPay) | Modal thanh toán với 4 phương thức, validation thông tin thẻ ATM. | Đạt |
| FR-21 | Tạo vé điện tử dạng mã QR | Mã QR chứa booking reference, hiển thị sau khi thanh toán thành công. | Đạt |
| FR-22 | Xem lịch sử đặt vé | Danh sách booking với đầy đủ chi tiết và mã QR. | Đạt |
| FR-23 | Hủy đặt vé | Hoàn trả ghế, cập nhật trạng thái sang "cancelled". | Đạt |
| FR-24 | Xóa đặt vé đã hủy | Chỉ cho phép xóa booking có trạng thái "cancelled". | Đạt |

**Nhận xét của Nhóm 16:** Luồng đặt vé hoàn chỉnh từ chọn ghế đến xác nhận. Xử lý xung đột ghế khi đặt đồng thời là điểm kỹ thuật quan trọng được giải quyết tốt. Vé QR Code là tính năng có giá trị thực tiễn cao.

---

#### E. Nhóm tính năng 5: Quản trị hệ thống

| Mã | Yêu cầu tính năng | Kết quả demo | KL |
|---|---|---|---|
| FR-25 | Admin Dashboard với thống kê tổng quan | Hiển thị tổng số phim, rạp, người dùng và đơn đặt vé. | Đạt |
| FR-26 | Quản lý phim (tạo, sửa, xóa) | Thao tác CRUD hoạt động đúng, dữ liệu cập nhật realtime. | Đạt |
| FR-27 | Quản lý rạp chiếu (tạo, sửa, xóa) | CRUD rạp với các trường name, location, city, totalSeats. | Đạt |
| FR-28 | Quản lý suất chiếu (tạo, sửa, xóa) | Tạo suất chiếu liên kết phim và rạp, kiểm tra ràng buộc. | Đạt |
| FR-29 | Quản lý người dùng (xem, đổi role, xóa) | Danh sách users, cập nhật role. Admin không thể tự hạ quyền hoặc xóa chính mình. | Đạt |
| FR-30 | Quản lý đơn đặt vé (xem, cập nhật trạng thái) | Xem tất cả bookings, cập nhật trạng thái confirmed/cancelled. | Đạt |

**Nhận xét của Nhóm 16:** Admin Dashboard đầy đủ chức năng quản lý. Giao diện admin chuyên nghiệp, thao tác nhanh và trực quan.

---

#### F. Nhóm tính năng 6: Tính năng hệ thống

| Mã | Yêu cầu tính năng | Kết quả demo | KL |
|---|---|---|---|
| FR-31 | Đa ngôn ngữ (Tiếng Anh / Tiếng Việt) | Chuyển đổi ngôn ngữ hoạt động, lưu tùy chọn người dùng. | Đạt |
| FR-32 | Tự động chuyển đổi tiền tệ (VND/USD) | Tiền tệ tự động thay đổi theo ngôn ngữ. | Đạt |
| FR-33 | Giao diện responsive (desktop và mobile) | Kiểm tra trên nhiều kích thước màn hình, hiển thị tốt. | Đạt |
| FR-34 | Trang thông báo lỗi 404 tùy chỉnh | Trang 404 riêng với nút quay về trang chủ. | Đạt |
| FR-35 | Bảo vệ route theo quyền truy cập | Chặn truy cập booking nếu chưa đăng nhập. Chặn truy cập admin nếu không có quyền admin. | Đạt |

**Nhận xét của Nhóm 16:** Tính năng đa ngôn ngữ và responsive thể hiện sự hoàn thiện của sản phẩm.

---

### 4.4. Tổng kết nghiệm thu (20:00 — 20:15)

**Bảng tổng hợp kết quả:**

| Nhóm tính năng | Tổng yêu cầu | Đạt | Không đạt | Tỷ lệ hoàn thành |
|---|---|---|---|---|
| Xác thực và Quản lý tài khoản | 7 | 7 | 0 | 100% |
| Duyệt phim và Tìm kiếm | 5 | 5 | 0 | 100% |
| Rạp chiếu và Suất chiếu | 4 | 4 | 0 | 100% |
| Đặt vé và Thanh toán | 8 | 8 | 0 | 100% |
| Quản trị hệ thống | 6 | 6 | 0 | 100% |
| Tính năng hệ thống | 5 | 5 | 0 | 100% |
| **Tổng cộng** | **35** | **35** | **0** | **100%** |

---

### 4.5. Phản hồi tổng thể từ Nhóm 16 (20:15 — 20:25)

**Điểm mạnh được ghi nhận:**

1. Giao diện thiết kế chuyên nghiệp với dark theme, trải nghiệm người dùng mượt mà.
2. Tất cả 35 yêu cầu tính năng đã được triển khai hoàn chỉnh, không thiếu sót.
3. Cơ chế bảo mật đầy đủ: xác thực JWT, mã hóa mật khẩu, giới hạn tốc độ truy vấn API, bảo vệ admin tự thao tác trên chính mình.
4. Xử lý xung đột ghế khi đặt đồng thời được giải quyết đúng cách.
5. Vé điện tử mã QR và hỗ trợ đa ngôn ngữ là các tính năng nổi bật.

**Đề xuất cải tiến cho phiên bản tương lai:**

1. Tích hợp cổng thanh toán thực tế (PayOS hoặc VNPay) thay thế thanh toán mô phỏng.
2. Bổ sung tính năng khóa ghế theo thời gian thực bằng WebSocket.
3. Gửi email xác nhận tự động sau khi đặt vé thành công.
4. Bổ sung tính năng đánh giá và nhận xét phim.

---

### 4.6. Kết luận cuộc họp (20:25 — 20:30)

Hai bên thống nhất các kết luận sau:

1. Nhóm 16 (Khách hàng) xác nhận **nghiệm thu thành công** toàn bộ 35/35 yêu cầu tính năng.
2. Sản phẩm CinemaVision Pro đáp ứng đầy đủ các yêu cầu đã đề ra, hoạt động ổn định và sẵn sàng cho việc bàn giao và vận hành.
3. Các đề xuất cải tiến của Nhóm 16 được ghi nhận và sẽ được xem xét cho phiên bản phát triển tiếp theo.

---

## V. VẤN ĐỀ TỒN ĐỌNG

Không có vấn đề tồn đọng. Toàn bộ yêu cầu tính năng đã được hoàn thành và nghiệm thu.

---

## VI. HÀNH ĐỘNG TIẾP THEO

| STT | Nội dung | Phụ trách | Hạn hoàn thành |
|---|---|---|---|
| 1 | Hoàn thiện tài liệu nghiệm thu cuối kỳ | Le Van Bao (Nhóm 15) | 18/04/2026 |
| 2 | Chuẩn bị slide báo cáo cuối kỳ | Nhóm 15 | 18/04/2026 |
| 3 | Gửi xác nhận nghiệm thu bằng văn bản | Đại diện Nhóm 16 | 16/04/2026 |
| 4 | Nộp báo cáo cuối kỳ cho giảng viên | Cả hai nhóm | 20/04/2026 |

---

## VII. XÁC NHẬN

### Đại diện Nhóm 15 — Nhóm Phát Triển

| Vai trò | Họ và tên | Ký tên |
|---|---|---|
| Trưởng nhóm | Le Van Bao | ........................ |
| Thành viên | Tran Dai Thang | ........................ |
| Thành viên | Nguyen Xuan Nhat Minh | ........................ |
| Thành viên | Doan Duc Trung | ........................ |

### Đại diện Nhóm 16 — Nhóm Khách Hàng

| Vai trò | Họ và tên | Ký tên |
|---|---|---|
| Đại diện khách hàng | (Thành viên 1) | ........................ |
| Thành viên | (Thành viên 2) | ........................ |
| Thành viên | (Thành viên 3) | ........................ |
| Thành viên | (Thành viên 4) | ........................ |

---

Biên bản được lập thành 02 bản có giá trị ngang nhau, mỗi nhóm giữ 01 bản.

Cuộc họp kết thúc lúc 20 giờ 30 phút cùng ngày.

---

Thư ký cuộc họp

**Nguyen Xuan Nhat Minh** — Nhóm 15

Ngày lập biên bản: 14/04/2026
