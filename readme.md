
# Project Management Dashboard

![Project Banner](https://via.placeholder.com/1200x400)  
*A modern project management tool with drag-and-drop functionality, criticality levels, and theme support.*

## 🌟 Features

### Frontend
- **Drag-and-Drop Tasks**: Intuitive task management using `react-dnd`.
- **Criticality Levels**: Visual representation of task urgency for effective prioritization.
- **Responsive Design**: Optimized for all devices, ensuring usability on mobile and desktop.
- **Theme Switching**: Toggle between **Dark Mode** and **Light Mode**.

### Backend
- **Robust Architecture**: Built with **Express.js** for efficient server-side logic.
- **Enhanced Security**: Secured using **Helmet.js**.
- **Database Management**: Powered by **PostgreSQL** with **Prisma ORM** for database operations.
- **Database Monitoring**: Integrated with **PgAdmin** for easy monitoring.

### Additional Highlights
- **Data Grids**: Integrated **Material UI Data Grid** for handling and displaying complex data.
- **State Management**: Simplified with **Redux Toolkit**.
- **Data Fetching**: Efficient querying with **Redux Toolkit Query**.

---

## 🛠 Tech Stack

### **Frontend**
- **Framework**: Next.js
- **Styling**: Tailwind CSS, Material UI
- **Drag-and-Drop**: `react-dnd`
- **State Management**: Redux Toolkit
- **Charts**: Recharts for data visualization
- **Task Scheduling**: `@wamra/gantt-task-react`

### **Backend**
- **Framework**: Node.js with Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Security**: Helmet.js
- **Utilities**: Axios for API calls, Dotenv for environment variables

---

## 🚀 Installation and Setup

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL
- PgAdmin (optional)
- AWS Account for Lambda and Cognito services

### Steps to Get Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/project-management-dashboard.git
   cd project-management-dashboard


2. **Install Dependencies**
   ```bash
   # For backend
   cd server
   npm install

   # For frontend
   cd client
   npm install
   ```

3. **Environment Variables**
   Create `.env` files in both `server` and `client` directories with the following:
   ```env
   # Backend (server/.env)
   DATABASE_URL=your_postgresql_connection_string
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   COGNITO_USER_POOL_ID=your_cognito_user_pool_id
   COGNITO_CLIENT_ID=your_cognito_client_id

   # Frontend (client/.env)
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **Run Migrations**
   ```bash
   cd server
   npx prisma migrate dev
   ```

5. **Start the Application**
   ```bash
   # Start backend
   cd server
   npm run dev

   # Start frontend
   cd client
   npm run dev
   ```

---



## 📂 Project Structure

### Backend
- **Framework**: Node.js
- **Main Tools**: Express, Prisma, PostgreSQL
- **Utilities**: Helmet, Morgan

### Frontend
- **Framework**: Next.js
- **Libraries**: Tailwind CSS, Material UI, Redux Toolkit, Recharts, `react-dnd`

---

## 🔧 Scripts

### Backend (`server/package.json`)
- **Start**: Builds and starts the server:
  ```bash
  npm run start
  ```
- **Development**: Runs TypeScript watcher and nodemon:
  ```bash
  npm run dev
  ```
- **Seed Database**: Runs the database seeding script:
  ```bash
  npm run seed
  ```

### Frontend (`client/package.json`)
- **Development**: Starts the Next.js development server:
  ```bash
  npm run dev
  ```
- **Build**: Compiles the application for production:
  ```bash
  npm run build
  ```
- **Start**: Starts the compiled app in production mode:
  ```bash
  npm run start
  ```

---

## 🛡 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 🙏 Acknowledgements
- **Prisma**: For simplifying database management.
- **Tailwind CSS**: For elegant and responsive design.
- **AWS Services**: For reliable serverless operations.
- **Redux Toolkit**: For state management.

---

## 📸 Screenshots

### Light Mode
![Light Mode](https://via.placeholder.com/600x400)

### Dark Mode
![Dark Mode](https://via.placeholder.com/600x400)

*(Add your actual screenshots here.)*
