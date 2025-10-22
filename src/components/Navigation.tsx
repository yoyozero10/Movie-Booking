import { Search } from "lucide-react";
import { User } from "../lib/types";

interface NavigationProps {
  user: User | null;
  onLoginClick: () => void;
  onSignOut: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Navigation({ user, onLoginClick, onSignOut, activeSection, onNavigate }: NavigationProps) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "movies", label: "Movies" },
    { id: "releases", label: "Releases" },
    { id: "contact", label: "Contact" },
  ];

  // Add profile to nav items if user is logged in
  const allNavItems = user ? [...navItems, { id: "profile", label: "Profile" }] : navItems;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">Movie4You</h1>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {allNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-white hover:text-pink-400 transition-colors font-medium ${
                  activeSection === item.id ? "text-pink-400" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Section - Search & Login */}
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-pink-400 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-white text-sm hidden md:inline">
                  {user.email}
                </span>
                <button
                  onClick={onSignOut}
                  className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-medium transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-medium transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
