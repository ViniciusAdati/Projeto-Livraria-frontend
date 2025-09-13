import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { getMyBooks } from "../services/inventoryService";
import type { IBookInventory } from "../services/inventoryService";
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

  const handleRemoveBook = (bookId: number, bookTitle: string) => {
    if (
      window.confirm(
        `Tem certeza que deseja remover "${bookTitle}" da sua estante?`
      )
    ) {
      // Em uma implementação real, você chamaria:
      // await inventoryService.deleteBook(bookId);

      setMyBooks((prevBooks) =>
        prevBooks.filter((book) => book.inventario_id !== bookId)
      );

      console.log(
        `(Simulação) Deletando livro com ID (do inventário): ${bookId}`
      );
      alert("Livro removido (simulação)!");
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
            <div className="book-card-image">
              <img src={book.url_capa} alt={book.titulo} />
              <span className="book-card-tag promo">
                {book.estado_conservacao}
              </span>
            </div>
            <h3 className="book-card-title">{book.titulo}</h3>
            <div className="book-card-price">
              <span className="new-price">
                R$ {book.valor_troca.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <span className="installments">
              Postado por: {book.nome_usuario} (Você)
            </span>

            <button
              className="auth-button"
              style={{
                width: "90%",
                margin: "1rem auto",
                fontSize: "0.9rem",
                backgroundColor: "#e53e3e",
              }}
              onClick={() => handleRemoveBook(book.inventario_id, book.titulo)}
            >
              Remover da Estante
            </button>
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
