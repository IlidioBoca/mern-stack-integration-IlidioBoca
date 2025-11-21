# MERN Blog Full-Stack

##  Visão Geral

Este é um **aplicativo de Blog Full-Stack** desenvolvido com a **pilha MERN (MongoDB, Express.js, React.js, Node.js)**.  
O projeto demonstra integração completa entre front-end e back-end, incluindo:

- Autenticação de usuários (JWT)  
- CRUD de posts e categorias  
- Upload de imagens para posts  
- Comentários em posts  
- Paginação de posts  
- Rotas protegidas  
- Interface responsiva com React + Vite  

---

## Tecnologias Utilizadas

**Back-End:**
- Node.js, Express.js, MongoDB, Mongoose
- JWT para autenticação
- bcrypt para hash de senhas
- Multer para upload de imagens
- express-validator para validação de dados
- cors, dotenv, morgan  

**Front-End:**
- React.js, React Router, Context API
- Axios para chamadas à API
- Vite como bundler
- CSS simples ou Tailwind (opcional)  

---

##  Estrutura do Projeto
mern-blog/
│
├── server/ # Back-End
│ ├── uploads/ # Imagens de posts
│ ├── src/
│ │ ├── config/db.js
│ │ ├── controllers/
│ │ ├── middleware/
│ │ ├── models/
│ │ ├── routes/
│ │ └── utils/upload.js
│ ├── .env.example
│ ├── package.json
│ └── server.js
│
├── client/ # Front-End
│ ├── src/
│ │ ├── api/api.js
│ │ ├── context/BlogContext.jsx
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── styles.css
│ ├── index.html
│ ├── package.json
│ └── vite.config.js
│
└── README.md


---

## Instalação e Configuração

### Pré-requisitos
- Node.js (v18 ou superior)  
- MongoDB local ou MongoDB Atlas  


Documentação da API
Autenticação

POST /api/auth/register → Registrar usuário

POST /api/auth/login → Login e recebimento do token JWT

Posts

GET /api/posts → Listar posts (paginados: ?page=1&limit=5)

GET /api/posts/:id → Obter post específico

POST /api/posts → Criar post (autenticado)

PUT /api/posts/:id → Editar post (autenticado)

DELETE /api/posts/:id → Deletar post (autenticado)

Categorias

GET /api/categories → Listar categorias

POST /api/categories → Criar categoria (autenticado)

Comentários

GET /api/posts/:postId/comments → Listar comentários

POST /api/posts/:postId/comments → Criar comentário (autenticado)

 Funcionalidades

Back-End:

Registro/Login de usuários com JWT

CRUD de posts e categorias

Upload de imagens

Comentários

Paginação de posts

Rotas protegidas

Front-End:

Interface responsiva com React + Context API

Listagem de posts e categorias

Visualização de post detalhado

Criar, editar e deletar posts

Upload de imagens para posts

Adicionar comentários

Paginação de posts

Login e logout
