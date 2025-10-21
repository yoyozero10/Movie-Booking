// Type definitions for custom components
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface SignInFormProps {
  onSignIn: (user: User) => void;
}

export interface SignOutButtonProps {
  onSignOut: () => void;
}

export interface ContentProps {
  activeTab: "movies" | "bookings";
  setActiveTab: (tab: "movies" | "bookings") => void;
  user: User | null;
  setUser: (user: User | null) => void;
}
