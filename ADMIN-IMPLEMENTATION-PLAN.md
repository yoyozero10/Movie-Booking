# 🔐 Admin Role Implementation Plan - CinemaVision Pro

## 📋 Tổng Quan

Hệ thống phân quyền admin cho phép quản lý toàn bộ ứng dụng cinema booking với các tính năng:
- Quản lý Movies (CRUD)
- Quản lý Theaters (CRUD)
- Quản lý Showtimes (CRUD)
- Quản lý Users
- Xem thống kê & analytics
- Quản lý bookings

---

## 🏗️ Architecture Overview

### **1. User Roles**
```typescript
enum UserRole {
  USER = 'user',      // Người dùng thường
  ADMIN = 'admin'     // Quản trị viên
}

interface User {
  _id: string;
  email: string;
  name: string;
  role: UserRole;     // ← Thêm field này
  createdAt: string;
}
```

---

## 📁 File Structure

```
src/
├── components/
│   ├── admin/                    # ← NEW: Admin components
│   │   ├── AdminLayout.tsx       # Layout cho admin panel
│   │   ├── AdminDashboard.tsx    # Dashboard với statistics
│   │   ├── MovieManagement.tsx   # CRUD movies
│   │   ├── TheaterManagement.tsx # CRUD theaters
│   │   ├── ShowtimeManagement.tsx# CRUD showtimes
│   │   ├── UserManagement.tsx    # Quản lý users
│   │   └── BookingManagement.tsx # Xem & quản lý bookings
│   │
│   └── ProtectedRoute.tsx        # ← NEW: Route protection
│
├── hooks/
│   └── useAuth.ts                # ← UPDATE: Add role check
│
└── lib/
    └── api.ts                    # ← UPDATE: Add admin APIs
```

---

## 🔐 Implementation Steps

### **Phase 1: Backend Updates (NestJS)**

#### **1.1 Update User Schema**
```typescript
// backend/src/users/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  name: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.USER })
  role: UserRole;  // ← NEW
}
```

#### **1.2 Create Admin Guard**
```typescript
// backend/src/auth/guards/admin.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    return user && user.role === 'admin';
  }
}
```

#### **1.3 Protect Admin Routes**
```typescript
// backend/src/movies/movies.controller.ts
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('movies')
export class MoviesController {
  // Public routes
  @Get()
  findAll() { ... }

  // Admin-only routes
  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)  // ← Require admin
  create(@Body() createMovieDto: CreateMovieDto) { ... }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) { ... }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  delete(@Param('id') id: string) { ... }
}
```

---

### **Phase 2: Frontend Updates (React)**

#### **2.1 Update User Type**
```typescript
// src/lib/types.ts
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface User {
  _id: string;
  email: string;
  name: string;
  role: UserRole;  // ← NEW
  createdAt: string;
}
```

#### **2.2 Update Auth Hook**
```typescript
// src/lib/auth.ts
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  // ... existing code ...

  const isAdmin = () => {
    return user?.role === UserRole.ADMIN;
  };

  return {
    user,
    isAdmin,  // ← NEW
    // ... other methods
  };
};
```

#### **2.3 Create Protected Route Component**
```typescript
// src/components/ProtectedRoute.tsx
import { ReactNode } from 'react';
import { useAuth } from '../lib/auth';
import { UserRole } from '../lib/types';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, isAdmin } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="apple-glass rounded-3xl p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-white/70">Please sign in to continue</p>
        </div>
      </div>
    );
  }

  if (requireAdmin && !isAdmin()) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="apple-glass rounded-3xl p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Admin Access Required</h2>
          <p className="text-white/70">You don't have permission to access this page</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
```

#### **2.4 Update Navigation**
```typescript
// src/components/Navigation.tsx
export function Navigation({ user, ... }: NavigationProps) {
  const { isAdmin } = useAuth();

  const navItems = [
    { id: "home", label: "Home" },
    { id: "movies", label: "Movies" },
    { id: "releases", label: "Releases" },
    { id: "contact", label: "Contact" },
  ];

  // Add admin link if user is admin
  if (isAdmin()) {
    navItems.push({ id: "admin", label: "Admin Panel" });
  }

  // ... rest of component
}
```

---

### **Phase 3: Admin Components**

#### **3.1 Admin Layout**
```typescript
// src/components/admin/AdminLayout.tsx
import { LayoutDashboard, Film, Building2, Calendar, Users, Ticket } from 'lucide-react';

export function AdminLayout({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'theaters', label: 'Theaters', icon: Building2 },
    { id: 'showtimes', label: 'Showtimes', icon: Calendar },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'bookings', label: 'Bookings', icon: Ticket },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 apple-glass border-r border-white/10">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white font-display mb-8">
            Admin Panel
          </h1>
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-apple-blue text-white'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
```

#### **3.2 Admin Dashboard**
```typescript
// src/components/admin/AdminDashboard.tsx
export function AdminDashboard() {
  const [stats, setStats] = useState({
    totalMovies: 0,
    totalTheaters: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeUsers: 0,
  });

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white font-display">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Movies"
          value={stats.totalMovies}
          icon={Film}
          color="blue"
        />
        <StatCard
          title="Total Theaters"
          value={stats.totalTheaters}
          icon={Building2}
          color="orange"
        />
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={Ticket}
          color="green"
        />
        <StatCard
          title="Revenue"
          value={`$${stats.totalRevenue.toFixed(2)}`}
          icon={DollarSign}
          color="purple"
        />
      </div>

      {/* Charts & Analytics */}
      {/* Add charts here */}
    </div>
  );
}
```

#### **3.3 Movie Management**
```typescript
// src/components/admin/MovieManagement.tsx
export function MovieManagement() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  const handleCreate = async (movieData: CreateMovieDto) => {
    await api.createMovie(movieData);
    // Refresh list
  };

  const handleUpdate = async (id: string, movieData: UpdateMovieDto) => {
    await api.updateMovie(id, movieData);
    // Refresh list
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      await api.deleteMovie(id);
      // Refresh list
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white font-display">Movies</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="apple-button px-6 py-3 rounded-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Movie
        </button>
      </div>

      {/* Movies Table */}
      <div className="apple-glass rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-4 text-left text-white/80">Poster</th>
              <th className="px-6 py-4 text-left text-white/80">Title</th>
              <th className="px-6 py-4 text-left text-white/80">Genre</th>
              <th className="px-6 py-4 text-left text-white/80">Duration</th>
              <th className="px-6 py-4 text-left text-white/80">Rating</th>
              <th className="px-6 py-4 text-left text-white/80">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id} className="border-t border-white/10">
                <td className="px-6 py-4">
                  <img src={movie.posterUrl} className="w-12 h-16 object-cover rounded" />
                </td>
                <td className="px-6 py-4 text-white">{movie.title}</td>
                <td className="px-6 py-4 text-white/70">{movie.genre}</td>
                <td className="px-6 py-4 text-white/70">{movie.duration}m</td>
                <td className="px-6 py-4 text-white/70">{movie.rating}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingMovie(movie)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4 text-apple-blue" />
                    </button>
                    <button
                      onClick={() => handleDelete(movie._id)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Modal */}
      {/* Add modal component here */}
    </div>
  );
}
```

---

### **Phase 4: API Updates**

#### **4.1 Add Admin API Methods**
```typescript
// src/lib/api.ts
class ApiClient {
  // ... existing methods ...

  // Admin: Movies
  async createMovie(data: CreateMovieDto): Promise<Movie> {
    return this.request('/movies', { method: 'POST', body: data });
  }

  async updateMovie(id: string, data: UpdateMovieDto): Promise<Movie> {
    return this.request(`/movies/${id}`, { method: 'PUT', body: data });
  }

  async deleteMovie(id: string): Promise<void> {
    return this.request(`/movies/${id}`, { method: 'DELETE' });
  }

  // Admin: Theaters
  async createTheater(data: CreateTheaterDto): Promise<Theater> {
    return this.request('/theaters', { method: 'POST', body: data });
  }

  async updateTheater(id: string, data: UpdateTheaterDto): Promise<Theater> {
    return this.request(`/theaters/${id}`, { method: 'PUT', body: data });
  }

  async deleteTheater(id: string): Promise<void> {
    return this.request(`/theaters/${id}`, { method: 'DELETE' });
  }

  // Admin: Showtimes
  async createShowtime(data: CreateShowtimeDto): Promise<Showtime> {
    return this.request('/showtimes', { method: 'POST', body: data });
  }

  async updateShowtime(id: string, data: UpdateShowtimeDto): Promise<Showtime> {
    return this.request(`/showtimes/${id}`, { method: 'PUT', body: data });
  }

  async deleteShowtime(id: string): Promise<void> {
    return this.request(`/showtimes/${id}`, { method: 'DELETE' });
  }

  // Admin: Statistics
  async getAdminStats(): Promise<AdminStats> {
    return this.request('/admin/stats');
  }

  // Admin: Users
  async getAllUsers(): Promise<User[]> {
    return this.request('/admin/users');
  }

  async updateUserRole(userId: string, role: UserRole): Promise<User> {
    return this.request(`/admin/users/${userId}/role`, {
      method: 'PUT',
      body: { role },
    });
  }
}
```

---

## 🎨 UI Design for Admin Panel

### **Color Scheme**
- **Primary**: Apple Blue (#007AFF)
- **Success**: Green (#34C759)
- **Warning**: Orange (#FF9500)
- **Danger**: Red (#FF3B30)
- **Background**: Dark gradient (same as main app)

### **Components**
- ✅ Glassmorphism cards
- ✅ Data tables with hover effects
- ✅ Modal forms for CRUD operations
- ✅ Stat cards with icons
- ✅ Charts (optional: Chart.js or Recharts)

---

## 📊 Recommended Features

### **Priority 1 (Must Have)**
1. ✅ Movie CRUD
2. ✅ Theater CRUD
3. ✅ Showtime CRUD
4. ✅ View all bookings
5. ✅ Basic statistics

### **Priority 2 (Nice to Have)**
6. ⏳ User management (promote to admin)
7. ⏳ Revenue analytics
8. ⏳ Booking trends chart
9. ⏳ Export data (CSV/PDF)

### **Priority 3 (Future)**
10. ⏳ Email notifications
11. ⏳ Bulk operations
12. ⏳ Advanced analytics
13. ⏳ Audit logs

---

## 🚀 Implementation Timeline

### **Week 1: Backend**
- Day 1-2: Update User schema & auth
- Day 3-4: Create admin guards & routes
- Day 5: Testing

### **Week 2: Frontend**
- Day 1-2: Admin layout & routing
- Day 3-4: CRUD components
- Day 5: Dashboard & stats

### **Week 3: Polish**
- Day 1-2: UI refinement
- Day 3-4: Testing & bug fixes
- Day 5: Documentation

---

## 🔒 Security Considerations

1. **Always verify role on backend** - Never trust frontend
2. **Use JWT with role claim** - Include role in token
3. **Protect all admin routes** - Both frontend & backend
4. **Audit logging** - Track admin actions
5. **Rate limiting** - Prevent abuse

---

## 📝 Testing Checklist

- [ ] Admin can create/edit/delete movies
- [ ] Admin can create/edit/delete theaters
- [ ] Admin can create/edit/delete showtimes
- [ ] Regular users cannot access admin panel
- [ ] Admin routes return 403 for non-admin users
- [ ] Statistics display correctly
- [ ] All CRUD operations work
- [ ] UI is responsive
- [ ] No console errors

---

## 🎉 Result

Sau khi hoàn thành, bạn sẽ có:
- ✅ Complete admin panel với CinemaVision Pro design
- ✅ Secure role-based access control
- ✅ Full CRUD operations cho tất cả entities
- ✅ Beautiful statistics dashboard
- ✅ Professional admin experience

---

**Bạn muốn tôi bắt đầu implement từ đâu?**
1. Backend (User schema + Guards)
2. Frontend (Admin components)
3. Cả hai cùng lúc

Tôi sẵn sàng code! 🚀
