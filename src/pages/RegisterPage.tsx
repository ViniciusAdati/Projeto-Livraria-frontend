import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthPage.css";
import { register } from "../services/authService";

export function RegisterPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await register(nome, email, password);
      console.log("Registro com sucesso!", response.userId);

      alert("Conta criada com sucesso! Você será redirecionado para o Login.");

      navigate("/login");
    } catch (error: any) {
      console.error("Falha no registro:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Erro desconhecido ao tentar registrar.";
      alert(`Falha no Registro: ${errorMessage}`);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-column">
        <h2>Criar Nova Conta</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">
              Nome <span>*</span>
            </label>
            <input
              type="text"
              id="nome"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              E-mail <span>*</span>
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">
              Senha <span>*</span>
            </label>
            <input
              type="password"
              id="senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="auth-button auth-button-secondary">
            Criar Conta
          </button>

          <p className="required-text" style={{ marginTop: "1.5rem" }}>
            * Campos Obrigatórios
          </p>
        </form>
      </div>
      <div className="auth-column">
        <h2>Clientes Registrados</h2>
        <p>Se você já tem uma conta, acesse usando o link abaixo.</p>

        <Link to="/login" className="auth-button">
          Fazer Login
        </Link>
      </div>
    </div>
  );
}
