# MERN Blog Application

A full-stack blog application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, CRUD operations, image uploads, comments, and advanced search functionality.

## 🚀 Features

### Backend (Express.js + MongoDB)
- **RESTful API** with Express.js
- **MongoDB** database with Mongoose ODM
- **User Authentication** with JWT tokens
- **File Upload** support for images using Multer
- **Input Validation** with express-validator
- **Password Hashing** with bcryptjs
- **Role-based Authorization** (User, Admin, Moderator)
- **Advanced Search** functionality
- **Pagination** for posts and comments
- **Error Handling** middleware
- **Security** with helmet and rate limiting

### Frontend (React.js)
- **Modern UI** with Tailwind CSS
- **Responsive Design** for all devices
- **Form Validation** with react-hook-form
- **State Management** with React Context
- **Protected Routes** for authenticated users
- **Real-time Notifications** with react-hot-toast
- **Image Upload** with preview
- **Rich Text Editor** for post content
- **Search and Filter** functionality
- **Pagination** for posts

### Core Features
- ✅ **User Registration & Login**
- ✅ **Create, Read, Update, Delete Posts**
- ✅ **Category Management**
- ✅ **Tag System**
- ✅ **Comments on Posts**
- ✅ **Image Uploads**
- ✅ **Search Functionality**
- ✅ **User Profiles**
- ✅ **Admin Dashboard**
- ✅ **Responsive Design**

## 📁 Project Structure

```
mern-blog/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context providers
│   │   ├── services/       # API services
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Entry point
│   ├── package.json        # Client dependencies
│   └── vite.config.js      # Vite configuration
├── server/                 # Express.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   ├── uploads/            # Uploaded files
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
```

## 🛠️ Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Tokens
- **bcryptjs** - Password hashing
- **Multer** - File upload middleware
- **express-validator** - Input validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form handling
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons
- **Vite** - Build tool

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern-blog
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**

   Create a `.env` file in the server directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mern-blog
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   MAX_FILE_SIZE=5242880
   UPLOAD_PATH=uploads
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

5. **Start the development servers**

   **Start the backend server:**
   ```bash
   cd server
   npm run dev
   ```

   **Start the frontend development server:**
   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Posts
- `GET /api/posts` - Get all posts (with pagination)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/comments` - Add comment
- `GET /api/posts/search` - Search posts
- `GET /api/posts/my-posts` - Get user's posts

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (Admin only)
- `PUT /api/categories/:id` - Update category (Admin only)
- `DELETE /api/categories/:id` - Delete category (Admin only)
- `GET /api/categories/:id/posts` - Get posts by category

## 🔐 Authentication & Authorization

### User Roles
- **User**: Can create, edit, and delete their own posts
- **Admin**: Full access to all features including category management
- **Moderator**: Can moderate content and manage posts

### Protected Routes
- Post creation, editing, and deletion
- User profile management
- Category management (Admin only)

## 🎨 UI Components

### Reusable Components
- **Layout** - Main application layout with navigation
- **PostCard** - Display post previews
- **LoadingSpinner** - Loading state indicator
- **ProtectedRoute** - Route protection wrapper

### Pages
- **Home** - Landing page with posts and search
- **Login/Register** - Authentication pages
- **CreatePost/EditPost** - Post management
- **PostDetail** - Individual post view with comments
- **Profile** - User profile management
- **MyPosts** - User's posts dashboard

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables for production
2. Configure MongoDB connection
3. Set up file upload directory
4. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or GitHub Pages

## 🔧 Configuration

### Database Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Update the `MONGODB_URI` in your environment variables
3. The application will automatically create collections

### File Upload
- Images are stored in the `server/uploads` directory
- Maximum file size: 5MB
- Supported formats: JPEG, PNG, GIF, WebP

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**David** - Full Stack Developer

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

---

**Happy Coding! 🚀** 