# 🚀 Projeto Top5

Bem-vindo ao **Projeto Top5**! 🎉  
Este projeto consiste em uma **API Laravel** (backend) + **Frontend React** com Vite, totalmente containerizados usando **Docker** e **Docker Compose**. Aqui você encontrará tudo o que precisa para rodar, desenvolver, testar e implantar sua aplicação.

---

📚 **Sumário**  
1. [Visão Geral](#-visão-geral)  
2. [Tecnologias](#-tecnologias)  
3. [Estrutura do Projeto](#-estrutura-do-projeto)  
4. [Pré-requisitos](#-pré-requisitos)  
5. [Instalação e Execução](#-instalação-e-execução)  
6. [Configuração Backend (Laravel)](#-configuração-backend-laravel)  
7. [Configuração Frontend (React + Vite)](#-configuração-frontend-react--vite)  
8. [Testes](#-testes)  
   - [Frontend](#frontend)  
   - [Backend](#backend)  
9. [Docker & Docker Compose](#-docker--docker-compose)  
10. [Endpoints da API](#-endpoints-da-api)  
11. [Scripts Úteis](#-scripts-úteis)  
12. [Licença](#-licença)  

---

## 🌟 Visão Geral
Este projeto permite que usuários:
- 📦 Criem, listem, editem e excluam músicas (CRUD completo).
- 🔒 Se autentiquem via Laravel Sanctum (registro, login, logout).
- 📊 Visualizem o ranking de músicas no frontend React.

---

## 🛠️ Tecnologias
- **Backend**: Laravel 11.45.1, Sanctum, PHP 8.3.22
- **Frontend**: React 18 + Vite  
- **Banco de Dados**: MySQL 8  
- **Cache**: Redis  
- **Testes Frontend**: Jest + React Testing Library  
- **Testes Backend**: PHPUnit (Laravel Test Suite)  
- **Contêineres**: Docker + Docker Compose  

---

## 📁 Estrutura do Projeto
```
.
├── backend/
│   ├── src/                   # Código-fonte Laravel
│   ├── src/routes/            # Rotas (api.php, web.php)
│   ├── src/database/          # Migrations, seeders, factories
│   ├── tests/                 # Testes (Feature e Unit)
│   ├── composer.json
│   └── phpunit.xml
├── frontend/
│   ├── src/                   # Código React (componentes, páginas)
│   ├── __tests__/             # Testes Jest + RTL
│   ├── package.json
│   ├── vite.config.js
│   └── jest.config.js
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Pré-requisitos
Antes de começar, certifique-se de ter:
- Docker e Docker Compose  
- Node.js >= 16  
- Composer e PHP >= 8  

---

## 🔧 Instalação e Execução
1. **Clone o repositório**  
   ```bash
   git clone <url-do-repo>
   cd projeto-top5
   ```
2. **Build e up dos containers**  
   ```bash
   docker-compose up -d --build
   ```
3. **Acesse**  
   - Backend: `http://localhost:8000/api`  
   - Frontend: `http://localhost:3000`

---

## 🔐 Configuração Backend (Laravel)
1. Copie `.env.example` para `.env`  
2. Ajuste as variáveis de ambiente (DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD)  
3. No container backend:
   ```bash
   docker-compose exec backend bash
   composer install
   php artisan key:generate
   php artisan migrate --seed
   ```
---

## 🎨 Configuração Frontend (React + Vite)
1. No container frontend:
   ```bash
   docker-compose exec frontend bash
   npm install
   npm run dev
   ```
2. A aplicação ficará disponível em: `http://localhost:3000`

---

## 🧪 Testes

### Frontend
- Instalar dependências de teste:
  ```bash
  npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
  ```
- Executar testes:
  ```bash
  npm test
  # ou
  docker-compose exec frontend npm test
  # se usar Vitest:
  npx vitest
  ```

### Backend
- Executar testes:
  ```bash
  php artisan test
  # ou
  docker-compose exec backend php artisan test
  ```

---

## 🐳 Docker & Docker Compose
- `docker-compose up -d --build`: inicializa tudo
- `docker-compose exec backend bash`: entra no container Laravel
- `docker-compose exec frontend bash`: entra no container React

---

## 📡 Endpoints da API

| Método | Rota             | Ação                                | Autenticação |
| ------ | ---------------- | ----------------------------------- | ------------ |
| POST   | `/api/register`  | Registrar novo usuário              | ❌           |
| POST   | `/api/login`     | Login e obtenção de token           | ❌           |
| POST   | `/api/logout`    | Logout (revoga token)               | ✅           |
| GET    | `/api/user`      | Retorna dados do usuário logado     | ✅           |
| GET    | `/api/musicas`   | Lista músicas (filtro e paginação)  | ❌           |
| POST   | `/api/musicas`   | Cadastra nova música                | ✅           |
| PUT    | `/api/musicas/{id}` | Atualiza música                  | ✅           |
| DELETE | `/api/musicas/{id}` | Exclui música                    | ✅           |

---

## ⚡️ Scripts Úteis
No diretório `frontend`:
- `npm run dev`: inicia em modo dev
- `npm run build`: gera build de produção
- `npm test`: executa testes

No diretório `backend`:
- `php artisan migrate`
- `php artisan db:seed`
- `php artisan test`

---
  

---
