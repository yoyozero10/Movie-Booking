import { useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { SignInForm } from "./SignInForm";
import { Toaster } from "sonner";
import { TheaterFlow } from "./components/TheaterFlow";
import { MyBookings } from "./components/MyBookings";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { FeaturedMovies } from "./components/FeaturedMovies";
import { UserProfile } from "./components/UserProfile";
import { FloatingOrbs } from "./components/FloatingOrbs";
import { ContentProps } from "./lib/types";
import { useAuth } from "./lib/auth";
import { AdminPage } from "./components/admin/AdminPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ReleasesPage } from "./components/ReleasesPage";
import { ContactPage } from "./components/ContactPage";
import { LocaleProvider } from "./lib/LocaleContext";
import { MovieDetails } from "./components/MovieDetails";
import { NotFound } from "./components/NotFound";

function MoviePageWrapper() {
  const { id } = useParams();
  console.log('MoviePageWrapper render, id:', id);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen pt-20" style={{ background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #1a1a1a 100%)' }}>
      <FloatingOrbs />
      <div className="px-6">
        <MovieDetails movieId={id!} onBack={() => navigate('/')} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LocaleProvider>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="/movie/:id" element={<MoviePageWrapper />} />
        <Route path="/" element={<MainApp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </LocaleProvider>
  );
}

function MainApp() {
  const [activeTab, setActiveTab] = useState<"movies" | "bookings">("movies");
  const [activeSection, setActiveSection] = useState<string>("home");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    setActiveSection("home");
    navigate("/");
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    if (section === "movies") {
      setActiveTab("movies");
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleExploreClick = () => {
    setActiveSection("movies");
    setActiveTab("movies");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #1a1a1a 100%)' }}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-apple-blue"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #1a1a1a 100%)' }}>
      {/* Floating Orbs Background */}
      <FloatingOrbs />

      <Navigation
        user={user}
        onLoginClick={() => setShowLoginModal(true)}
        onSignOut={handleSignOut}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onSearch={handleSearch}
      />

      <main>
        <Content
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeSection={activeSection}
          user={user}
          showLoginModal={showLoginModal}
          setShowLoginModal={setShowLoginModal}
          onExploreClick={handleExploreClick}
          searchQuery={searchQuery}
        />
      </main>
    </div>
  );
}

function Content({ activeTab, setActiveTab, activeSection, user, showLoginModal, setShowLoginModal, onExploreClick, searchQuery }: ContentProps & {
  activeSection: string;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  onExploreClick: () => void;
  searchQuery: string;
}) {
  // Show hero section on home
  if (activeSection === "home") {
    return (
      <>
        <HeroSection onExploreClick={onExploreClick} />
        <FeaturedMovies searchQuery={searchQuery} />

        {/* Login Modal */}
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div data-testid="login-modal" className="apple-glass rounded-2xl p-8 max-w-md w-full mx-4 relative">
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl"
              >
                ×
              </button>
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Welcome Back
                </h2>
                <p className="text-white/70">
                  Sign in to book your favorite movies
                </p>
              </div>
              <SignInForm onSignIn={() => {
                setShowLoginModal(false);
              }} />
            </div>
          </div>
        )}
      </>
    );
  }

  // Show movies section
  if (activeSection === "movies") {
    if (!user) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4 pt-20">
          <div className="max-w-md w-full apple-glass rounded-2xl p-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                Sign In Required
              </h2>
              <p className="text-white/70">
                Please sign in to browse and book movies
              </p>
            </div>
            <SignInForm onSignIn={() => setShowLoginModal(false)} />
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-6">
            <div className="flex gap-4 border-b border-white/10">
              <button
                onClick={() => setActiveTab("movies")}
                className={`px-4 py-2 font-semibold transition-all duration-300 ${activeTab === "movies"
                  ? "text-apple-blue border-b-2 border-apple-blue"
                  : "text-white/60 hover:text-white"
                  }`}
              >
                Browse Movies
              </button>
              <button
                onClick={() => setActiveTab("bookings")}
                className={`px-4 py-2 font-semibold transition-all duration-300 ${activeTab === "bookings"
                  ? "text-apple-blue border-b-2 border-apple-blue"
                  : "text-white/60 hover:text-white"
                  }`}
              >
                My Bookings
              </button>
            </div>
          </div>

          {activeTab === "movies" ? <TheaterFlow /> : <MyBookings />}
        </div>
      </div>
    );
  }

  // Show profile section
  if (activeSection === "profile") {
    if (!user) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4 pt-20">
          <div className="max-w-md w-full apple-glass rounded-2xl p-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                Sign In Required
              </h2>
              <p className="text-white/70">
                Please sign in to view profiles
              </p>
            </div>
            <SignInForm onSignIn={() => setShowLoginModal(false)} />
          </div>
        </div>
      );
    }

    return <UserProfile />;
  }

  // Show releases section
  if (activeSection === "releases") {
    return <ReleasesPage />;
  }
  // Show contact section
  if (activeSection === "contact") {
    return <ContactPage />;
  }

  // Placeholder for other sections
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center text-white">
        <h2 className="text-4xl font-bold mb-4">
          {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
        </h2>
        <p className="text-xl text-white/70">Coming soon...</p>
      </div>
    </div>
  );
}
