
# MERN Social Media App

This is a full-stack responsive social media application built using the MERN stack (MongoDB, Express, React, Node.js). It includes full user authentication, profile management, post interactions (likes, comments), and a responsive design.

## Technologies Used

- Frontend: React, Material-UI (MUI)
- Backend: Node.js, Express.js
- Database: MongoDB (Cloud/Local)
- Authentication: JWT (JSON Web Token)
- Deployment: Vercel / Heroku / Localhost

## Installation Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Setup environment variables:

Create a `.env` file inside the `/backend` directory and add:

   ```env
   MONGO_URL='mongodb+srv://toledoalejandro:CNzikeVm0uY13ekk@cluster0.9tcrgze.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
   JWT_SECRET='miclaveultrasecreta'
   PORT=3001
   ```

3. Install dependencies:

   ```bash
   cd backend
   npm install

   cd ../frontend
   npm install
   ```

4. Run the development servers:

   ```bash
   # Backend
   cd backend
   npm run dev

   # Frontend (in another terminal)
   cd frontend
   npm start
   ```

## Features

- Register and login users with JWT authentication
- Create, update, delete, and like posts
- Comment on posts
- Follow/unfollow friends
- Responsive UI design (mobile + desktop support)

## Project Structure

```
/backend
  ├── controllers/
  ├── models/
  ├── routes/
  └── server.js

/frontend
  ├── components/
  ├── pages/
  ├── states/ (Redux or Context API)
  └── App.jsx
```

## Deployment

To build the frontend for production:

```bash
cd frontend
npm run build
```

Host the `/build` directory with a static server and deploy the backend separately. Set environment variables accordingly.

## Initial Commit Message

```
Initial commit: fullstack MERN app with authentication and responsive layout
```

## Credits

Based on the YouTube tutorial:
"Build a COMPLETE Fullstack Responsive MERN App with Auth..." by Career With Gaurav
https://youtu.be/K8YELRmUb5o
