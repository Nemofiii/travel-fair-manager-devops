# Travel Log & Task Management System

A full-stack application for managing travel records and daily tasks, built with React frontend and Node.js/Express backend with MongoDB database.

## Project Structure

```
├── frontend/           # React frontend application
│   ├── src/
│   ├── package.json
│   └── README.md
├── backend/            # Node.js/Express backend API
│   ├── src/
│   ├── package.json
│   └── README.md
└── README.md          # This file
```

## Features

### Frontend
- Modern React 18 with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Shadcn/ui component library
- Responsive design
- PDF export functionality

### Backend
- Node.js/Express REST API
- MongoDB database integration
- Mongoose ODM
- CORS enabled
- Rate limiting
- Input validation
- Error handling

### Database
- MongoDB for data persistence
- Mongoose schemas for data validation
- Indexed queries for performance

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/travel-log
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

4. Start the backend server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

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

## Database Schema

### TravelRecord
- `date` (String): Date of travel
- `customerName` (String): Customer name
- `distance` (Number): Distance traveled
- `petrolAmount` (Number): Petrol amount
- `totalFare` (Number): Total fare
- `month` (String): Month in YYYY-MM format

### Task
- `date` (String): Task date
- `name` (String): Task name
- `time` (String): Task time
- `completed` (Boolean): Completion status

## Development

### Backend Development
- Uses nodemon for auto-restart during development
- Environment-based configuration
- Comprehensive error handling
- CORS configured for frontend communication

### Frontend Development
- Hot module replacement with Vite
- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for styling

## Production Deployment

### Backend
1. Set `NODE_ENV=production`
2. Configure production MongoDB URI
3. Set appropriate CORS origins
4. Use process manager like PM2

### Frontend
1. Build the application: `npm run build`
2. Serve static files with a web server
3. Configure API URL for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License