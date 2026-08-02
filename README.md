<div align="center">

# 🚀 AI Exam Notes Generator

### 🤖 AI-Powered Smart Exam Preparation Platform

Generate **AI-powered study notes**, **interactive quizzes**, **revision materials**, **diagrams**, **charts**, and **performance analytics** — all in one modern web application.

---

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![NodeJS](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-UI-38BDF8?style=for-the-badge&logo=tailwindcss)
![Redux](https://img.shields.io/badge/Redux-State-764ABC?style=for-the-badge&logo=redux)
![Gemini AI](https://img.shields.io/badge/Google-Gemini_AI-4285F4?style=for-the-badge&logo=google)
![Razorpay](https://img.shields.io/badge/Razorpay-Payments-0C2451?style=for-the-badge&logo=razorpay)

---

⭐ Generate Smart Notes  
🧠 AI Quiz Generation  
📊 Performance Analytics  
📄 PDF Export  
💳 Credit Based System  
📚 Notes History  
❤️ Favorites  
📈 AI Learning Insights

</div>

---

# 🌟 Overview

AI Exam Notes Generator is a full-stack AI-powered learning platform designed to help students prepare smarter for exams.

Instead of simply generating notes, the platform provides an end-to-end learning experience including:

- 🤖 AI-generated structured study notes
- 📝 AI-generated MCQ quizzes
- 📊 Performance analysis
- ⚠️ Weak concept identification
- 💪 Strong concept tracking
- 📄 PDF export
- 📚 Notes history
- ❤️ Favorite notes
- 💳 Credit-based AI usage
- 🔐 Secure authentication

The goal of this project is to transform traditional note generation into an intelligent exam preparation platform.

---

# ✨ Key Features

## 🤖 AI Smart Notes Generation

Generate structured, exam-focused study notes powered by **Google Gemini AI**.

### Features

- 📖 Detailed topic explanations
- 🎯 Exam-oriented content
- 📝 Markdown formatted notes
- ⚡ Instant AI generation
- 🎓 Supports multiple education levels
- 📚 Supports different exam types

---

## ⚡ Revision Mode

Need quick revision before your exam?

Enable **Revision Mode** to generate concise revision notes containing only:

- Important definitions
- Keywords
- Important formulas
- One-line concepts
- Quick revision points

Perfect for last-minute preparation.

---

## 📊 Diagram & Chart Generation

Improve understanding with AI-generated visual content.

Supported visuals include:

- Flowcharts
- Process diagrams
- Mermaid diagrams
- Bar Charts
- Pie Charts
- Line Charts

---

## 🧠 AI Quiz Generator

Convert any generated note into an intelligent quiz.

Features include:

- 10 AI-generated MCQs
- Medium difficulty questions
- Topic-wise coverage
- Detailed explanations
- Smart question generation
- No duplicate questions

---

## 📈 AI Performance Analytics

After completing a quiz, receive detailed learning analytics.

The system automatically calculates:

- ✅ Score
- 🎯 Accuracy
- 📊 Performance percentage
- 💪 Strong concepts
- ⚠ Weak concepts
- 📚 Topic analysis
- 🧠 Concept analysis
- 📝 Question review
- 💡 Answer explanations

---

## 📄 PDF Export

Export generated notes into a beautifully formatted PDF for offline study.

Perfect for:

- Printing
- Offline reading
- College submissions
- Exam preparation

---

## ❤️ Favorites

Bookmark important notes for quick access later.

Features:

- Add to favorites
- Remove from favorites
- Easy organization

---

## 📚 Notes History

Every generated note is automatically saved.

Users can:

- View previous notes
- Search notes
- Open notes again
- Generate quizzes from saved notes
- Delete notes

---

## 💳 Credit Based AI System

To optimize AI usage, the platform uses a credit system.

Each note generation consumes credits.

Users can:

- Purchase credits
- View remaining credits
- Track usage

Integrated with **Razorpay Payment Gateway**.

---

## 🔐 Secure Authentication

Authentication system includes:

- User Registration
- Login
- JWT Authentication
- Protected Routes
- Secure Cookies
- Session Management

---

# 🛠 Tech Stack

| Category | Technologies |
|-----------|--------------|
| 🎨 Frontend | React.js, React Router DOM, Redux Toolkit, Tailwind CSS, Motion (Framer Motion) |
| ⚙ Backend | Node.js, Express.js |
| 🗄 Database | MongoDB, Mongoose |
| 🤖 Artificial Intelligence | Google Gemini AI |
| 🔐 Authentication | JWT Authentication, HTTP Cookies |
| 💳 Payment Gateway | Razorpay |
| 📊 Charts | Recharts |
| 📈 Diagrams | Mermaid.js |
| 📄 PDF Export | jsPDF |
| 🔄 State Management | Redux Toolkit |
| 🌐 API Communication | Axios |
| 🎯 Notifications | Sonner |
| 🧰 Development Tools | VS Code, Git, GitHub, Postman |

---

# 🏗 System Architecture

```text
                    ┌──────────────────────┐
                    │      React.js        │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                          Axios API Calls
                               │
                    ┌──────────▼───────────┐
                    │      Express.js      │
                    │      REST APIs       │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              │                │                │
      ┌───────▼───────┐ ┌──────▼──────┐ ┌──────▼──────┐
      │   Gemini AI   │ │  MongoDB    │ │ Razorpay    │
      │ AI Generation │ │  Database   │ │ Payments    │
      └───────────────┘ └─────────────┘ └─────────────┘
```

---

# 📂 Project Structure

```text
AI-Exam-Notes-Generator
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.jsx
│   │
│   └── public/
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
│
├── README.md
│
└── package.json
```

---

# 📌 Main Modules

### 🤖 AI Notes Module

Generate intelligent exam-oriented notes using Google Gemini AI.

---

### 📝 Quiz Module

Generate AI-based quizzes from previously generated notes.

---

### 📊 Analytics Module

Analyze quiz performance with:

- Strong Concepts
- Weak Concepts
- Accuracy
- Score
- AI Feedback

---

### 💳 Payment Module

Purchase credits securely using Razorpay.

---

### 📚 Notes Management

Manage generated notes with:

- History
- Favorites
- Delete
- Search
- PDF Export

---

# 📸 Application Preview

> **A quick look at the AI Exam Notes Generator user interface.**

---

## 🏠 Home Page

Generate AI-powered exam notes with an intuitive and modern interface.

<p align="center">
  <img src="./README-assets/home.png" width="100%">
</p>

---

## 🤖 AI Notes Generator

Generate structured notes by selecting:

- Topic
- Class Level
- Exam Type
- Revision Mode
- Diagram Generation
- Chart Generation

<p align="center">
  <img src="./README-assets/notes-generator.png" width="100%">
</p>

---

## 📖 Generated AI Notes

The generated notes include:

- Structured Markdown
- Important Topics
- Revision Points
- Diagrams
- Charts
- Exam Questions

<p align="center">
  <img src="./README-assets/generated-notes.png" width="100%">
</p>

---

## 🧠 AI Quiz Generator

Generate an intelligent quiz directly from previously generated notes.

Features:

- AI Generated Questions
- Multiple Choice Questions
- Explanations
- Difficulty Level
- Topic Classification

<p align="center">
  <img src="./README-assets/quiz.png" width="100%">
</p>

---

## 📊 AI Performance Dashboard

After completing the quiz, users receive a complete learning report.

Includes:

- Score
- Accuracy
- Strong Concepts
- Weak Concepts
- Question Review
- AI Performance Analysis

<p align="center">
  <img src="./README-assets/quiz-result.png" width="100%">
</p>

---

## 📚 Notes History

Users can:

- Search Notes
- Open Notes
- Generate Quiz
- Delete Notes
- Add Favorites

<p align="center">
  <img src="./README-assets/history.png" width="100%">
</p>

---

## 💳 Pricing & Credits

Integrated Razorpay payment system.

Users can:

- Purchase Credits
- Track Remaining Credits
- Continue AI Generation

<p align="center">
  <img src="./README-assets/pricing.png" width="100%">
</p>

---

## ✅ Payment Success

Secure payment confirmation after successful transactions.

<p align="center">
  <img src="./README-assets/payment.png" width="100%">
</p>

---

# ⚙️ Installation & Setup

Follow these steps to run the project locally.

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/AI-Exam-Notes-Generator.git
```

```bash
cd AI-Exam-Notes-Generator
```

---

## 2️⃣ Install Frontend Dependencies

```bash
cd client
```

```bash
npm install
```

---

## 3️⃣ Install Backend Dependencies

```bash
cd ../server
```

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **server** directory.

```env
PORT=8000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_google_gemini_api_key

RAZORPAY_KEY_ID=your_razorpay_key

RAZORPAY_KEY_SECRET=your_razorpay_secret

CLIENT_URL=http://localhost:5173
```

---

# ▶️ Run Backend

```bash
cd server
```

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:8000
```

---

# ▶️ Run Frontend

Open another terminal.

```bash
cd client
```

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 📦 Production Build

Frontend

```bash
npm run build
```

Backend

```bash
npm start
```

---

# 🧪 Default Workflow

```text
Register/Login
      │
      ▼
Generate AI Notes
      │
      ▼
Save Notes
      │
      ▼
Generate AI Quiz
      │
      ▼
Attempt Quiz
      │
      ▼
Performance Analytics
      │
      ▼
Export PDF / Review Notes
```

---

# 📌 API Modules

| Module | Description |
|----------|-------------|
| Authentication | Login & Register |
| Notes | AI Notes Generation |
| Quiz | AI Quiz Generation |
| Analytics | Quiz Result Analysis |
| History | User Notes History |
| Favorites | Save Important Notes |
| Payment | Razorpay Integration |
| Credits | Credit Management |

---

# 🔒 Security Features

✅ JWT Authentication

✅ HTTP Only Cookies

✅ Protected Routes

✅ User-specific Notes

✅ User-specific Quiz

✅ Credit Validation

✅ Secure Payment Verification

---

# ⚡ Performance Optimizations

- AI responses are validated before saving.
- Duplicate pending quizzes are prevented.
- Notes are stored for future reuse.
- Credit system prevents unnecessary AI requests.
- Protected APIs ensure data privacy.
- Responsive UI optimized for desktop and mobile.

---

# 🌍 Why This Project?

Most AI note generators simply produce study material.

This project goes a step further by transforming AI-generated notes into a complete **exam preparation platform**.

Instead of stopping at note generation, the platform provides an intelligent learning workflow:

- Generate structured AI Notes
- Create AI-powered MCQ quizzes
- Analyze learning performance
- Identify weak concepts
- Track strong concepts
- Export notes as PDF
- Manage learning history
- Purchase AI credits securely

The objective is to make studying more interactive, personalized, and data-driven.

---

# 💡 Challenges Solved

Building this project involved solving several real-world development challenges:

- Designing structured prompts for Google Gemini AI
- Parsing AI-generated JSON safely
- Generating Mermaid diagrams dynamically
- Rendering AI-generated charts
- Creating reusable React components
- Managing authentication using JWT
- Implementing a secure credit-based system
- Integrating Razorpay payment gateway
- Building quiz analytics and performance tracking
- Maintaining a responsive UI across devices

---

# 🚀 Future Roadmap

The following features are planned for future releases:

- 📅 AI Study Planner
- 🎯 Personalized Learning Paths
- 🧠 AI Weakness Prediction
- 📖 AI Flashcards
- 🎙 Voice-based Notes
- 🌐 Multi-language Support
- 📱 Progressive Web App (PWA)
- 🏆 Leaderboards & Achievements
- 👨‍🏫 Teacher Dashboard
- 👥 Group Study Rooms
- 📅 Study Calendar Integration
- 📈 Learning Streak Tracking

---

# 📈 Project Highlights

- 🤖 AI Powered Learning Platform
- 📚 Exam-Oriented Notes Generation
- 📝 AI Quiz Generation
- 📊 Quiz Analytics Dashboard
- 📄 PDF Export
- 📚 Notes History
- ❤️ Favorites System
- 💳 Razorpay Integration
- 🔐 Secure Authentication
- ⚡ Responsive Modern UI
- 🎯 Performance Tracking
- 🧠 Weak Concept Detection

---

# 👨‍💻 About the Developer

### Almas Kureshi

Passionate Full Stack Developer focused on building scalable web applications and AI-powered solutions.

### Areas of Interest

- Artificial Intelligence
- MERN Stack Development
- Backend Engineering
- React Ecosystem
- REST APIs
- Database Design
- System Design
- Cloud Technologies

---

# 📬 Connect With Me

> Replace these links with your own.

- 💼 LinkedIn : https://linkedin.com/in/almaskureshi
- 📧 Email : almaskureshi099@gmail.com
- 💻 GitHub : https://github.com/Almas-k-13

---

# ⭐ Support

If you found this project useful,

please consider giving it a ⭐ on GitHub.

It motivates me to continue building useful open-source projects.

---

# Acknowledgements

Special thanks to the amazing technologies and communities that made this project possible.

- React.js
- Node.js
- Express.js
- MongoDB
- Google Gemini AI
- Tailwind CSS
- Redux Toolkit
- Recharts
- Mermaid.js
- Razorpay
- JWT
- Axios

---

<div align="center">

## ⭐ If you like this project, don't forget to Star the repository ⭐

Made with ❤️ by **Almas Kureshi**

</div>
