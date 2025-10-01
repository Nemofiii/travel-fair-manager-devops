# Travel Log Backend API

A Node.js/Express backend API for the Travel Log and Task Management application with MongoDB database integration.

## Features

- RESTful API for travel records and tasks
- MongoDB database integration
- CORS enabled for frontend communication
- Rate limiting for security
- Input validation and error handling
- Environment-based configuration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/travel-log
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

3. Start the server:
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

## API Endpoints

### Travel Records
- `GET /api/travel-records` - Get all travel records
- `GET /api/travel-records/months` - Get available months
- `GET /api/travel-records/month/:month` - Get records by month
- `POST /api/travel-records` - Create a new travel record
- `DELETE /api/travel-records/:id` - Delete a travel record

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/dates` - Get all task dates
- `GET /api/tasks/date/:date` - Get tasks by date
- `POST /api/tasks` - Create a new task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion
- `DELETE /api/tasks/:id` - Delete a task

### Health Check
- `GET /api/health` - Server health status

## Database Schema

### TravelRecord
- `date` (String): Date of travel
- `customerName` (String): Customer name
- `distance` (Number): Distance traveled
- `petrolAmount` (Number): Petrol amount
- `totalFare` (Number): Total fare
- `month` (String): Month in YYYY-MM format
- `createdAt` (Date): Record creation timestamp
- `updatedAt` (Date): Record update timestamp

### Task
- `date` (String): Task date
- `name` (String): Task name
- `time` (String): Task time
- `completed` (Boolean): Completion status
- `createdAt` (Date): Task creation timestamp
- `updatedAt` (Date): Task update timestamp
