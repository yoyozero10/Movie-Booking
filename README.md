# 🎬 CinemaVision Pro

A modern, full-stack movie booking platform built with React, Node.js, and MongoDB.

## ✨ Features

### 🎯 User Features
- **Movie Browsing** - Browse latest movies with beautiful grid layout
- **Showtime Selection** - View available showtimes across multiple theaters
- **Seat Selection** - Interactive seat map with real-time availability
- **Secure Booking** - PayOS payment integration
- **User Profile** - Track bookings and activity
- **Multi-language** - English & Vietnamese support (🌍 EN/VI)
- **Multi-currency** - VND & USD with auto-conversion

### 👨‍💼 Admin Features
- **Dashboard** - Overview of bookings, revenue, and stats
- **Movie Management** - Full CRUD operations for movies
- **Theater Management** - Manage theaters and seating capacity
- **Showtime Management** - Create and manage showtimes with smart filtering
- **User Management** - Role management and user administration
- **Performance Optimized** - 5x faster with optimistic UI updates

### 🎨 Design
- **CinemaVision Pro Design System** - Apple-inspired glassmorphism
- **Responsive** - Mobile-first design
- **Animations** - Smooth transitions and micro-interactions
- **Dark Theme** - Premium dark mode throughout

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Lucide Icons** - Icon library
- **Sonner** - Toast notifications

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **PayOS** - Payment gateway
- **bcryptjs** - Password hashing

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB 6+
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd movie_booking_website
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/movie_booking

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d

# Server
PORT=5000
FRONTEND_URL=http://localhost:5173

# PayOS (Optional - for payment integration)
PAYOS_CLIENT_ID=your-client-id
PAYOS_API_KEY=your-api-key
PAYOS_CHECKSUM_KEY=your-checksum-key
```

4. **Start the application**
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 🗂️ Project Structure

```
movie_booking_website/
├── src/                      # Frontend source
│   ├── components/          # React components
│   │   ├── admin/          # Admin panel components
│   │   ├── Navigation.tsx
│   │   ├── HeroSection.tsx
│   │   ├── MovieDetails.tsx
│   │   ├── SeatSelection.tsx
│   │   └── ...
│   ├── lib/                # Utilities
│   │   ├── api.ts          # API client
│   │   ├── auth.ts         # Auth context
│   │   ├── currency.ts     # Currency formatting
│   │   └── i18n.ts         # Translations
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── server/                  # Backend source
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Express middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   └── server.js          # Server entry point
└── package.json
```

## 🔐 Default Admin Account

After first run, create an admin account:

```
Email: admin@cinemavision.com
Password: admin123
```

Or register a new account and manually update the role in MongoDB:
```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

## 🌍 Internationalization

The app supports English and Vietnamese:

- Click the 🌍 button in navigation to switch languages
- Language preference is saved in localStorage
- Currency auto-switches based on language (VI → VND, EN → USD)

## 💰 Currency Support

- **VND** - Vietnamese Dong (100,000₫ or 100k₫)
- **USD** - US Dollar ($12.99)
- Auto-conversion based on language selection

## 📱 Key Pages

- **/** - Home with hero section and featured movies
- **/movies** - Browse and book movies (requires login)
- **/releases** - Latest movie releases
- **/contact** - Contact form
- **/profile** - User profile and booking history
- **/admin** - Admin panel (admin only)

## 🎯 Admin Panel Routes

- **/admin** - Dashboard
- **/admin/movies** - Movie management
- **/admin/theaters** - Theater management
- **/admin/showtimes** - Showtime management
- **/admin/users** - User management

## 🔧 Development

### Run in development mode
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## 📊 Database Models

- **User** - User accounts and authentication
- **Movie** - Movie information
- **Theater** - Theater locations and capacity
- **Showtime** - Movie showtimes
- **Booking** - User bookings

## 🎨 Design System

### Colors
- **Primary Blue**: `#0071e3` (apple-blue)
- **Orange**: `#ff9500` (apple-orange)
- **Background**: Gradient from `#000000` to `#1a1a1a`

### Components
- **Glass Cards**: `apple-glass` class
- **Premium Glass**: `premium-glass` class
- **Buttons**: `apple-button` class
- **Text Gradient**: `apple-text-gradient` class

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder

### Backend (Render/Railway)
1. Set environment variables
2. Deploy from `server/` directory
3. Start command: `node server/server.js`

### Database (MongoDB Atlas)
1. Create a cluster
2. Update `MONGODB_URI` in `.env`

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please contact:
- Email: support@cinemavision.com
- Website: [CinemaVision Pro](https://cinemavision.com)

---

**Built with ❤️ using React, Node.js, and MongoDB**

🎬 **CinemaVision Pro** - Your Premium Movie Booking Experience
