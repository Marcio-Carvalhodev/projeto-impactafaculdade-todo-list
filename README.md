# Projeto To-Do List - Faculdade

Sistema de gerenciamento de tarefas com autenticação

## Tecnologias

- **Frontend:** React 19 + Vite + Styled Components + React Router
- **Backend:** Node.js + Express + JWT
- **Banco de dados:** PostgreSQL
- **Containerização:** Docker + Docker Compose

## Estrutura do Projeto

```

projeto-todo-list/
├── backend/
│   ├── src/
│   │   ├── config/         # Conexão com o banco de dados
│   │   ├── controllers/    # Recebem as requisições HTTP
│   │   ├── middlewares/    # Autenticação JWT e tratamento de erros
│   │   ├── repositories/   # Acesso ao banco de dados
│   │   ├── routes/         # Definição das rotas da API
│   │   ├── services/       # Regras de negócio
│   │   └── app.js
│   ├── .env.example
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis (Button, Input, etc.)
│   │   ├── contexts/       # Contexto de autenticação global
│   │   ├── pages/          # Login, Cadastro e Tarefas
│   │   └── services/       # Chamadas à API
│   └── Dockerfile
├── docs/                   # Documentação das ACs
├── docker-compose.yml
└── README.md
```

## Como Executar

### Pré-requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop) instalado e em execução

### Com Docker (recomendado)

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd projeto-todo-list
   ```

2. Suba os containers:
   ```bash
   docker-compose up --build
   ```

3. Acesse no navegador:
   - **Frontend:** http://localhost:5173
   - **API:** http://localhost:3000

> O Docker irá subir automaticamente o banco PostgreSQL, o backend e o frontend. Não é necessário instalar dependências manualmente.

### Sem Docker (desenvolvimento local)

**Pré-requisitos:** Node.js 20+ e PostgreSQL instalados localmente.

1. **Backend:**
   ```bash
   cd backend
   cp .env.example .env
   # Edite o .env com as credenciais do seu PostgreSQL local
   npm install
   npm run dev
   ```

2. **Frontend** (em outro terminal):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Acesse: http://localhost:5173

## Variáveis de Ambiente

Copie `backend/.env.example` para `backend/.env` e preencha:

| Variável | Descrição | Exemplo |
|---|---|---|
| `JWT_SECRET` | Chave secreta para geração dos tokens | `minha_chave_secreta` |
| `PORT` | Porta do servidor backend | `3000` |
| `DATABASE_URL` | String de conexão com o PostgreSQL | `postgresql://user:pass@localhost:5432/todolist` |
| `FRONTEND_URL` | URL do frontend (para CORS) | `http://localhost:5173` |

## Endpoints da API

### Autenticação
| Método | Rota | Descrição |
|---|---|---|
| POST | `/auth/register` | Cadastrar usuário |
| POST | `/auth/login` | Fazer login |

### Tarefas (requer token JWT)
| Método | Rota | Descrição |
|---|---|---|
| GET | `/tasks` | Listar tarefas do usuário |
| POST | `/tasks` | Criar nova tarefa |
| PUT | `/tasks/:id` | Atualizar tarefa |
| DELETE | `/tasks/:id` | Excluir tarefa |
