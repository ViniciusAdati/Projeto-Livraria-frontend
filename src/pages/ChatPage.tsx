import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getChatHistoryApi } from "../services/chatService";
import type { IChatMessage } from "../services/chatService";
import { Navbar } from "../components/Navbar";
import "./ChatPage.css"; // (Vamos criar este CSS)

export function ChatPage() {
  const { negociacaoId } = useParams<{ negociacaoId: string }>();
  const { user, socket } = useAuth(); // Pega o usuário logado E o socket global

  const [messagesList, setMessagesList] = useState<IChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref para "auto-scroll"

  // Efeito 1: Carregar o histórico de mensagens (via API REST)
  useEffect(() => {
    if (!negociacaoId) return;

    const fetchHistory = async () => {
      try {
        setLoading(true);
        const history = await getChatHistoryApi(negociacaoId);
        setMessagesList(history);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [negociacaoId]);

  // Efeito 2: Conectar ao Socket.io (Ouvir e Entrar na Sala)
  useEffect(() => {
    if (!socket || !negociacaoId) return; // Só rode se o socket (do AuthContext) estiver pronto

    console.log("Socket pronto. Entrando na sala:", negociacaoId);
    socket.emit("join_room", negociacaoId);

    // O "Ouvinte" (Listener) de novas mensagens
    const messageListener = (data: IChatMessage) => {
      console.log("Mensagem recebida do socket:", data);
      setMessagesList((prevList) => [...prevList, data]);
    };

    socket.on("receive_message", messageListener);

    // Função de "Limpeza": Roda quando o usuário sai desta página
    return () => {
      console.log("Saindo da sala do socket:", negociacaoId);
      socket.off("receive_message", messageListener); // Desliga o ouvinte
    };
  }, [socket, negociacaoId]);

  // Efeito 3: Auto-scroll para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesList]);

  // Função para ENVIAR uma mensagem (via WebSocket)
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket || !user || !negociacaoId) return;

    const messageData = {
      negociacaoId: negociacaoId,
      remetenteId: user.id,
      remetente_nome: user.nome,
      conteudo: newMessage,
      timestamp: new Date().toISOString(),
    };

    socket.emit("send_message", messageData);

    setMessagesList((prevList) => [...prevList, messageData]);
    setNewMessage("");
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <p>Carregando histórico de chat...</p>
      </div>
    );
  }

  return (
    <div className="chat-page-container">
      <Navbar />
      <div className="chat-window">
        <div className="chat-header">
          <h3>Sala de Negociação</h3>
        </div>
        <div className="chat-body">
          {messagesList.map((msg) => (
            <div
              key={msg.id || Math.random()}
              className={`message-bubble ${
                msg.remetente_id === user?.id ? "sent" : "received"
              }`}
            >
              <strong>{msg.remetente_nome}:</strong>
              <p>{msg.conteudo}</p>
              <span className="timestamp">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form className="chat-footer" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Digite sua mensagem..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}
