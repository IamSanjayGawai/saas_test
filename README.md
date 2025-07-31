# Todo API - Node.js & MongoDB

A RESTful API for todo management with user authentication built with Node.js, Express, and MongoDB.

## 🚀 Features

- **User Authentication**
  - User registration with email validation
  - Secure login with JWT tokens
  - Password hashing with bcrypt
  - Protected routes with middleware

- **Todo Management**
  - Create, read, update, delete todos
  - User-specific todos (users can only access their own todos)
  - Todo statistics
  - Pagination and filtering
  - Search and sorting capabilities

- **Security & Validation**
  - Input validation with express-validator
  - JWT token authentication
  - Password strength requirements
  - CORS enabled
  - Error handling middleware

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (cloud database)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Update the environment variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.mongodb.net/todo-api?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

4. **Database Setup**
   - Create a free MongoDB Atlas account at https://www.mongodb.com/atlas
   - Create a new cluster and database
   - Get your connection string and update MONGODB_URI in .env
   - Make sure to whitelist your IP address in Atlas Network Access

5. **Run the application**
   
   **Development mode:**
   ```bash
   npm run dev
   ```
   
   **Production mode:**
   ```bash
   npm start
   ```

## 📊 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/profile` | Get user profile | Private |

### Todo Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/todos` | Create a new todo | Private |
| GET | `/api/todos` | Get all user todos | Private |
| GET | `/api/todos/stats` | Get todo statistics | Private |
| GET | `/api/todos/:id` | Get single todo | Private |
| PUT | `/api/todos/:id` | Update todo | Private |
| DELETE | `/api/todos/:id` | Delete todo | Private |

## 🔧 API Usage Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

### Login User
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

### Create Todo
```bash
POST /api/todos
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "title": "Learn Node.js",
  "description": "Complete the Node.js tutorial",
  "completed": false
}
```

### Get Todos with Filtering
```bash
GET /api/todos?completed=false&page=1&limit=5&sortBy=createdAt&sortOrder=desc
Authorization: Bearer <your-jwt-token>
```

## 🏗️ Project Structure

```
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── todoController.js    # Todo CRUD operations
├── middleware/
│   └── auth.js             # JWT authentication middleware
├── models/
│   ├── User.js             # User model schema
│   └── Todo.js             # Todo model schema
├── routes/
│   ├── auth.js             # Authentication routes
│   └── todos.js            # Todo routes
├── utils/
│   └── validation.js       # Input validation rules
├── .env                    # Environment variables
├── server.js               # Express server setup
└── package.json           # Dependencies and scripts
```

## 🛡️ Security Features

- Password hashing with bcrypt (salt rounds: 12)
- JWT token authentication
- Input validation and sanitization
- CORS protection
- Environment variable protection
- Error handling without sensitive data exposure

## 📝 Validation Rules

### User Registration
- Name: 2-50 characters
- Email: Valid email format
- Password: Minimum 6 characters, must contain uppercase, lowercase, and number

### Todo Creation/Update
- Title: Required, maximum 100 characters
- Description: Optional, maximum 500 characters
- Completed: Boolean value

## 🚨 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Please enter a valid email"
    }
  ]
}
```

## 🧪 Testing

You can test the API using:
- Postman (see Postman collection below)
- curl commands
- Any HTTP client

## 📋 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/todo-api` |
| `JWT_SECRET` | JWT signing secret | `your-secret-key` |
| `JWT_EXPIRE` | Token expiration time | `7d` |
| `NODE_ENV` | Environment mode | `development` |

## 🎯 Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Todo categories and tags
- [ ] File attachments for todos
- [ ] Real-time notifications
- [ ] API rate limiting
- [ ] Comprehensive test suite
- [ ] API documentation with Swagger

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.