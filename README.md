# 🎬 Movie Booking Website

A full-stack movie booking application built with React + Vite frontend and Express.js + MongoDB backend. Users can browse movies, check showtimes, and book tickets online.

## ✨ Features

### Frontend
- 🎭 **Movie Discovery** - Browse and search movies with filters
- 🎫 **Showtime Selection** - View available showtimes by theater and date
- 👤 **User Authentication** - Register, login, and profile management
- 🎨 **Responsive Design** - Modern UI with Tailwind CSS
- 📱 **Mobile-Friendly** - Optimized for all devices

### Backend
- 🔐 **JWT Authentication** - Secure user authentication
- 🎭 **Movie Management** - CRUD operations for movies
- 🎪 **Theater Management** - Theater and showtime management
- 🎫 **Booking System** - Seat selection and ticket booking
- 📊 **Rate Limiting** - API protection against abuse
- 🔒 **Security** - Helmet, CORS, and input validation

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

### Backend
- **Express.js** - Fast, unopinionated web framework
- **MongoDB + Mongoose** - NoSQL database and ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-Origin Resource Sharing
- **Helmet** - Security middleware
- **express-rate-limit** - API rate limiting

### Deployment
- **Netlify** - Frontend hosting
- **Render** - Backend hosting
- **MongoDB Atlas** - Cloud database

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/movie-booking-website.git
   cd movie-booking-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   # MongoDB Connection
   MONGODB_URI=your_mongodb_connection_string_here

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=7d

   # Server Configuration
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   This will start both frontend (http://localhost:5173) and backend (http://localhost:5000)

## 📁 Project Structure

```
movie-booking-website/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── lib/               # Utilities and API client
│   ├── pages/             # Page components
│   └── styles/            # CSS styles
├── server/                # Backend source code
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── server.js         # Main server file
├── public/               # Static assets
├── dist/                 # Build output (generated)
└── logs/                 # Server logs (generated)
```

## 🔧 Available Scripts

- `npm run dev` - Start development server (both frontend and backend)
- `npm run dev:frontend` - Start only frontend
- `npm run dev:backend` - Start only backend
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run seed` - Seed database with sample data
- `npm run lint` - Run linting

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie by ID
- `POST /api/movies` - Create movie (admin)
- `PUT /api/movies/:id` - Update movie (admin)
- `DELETE /api/movies/:id` - Delete movie (admin)

### Theaters
- `GET /api/theaters` - Get all theaters
- `GET /api/theaters/:id` - Get theater by ID

### Showtimes
- `GET /api/showtimes` - Get showtimes with filters
- `GET /api/showtimes/:id` - Get showtime by ID

### Bookings
- `POST /api/bookings` - Create booking (protected)
- `GET /api/bookings` - Get user bookings (protected)

## 🚢 Deployment

### Frontend (Netlify)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   ```bash
   netlify deploy --prod --dir=dist
   ```

   Or connect your GitHub repository to Netlify for automatic deployments.

### Backend (Render)

1. **Connect to Render**
   - Link your GitHub repository to Render
   - Set build command: `npm install`
   - Set start command: `npm start`

2. **Environment Variables on Render**
   ```env
   NODE_ENV=production
   MONGODB_URI=your_production_mongodb_uri
   JWT_SECRET=your_production_secret
   JWT_EXPIRES_IN=7d
   PORT=10000
   FRONTEND_URL=https://your-netlify-site.netlify.app
   ```

### Database (MongoDB Atlas)

1. Create a cluster on MongoDB Atlas
2. Set up database user and password
3. Add your Render service IP to Network Access
4. Use the connection string in `MONGODB_URI`

## 🔒 Environment Variables

### Development (.env)
```env
MONGODB_URI=mongodb://localhost:27017/movie_booking
JWT_SECRET=your_development_secret
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### Production (Render)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/movie_booking
JWT_SECRET=your_production_secret
PORT=10000
FRONTEND_URL=https://your-netlify-site.netlify.app
```

## 🔐 Security Features

- **Password Hashing** - bcryptjs for secure password storage
- **JWT Authentication** - Stateless authentication
- **Rate Limiting** - 100 requests per 15 minutes per IP
- **CORS** - Properly configured cross-origin requests
- **Helmet** - Security headers
- **Input Validation** - Request validation and sanitization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Movie data and images from public APIs
- Icons from Lucide React
- UI components styled with Tailwind CSS

## 📞 Support

If you have any questions or issues, please open an issue on GitHub or contact the development team.

---

**Happy Movie Booking! 🍿🎬**
