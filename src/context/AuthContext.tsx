import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import api from "../services/api/api";

/**
 * Interface defining the shape of the authentication context
 * Contains authentication state and methods
 */
interface AuthContextType {
  isAuthenticated: boolean; // Whether user is currently authenticated
  isLoading: boolean; // Loading state for auth operations
  login: (email: string, password: string) => Promise<void>; // Login method
  logout: () => Promise<void>; // Logout method
  verifySession: () => Promise<void>; // Verify current session
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider component that wraps the application and provides authentication context
 * @param children - Child components that will have access to auth context
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Verifies if there's an active session
   * Called on initial load and when needed
   */
  const verifySession = async () => {
    try {
      await api.get("/api/v1/usuario/verify-session", {
        withCredentials: true,
      });
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles user login
   * @param email - User's email
   * @param password - User's password
   */
  const login = async (email: string, password: string) => {
    try {
      const response = await api.post(
        "/api/v1/auth/login",
        { email, password },
        { withCredentials: true }
      );
      if (response.data.status === "error") {
        throw new Error(response.data.msg || "Erro ao fazer login");
      }
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  };

  /**
   * Handles user logout
   * Clears session and updates authentication state
   */
  const logout = async () => {
    try {
      await api.post("/api/v1/auth/logout", {}, { withCredentials: true });
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  // Verify session on component mount
  useEffect(() => {
    verifySession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, login, logout, verifySession }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to use the authentication context
 * @returns The authentication context
 * @throws Error if used outside of AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
