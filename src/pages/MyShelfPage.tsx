import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { getMyBooks, deleteMyBook } from "../services/inventoryService";
import type { IBookInventory } from "../services/inventoryService";
import { FaTimes } from "react-icons/fa";

import "../components/CommunityList.css";
import "../components/CommunityCarousel.css";

export function MyShelfPage() {
  const [myBooks, setMyBooks] = useState<IBookInventory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMyData = async () => {
      try {
        setLoading(true);
        const data = await getMyBooks();
        setMyBooks(data);
      } catch (err: any) {
        setError(err.message || "Você precisa estar logado para ver isso.");
      } finally {
        setLoading(false);
      }
    };
    loadMyData();
  }, []);

  const handleRemoveBook = async (bookId: number, bookTitle: string) => {
    if (
      window.confirm(
        `Tem certeza que deseja remover "${bookTitle}" da sua estante?`
      )
    ) {
      try {
        const response = await deleteMyBook(bookId);

        setMyBooks((prevBooks) =>
          prevBooks.filter((book) => book.inventario_id !== bookId)
        );

        console.log(response.message);
        alert("Livro removido com sucesso!");
      } catch (err: any) {
        alert(`Erro ao remover: ${err.message}`);
      }
    }
  };
  const renderContent = () => {
    if (loading) {
      return (
        <p style={{ textAlign: "center", padding: "2rem" }}>
          Carregando minha estante...
        </p>
      );
    }
    if (error) {
      return (
        <p style={{ textAlign: "center", padding: "2rem", color: "red" }}>
          Erro: {error}
        </p>
      );
    }
    if (myBooks.length === 0) {
      return (
        <p style={{ textAlign: "center", padding: "2rem" }}>
          Você ainda não adicionou nenhum livro à sua estante.
        </p>
      );
    }

    return (
      <div
        className="user-grid"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
      >
        {myBooks.map((book) => (
          <div key={book.inventario_id} className="book-card">
            <button
              className="book-card-remove"
              title="Remover da Estante"
              onClick={() => handleRemoveBook(book.inventario_id, book.titulo)}
            >
              <FaTimes />
            </button>
            <div className="book-card-image">
              <img src={book.url_capa} alt={book.titulo} />
              <span className="book-card-tag promo">
                {book.estado_conservacao}
              </span>
            </div>
            <h3 className="book-card-title">{book.titulo}</h3>
            <div className="book-card-price">
              <span className="new-price">
                R${" "}
                {parseFloat(book.valor_troca.toString())
                  .toFixed(2)
                  .replace(".", ",")}
              </span>
            </div>
            <span className="installments">
              Postado por: {book.nome_usuario} (Você)
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="list-wrapper">
        <h2 className="carousel-title">Minha Estante</h2>
        {renderContent()}
      </div>
    </div>
  );
}
