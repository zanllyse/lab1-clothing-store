# Лабораторна робота 01 — Clothing Store API

Навчальний backend інтернет-магазину одягу на Node.js, Express.js, PostgreSQL та Prisma ORM.

## 1. Що реалізовано

- Express-сервер і REST API.
- Підключення до PostgreSQL через Prisma.
- 5 пов'язаних моделей: Category, Product, Customer, Order, OrderItem.
- CRUD (GET, POST, PUT, DELETE) для кожного ресурсу.
- Перевірка вхідних даних через Zod.
- Централізована обробка помилок.
- Налаштування через `.env`.
- Базова документація API у `reports/lab1-report.md`.

## 2. Вимоги

- Node.js 18 або новіше
- npm
- PostgreSQL 14 або новіше

## 3. Запуск

1. Створіть у PostgreSQL базу даних `clothing_store`.
2. У кореневій папці проєкту виконайте:
   ```bash
   npm install
   ```
3. Скопіюйте `.env.example` у `.env` та вкажіть пароль PostgreSQL у `DATABASE_URL`.
4. Створіть таблиці:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Запустіть сервер:
   ```bash
   npm run dev
   ```
6. Відкрийте `http://localhost:3000/api`.

## 4. Приклади запитів

Створити категорію:
```bash
curl -X POST http://localhost:3000/api/categories -H "Content-Type: application/json" -d "{\"name\":\"Футболки\"}"
```

Створити товар (підставте реальний `categoryId`):
```bash
curl -X POST http://localhost:3000/api/products -H "Content-Type: application/json" -d "{\"name\":\"Біла футболка\",\"price\":499,\"size\":\"M\",\"color\":\"білий\",\"stock\":10,\"categoryId\":1}"
```

Отримати товари:
```bash
curl http://localhost:3000/api/products
```

## 5. Важливо

Це навчальна реалізація для лабораторної роботи, а не готовий комерційний магазин. Для реального використання потрібно додати хешування паролів, авторизацію, перевірку прав доступу, безпечне створення замовлення з позиціями та завантаження зображень. Не додавайте файл `.env` до GitHub.
