# LegalConnect AI - Legal Tech Platform

A modern, responsive website for a legal tech platform that uses Omnidimension Voice AI to connect users with the right lawyers based on their legal issues.

## Features

### Core Functionality
- **Voice AI + Chatbot Toggle**: Users can choose between voice assistant or text-based chatbot
- **"Call Now" Functionality**: Initiate or schedule live calls between clients and lawyers
- **Lawyer Directory**: Browse verified lawyers with detailed profiles
- **Smart Matching**: AI-powered lawyer matching based on legal issues
- **Consultation Booking**: Automated scheduling system

### Technical Features
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Modern UI/UX**: Professional design with smooth animations
- **AI Integration**: Embedded Omnidimension Voice AI widget
- **Backend API**: Express.js server for data management
- **Type Safety**: Full TypeScript implementation

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Lucide React for icons

### Backend
- Node.js with Express
- CORS enabled for cross-origin requests
- RESTful API design
- Mock data for development

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Start the backend server (in a separate terminal):
```bash
npm run server
```

### Environment Setup

The application includes the Omnidimension Voice AI widget automatically. The script is embedded in the HTML:

```html
<script id="omnidimension-web-widget" async src="https://backend.omnidim.io/web_widget.js?secret_key=5ade362ec223d400ebf5e606ba911343"></script>
```

## API Endpoints

### Lawyers
- `GET /api/lawyers` - Get all lawyers with optional filters
- `GET /api/lawyers/:id` - Get specific lawyer details
- `GET /api/lawyers/:id/availability` - Get lawyer availability

### AI Consultation
- `POST /api/ai-consultation` - Process AI consultation requests

### Bookings
- `POST /api/consultations` - Book a consultation

### Health Check
- `GET /api/health` - Server health status

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── AIAssistant.tsx
│   └── LawyerCard.tsx
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── LawyersPage.tsx
│   └── LawyerProfile.tsx
├── data/               # Mock data
│   └── mockLawyers.ts
├── types/              # TypeScript types
│   └── lawyer.ts
└── App.tsx             # Main app component

server/
└── index.js            # Express backend server
```

## Design System

### Colors
- **Primary**: Blue (#1E40AF) - Trust and professionalism
- **Secondary**: Teal (#0F766E) - Growth and stability
- **Accent**: Orange (#D97706) - Call-to-action and energy

### Typography
- **Font**: Inter (system fallback)
- **Hierarchy**: Clear heading scales (text-4xl to text-sm)
- **Line Height**: 150% for body text, 120% for headings

### Spacing
- **System**: 8px base unit
- **Responsive**: Mobile-first breakpoints
- **Layout**: CSS Grid and Flexbox

## Features in Detail

### Voice AI Integration
- Toggle between voice and text input
- Real-time voice recognition
- Omnidimension AI widget embedded
- Natural language processing for legal queries

### Lawyer Matching
- AI-powered recommendations
- Filter by specialization, location, rating
- Real-time availability checking
- Instant consultation booking

### Professional Profiles
- Comprehensive lawyer information
- Education and certifications
- Client reviews and ratings
- Direct contact options

## Development

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run server` - Start backend server
- `npm run lint` - Run ESLint

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Consistent file organization
- Component modularity

## Production Deployment

1. Build the frontend:
```bash
npm run build
```

2. Deploy backend server to your hosting platform
3. Update API endpoints in frontend configuration
4. Ensure CORS settings are properly configured

## License

This project is private and proprietary.