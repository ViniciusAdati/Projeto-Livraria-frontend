import React from "react";
import { Navbar } from "../components/Navbar";
import { CommunityCarousel } from "../components/CommunityCarousel";
import { CommunityList } from "../components/CommunityList";

export function HomePage() {
  return (
    <div>
      <Navbar />
      <CommunityCarousel />
      <CommunityList />
      <main style={{ padding: "2rem" }}>
        <h2>Outros conteúdos da Home</h2>
        <p>Aqui podemos listar todos os livros, filtros, etc.</p>
      </main>
    </div>
  );
}
