
**Practice Project** — This NestJS backend is a sandbox demonstrating common server‑side patterns for learning experience

---

## Overview

This repository contains a **NestJS** backend for a TODO application, showcasing:

* **MongoDB + Mongoose ORM** for schema‑driven data modeling and queries
* **DTOs, Interfaces, and Schemas** to validate and type incoming/outgoing data
* **Custom JWT Strategies & Guards** for both access and refresh tokens
* **Token Management** with a revocation → re‑assignment refresh workflow
* **Modularization** via dedicated services (e.g., Bcrypt hashing service)
* **Cloudinary‑Backed File Storage** for user uploads via Cloudinary’s CDN (no local disk)  
* **Resources** grouped by domain: `User`, `List`, `Token`, `Auth` modules

---

## Key Features

### 1. MongoDB + Mongoose ORM

* Schemas defined via `@Schema()` decorators and Mongoose models
* Clean separation between data persistence (Mongoose) and business logic (Services)

### 2. DTOs & Validation

* **Data Transfer Objects (DTOs)** implemented with `class-validator` and `class-transformer`
* Input validation at the controller layer prevents invalid data from hitting services

### 3. Authentication & Authorization

* **JWT Access Token** for short‑lived requests, **Refresh Token** for session continuation
* Custom `JwtStrategy` classes for each token type
* **AuthGuard** ensures protected routes can only be accessed with valid tokens

### 4. Token Management Workflow

* **`/auth/refresh`** endpoint that revokes old refresh tokens (database record) and issues new ones
* Refresh tokens stored in HTTP‑only cookies; access tokens returned in response body
* Logout endpoint that clears cookies and invalidates refresh tokens

### 5. Modular Design & Services

* **BcryptService** for password hashing and comparison, used by `AuthService`
* Each domain (`User`, `List`, `Token`, `Auth`) lives in its own module for clarity and scalability

### 6. Static File Serving

* User profile images and other uploads saved to `uploads/` via Multer interceptor
* Served statically with Nest’s `ServeStaticModule`

### 7. Rate‑Limiting with Redis & ThrottlerModule

* We use `@nestjs/throttler`’s `ThrottlerModule.forRootAsync()` to configure a **10‑requests-per-60‑seconds** window.
  * An **async factory** pings Redis at startup; if Redis is reachable it injects a `ThrottlerStorageRedisService` pointed at `REDIS_URL`.  
  * If the ping fails, it logs a warning and _omits_ the `storage` option, causing Nest to fall back to its in‑memory store.
* In your controllers you simply decorate protected routes with:
  ```ts
  @UseGuards(ThrottlerGuard, AuthGuard('jwt'))
  @Throttle(5, 60)      // e.g. max 5 calls per minute on this endpoint
  @Post('login')
  login() { /* … */ }

---

## Folder Structure

```
src/
├── auth/             # JWT strategies, guards, auth controller & service
├── users/            # User module: controller, service, schemas, DTOs
├── list/             # List & todo‑item module: controller, service, DTOs
├── tokens/           # Refresh token module: model, service, DTOs
├── main.ts           # App bootstrap and global pipes
├── app.module.ts     # Root module (imports ServeStaticModule)
uploads/          # Static directory for file uploads
```

---

## Modules & Endpoints

* **AuthModule** (`/auth`)

  * `POST /auth/login` → issue tokens
  * `POST /auth/refresh` → rotate refresh token
  * `POST /auth/logout` → revoke tokens
  * `POST /auth/signup` →  create new user

* **UsersModule** (`/user`)

  * `POST /User` → create user
  * `GET /User/get` → get current user (protected)
  * `PATCH /User/patch` → update user fields
  * `PATCH /User/image` → upload profile image
  * `DELETE /User` → delete user

* **ListModule** (`/list`)

  * `POST /list` → create a new list (table entry)
  * `GET /list/item` → get specific list item
  * `GET /list/items` → get all items for a given list
  * `PATCH /list/item` → update a todo item
  * `DELETE /list/item` → delete a todo item
  * `POST /list/item` → create & add a new todo item for the given list

* **TokenModule** handles refresh token records in MongoDB (revocation logic)
  * `POST /Token/refreshtoken` → create  & attach a new refresh token
  * `POST /Token/accesstoken` → create a new access token
  * `POST /Token/refresh` → refresh workflow
---

## Deployment

* **API Deployment** on Heroku at **https://api.portofolkodimi.com**  
* **CI/CD**: pushes to `main` branch trigger automatic build & deploy, with SSL provisioned  
* **Environment Variables** (Heroku Config Vars):
  - `MONGO_URI`  
  - `JWT_ACCESS_SECRET`, `JWT_ACCESS_EXPIRES`  
  - `JWT_REFRESH_SECRET`, `JWT_REFRESH_EXPIRES`  
  - `REDIS_URL`  
  - `FRONTEND_URL=https://portofolkodimi.com`  
