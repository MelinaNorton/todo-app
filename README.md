## Full-Stack TODO App (Practice Monorepo) Nest & Next

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

## **Performance Testing**

The backend API was evaluated under simulated production load using [k6](https://k6.io/).

**Test Configuration:**
- **Environment:** Hosted backend (Heroku) with production configuration  
- **Load Profile:** 50 virtual users (VUs) over 1 minute sustained traffic  
- **Endpoints Tested:** `POST /auth/login` (initial auth), `GET /list/items` (authenticated resource)  
- **Authentication:** JWT (access token valid through full test duration)  
- **Rate Limiting:** Temporarily increased for load evaluation  

**Results:**
- **Total Requests:** 1,526 successful API calls  
- **Success Rate:** 99.6% (`3040/3051` checks succeeded)  
- **Throughput:** ~21 requests/second sustained  
- **Latency:**  
  - Average: 152 ms  
  - p90: 161 ms  
  - p95: 173 ms  
  - Max: 965 ms (isolated outlier)  

**Summary:**
> The API sustained 50 concurrent virtual users with a 99.6% success rate and maintained p95 latency under 175 ms during load testing on the production‑hosted environment.

---

## **How to Run the Load Test**

This project includes a `k6` load testing script to evaluate API performance under concurrent user load.

**Prerequisites:**
- [Install k6](https://k6.io/docs/get-started/installation/)  
  - **Mac (Homebrew):** `brew install k6`  
  - **Windows (winget):** `winget install k6`  
  - **Windows (Chocolatey):** `choco install k6`

**Test Script Location:**

backend/src/test/load_test.js


**Script Overview:**
- Authenticates once in `setup()` using a test account (`POST /auth/login`)  
- Stores access token for all Virtual Users  
- Performs authenticated `GET /list/items` requests under sustained load  
- Tracks success rate and latency percentiles

**Run the Test:**
From the backend root:
```bash
k6 run src/test/load_test.js

checks.....................: 99.6% ✓ 3040 ✗ 11
http_reqs..................: 1,526 requests
http_req_duration..........: avg=152ms p(95)=173ms
