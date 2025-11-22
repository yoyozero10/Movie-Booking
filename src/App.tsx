import { useState } from "react";
import { SignInForm } from "./SignInForm";
import { Toaster } from "sonner";
import { MovieList } from "./components/MovieList";
import { MyBookings } from "./components/MyBookings";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { FeaturedMovies } from "./components/FeaturedMovies";
import { UserProfile } from "./components/UserProfile";
import { ContentProps } from "./lib/types";
import { useAuth } from "./lib/auth";

export default function App() {
  const [activeTab, setActiveTab] = useState<"movies" | "bookings">("movies");
  const [activeSection, setActiveSection] = useState<string>("home");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout, isLoading } = useAuth();

  const handleSignOut = () => {
    logout();
    setActiveSection("home");
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
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

      <Toaster />
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
        <FeaturedMovies />

        {/* Login Modal */}
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome Back
                </h2>
                <p className="text-gray-600">
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
        <div className="min-h-screen flex items-center justify-center px-4 pt-20 bg-gray-900">
          <div className="max-w-md w-full bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                Sign In Required
              </h2>
              <p className="text-gray-300">
                Please sign in to browse and book movies
              </p>
            </div>
            <SignInForm onSignIn={() => setShowLoginModal(false)} />
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-6">
            <div className="flex gap-4 border-b border-gray-700">
              <button
                onClick={() => setActiveTab("movies")}
                className={`px-4 py-2 font-semibold transition-colors ${activeTab === "movies"
                    ? "text-pink-400 border-b-2 border-pink-400"
                    : "text-gray-400 hover:text-gray-300"
                  }`}
              >
                Browse Movies
              </button>
              <button
                onClick={() => setActiveTab("bookings")}
                className={`px-4 py-2 font-semibold transition-colors ${activeTab === "bookings"
                    ? "text-pink-400 border-b-2 border-pink-400"
                    : "text-gray-400 hover:text-gray-300"
                  }`}
              >
                My Bookings
              </button>
            </div>
          </div>

          {activeTab === "movies" ? <MovieList searchQueryFromNav={searchQuery} /> : <MyBookings />}
        </div>
      </div>
    );
  }

  // Show profile section
  if (activeSection === "profile") {
    if (!user) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4 pt-20 bg-gray-900">
          <div className="max-w-md w-full bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                Sign In Required
              </h2>
              <p className="text-gray-300">
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

  // Placeholder for other sections
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center text-white">
        <h2 className="text-4xl font-bold mb-4">
          {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
        </h2>
        <p className="text-xl text-gray-300">Coming soon...</p>
      </div>
    </div>
  );
}
