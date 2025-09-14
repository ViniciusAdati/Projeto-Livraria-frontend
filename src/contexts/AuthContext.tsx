import React, { createContext, useState, useEffect, ReactNode } from "react";
import { login as apiLogin } from "../services/authService";
import type { LoginResponse } from "../services/authService";
import { io, Socket } from "socket.io-client";

const BACKEND_URL = "http://localhost:3002";

interface User {
  id: number;
  nome: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  socket: Socket | null;
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
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");

    if (storedToken && storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
      setToken(storedToken);

      const newSocket = io(BACKEND_URL, {
        query: { userId: parsedUser.id },
      });
      setSocket(newSocket);
    }

    return () => {
      socket?.disconnect();
    };
  }, []);

  const login = async (email: string, senha: string) => {
    try {
      const response = await apiLogin(email, senha);

      setUser(response.usuario);
      setToken(response.token);

      localStorage.setItem("authToken", response.token);
      localStorage.setItem("authUser", JSON.stringify(response.usuario));

      if (socket) {
        socket.disconnect();
      }

      const newSocket = io(BACKEND_URL, {
        query: { userId: response.usuario.id },
      });
      setSocket(newSocket);
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

    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, socket, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
