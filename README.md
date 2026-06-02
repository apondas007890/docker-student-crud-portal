# 🎓 Global Institute — Dockerized Student Information System

A full-stack Student Information System built with Docker, Node.js, Express, MongoDB, and Nginx.

This project demonstrates how a complete web application can be developed and executed entirely inside Docker containers without installing Node.js, NPM, or MongoDB directly on the host machine.

The application allows users to create, search, update, and delete student records through a modern web interface while communicating with a REST API connected to a MongoDB database.

---

# 🚀 Features

* Create student records
* View all students
* Update existing students
* Delete students
* Search students by Student ID or Name
* RESTful API architecture
* MongoDB data persistence
* Dockerized development environment
* Hot-reload backend development
* Clean and responsive UI using Tailwind CSS

---

# 🏗️ How the System Works

The application is composed of three independent services running inside Docker containers.

```text
┌─────────────────────┐
│     Frontend        │
│  HTML + Tailwind    │
│   Nginx Container   │
└─────────┬───────────┘
          │ HTTP Requests
          ▼
┌─────────────────────┐
│      Backend        │
│ Node.js + Express   │
│    API Container    │
└─────────┬───────────┘
          │ Database Queries
          ▼
┌─────────────────────┐
│      MongoDB        │
│ Database Container  │
└─────────────────────┘
```

### Request Flow

1. A user opens the Student Portal in the browser.
2. The frontend sends requests to the Express API.
3. The API processes the request.
4. The API reads or writes data in MongoDB.
5. MongoDB returns the result.
6. The API sends a response back to the frontend.
7. The browser updates the UI.

Example:

```text
User Clicks "Add Student"
        │
        ▼
Frontend sends POST request
        │
        ▼
Express API receives request
        │
        ▼
MongoDB stores record
        │
        ▼
API returns success response
        │
        ▼
Frontend refreshes student table
```

---

# 🛠️ Technology Stack

| Layer            | Technology         |
| ---------------- | ------------------ |
| Frontend         | HTML5              |
| Styling          | Tailwind CSS       |
| Client Logic     | Vanilla JavaScript |
| Backend          | Node.js            |
| API Framework    | Express.js         |
| Database         | MongoDB            |
| Web Server       | Nginx              |
| Containerization | Docker             |
| Orchestration    | Docker Compose     |

---
## 📸 System Preview

![System Workspace Screenshot](./workspace_preview.jpg)

---
# 📂 Project Structure

```text
student-crud-app/
│
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── Dockerfile
│   ├── index.html
│   └── app.js
│
└── docker-compose.yml
```

### Backend

```text
backend/
```

Contains:

* Express API
* CRUD routes
* MongoDB connection logic
* Mongoose schema

### Frontend

```text
frontend/
```

Contains:

* User interface
* Student forms
* Search functionality
* API communication logic

### Docker Compose

```text
docker-compose.yml
```

Defines:

* MongoDB container
* Backend container
* Frontend container
* Networks
* Volumes
* Port mappings

---

# 🐳 Why Docker?

Normally you would install:

* Node.js
* NPM
* MongoDB

directly on your operating system.

With Docker:

* Every service runs in an isolated container.
* No dependency conflicts.
* Easy setup.
* Same environment for every developer.
* Clean host machine.

Only Docker is required.

---

# ⚡ Getting Started

## Prerequisites

Install:

* Docker Engine
* Docker Compose

Verify installation:

```bash
docker --version
docker compose version
```

---

## Clone Repository

```bash
git clone https://github.com/your-username/student-crud-app.git

cd student-crud-app
```

You should now be inside:

```text
student-crud-app/
```

---

## Start the Application

Run:

```bash
docker compose up --build
```

This command:

* Builds frontend image
* Builds backend image
* Downloads MongoDB image
* Creates Docker network
* Creates Docker volume
* Starts all containers

The first startup may take several minutes.

---

# 🌐 Access the Application

Once all containers start successfully:

| Service     | URL                                |
| ----------- | ---------------------------------- |
| Frontend UI | http://localhost:8080              |
| Backend API | http://localhost:5000/api/students |

Open:

```text
http://localhost:8080
```

in your browser.

You should see the Student Management Portal.

---

# 🔄 Running in Background

Instead of keeping logs attached to your terminal:

```bash
docker compose up -d --build
```

Docker will continue running in the background.

Check running containers:

```bash
docker compose ps
```

---

# 📜 Viewing Logs

View all service logs:

```bash
docker compose logs -f
```

View backend logs:

```bash
docker compose logs backend
```

View database logs:

```bash
docker compose logs database
```

---

# 📡 REST API Overview

The backend follows REST architecture.

REST (Representational State Transfer) is a standard way of designing APIs where each HTTP method performs a specific action.

| Method | Action      |
| ------ | ----------- |
| GET    | Read Data   |
| POST   | Create Data |
| PUT    | Update Data |
| DELETE | Delete Data |

---

# 📡 API Endpoints

## Get All Students

```http
GET /api/students
```

Example:

```bash
curl http://localhost:5000/api/students
```

---

## Search Students

```http
GET /api/students?search=John
```

Example:

```bash
curl "http://localhost:5000/api/students?search=John"
```

---

## Create Student

```http
POST /api/students
```

Example:

```bash
curl -X POST http://localhost:5000/api/students \
-H "Content-Type: application/json" \
-d '{
  "studentId":"STU-001",
  "name":"John Doe",
  "email":"john@example.com",
  "department":"Computer Science"
}'
```

---

## Update Student

```http
PUT /api/students/:id
```

Example:

```bash
curl -X PUT http://localhost:5000/api/students/ID_HERE \
-H "Content-Type: application/json" \
-d '{
  "name":"Updated Name"
}'
```

---

## Delete Student

```http
DELETE /api/students/:id
```

Example:

```bash
curl -X DELETE http://localhost:5000/api/students/ID_HERE
```

---

# 💾 Data Persistence

MongoDB data is stored in a Docker volume.

```text
mongo_data
```

Benefits:

* Data survives container restarts.
* Data survives system reboots.
* Data remains available after:

```bash
docker compose down
```

Only removed when:

```bash
docker compose down -v
```

---

# 🔥 Hot Reload Development

The backend container uses bind mounts.

```yaml
volumes:
  - ./backend:/usr/src/app
```

Development workflow:

1. Open project in VS Code.
2. Edit `server.js`.
3. Save file.
4. Docker syncs changes instantly.
5. Nodemon restarts the API.
6. Browser receives updated backend.

No rebuild required.

---

# 🐳 Useful Docker Commands

Start application:

```bash
docker compose up --build
```

Start in background:

```bash
docker compose up -d --build
```

View logs:

```bash
docker compose logs -f
```

Check running containers:

```bash
docker compose ps
```

Restart services:

```bash
docker compose restart
```

Stop services:

```bash
docker compose stop
```

Remove containers:

```bash
docker compose down
```

Remove containers and database:

```bash
docker compose down -v
```

Open backend container shell:

```bash
docker exec -it student_backend sh
```

Open MongoDB shell:

```bash
docker exec -it student_db mongosh
```

---

# 🧪 Testing the Application

### Through Browser

1. Open:

```text
http://localhost:8080
```

2. Create a student.
3. Search for the student.
4. Edit the student.
5. Delete the student.

### Through API

```bash
curl http://localhost:5000/api/students
```

If data is returned, the API is functioning correctly.

---

# 🛑 Stopping the Application

If running in attached mode:

```text
CTRL + C
```

Or:

```bash
docker compose down
```

This stops and removes containers but keeps the database.

---

# 🧹 Full Cleanup

Remove containers and database:

```bash
docker compose down -v
```

Remove unused Docker resources:

```bash
docker system prune -a
```

Remove everything including volumes:

```bash
docker system prune -a --volumes
```

---

Built with Docker, Node.js, Express.js, MongoDB, Nginx, and Tailwind CSS.
