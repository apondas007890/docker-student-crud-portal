🎓 Global Institute - Dockerized Student Information System
A premium, localized, full-stack Student CRUD application engineered completely within isolated Docker environments. This architecture allows for a seamless development workflow without installing runtime dependencies like Node.js, NPM, or MongoDB on the local host operating system.

🚀 Key Features
Full CRUD Operations: Seamlessly Add, Edit, Delete, and Search student profiles.

Instant Dynamic Registry Query: Multi-parameter search filter (find records instantly by Institutional ID or Name).

Zero Host Contamination: The database, API server, and web client spin up natively inside lightweight Linux containers.

Premium User Interface: Styled with Tailwind CSS for an international institution aesthetic.

Hot-Reload Dev Workspace: Local directory syncing automatically shifts code modifications directly into active running container spaces.

📸 System Preview
🛠️ Project Ecosystem
Frontend Engine: HTML5 / Tailwind CSS (via CDN) / Vanilla ES6 JavaScript

Web Server Gateway: Nginx (Alpine Linux Distribution)

Backend Framework: Node.js / Express API Runtime

Database Management: MongoDB 6.0 Non-Relational Database

Orchestration Layer: Docker & Docker Compose

📂 Repository Architecture
Plaintext
student-crud-app/
├── backend/
│   ├── Dockerfile          # Node.js alpine execution script environment
│   ├── server.js           # REST API routing logic & Mongoose schema design
│   └── package.json        # Node manifest mapping package dependencies
├── frontend/
│   ├── Dockerfile          # Nginx public routing image build blueprint
│   ├── index.html          # Dynamic Portal Layout Panel UI
│   └── app.js              # Fetch client communicating with API container
└── docker-compose.yml      # Network orchestration layer config file
🏁 Quick Start Commands
Prerequisites
Ensure you have Docker Engine and Docker Compose set up on your host machine (fully tested on Fedora Linux configurations).

1. Launching the Cluster
Navigate into your root workspace directory and fire up the containers:

Bash
docker compose up --build
Once initialized, open your browser and navigate to: http://localhost:8080

The Backend REST API server monitors entries at: http://localhost:5000/api/students

2. Tearing Down Services
To stop running instances securely without data corruption, execute this command inside your terminal:

Bash
docker compose down
(Your internal student data is continuously persisted inside a named Docker volume mongo_data even when services are powered down).