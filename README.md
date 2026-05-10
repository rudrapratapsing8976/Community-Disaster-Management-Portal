# Community Disaster Management and Reporting Portal

A full-stack web application for efficient coordination during emergencies. Citizens and authorities can register, report incidents, track disaster relief efforts, and access updates based on location and emergency type.

## Features

- **User Registration & Authentication**: Separate registration for citizens and authorities with admin validation
- **Incident Reporting**: Citizens can report emergencies with location, type, and severity details
- **Admin Dashboard**: Administrators can validate users and manage incidents
- **Relief Effort Tracking**: Authorities can create and manage relief efforts with real-time updates
- **Location & Type-based Filtering**: Filter incidents and relief efforts by location and emergency type
- **Real-time Updates**: Track status changes and relief effort progress

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```
   
   Or install separately:
   ```bash
   # Root dependencies
   npm install
   
   # Server dependencies
   cd server
   npm install
   
   # Client dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/disaster-management
   JWT_SECRET=your-secret-key-change-in-production
   ```
   
   For the client, create a `.env` file in the `client` directory (optional):
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system. If using MongoDB Atlas, update the `MONGODB_URI` in the `.env` file.

5. **Run the application**
   
   From the root directory:
   ```bash
   npm run dev
   ```
   
   This will start both the server (port 5000) and client (port 3000).
   
   Or run separately:
   ```bash
   # Terminal 1 - Start server
   cd server
   npm start
   
   # Terminal 2 - Start client
   cd client
   npm start
   ```

6. **Access the application**
   
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## Creating an Admin User

To create an admin user, use the provided script:

```bash
cd server
npm run create-admin [email] [password] [name]
```

Example:
```bash
npm run create-admin admin@example.com admin123 "Admin User"
```

If no arguments are provided, it will use default values:
- Email: admin@example.com
- Password: admin123
- Name: Admin User

**Important**: Change the default password after first login!

## User Roles

- **Citizen**: Can report incidents and view relief efforts
- **Authority**: Can report incidents, create relief efforts, and update incident status
- **Admin**: Full access including user validation and management

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Incidents
- `GET /api/incidents` - Get all incidents (with filters)
- `POST /api/incidents` - Create new incident (protected)
- `GET /api/incidents/:id` - Get incident by ID (protected)
- `PUT /api/incidents/:id` - Update incident (authority/admin only)
- `DELETE /api/incidents/:id` - Delete incident (protected)

### Relief Efforts
- `GET /api/relief` - Get all relief efforts (with filters)
- `POST /api/relief` - Create relief effort (authority/admin only)
- `GET /api/relief/:id` - Get relief effort by ID (protected)
- `PUT /api/relief/:id` - Update relief effort (authority/admin only)
- `POST /api/relief/:id/updates` - Add update to relief effort (authority/admin only)

### Admin
- `GET /api/admin/dashboard` - Get dashboard statistics (admin only)
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/users/pending` - Get pending users (admin only)
- `PUT /api/admin/users/:id/verify` - Verify user (admin only)
- `PUT /api/admin/users/:id/reject` - Reject user (admin only)

## Project Structure

```
project/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context (Auth)
│   │   ├── pages/         # Page components
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   ├── package.json
│   └── tailwind.config.js
├── server/                 # Node.js backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   ├── index.js           # Server entry point
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## Emergency Types Supported

- Flood
- Earthquake
- Fire
- Storm
- Medical Emergency
- Other

## Development

- The server uses Express.js with MongoDB/Mongoose
- The client uses Create React App with Tailwind CSS
- Authentication is handled via JWT tokens stored in localStorage
- Protected routes require valid authentication tokens

## Security Notes

- Change the `JWT_SECRET` in production
- Use environment variables for sensitive data
- Implement rate limiting for production
- Add input validation and sanitization
- Use HTTPS in production

## Deployment (Render + MongoDB Atlas)

This app is wired for **one Render Web Service**: Express serves the API and the built React app from `client/build` when `NODE_ENV=production`. The blueprint is in `render.yaml`.

1. Create a **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)** cluster and note the connection string (use “Connect your application”; allow `0.0.0.0/0` in Network Access while testing Render).
2. In **[Render](https://render.com)**, open **Blueprints**, connect the **Community-Disaster-Management-Portal** Git repository, and point Render at **`render.yaml`**.
3. When prompted, set **`MONGODB_URI`** to your Atlas URI. **`JWT_SECRET`** can be auto-generated; **`REACT_APP_API_URL=/api`** is already set for same-origin API calls.
4. After the first deploy, create an admin user with Render **Shell** (or run the script locally against Atlas): `cd server && npm run create-admin ...`

## License

This project is open source and available for educational purposes.

