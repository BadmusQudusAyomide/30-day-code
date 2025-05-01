# 30 days Submission Platform By Vickyjay Built By SnapDragon Team🚀

**30 days Submission Platform By Vickyjay Built By SnapDragon Team** is a 30-day project submission challenge platform where developers commit to building and submitting one project every day for 30 days. This platform enables users to submit daily projects, track their streaks, get scored and ranked on a leaderboard, and view projects by others. Admins can rate submissions, manage users, and keep the challenge fair and exciting.



---

## 🌐 Live Demo

> [Visit the Live Platform](https://30-day-code-w46x.vercel.app)  

---



## 🧑‍💻 Team

[Team  Leader](https://github.com/niklaus699)  
[Frontend](https://github.com/BadmusQudusAyomide)  
[Backend](https://github.com/Dannys-notepad)  
[Backend](https://github.com/JoyDTechGirl)  




## 🛠️ Features

### 👤 Users
- Signup/Login and Profile management
- Daily project submissions (title, links, image, description, tools used, etc.)
- Streak and quality scoring system (up to 6 points daily)
- View all submissions (own)
- Public leaderboard with ranking

### 🧑‍💼 Admin
- Secure login/signup for admins
- Dashboard to view and rate all daily submissions
- Score each project:
  - 7 points for quality
  - 3 points for streak
- View all users and their submission history
- Expandable user profiles

### 📋 Project Submission
- Project Day (1–30)
- Live Link
- GitHub Repo
- Optional Screenshot
- Description
- Tools/Frameworks
- Programming Languages

---

## 📁 Project Structure

```bash
zubmizion/
├── client/               # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       ├── utils/
│       └── App.jsx
├── server/               # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
├── .env
├── README.md
└── package.json

```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/BadmusQudusAyomide/30-day-code.git
cd 30day
```

---

### 2. Setup Backend

```bash
cd server
npm install
```

#### Create `.env` in `/server`

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

```bash
npm run dev
```

---

### 3. Setup Frontend

```bash
cd ../client
npm install
```

#### Create `.env` in `/client`

```
REACT_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

---

## 📦 API Endpoints

### Auth

- `POST /api/auth/register` – Register user
- `POST /api/auth/login` – Login user/admin

### Projects

- `POST /api/projects/submit`
- `GET /api/projects/day/:day`
- `GET /api/projects/user/:userId`
- `GET /api/projects` – Get all submissions

### Admin

- `GET /api/admin/users`
- `PATCH /api/admin/score/:projectId` – Rate submission

---

## 🧮 Scoring System

| Metric       | Max Points |
|--------------|------------|
| Quality      | 5 pts      |

## 🧮   Leaderboard Scoring System

5 point from Quality + 1 

That mean 6 point per project
(We can eplain Better)
Admins rate submissions manually daily.

---

## 🗺️ Roadmap

- [x] User registration/login
- [x] Daily project submission
- [x] Admin panel for scoring
- [x] Leaderboard with streak tracking


---

## 🛡️ Security

- JWT authentication
- Protected admin routes
- Validations on all forms
- HTTPS (on deployment)

---



## 🧑‍💻 Contributing

1. Fork this repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request 🎉

---

## 📃 License

MIT License  
Feel free to use, share, and modify with credit.

---

## 🙌 Acknowledgements

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/)

---

## 💬 Contact

**Made with ❤️ by Badmus Qudus Ayomide**  
GitHub: [@qudusayomide](https://github.com/qudusayomide)

---
