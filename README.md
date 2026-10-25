# EduNova Student Learning Platform

EduNova is a full-stack student learning platform for discovering courses, tracking progress, taking quizzes, planning study time, and earning certificates.

## Technologies

- Frontend: HTML, CSS, and JavaScript
- Backend: Node.js and Express.js
- Database: MongoDB with Mongoose
- Authentication: JSON Web Tokens and bcryptjs

## Features

- Home, course catalog, dashboard, profile, contact, login, and registration pages
- User authentication and protected API routes
- Course, lesson, quiz, certificate, achievement, forum, and planner APIs
- Progress dashboard with course and achievement information
- Responsive styling and light/dark theme support

## Project structure

```text
edunova/
|-- frontend/
|   |-- index.html
|   |-- login.html
|   |-- register.html
|   |-- courses.html
|   |-- dashboard.html
|   |-- profile.html
|   |-- contact.html
|   |-- css/
|   |   `-- style.css
|   `-- js/
|       |-- main.js
|       |-- auth.js
|       |-- courses.js
|       |-- dashboard.js
|       `-- profile.js
|-- backend/
|   |-- server.js
|   |-- package.json
|   |-- package-lock.json
|   |-- config/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   `-- routes/
|-- .env.example
|-- .gitignore
`-- README.md
```

## Installation

1. Install Node.js and MongoDB.
2. Copy `.env.example` to `.env`.
3. Set `MONGODB_URI`, `JWT_SECRET`, and any email settings in `.env`.
4. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

## Running the project

From the `backend` directory, start the server:

```bash
npm start
```

For development with automatic restarts:

```bash
npm run dev
```

Open <http://localhost:5000> in a browser. The Express server serves the frontend from `frontend/` and exposes the API under `/api`.

Never commit `.env`, database credentials, or `node_modules/`. The included `.env.example` contains placeholders only.
