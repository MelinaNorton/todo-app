
**Practice Project** — This NestJS backend is a sandbox demonstrating common server‑side patterns for learning experience

---

## Overview

This repository contains a **NestJS** backend for a TODO application, showcasing:

* **MongoDB + Mongoose ORM** for schema‑driven data modeling and queries
* **DTOs, Interfaces, and Schemas** to validate and type incoming/outgoing data
* **Custom JWT Strategies & Guards** for both access and refresh tokens
* **Token Management** with a revocation → re‑assignment refresh workflow
* **Modularization** via dedicated services (e.g., Bcrypt hashing service)
* **Static File Serving** of user uploads from the `uploads/` folder
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

---

## 📁 Folder Structure

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
