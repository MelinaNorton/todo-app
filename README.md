Full-Stack TODO App (Practice Monorepo) Nest & Next

> **Practice Project** — A sandbox to explore modern full‑stack patterns.

---

## Repository Structure

```
/project
├── backend/   # NestJS API: MongoDB/Mongoose, DTOs, JWT auth (access & refresh), token revocation workflow, file uploads
├── frontend/  # Next.js app: Axios access/refresh handling, React Query caching & optimistic updates, Tailwind, Yup validation, route guards, AuthContext
└── README.md  # You are here—it links to sub‑project READMEs
```

---

## Getting Started

### 1. Clone & configure

```bash
git clone <repo-url>
cd project
cp .env.example backend/.env
# edit backend/.env with MONGO_URI, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, etc.
```

### 2. Install dependencies

```bash
# Backend
cd backend && npm install
# Frontend
cd ../frontend && npm install
```

### 3. Run in development

```bash
# Start backend (NestJS)
cd backend && npm run start:dev
# Start frontend (Next.js)
cd frontend && npm run dev
```

* **Backend** → [http://localhost:3000](http://localhost:3000)
* **Frontend** → [http://localhost:3004](http://localhost:3004)

---

## Key Features

* **Backend**: Schema-driven MongoDB with Mongoose, DTO validation, modular services (Bcrypt, Token), JWT access & refresh strategies, refresh‑revoke workflow, static file serving.
* **Frontend**: Secure token management with Axios interceptors, automatic retry on 401, React Query hooks with cache invalidation and optimistic updates + rollbacks, Tailwind styling, Yup form validation, Next.js middleware and route protection, global AuthContext.

---

