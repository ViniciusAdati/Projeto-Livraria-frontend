import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

// Este hook simples apenas nos dá acesso fácil aos valores do AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
};
