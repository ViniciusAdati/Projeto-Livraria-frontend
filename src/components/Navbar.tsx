import { Link } from 'react-router-dom'
import React from 'react'
import './Navbar.css'
// Importamos ícones relevantes para a nova estrutura
import {
  FaHeart,
  FaBookOpen,
  FaClipboardList,
  FaSearch,
  FaBell,
  FaCommentDots,
} from 'react-icons/fa'
import { useAuth } from '../hooks/useAuth'

export function Navbar() {
  const { user } = useAuth() // Usando 'user' para simular a Maria Silva

  // Dados mock para os links de navegação do Figma
  const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/minha-colecao', label: 'Minha Coleção' },
    { to: '/lista-desejos', label: 'Lista de Desejos' },
    { to: '/buscar', label: 'Buscar' },
  ]

  const userMock = {
    name: user?.nome || 'Maria Silva',
    avatarUrl: user?.avatarUrl || '/avatars/maria.jpg', // Substitua pelo caminho da sua imagem
  }

  return (
    <nav className="navbar-container">
      {/* 1. LOGO */}
      <div className="navbar-logo">
        <Link to="/">TrocaHQ</Link>
      </div>

      {/* 2. LINKS DE NAVEGAÇÃO CENTRAL */}
      <div className="navbar-links-main">
        {navLinks.map((link) => (
          <Link key={link.to} to={link.to} className="nav-link-item">
            {link.label}
          </Link>
        ))}
      </div>

      {/* 3. ÍCONES DE AÇÃO E PERFIL DO USUÁRIO */}
      <div className="navbar-user-actions">
        {/* Ícones de Notificação/Mensagem */}
        <div className="action-icons">
          <FaBell className="action-icon" size={20} />
          <FaCommentDots className="action-icon" size={20} />
          <FaSearch className="action-icon search-icon" size={20} />{' '}
          {/* Ícone de busca separado */}
        </div>

        {/* Perfil do Usuário */}
        <div className="user-profile">
          <img
            src={userMock.avatarUrl}
            alt={userMock.name}
            className="user-avatar-small"
          />
          <span className="user-name-label">{userMock.name}</span>
        </div>
      </div>
    </nav>
  )
}
