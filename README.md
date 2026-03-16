# Ecommerce Shop - Fullstack Marketplace (Next.js + Django REST + PostgreSQL)

Ecommerce Shop is a fullstack marketplace application split into frontend and backend services.
The frontend (Next.js) handles the storefront, cart, and checkout UX, while the backend
(Django REST Framework) provides APIs for products, shipping addresses, orders, and JWT auth.

## Features

- User registration and login (JWT)
- Seller account registration
- Product listing, product details, and category filtering
- Product search
- Client-side cart state management (Zustand)
- Checkout with shipping address and shipping method
- Order creation with shipment split per seller
- Shipping address management (country/region/city, default address, place)
- Product reviews
- API documentation (drf-spectacular + Swagger UI)

## Tech Stack

### Frontend (client)

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Zustand
- Radix UI + lucide-react

### Backend (server)

- Python 3.11+
- Django 5.2
- Django REST Framework
- JWT (SimpleJWT)
- PostgreSQL
- drf-spectacular (OpenAPI + Swagger)
- django-cities-light (countries/regions/cities data)

## Architecture

- client: Next.js app (UI + server actions + route handlers)
- server: Django REST API (auth, products, orders, accounts)
- communication: frontend calls backend APIs using environment variables and JWT tokens

## Project Structure

```text
Ecommerce-Shop/
|-- client/
|   |-- app/
|   |-- components/
|   |-- lib/
|   |-- src/
|   `-- package.json
|-- server/
|   |-- accounts/
|   |-- orders/
|   |-- products/
|   |-- config/
|   |-- manage.py
|   `-- requirements.txt
`-- README.md
```

## Requirements

- Node.js 20+
- npm 10+
- Python 3.11+ (3.13 should also work)
- PostgreSQL 14+

## Environment Variables

Example local configuration.

### server/.env

```env
SECRET_KEY=change-me
DEBUG=True
DB_NAME=ecommerce_shop
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=127.0.0.1
DB_PORT=5432
```

### client/.env.local

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api
API_BASE_URL=http://127.0.0.1:8000/api
```

## Quickstart (Local)

### 1. Backend

```bash
cd server
python -m venv .venv
```

Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

macOS/Linux:

```bash
source .venv/bin/activate
```

Install dependencies and run migrations:

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend URLs:

- http://127.0.0.1:8000
- http://127.0.0.1:8000/api/docs/
- http://127.0.0.1:8000/admin

### 2. Frontend

In a new terminal:

```bash
cd client
npm install
npm run dev
```

Frontend URL:

- http://localhost:3000

## Development Notes

- Frontend and backend run as separate processes.
- OpenAPI docs are available at /api/docs/.
- The repo also includes separate setup notes in client and server README files.

## Status

Project is actively developed.
