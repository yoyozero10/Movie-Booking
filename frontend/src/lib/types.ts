// Type definitions for custom components
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface User {
  _id: string;
  email: string;
  name: string;
  role: UserRole;
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
}
