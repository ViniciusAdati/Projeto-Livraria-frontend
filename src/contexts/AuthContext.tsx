import React, { createContext, useState, useEffect, ReactNode } from "react";
import { login as apiLogin } from "../services/authService";
import type { LoginResponse } from "../services/authService";

interface User {
  id: number;
  nome: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, senha: string) => {
    try {
      const response = await apiLogin(email, senha);
      setUser(response.usuario);
      setToken(response.token);
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("authUser", JSON.stringify(response.usuario));
    } catch (error) {
      console.error("Falha ao logar (contexto):", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
