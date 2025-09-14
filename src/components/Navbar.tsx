import { Link } from "react-router-dom";
import React from "react";
import "./Navbar.css";
import { FaUser, FaBook, FaPlusCircle, FaSearch } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <Link to="/">LOGO</Link>
      </div>
      <div className="navbar-search">
        <input type="text" placeholder="Pesquisa em toda loja..." />
        <button>
          <FaSearch />
        </button>
      </div>

      <div className="navbar-links">
        {user ? (
          <>
            <div className="nav-link-item logged-in-user">
              <FaUser size={24} />
              <span>
                Olá,
                <br />
                <strong>{user.nome}</strong>
              </span>
            </div>

            <button onClick={logout} className="nav-link-logout">
              Sair
            </button>

            <Link to="/livros/adicionar" className="nav-link-item">
              <FaPlusCircle size={24} />
              <span>
                Adicionar
                <br />
                Livro
              </span>
            </Link>

            <Link to="/minha-estante" className="nav-link-item">
              <FaBook size={24} />
              <span>
                Minha
                <br />
                Estante
              </span>
            </Link>
          </>
        ) : (
          <Link to="/login" className="nav-link-item">
            <FaUser size={24} />
            <span>
              Entrar
              <br />
              Minha Conta
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
