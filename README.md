# ⚡ cloudathon-project

> Real-time VM monitoring made simple — powered by **Node.js**, **React**, **Socket.IO**, and **Firebase**.

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge&logo=render)](https://cloudathon-frontend.onrender.com)

---

## 🚀 Overview

**cloudathon-project** is a full-stack application designed to monitor virtual machines in real time. It detects idle VMs, logs system events, and visualizes performance metrics through a sleek React dashboard. Built for cloud enthusiasts, DevOps engineers, and hackathon heroes.

---

## 🧰 Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-ffca28?style=flat&logo=firebase&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![Render](https://img.shields.io/badge/Deployed%20on-Render-46a2f1?style=flat&logo=render)

---

## 📸 Features

- 🔴 **Real-Time Monitoring**: Live CPU, memory, and disk usage via WebSockets  
- 💤 **Idle VM Detection**: Automatically logs idle VMs  
- 🧾 **Event Logging**: Track VM events like shutdowns, restarts, and anomalies  
- 📊 **Interactive Dashboard**: Visualize system health and activity  
- ☁️ **Firebase Integration**: Optional Firestore + Storage support  
- 🌍 **One-Click Cloud Deployment**: Deploy both frontend and backend on Render  

---

## 📁 Project Structure

cloudathon-project/
├── backend/         # Express + Socket.IO server
│   ├── routes/      # API endpoints
│   ├── models/      # MongoDB + Firestore logic
│   ├── firebase.js   # Firebase SDK config
│   └── .env         # Backend environment variables
│
├── frontend/        # React dashboard
│   ├── src/         # Components and views
│   └── .env         # Frontend environment variables
│
├── agent/           # Local VM monitoring agent
│   └── local-metrics.js
│
├── render.yaml       # Optional Render deployment config
└── README.md


---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/cloudathon-project.git
cd cloudathon-project

2. Set Up Environment Variables
Create .env files in both backend/ and frontend/ directories.

<details>
<summary>🔐 <code>backend/.env</code></summary>
PORT=10000
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
</details>

<details>
<summary>🔐 <code>frontend/.env</code></summary>
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_BACKEND_URL=https://cloudathon-backend.onrender.com
</details>


3. Install Dependencies :
      # Backend
        cd backend
        npm install

      # Frontend
        cd ../frontend
        npm install

4. Run Locally :
        # Start backend
          cd backend
          node index.js

        # Start frontend
        cd ../frontend
        npm start

☁️ Deploy to Render
🔧 Backend (Web Service)
Root Directory: backend

Build Command: npm install

Start Command: node index.js

Enable WebSockets

Add environment variables from backend/.env

🌐 Frontend (Static Site)
Root Directory: frontend

Build Command: npm run build

Publish Directory: build

Add environment variables from frontend/.env


   ## 📡 API Endpoints

| Method | Endpoint   | Description            | Payload (JSON Example)                                      |
|--------|------------|------------------------|--------------------------------------------------------------|
| GET    | `/events`  | Health check           | —                                                            |
| POST   | `/events`  | Log a new event        | `{ "vmId": "vm1", "type": "restart" }`                      |
| POST   | `/idle`    | Log idle VM data       | `{ "vmId": "vm1", "cpu": 2, "memory": 5 }`                  |
| GET    | `/vms`     | Fetch current VM status| —                                                            |


🧪 Future Enhancements
🔐 Role-based access control

📈 Historical analytics dashboard

🧭 Multi-cloud VM support (AWS, Azure, GCP)

📬 Email/Slack alerts for critical events

🤝 Contributing
Contributions are welcome! Please fork the repo, create a branch, and submit a pull request.

📄 License
MIT © 2026 Kavi

---

You can now paste this into your `README.md` file in VS Code. Let me know if you want to add a screenshot section, a deploy button, or anything else to make it even more eye-catching!

