# 🚀 Hướng dẫn Deploy lên Vercel

## Chuẩn bị trước khi deploy

### 1. Tạo tài khoản Vercel
- Truy cập: https://vercel.com
- Đăng ký bằng GitHub, GitLab, hoặc Bitbucket

### 2. Push code lên Git Repository
```bash
# Khởi tạo git (nếu chưa có)
git init

# Add tất cả files
git add .

# Commit
git commit -m "Ready for Vercel deployment"

# Tạo repository trên GitHub và push
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

## Cách Deploy

### Phương pháp 1: Deploy qua Vercel Dashboard (Khuyến nghị)

1. **Đăng nhập Vercel**: https://vercel.com/login

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Chọn repository GitHub của bạn
   - Click "Import"

3. **Cấu hình Environment Variables**:
   Trong phần "Environment Variables", thêm các biến sau:
   
   ```
   MONGODB_URI=<your-mongodb-atlas-connection-string>
   JWT_SECRET=<your-jwt-secret-key>
   NODE_ENV=production
   FRONTEND_URL=https://your-app.vercel.app
   ```

4. **Deploy Settings**:
   - Framework Preset: Vite
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **Click "Deploy"** và đợi vài phút!

### Phương pháp 2: Deploy qua Vercel CLI

1. **Cài đặt Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login**:
```bash
vercel login
```

3. **Deploy**:
```bash
# Deploy lần đầu
vercel

# Hoặc deploy production
vercel --prod
```

4. **Thêm Environment Variables**:
```bash
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add NODE_ENV
```

## ⚙️ Environment Variables cần thiết

Đảm bảo bạn đã thêm các biến môi trường sau trong Vercel Dashboard:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/moviedb` |
| `JWT_SECRET` | Secret key cho JWT authentication | `your-super-secret-key-here` |
| `NODE_ENV` | Environment mode | `production` |
| `FRONTEND_URL` | URL của frontend (sau khi deploy) | `https://your-app.vercel.app` |

## 📝 Lưu ý quan trọng

### 1. MongoDB Atlas
- Đảm bảo MongoDB Atlas đã được cấu hình cho phép kết nối từ mọi IP (0.0.0.0/0) vì Vercel sử dụng dynamic IPs
- Vào MongoDB Atlas → Network Access → Add IP Address → Allow Access from Anywhere

### 2. CORS Configuration
- Sau khi deploy, cập nhật `FRONTEND_URL` environment variable với URL thực tế của app
- Vercel sẽ tự động cung cấp URL dạng: `https://your-project-name.vercel.app`

### 3. API Routes
- Tất cả API calls từ frontend sẽ đi qua `/api/*`
- Vercel sẽ tự động route các requests này đến serverless functions

### 4. Cold Starts
- Serverless functions có thể có "cold start" (khởi động chậm) lần đầu tiên
- Điều này là bình thường và sẽ nhanh hơn sau các requests tiếp theo

## 🔄 Cập nhật sau khi Deploy

Mỗi khi bạn push code mới lên GitHub:
- Vercel sẽ tự động build và deploy phiên bản mới
- Mỗi commit sẽ tạo một preview deployment
- Merge vào branch `main` sẽ deploy lên production

## 🐛 Troubleshooting

### Lỗi MongoDB Connection
```
Error: Could not connect to MongoDB
```
**Giải pháp**: Kiểm tra MongoDB Atlas Network Access và MONGODB_URI environment variable

### Lỗi 404 trên API routes
```
404 - Not Found
```
**Giải pháp**: Đảm bảo `vercel.json` đã được commit và push lên repository

### Build Failed
```
Error: Build failed
```
**Giải pháp**: Kiểm tra logs trong Vercel Dashboard, thường là do thiếu dependencies hoặc TypeScript errors

## 📱 Kiểm tra sau khi Deploy

1. Truy cập URL Vercel cung cấp
2. Kiểm tra trang chủ có hiển thị hero section
3. Test đăng nhập/đăng ký
4. Test booking phim
5. Kiểm tra API health: `https://your-app.vercel.app/api/health`

## 🎉 Hoàn thành!

Sau khi deploy thành công, bạn sẽ có:
- ✅ Frontend React trên Vercel CDN (cực nhanh)
- ✅ Backend API chạy trên Vercel Serverless Functions
- ✅ MongoDB Atlas database
- ✅ HTTPS tự động
- ✅ Custom domain (nếu muốn)

---

**Cần hỗ trợ?** Xem Vercel docs: https://vercel.com/docs
