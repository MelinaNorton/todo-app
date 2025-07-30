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

* **Backend**: Schema‑driven MongoDB with Mongoose, DTO validation, modular services (Bcrypt, Token), JWT access & refresh strategies with refresh‑revoke workflow, cloud file storage (Cloudinary), API rate‑limiting (Redis), and MongoDB query caching for high‑traffic endpoints (Redis)
* **Frontend**: Secure token management with Axios interceptors, automatic retry on 401, React Query hooks with cache invalidation and optimistic updates + rollbacks, Tailwind styling, Yup form validation, Next.js middleware and route protection, global AuthContext.

---

## **Performance Testing**

The backend API was evaluated under simulated production load using [k6](https://k6.io/).

---

### **Load Test (Sustained Traffic)**

**Configuration:**
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
> API sustained 50 concurrent virtual users with 99.6% success rate and p95 latency under 175 ms during sustained load test.

---

### **Workflow Test (Full CRUD Cycle)**

**Configuration:**
- **Environment:** Hosted backend (Heroku) with production configuration  
- **Workflow Simulated:** Login → Get Items → Add Item → Delete Item  
- **Load Profile:** 50 virtual users (VUs) executing full workflow for 90 seconds  

**Results:**
- **Total API Calls:** 3,295 across all CRUD actions  
- **Success Rate:** 100% (all login, GET, POST, DELETE checks succeeded)  
- **Throughput:** ~36 requests/second sustained  
- **Latency:**  
  - Average: 298 ms  
  - p90: 786 ms  
  - p95: 818 ms  
  - Max: ~1.02 s (isolated slow request during writes)  

**Summary:**
> API sustained 50 concurrent authenticated workflows (login, create, fetch, delete) with 100% success rate and p95 latency <820 ms during production‑hosted workflow test.

### **Soak Test (Long-Duration Stability)**

**Configuration:**
- **Environment:** Hosted backend (Heroku) with production configuration  
- **Load Profile:** 20 virtual users (VUs) sustained over 30 minutes  
- **Endpoint Tested:** `GET /list/items` (authenticated resource)  
- **Authentication:** JWT (access token valid through full test duration)  

**Results:**
- **Total API Calls:** ~22.5k requests  
- **Success Rate:** 99.98% (only 4 transient connection resets)  
- **Latency:**  
  - Average: 162 ms  
  - p95: 232 ms  
  - Max: 777 ms (isolated outlier)  

**Summary:**
> API sustained 20 concurrent virtual users for 30 minutes (~22.5k requests) with 99.98% success rate and p95 latency <235 ms, showing no degradation in performance or stability.

---

## **How to Run the Tests**

Both tests are implemented in `k6` and included in the repo.

**Prerequisites:**
- [Install k6](https://k6.io/docs/get-started/installation/)  
  - **Mac (Homebrew):** `brew install k6`  
  - **Windows (winget):** `winget install k6`  
  - **Windows (Chocolatey):** `choco install k6`

**Test Script Locations:**

- **backend/src/test/load_test.js** # Sustained load test
- **backend/src/test/workflow_test.js** # Full CRUD workflow test
- **backend/src/test/soak_test.js** # ~30min soak test

**Run a Test:**
From the backend root:
```bash
k6 run src/test/load_test.js
k6 run src/test/workflow_test.js
k6 run src/test/soak_test.js
