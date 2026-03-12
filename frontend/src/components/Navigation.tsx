import { Search, X, Tv } from "lucide-react";
import { User, UserRole } from "../lib/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLocale } from "../lib/LocaleContext";
import { t } from "../lib/i18n";

interface NavigationProps {
  user: User | null;
  onLoginClick: () => void;
  onSignOut: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
  onSearch?: (query: string) => void;
}

export function Navigation({ user, onLoginClick, onSignOut, activeSection, onNavigate, onSearch }: NavigationProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { language } = useLocale();

  const navItems = [
    { id: "home", label: t('nav.home', language) },
    { id: "movies", label: t('nav.movies', language) },
    { id: "releases", label: "Releases" },
    { id: "contact", label: t('nav.contact', language) },
  ];

  // Add profile to nav items if user is logged in
  let allNavItems = user ? [...navItems, { id: "profile", label: t('nav.profile', language) }] : navItems;

  // Add Admin Panel if user is admin
  if (user?.role === UserRole.ADMIN) {
    allNavItems = [...allNavItems, { id: "admin", label: t('nav.admin', language) }];
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to movies section
      onNavigate("movies");
      // Trigger search
      if (onSearch) {
        onSearch(searchQuery);
      }
    }
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery("");
    }
  };

  const handleNavItemClick = (id: string) => {
    if (id === "admin") {
      navigate("/admin");
    } else {
      onNavigate(id);
    }
  };

  return (
    <nav className="animate-fade-in fixed top-0 left-0 right-0 z-50 apple-glass">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl font-semibold tracking-tight flex items-center cursor-pointer" onClick={() => onNavigate("home")}>
            <div className="relative mr-3">
              <Tv className="w-7 h-7 text-apple-blue" />
              <div className="absolute inset-0 bg-apple-blue blur-md opacity-20"></div>
            </div>
            <span className="apple-text-gradient font-display">CinemaVision Pro</span>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {allNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavItemClick(item.id)}
                className={`text-white/80 hover:text-white transition-all duration-300 font-normal text-sm ${activeSection === item.id ? "text-white font-medium" : ""
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Section - Search, Language & Login */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    data-testid="search-input"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('movies.searchPlaceholder', language)}
                    autoFocus
                    className="w-64 px-4 py-2 pr-10 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-apple-blue/50 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={handleSearchToggle}
                    className="absolute right-3 text-white/60 hover:text-white transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={handleSearchToggle}
                  data-testid="search-toggle"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-white/80 text-sm hidden md:inline">
                  {user.email}
                </span>
                <button
                  onClick={onSignOut}
                  data-testid="logout-btn"
                  className="apple-button px-6 py-2 rounded-full font-medium text-sm text-white"
                >
                  {t('nav.logout', language)}
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                data-testid="login-btn"
                className="apple-button px-6 py-2 rounded-full font-medium text-sm text-white"
              >
                {t('nav.login', language)}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden apple-glass p-2 rounded-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
