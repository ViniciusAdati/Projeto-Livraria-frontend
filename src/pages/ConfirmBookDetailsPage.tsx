import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import "./AuthPage.css";
import { addBookToInventory } from "../services/inventoryService";

export function ConfirmBookDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const bookDataFromSearch = location.state?.book;

  const [condition, setCondition] = useState("Seminovo");
  const [tradeValue, setTradeValue] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!bookDataFromSearch) {
      console.warn(
        "Nenhum dado de livro encontrado. Redirecionando para busca."
      );
      navigate("/livros/adicionar");
    }
  }, [bookDataFromSearch, navigate]);

  const handleFinalSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const finalBookForApi = {
      googleBookId: bookDataFromSearch.id,
      title: bookDataFromSearch.title,
      author: bookDataFromSearch.author,
      imageUrl: bookDataFromSearch.imageUrl,
      condition: condition,
      tradeValue: parseFloat(tradeValue) || 0,
      description: description,
    };

    try {
      const response = await addBookToInventory(finalBookForApi);

      console.log("Resposta da API:", response.message);
      alert("Livro adicionado com sucesso à sua estante!");
      navigate("/");
    } catch (error: any) {
      console.error("Falha ao adicionar livro:", error);
      alert(`Erro: ${error.message}`);
    }
  };

  if (!bookDataFromSearch) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <div className="auth-container">
        <div
          className="auth-column"
          style={{ borderRight: "1px solid #e0e0e0" }}
        >
          <h2>Confirme o Item</h2>
          <img
            src={bookDataFromSearch.imageUrl}
            alt={bookDataFromSearch.title}
            style={{
              width: "60%",
              maxWidth: "250px",
              margin: "0 auto",
              display: "block",
              border: "1px solid #ccc",
            }}
          />
          <h3 style={{ textAlign: "center", marginTop: "1rem" }}>
            {bookDataFromSearch.title}
          </h3>
          <p style={{ textAlign: "center", color: "#555" }}>
            {bookDataFromSearch.author}
          </p>
        </div>
        <div className="auth-column">
          <h2>Adicionar Detalhes da sua Cópia</h2>

          <form onSubmit={handleFinalSubmit}>
            <div className="form-group">
              <label htmlFor="condition">
                Condição / Estado <span>*</span>
              </label>
              <select
                id="condition"
                className="form-group"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  fontSize: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="Novo">Novo (Lacrado)</option>
                <option value="Seminovo">Seminovo (Em perfeito estado)</option>
                <option value="Usado">Usado (Com marcas de uso)</option>
                <option value="Desgastado">Desgastado (Com avarias)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="value">
                Valor de Troca (Preço) (R$) <span>*</span>
              </label>
              <input
                type="number"
                id="value"
                placeholder="Ex: 35.50"
                step="0.01"
                required
                value={tradeValue}
                onChange={(e) => setTradeValue(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descrição (Opcional)</label>
              <textarea
                id="description"
                placeholder="Ex: Edição de capa dura, possui uma pequena marca na lombada..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  width: "95%",
                  padding: "0.75rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  fontFamily: "Arial",
                }}
              />
            </div>

            <button type="submit" className="auth-button auth-button-secondary">
              Adicionar à Minha Estante
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
