# 🚀 QueryRight: A Database Learning Platform

## 💡 The Problem
Learning databases (SQL & NoSQL) is tough. 
- **Beginners** struggle with syntax and concepts.
- **Intermediates** write queries that "work" but are painfully slow.
- **Optimization** is often a black art reserved for senior DBAs.

## ⚡ The Solution: QueryRight
QueryRight is an all-in-one platform where you **Learn**, **Practice**, and **Optimize**.
It's not just a course; it's a smart environment that understands your code.

### 🔥 Key Features (At a Glance)
- **📚 Interactive Lessons**: Learn SQL, MongoDB, DuckDB, and Neo4j with embedded code editors.
- **⚡ In-Browser Execution**: Run queries directly in the browser (powered by PGlite & WASM).
- **🔄 Sync Across Devices**: Highlights, bookmarks, and progress saved via the cloud using Better Auth.

---

## 🛠️ How It Works
1. **Learn**: Follow guided MDX-based lessons with rich diagrams.
2. **Execute**: Type code in the Monaco Editor and see results instantly (Client-side DB!).
---

## 🏗️ Built With
We used a modern, scalable full-stack architecture:

- **Frontend**: React + Vite (Fast UX), TanStack Router (Type-safe routing)(Tanstack Start).
- **Editors**: Monaco Editor + PGlite (Postgres in the browser),MingoDB (MongoDB in the browser).
- **Backend**: Fastify + TypeScript (High performance API).
- **Database**: PostgreSQL + Prisma (ORM & Type safety).
- **Auth**: Better Auth + Resend (Secure & Passwordless flows).
- **Infra**: Turborepo (Monorepo management) + Docker.

---


## 🚀 Quick Start (Run it locally)

**Prerequisites**: Node.js 18+, pnpm, Docker.

```bash
# 1. Install dependencies
pnpm install

# 2. Start Database (Docker)
docker compose -f docker/db-docker-compose.yml up -d

# 3. Setup Env
cp .env.example .env # (Fill in DATABASE_URL and API Keys)

# 4. Run Migrations & Start
pnpm migrate:dev
pnpm dev
```
*Access the app at `http://localhost:3000`*

---
Try out the [**demo**](https://queryright.netlify.app)

---
## Team CypherX
Team Members:
- Kishan Agarwal (BTech/10539/24)
- Palash Siddharth Mende (BTech/10536/24)