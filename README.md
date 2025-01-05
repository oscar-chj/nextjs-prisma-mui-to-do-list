# Next.js Prisma MUI To-Do List App

This project is a simple to-do list application built with:
- **Next.js** for both frontend and backend handling
- **Prisma** for database interaction (PostgreSQL or any supported database)
- **Material-UI (MUI)** for the UI components

## 📝 Features
- **Add, Edit, Remove, and Toggle Completion** of tasks
- Uses **Prisma** as an ORM to interact with the database (I use PostgreSQL)
- **Material UI** for a modern and clean user interface
- Tasks are **persisted** in the database

## 📁 File Structure
```
.
├── prisma/
│   └── schema.prisma  # Prisma schema file
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── tasks/
│   │   │       └── [id].js  # API route handling CRUD operations
│   │   └── page.js  # Main page with task management logic
├── .env  # Environment variables for database connection
├── README.md  # Project documentation
└── package.json  # Project dependencies and scripts
```

## ⚙️ Setup Instructions
### 1. Clone the Repository
```bash
git clone https://github.com/oscar-chj/nextjs-prisma-mui-to-do-list.git
cd nextjs-prisma-mui-to-do-list
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add your database connection string, replace 'user' and 'password' with your database username and password:
```
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
```

### 4. Run Database Migrations
```bash
npx prisma db push
```

### 5. Run the Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## 🔧 API Routes
| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| GET    | /api/tasks     | Fetch all tasks          |
| POST   | /api/tasks     | Add a new task           |
| PUT    | /api/tasks/:id | Update a specific task    |
| DELETE | /api/tasks/:id | Delete a specific task    |

## 📚 Dependencies
- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Material-UI](https://mui.com/)

## 🎨 Styling
This project uses Material-UI for styling.