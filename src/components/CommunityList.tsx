import React from "react";
import "./CommunityCarousel.css";
import "./CommunityList.css";
import { FaUserCircle } from "react-icons/fa";

const mockUsers = [
  { id: 1, nome: "Leitona" },
  { id: 2, nome: "UsuarioAtivo123" },
  { id: 3, nome: "Bookworm_BR" },
  { id: 4, nome: "TrocaLivrosSP" },
  { id: 5, nome: "HQ_Maniaco" },
  { id: 6, nome: "LeitorVoraz" },
  { id: 7, nome: "ColecionadorRJ" },
  { id: 8, nome: "AnaComics" },
];

export function CommunityList() {
  return (
    <div className="list-wrapper">
      <h2 className="carousel-title">COMUNIDADE</h2>
      <div className="user-grid">
        {mockUsers.map((user) => (
          <div key={user.id} className="user-card">
            <FaUserCircle size={60} color="#ccc" />
            <h3 className="user-name">{user.nome}</h3>
            <span className="user-join-date">Membro desde: 13/09/2025</span>
          </div>
        ))}
      </div>
    </div>
  );
}
