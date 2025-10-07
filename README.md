# 🏦 Titanbay Take-Home Technical Task

This project is a **Node.js + Express + Prisma + PostgreSQL** API that simulates a private investment management platform for Titanbay.  
It includes fully functional CRUD endpoints, schema validation with **Zod**, tests using **Jest + Supertest**, and interactive **Swagger API documentation**.

---

## ⚙️ Tech Stack

| Layer | Technology |
|:------|:------------|
| Language | **TypeScript** |
| Framework | **Express.js** |
| ORM | **Prisma** |
| Database | **PostgreSQL** |
| Validation | **Zod v4** |
| Testing | **Jest + Supertest** |
| API Docs | **Swagger (swagger-ui-express + swagger-jsdoc)** |

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone <your-repo-url>
cd titanbay-task
```

### 2️⃣ Install dependencies
Make sure you have **Node v18+** and **npm v9+**.
```bash
npm install
```

### 3️⃣ Configure environment variables
```bash
cp .env.example .env
```
Edit `.env`:
```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/titanbay_db"
PORT=4000
NODE_ENV=development
```

### 4️⃣ Set up the PostgreSQL database
Ensure PostgreSQL is running, then:
```bash
npx prisma migrate dev --name init
npx prisma generate
```
Optionally open Prisma Studio:
```bash
npx prisma studio
```

### 5️⃣ Run the server
```bash
npm run dev
```
Server runs at **http://localhost:4000**

### 6️⃣ View API docs
Visit **[http://localhost:4000/api-docs](http://localhost:4000/api-docs)** for the interactive Swagger UI.

---

## 🧪 Running Tests
```bash
npm test
# or with coverage
npm test -- --coverage
```
> Tests use Jest + Supertest and reset the local database between runs.

---

## 🧩 Project Structure
```
├── prisma/
│   ├── schema.prisma           # Database schema
│   ├── migrations/             # Migration history
├── src/
│   ├── app.ts                  # Express app
│   ├── server.ts               # Entry point
│   ├── config/
│   │   └── swagger.ts          # Swagger setup
│   ├── controllers/            # Business logic
│   ├── middleware/
│   │   ├── errorHandler.ts     # Global error handler
│   │   └── validate.ts         # Zod validation middleware
│   ├── routes/                 # Express routers
│   ├── schemas/                # Zod schemas
│   ├── utils/                  # Prisma client/helpers
│   └── tests/                  # Jest + Supertest suites
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🧠 API Overview

| Resource | Endpoint | Method | Description |
|:----------|:----------|:--------|:-------------|
| **Funds** | `/funds` | `GET` / `POST` | List or create funds |
|  | `/funds/:id` | `GET` / `PUT` / `DELETE` | Retrieve, update, delete a fund |
| **Investors** | `/investors` | `GET` / `POST` | Manage investors |
| **Investments** | `/funds/:fund_id/investments` | `GET` / `POST` | Manage investments per fund |
| **Transactions** | `/transactions` | `GET` / `POST` | Manage transactions |
| **Admin** | `/admin/recalculate-fees` | `POST` | Recalculate management fees for a fund |

---

## 🧰 Validation & Error Handling

- Input validation via **Zod v4**
- Middleware `validateBody()` ensures all requests are type-safe  
- Centralized `errorHandler` for consistent responses  

**Example validation error**
```json
{
  "error": [
    { "path": ["fund_id"], "message": "fund_id is required" }
  ]
}
```

---

## 🧱 Example Usage
```bash
# Start the server
npm run dev

# Create a fund
curl -X POST http://localhost:4000/funds   -H "Content-Type: application/json"   -d '{"name":"Growth Fund","vintage_year":2022,"target_size_usd":10000000,"status":"Fundraising"}'

# Get all funds
curl http://localhost:4000/funds

# Recalculate admin fees
curl -X POST http://localhost:4000/admin/recalculate-fees   -H "Content-Type: application/json"   -d '{"fund_id":1,"new_fee_percentage":3.5,"apply_retroactively":true}'
```

---

## 🧩 Troubleshooting

| Issue | Fix |
|:------|:----|
| `FATAL: role "postgres" does not exist` | Update your `DATABASE_URL` with the correct user |
| `Error: res.status is not a function` | Ensure `errorHandler` is the **last** middleware |
| Swagger UI error 500 | Mount `/api-docs` **before** `errorHandler` |
| Jest DB errors | Confirm database connection and reset logic in tests |

---

## 🧾 License
This project was developed as part of the **Titanbay Take-Home Technical Assessment**.  
Use or distribution outside this context is restricted.

---