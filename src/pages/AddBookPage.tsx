import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { searchBooks } from "../services/googleBooksService";
import "./AuthPage.css";
import "../components/CommunityCarousel.css";

type BookResult = {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
};

export function AddBookPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BookResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!query) return;

    setLoading(true);
    setSearched(true);
    setResults([]);

    try {
      const googleBooks = await searchBooks(query);

      const formattedResults: BookResult[] = googleBooks
        .filter((item) => item.volumeInfo.imageLinks)
        .map((item) => ({
          id: item.id,
          title: item.volumeInfo.title,
          author: item.volumeInfo.authors
            ? item.volumeInfo.authors.join(", ")
            : "Autor desconhecido",
          imageUrl: item.volumeInfo.imageLinks!.thumbnail.replace(
            "http:",
            "https:"
          ),
        }));

      setResults(formattedResults);
    } catch (error) {
      alert("Erro ao buscar livros.");
    }
    setLoading(false);
  };

  const handleAddBookToShelf = (book: BookResult) => {
    console.log("Livro selecionado:", book);
    navigate("/livros/confirmar-detalhes", { state: { book: book } });
  };

  return (
    <div>
      <Navbar />

      <main
        className="addbook-container"
        style={{ maxWidth: "900px", margin: "2rem auto", padding: "0 1rem" }}
      >
        <h2>Adicionar Novo Livro/HQ</h2>
        <p>
          Busque pelo título ou ISBN para adicionar um item à sua estante de
          trocas.
        </p>

        <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px" }}>
          <div
            className="form-group"
            style={{ flexGrow: 1, marginBottom: "1rem" }}
          >
            <input
              type="text"
              placeholder="Digite o título ou ISBN do livro/HQ..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </form>

        <hr style={{ margin: "2rem 0" }} />

        <div className="results-container">
          {!searched && <p>Digite algo para iniciar a busca.</p>}
          {loading && <p>Carregando resultados...</p>}
          {!loading && searched && results.length === 0 && (
            <p>Nenhum resultado encontrado para "{query}".</p>
          )}

          <div
            className="user-grid"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            }}
          >
            {results.map((book) => (
              <div key={book.id} className="book-card">
                <div className="book-card-image">
                  <img src={book.imageUrl} alt={book.title} />
                </div>
                <h3 className="book-card-title" title={book.title}>
                  {book.title}
                </h3>
                <p
                  style={{
                    padding: "0 0.75rem",
                    fontSize: "0.9rem",
                    color: "#555",
                  }}
                >
                  {book.author}
                </p>

                <button
                  className="auth-button"
                  style={{
                    width: "90%",
                    margin: "1rem auto",
                    fontSize: "0.9rem",
                  }}
                  onClick={() => handleAddBookToShelf(book)}
                >
                  Adicionar à Estante
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
