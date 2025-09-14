# Projeto Interface: Sistema de Troca de Livros (Front-End)

Interface de usuário (UI) construída em React para consumir a API de Troca de Livros, como parte do projeto da disciplina de Web 2.

## Tecnologias Utilizadas

* **React 18**
* **Vite** (Build tool)
* **TypeScript**
* **React Router DOM** (Para gerenciamento de rotas/páginas)
* **React Context API** (Para gerenciamento de estado global de Autenticação e Socket)
* **Axios** (Para chamadas à API REST)
* **Socket.io-Client** (Para conexão com o chat em tempo real)
* **Swiper.js** (Para os carrosséis da Homepage)
* **React-Icons**

---

## Configuração e Inicialização

### 1. Pré-requisitos (Back-End)

Este projeto é **apenas** a interface e depende 100% do servidor Back-end (`Backend-WEB2-PROJETO`).

1.  O servidor Back-end **DEVE** estar rodando (na porta `3002`, conforme configurado).
2.  O arquivo `src/services/api.ts` (deste projeto) está configurado para apontar para a `baseURL`: `http://localhost:3002/api`.

### 2. Instalação e Execução

1.  Abra um **segundo terminal** (separado do back-end).
2.  Entre nesta pasta do front-end.
3.  Instale todas as dependências:
    ```bash
    npm install
    ```
4.  Execute o servidor de desenvolvimento (Vite):
    ```bash
    npm run dev
    ```
5.  O Vite iniciará o site. Abra o navegador no endereço local fornecido (geralmente `http://localhost:5173`).
