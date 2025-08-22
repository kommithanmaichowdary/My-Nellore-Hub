# My Nellore Hub

A full-stack web application for exploring and managing businesses, sectors, and services in Nellore. Built with React (Vite, TypeScript, TailwindCSS) for the frontend and Spring Boot for the backend.

---

## Project Structure

```
Project-Nellore-3/
  Project-Nellore/
    project/           # Frontend (React)
    spring-backend/    # Backend (Spring Boot)
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```sh
git clone https://github.com/kommithanmaichowdary/My-Nellore-Hub.git
cd My-Nellore-Hub/Project-Nellore
```

---

## 🖥️ Frontend (React)

### Setup & Run
```sh
cd project
npm install           # Install dependencies
npm run dev           # Start development server
```

- The app will run on [http://localhost:5173](http://localhost:5173) by default.
- To build for production: `npm run build`
- To preview production build: `npm run preview`

#### Environment Variables
- If you use any API keys or secrets, create a `.env` file in the `project/` directory. Example:
  ```env
  VITE_API_URL=http://localhost:8080
  ```

---

## 🛠️ Backend (Spring Boot)

### Setup & Run
```sh
cd spring-backend/backend
./mvnw spring-boot:run      # On Linux/Mac
mvn spring-boot:run    # On Windows
```

- The backend will run on [http://localhost:8080](http://localhost:8080) by default.
- Make sure you have Java 17+ installed.
- To build: `./mvnw clean package` (or `mvnw.cmd clean package` on Windows)

#### Database & Configuration
- The backend uses PostgreSQL by default. Configure your database connection in `src/main/resources/application.properties`.
- Example:
  ```properties
  spring.datasource.url=jdbc:postgresql://localhost:5432/your_db
  spring.datasource.username=your_user
  spring.datasource.password=your_password
  ```

---

## 📦 Dependencies

### Frontend
- React, React DOM, React Router DOM
- TailwindCSS, Vite, TypeScript

### Backend
- Spring Boot (Web, Data JPA, Security, OAuth2)
- PostgreSQL

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License
This project is licensed under the MIT License. 
