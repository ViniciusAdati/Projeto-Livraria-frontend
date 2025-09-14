import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CommunityList.css";
import { FaUserCircle } from "react-icons/fa";
import { fetchPublicUsers } from "../services/userService";
import type { IUserPublic } from "../services/userService";

export function CommunityList() {
  const [users, setUsers] = useState<IUserPublic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchPublicUsers();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <p style={{ textAlign: "center", padding: "1rem" }}>
          Carregando membros...
        </p>
      );
    }

    if (error) {
      return (
        <p style={{ textAlign: "center", padding: "1rem", color: "red" }}>
          Erro ao carregar comunidade: {error}
        </p>
      );
    }

    if (users.length === 0) {
      return (
        <p style={{ textAlign: "center", padding: "1rem" }}>
          Nenhum usuário cadastrado ainda.
        </p>
      );
    }

    return (
      <div className="user-grid">
        {users.map((user) => (
          <Link
            to={`/perfil/${user.id}`}
            key={user.id}
            className="user-card-link"
          >
            <div className="user-card">
              <FaUserCircle size={60} color="#ccc" />
              <h3 className="user-name">{user.nome}</h3>
              <span className="user-join-date">
                Membro desde:{" "}
                {new Date(user.data_cadastro).toLocaleDateString()}
              </span>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="list-wrapper">
      <h2 className="carousel-title">COMUNIDADE</h2>
      {renderContent()}
    </div>
  );
}
