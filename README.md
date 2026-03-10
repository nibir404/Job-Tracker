# JobTracker 📁🚀

JobTracker is a premium career management platform designed to help professionals organize and track their job applications. Built with a modern **Node.js/Express** backend and a stunning **React/Tailwind CSS 4.0** frontend, it offers a seamless and aesthetically pleasing experience.

## ✨ Features

### 💻 Frontend (React SDK)

- **Modern Dashboard**: A clean, responsive interface using **DaisyUI 5.0** and **Tailwind CSS 4.0**.
- **Real-time Synchronization**: Seamless integration with the backend API.
- **Demo Mode**: Graceful fallback to rich dummy data if the database or backend is unreachable.
- **Dynamic Search & Filtering**: Real-time search and status-based filtering (Applied, Interview, Offer, Rejected).
- **Interactive UI**: Modern modals, smooth transitions, and premium typography (Outfit/Inter).

### 🛠️ Backend (Express Core)

- **Robust CRUD Engine**: Efficient handling of application data.
- **Flexible Queries**: Advanced search, filtering, and sorting logic.
- **Modular Architecture**: Clean separation of concerns with Core, Modules, and Services.
- **Stability**: Environment-aware configuration with **Dotenv**.

## 🛠️ Technology Stack

| Layer        | Technologies                                                                |
| :----------- | :-------------------------------------------------------------------------- |
| **Frontend** | React 19, Tailwind CSS 4.0, DaisyUI 5.0, Axios, React Icons, React Router 7 |
| **Backend**  | Node.js, Express 5, MongoDB (Mongoose), Nodemon                             |
| **Design**   | Outfit (Headings), Inter (Body text), Modern Gradients                      |

## 📁 Project Structure

```text
Job-Tracker/
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # UI Components (Navbar, JobCard, etc.)
│   │   ├── pages/           # Application views (Dashboard)
│   │   ├── services/        # API communication logic
│   │   └── ...
│   └── public/
├── backend/                # Express API
│   ├── core/                # Server & Database setup
│   ├── modules/             # Business logic modules
│   └── ...
├── README.md
└── ...
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/try/download/community) (Running locally or via Atlas)

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Configure .env
# Create a .env file:
# PORT=5000
# MONGO_URI=mongodb://127.0.0.1:27017/job-tracker

# Seed data (optional)
node core/seed.js

# Run backend
npm run dev
```

### 2. Frontend Setup

```bash
# Navigate to frontend (from root)
cd frontend

# Install dependencies
npm install

# Configure .env
# Create a .env file:
# VITE_API_URL=http://localhost:5000/api

# Run frontend
npm run dev
```

## 📡 API Endpoints

| Method   | Endpoint                 | Description           |
| :------- | :----------------------- | :-------------------- |
| `GET`    | `/api/jobs`              | Get all jobs          |
| `POST`   | `/api/jobs`              | Create application    |
| `PUT`    | `/api/jobs/:id`          | Update status/details |
| `DELETE` | `/api/jobs/:id`          | Remove entry          |
| `GET`    | `/api/jobs/search?q=...` | Search entries        |

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the platform.

---

Made with ❤️ by [Nibirman]
