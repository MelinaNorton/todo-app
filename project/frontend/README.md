# Practice Frontend App

> **Practice Project** — Built purely to demonstrate key frontend patterns in React/Next.js. Not intended for production or real user data.

---

## Overview

This repository contains the **Practice Frontend** for a full‑stack TODO application. It showcases advanced client‑side techniques in a sandbox environment:

* **Access/Refresh Token Management** in Axios with automatic retry on 401 (token expiry)
* **React Query** for data fetching, cache invalidation, and **optimistic updates** with rollback
* **Tailwind CSS** for utility‑first styling and responsive layouts
* **Yup** schemas for robust form validation
* **Route Protection** via middleware-like guards checking authentication state
* **Custom Hooks** for queries & mutations encapsulating API logic
* **Global Auth Context** storing tokens in React state (not localStorage), reloaded on page load via `useEffect`

---

## Key Features

### 1. Access & Refresh Token Flow

* **Axios Interceptors** inject the access token into every request.
* On **401 Unauthorized**, interceptor automatically calls the refresh endpoint, swaps in the new access token, and retries the failed request.
* **Refresh token** stored in an HTTP-only cookie; **access token** kept in React context for security.

### 2. React Query Data Layer

* **Queries** fetch lists and user details with caching and garbage collection.
* **Mutations** perform create/update/delete with:

  * **`onMutate`**: cancel queries, snapshot cache, and apply **optimistic patch** for instant UI feedback
  * **`onError`**: rollback to the previous cache snapshot on failure
  * **`onSuccess`**: update cache with server response (no forced refetch) to keep UI in sync
* **Cache Invalidation** triggers background refetches when data becomes stale.

### 3. Tailwind & UI

* Utility‑first classes for rapid styling: grids, flex, spacing, typography.
* Responsive design across mobile, tablet, and desktop breakpoints.
* Custom animations and hover effects defined in `tailwind.config.js`.

### 4. Form Validation with Yup

* **Yup schemas** validate login, signup, and todo‑item forms at runtime.
* **React Hook Form** integration (or plain `useState` hooks) to display validation errors inline.

### 5. Route Protection

* **High‑order component** or client middleware checks for presence of a valid access token before rendering protected pages.
* Redirects unauthenticated users to `/login`.

### 6. Custom Hooks & Context

* **`useQuery`** and **`useMutation`** hooks in `/hooks/queries` and `/hooks/mutations` abstract all API calls and React Query config.
* **AuthContext** provides `{token, setToken}` across the app. Tokens moved from `localStorage` into React state on mount via `useEffect`, reducing reliance on persistent storage.

---

## Folder Structure

```
├── apis/             # contains the axios endpoint definitions for the nest backend's user & todo backends
├── components/       # Reusable UI components (buttons, inputs, cards)
├── hooks/
│   ├── queries/      # useGetTodos, useGetUser, etc.
│   └── mutations/    # useAddTodo, useUpdateUser, useUploadImage, etc.
├── app/              # Next.js app router
|   |__ login/
|   └── signup/
|   └── home/
|   └── profile/       
├── resources/
|   └── context       # logix for loading/defining context (where tokens/setTokens is managed)
|   └── helpers       # Axios instance & refresh endpoint
|   └── interfaces    # interface definitions used by axios endpoints
|   └── providers     # defines a wrapper that contains both AuthProvider & QueryClientProvider
|   └── schemas       # used for yup form validation
├── styles/           # Tailwind config and globals
```

---


---

## Deployment

* **Production Deployment** on Vercel at **https://portofolkodimi.com**  
* **Preview Deployments** automatically created for each branch/PR  
* **CI/CD**: pushes to `main` trigger automatic builds & deployments  
* **Environment Variables** (set in Vercel Dashboard):  
  - `NEXT_PUBLIC_BACKEND_URL=https://api.portofolkodimi.com`

---

3. **Explore**

   * `/login`, `/signup` (public)
   * `/todos`, `/profile` (protected via auth guard)

