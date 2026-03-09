# Job-Tracker 📁🚀

A robust backend tracking system for your job applications. Built with **Node.js**, **Express 5**, and **MongoDB**.

## ✨ Features

- **CRUD Operations**: Full support for listing, creating, updating, and deleting job entries.
- **Advanced Filtering**: Filter jobs by status or any other field.
- **Dynamic Search**: Search through job titles, companies, or locations.
- **Sorting**: Sort your job list by salary, date, or other attributes.
- **Modular Architecture**: Clean separation of concerns with Core, Modules, and Services.
- **CORS Enabled**: Ready to connect with any frontend application.

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js (v5.x)
- **Database**: MongoDB (via Mongoose)
- **Environment**: Dotenv for configuration

## 📁 Project Structure

```text
backend/
├── core/                # Core logic (server, database connection)
├── modules/
│   └── Job/             # Job module related files
│       ├── jobModel.js
│       ├── jobRoutes.js
│       ├── jobController.js
│       └── jobServices.js
├── .env                 # Environment variables
└── package.json         # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally OR a MongoDB Atlas account.

### Installation

1. Clone the repository then navigate to the backend:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   Create a `.env` file in the `backend` folder:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/job-tracker
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## 📡 API Endpoints

| Method     | Endpoint                          | Description      |
| :--------- | :-------------------------------- | :--------------- |
| **GET**    | `/api/jobs`                       | Get all jobs     |
| **POST**   | `/api/jobs`                       | Create a new job |
| **GET**    | `/api/jobs/:id`                   | Get job by ID    |
| **PUT**    | `/api/jobs/:id`                   | Update a job     |
| **DELETE** | `/api/jobs/:id`                   | Delete a job     |
| **GET**    | `/api/jobs/search?q=query`        | Search jobs      |
| **GET**    | `/api/jobs/filter?status=applied` | Filter jobs      |
| **GET**    | `/api/jobs/sort?sortBy=salary`    | Sort jobs        |

## 🤝 Contributing

Feel free to fork this project and submit pull requests!

---

Made with ❤️ by [Your Name]
