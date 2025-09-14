import api from "./api"; // Importa nossa instância do Axios (o arquivo api.ts)

// --- Interface para o Payload (o que ENVIAMOS no POST) ---
interface BookDataPayload {
  googleBookId: string;
  title: string;
  author: string;
  imageUrl: string;
  condition: string;
  tradeValue: number;
  description: string;
}

// --- Interface para a Resposta do POST ---
interface AddBookResponse {
  success: boolean;
  message: string;
}

// --- Função de Escrita (POST) --- (Esta já estava funcionando)
export const addBookToInventory = async (
  bookData: BookDataPayload
): Promise<AddBookResponse> => {
  try {
    const response = await api.post<AddBookResponse>("/inventory", bookData);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Falha ao adicionar livro."
    );
  }
};

// --- Interface dos dados que RECEBEMOS (do GET) ---
export interface IBookInventory {
  inventario_id: number;
  valor_troca: number;
  estado_conservacao: string;
  titulo: string;
  autor: string;
  url_capa: string;
  nome_usuario: string;
}

// --- Função de Leitura (GET) --- (Que o carrossel usa)
export const getRecentBooks = async (): Promise<IBookInventory[]> => {
  try {
    const response = await api.get<IBookInventory[]>("/inventory/recent");
    return response.data;
  } catch (error: any) {
    console.error("Falha ao buscar livros recentes:", error);
    throw new Error(error.response?.data?.message || "Falha ao buscar livros.");
  }
};

// --- Função de Leitura (GET Protegido) --- (Que a Minha Estante usa)
export const getMyBooks = async (): Promise<IBookInventory[]> => {
  try {
    const response = await api.get<IBookInventory[]>("/inventory/my-books");
    return response.data;
  } catch (error: any) {
    console.error("Falha ao buscar 'meus livros':", error);
    throw new Error(
      error.response?.data?.message || "Falha ao buscar inventário pessoal."
    );
  }
};

// --- Função de Delete (DELETE) ---
export const deleteMyBook = async (
  inventoryId: number
): Promise<{ success: boolean; message: string }> => {
  try {
    // VVV A CORREÇÃO ESTÁ AQUI: Mudamos a URL (adicionamos /item) VVV
    const response = await api.delete(`/inventory/item/${inventoryId}`);
    return response.data;
  } catch (error: any) {
    console.error("Falha ao deletar livro:", error);
    throw new Error(error.response?.data?.message || "Falha ao remover livro.");
  }
};
