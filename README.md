# 🎬 Movie Booking Website

A full-stack movie booking application built with React + Vite frontend and Express.js + MongoDB backend. Users can browse movies, check showtimes, and book tickets online.

## ✨ Features

### Frontend
- 🎭 **Movie Discovery** - Browse and search movies with filters
- 🎫 **Showtime Selection** - View available showtimes by theater and date
- 👤 **User Authentication** - Register, login, and profile management
- 👥 **User Profiles** - View user details and profile information
- 🎨 **Responsive Design** - Modern UI with Tailwind CSS
- 📱 **Mobile-Friendly** - Optimized for all devices

### Backend
- 🔐 **JWT Authentication** - Secure user authentication
- 🎭 **Movie Management** - CRUD operations for movies
- 🎪 **Theater Management** - Theater and showtime management

 **Booking System** - Seat selection and ticket booking
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
- MongoDB Atlas account (for production) or local MongoDB (for development)
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

   **Quick Setup:**
   ```bash
   npm run setup
   ```

   **Or Manual Setup:**
   ```bash
   # Create environment file
   cp .env.example .env.local
   ```

   **Edit .env.local:**
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_NODE_ENV=development
   ```

   **For Production Deployment:**
   ```env
   VITE_API_BASE_URL=https://your-production-backend.com/api
   VITE_NODE_ENV=production
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

## 🔧 Environment Variables

The application uses environment variables for easy deployment configuration. All API URLs are configurable through environment variables.

### Development Setup

1. **Copy the environment template:**
   ```bash
   cp .env.example .env.local
   ```

2. **Configure for local development:**
   ```env
   # .env.local
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_NODE_ENV=development
   ```

### Production Setup

For production deployment, update the environment variable:

```env
# Production environment
VITE_API_BASE_URL=https://your-production-backend.com/api
VITE_NODE_ENV=production
```

### Deployment Platforms

#### Render
```env
VITE_API_BASE_URL=https://your-app.onrender.com/api
```

#### Railway
```env
VITE_API_BASE_URL=https://your-app.railway.app/api
```

#### Vercel
```env
VITE_API_BASE_URL=https://your-app.vercel.app/api
```

#### Netlify
```env
VITE_API_BASE_URL=https://your-netlify-site.netlify.app/api
```

### Environment Variable Usage

The application automatically loads environment variables and makes them available throughout the codebase:

```typescript
// In any component or service
import { config } from '../lib/config';

// Access API URL
const apiUrl = config.API_BASE_URL; // http://localhost:5000/api (dev) or production URL

// Check environment
if (config.isDevelopment) {
  console.log('Running in development mode');
}
```

## 🎯 Frontend Usage

### API Integration
All API calls automatically use the configured backend URL:

```typescript
// Using the API client (automatically uses environment config)
const userProfile = await api.getUserById('user-id');

// Using auth context (automatically uses environment config)
const { login, register } = useAuth();
await login('user@example.com', 'password');
```

## 🔧 Available Scripts

- `npm run setup` - Setup environment variables automatically
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
- `GET /api/auth/:id` - Get user details by ID (public)
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

### Frontend Deployment

#### 1. Environment Configuration
Set the following environment variables in your deployment platform:

```env
VITE_API_BASE_URL=https://your-backend-deployment-url.com/api
VITE_NODE_ENV=production
```

#### 2. Build and Deploy
```bash
# Build the application
npm run build

# Deploy to your platform (Netlify, Vercel, etc.)
# The build output is in the `dist` folder
```

### Platform-Specific Setup

#### Netlify
1. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Environment Variables:**
   ```env
   VITE_API_BASE_URL=https://your-render-backend.onrender.com/api
   ```

3. **Deploy:**
   - Connect your GitHub repository to Netlify
   - Netlify will automatically build and deploy on pushes

#### Vercel
1. **Environment Variables:**
   ```env
   VITE_API_BASE_URL=https://your-backend-url.vercel.app/api
   ```

2. **Deploy:**
   - Connect your GitHub repository to Vercel
   - Vercel will handle the build and deployment automatically

#### Railway
1. **Environment Variables:**
   ```env
   VITE_API_BASE_URL=https://your-app.railway.app/api
   ```

#### Render (Static Site)
1. **Environment Variables:**
   ```env
   VITE_API_BASE_URL=https://your-render-app.onrender.com/api
   ```

### Backend Deployment

Deploy your backend separately and update the `VITE_API_BASE_URL` environment variable to point to your deployed backend URL.

**Example deployment combinations:**
- Frontend on Netlify + Backend on Render
- Frontend on Vercel + Backend on Railway
- Frontend on Netlify + Backend on Heroku

## 🔒 Environment Variables

### Development (.env.local)
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_NODE_ENV=development
```

### Production (Deployment Platform)
```env
VITE_API_BASE_URL=https://your-production-backend.com/api
VITE_NODE_ENV=production
```

### Backend Environment Variables
For backend deployment, also set these variables on your backend hosting platform:

```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_secret
JWT_EXPIRES_IN=7d
PORT=10000
FRONTEND_URL=https://your-frontend-deployment-url.com
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
