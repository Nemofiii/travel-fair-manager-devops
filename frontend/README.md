# Travel Log Frontend

A React-based frontend application for the Travel Log and Task Management system, built with Vite, TypeScript, and Tailwind CSS.

## Features

- Modern React 18 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Shadcn/ui components
- React Hook Form with Zod validation
- React Query for data fetching
- Responsive design

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Environment Variables

- `VITE_API_URL`: Backend API URL (default: http://localhost:5000/api)

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Shadcn/ui components
│   ├── TaskForm.tsx    # Task creation form
│   ├── TasksList.tsx   # Task list and management
│   ├── TravelRecordForm.tsx # Travel record form
│   └── MonthlyRecordsList.tsx # Records display
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
│   ├── api.ts          # API service functions
│   ├── storage.ts      # Data persistence layer
│   ├── pdfExport.ts    # PDF export functionality
│   └── utils.ts        # General utilities
└── pages/              # Page components
```

## API Integration

The frontend communicates with the backend API through the `api.ts` service layer. All data operations (CRUD) are handled asynchronously with proper error handling and user feedback.
