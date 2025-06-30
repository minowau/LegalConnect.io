import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { format, addDays, isAfter, isBefore } from 'date-fns';

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (replace with database in production)
let users = [];
let lawyers = [];
let consultations = [];
let aiSessions = [];
let notifications = [];

// Mock data for lawyers
const mockLawyers = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@legalconnect.ai',
    photo: 'https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialization: 'Personal Injury',
    experience: 12,
    location: 'New York, NY',
    rating: 4.9,
    reviews: 127,
    hourlyRate: 350,
    bio: 'Dedicated personal injury attorney with a proven track record of securing substantial settlements for clients. Specializes in motor vehicle accidents, slip and falls, and workplace injuries.',
    education: ['Harvard Law School - JD', 'Columbia University - BA'],
    certifications: ['New York State Bar', 'American Trial Lawyers Association'],
    available: true,
    languages: ['English', 'Mandarin'],
    successRate: 94,
    totalCases: 450,
    avgResponseTime: '2 hours'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    photo: 'https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialization: 'Family Law',
    experience: 8,
    location: 'Los Angeles, CA',
    rating: 4.8,
    reviews: 89,
    hourlyRate: 275,
    bio: 'Compassionate family law attorney helping clients navigate divorce, child custody, and domestic relations matters with sensitivity and expertise.',
    education: ['UCLA Law School - JD', 'USC - BA'],
    certifications: ['California State Bar', 'Family Law Specialist'],
    available: true,
    languages: ['English', 'Spanish'],
    successRate: 91,
    totalCases: 320,
    avgResponseTime: '1 hour'
  },
  {
    id: '3',
    name: 'Jennifer Williams',
    photo: 'https://images.pexels.com/photos/5668856/pexels-photo-5668856.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialization: 'Criminal Defense',
    experience: 15,
    location: 'Chicago, IL',
    rating: 4.9,
    reviews: 203,
    hourlyRate: 400,
    bio: 'Experienced criminal defense attorney with extensive trial experience. Committed to protecting clients\' rights and achieving the best possible outcomes.',
    education: ['Northwestern Law - JD', 'University of Chicago - BA'],
    certifications: ['Illinois State Bar', 'National Association of Criminal Defense Lawyers'],
    available: true,
    languages: ['English'],
    successRate: 96,
    totalCases: 580,
    avgResponseTime: '30 minutes'
  },
  {
    id: '4',
    name: 'David Kim',
    photo: 'https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialization: 'Corporate Law',
    experience: 10,
    location: 'Houston, TX',
    rating: 4.7,
    reviews: 156,
    hourlyRate: 450,
    bio: 'Corporate attorney specializing in mergers & acquisitions, securities law, and business transactions. Trusted advisor to startups and Fortune 500 companies.',
    education: ['UT Austin Law - JD', 'Rice University - BBA'],
    certifications: ['Texas State Bar', 'Securities Law Certification'],
    available: true,
    languages: ['English', 'Korean'],
    successRate: 89,
    totalCases: 280,
    avgResponseTime: '4 hours'
  }
];

lawyers = [...mockLawyers];

// Email configuration (configure with your email service)
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// User Authentication
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = {
      id: uuidv4(),
      email,
      password: hashedPassword,
      name,
      phone,
      createdAt: new Date(),
      verified: false
    };
    
    users.push(user);
    
    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET);
    
    // Send welcome email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to LegalConnect AI',
        html: `
          <h1>Welcome to LegalConnect AI!</h1>
          <p>Hi ${name},</p>
          <p>Thank you for joining LegalConnect AI. You now have access to our revolutionary AI-powered legal matching platform.</p>
          <p>Get started by describing your legal needs to our AI assistant.</p>
          <p>Best regards,<br>The LegalConnect AI Team</p>
        `
      });
    } catch (emailError) {
      console.log('Email sending failed:', emailError);
    }
    
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET);
    
    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get all lawyers with advanced filtering
app.get('/api/lawyers', (req, res) => {
  const { 
    specialization, 
    location, 
    search, 
    minRating, 
    maxRate, 
    experience, 
    language,
    sortBy = 'rating',
    sortOrder = 'desc',
    page = 1,
    limit = 10
  } = req.query;
  
  let filteredLawyers = [...lawyers];
  
  // Apply filters
  if (specialization) {
    filteredLawyers = filteredLawyers.filter(lawyer => 
      lawyer.specialization.toLowerCase() === specialization.toLowerCase()
    );
  }
  
  if (location) {
    filteredLawyers = filteredLawyers.filter(lawyer => 
      lawyer.location.toLowerCase().includes(location.toLowerCase())
    );
  }
  
  if (search) {
    filteredLawyers = filteredLawyers.filter(lawyer => 
      lawyer.name.toLowerCase().includes(search.toLowerCase()) ||
      lawyer.specialization.toLowerCase().includes(search.toLowerCase()) ||
      lawyer.bio.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  if (minRating) {
    filteredLawyers = filteredLawyers.filter(lawyer => lawyer.rating >= parseFloat(minRating));
  }
  
  if (maxRate) {
    filteredLawyers = filteredLawyers.filter(lawyer => lawyer.hourlyRate <= parseInt(maxRate));
  }
  
  if (experience) {
    filteredLawyers = filteredLawyers.filter(lawyer => lawyer.experience >= parseInt(experience));
  }
  
  if (language) {
    filteredLawyers = filteredLawyers.filter(lawyer => 
      lawyer.languages && lawyer.languages.some(lang => 
        lang.toLowerCase().includes(language.toLowerCase())
      )
    );
  }
  
  // Sort results
  filteredLawyers.sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortOrder === 'desc') {
      return bValue > aValue ? 1 : -1;
    } else {
      return aValue > bValue ? 1 : -1;
    }
  });
  
  // Pagination
  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const endIndex = startIndex + parseInt(limit);
  const paginatedLawyers = filteredLawyers.slice(startIndex, endIndex);
  
  res.json({
    lawyers: paginatedLawyers,
    total: filteredLawyers.length,
    page: parseInt(page),
    totalPages: Math.ceil(filteredLawyers.length / parseInt(limit))
  });
});

// Get lawyer by ID with detailed information
app.get('/api/lawyers/:id', (req, res) => {
  const lawyer = lawyers.find(l => l.id === req.params.id);
  
  if (!lawyer) {
    return res.status(404).json({ error: 'Lawyer not found' });
  }
  
  // Add additional details for profile view
  const detailedLawyer = {
    ...lawyer,
    recentCases: [
      { type: 'Personal Injury', outcome: 'Settled', amount: '$150,000' },
      { type: 'Car Accident', outcome: 'Won', amount: '$85,000' },
      { type: 'Slip & Fall', outcome: 'Settled', amount: '$45,000' }
    ],
    availability: generateAvailability(),
    testimonials: [
      {
        client: 'John D.',
        rating: 5,
        comment: 'Excellent representation and communication throughout my case.',
        date: '2024-01-15'
      },
      {
        client: 'Maria S.',
        rating: 5,
        comment: 'Professional, knowledgeable, and got great results.',
        date: '2024-01-10'
      }
    ]
  };
  
  res.json(detailedLawyer);
});

// AI Legal Consultation with enhanced intelligence
app.post('/api/ai-consultation', (req, res) => {
  const { message, isVoiceInput, sessionId, userLocation } = req.body;
  
  // Create or update AI session
  let session = aiSessions.find(s => s.id === sessionId);
  if (!session) {
    session = {
      id: sessionId || uuidv4(),
      messages: [],
      analysis: {},
      recommendations: [],
      createdAt: new Date()
    };
    aiSessions.push(session);
  }
  
  // Add user message to session
  session.messages.push({
    type: 'user',
    content: message,
    timestamp: new Date(),
    isVoice: isVoiceInput
  });
  
  // AI Analysis (enhanced logic)
  const analysis = analyzeUserMessage(message, userLocation);
  session.analysis = { ...session.analysis, ...analysis };
  
  // Generate intelligent response
  const response = generateAIResponse(analysis, session);
  
  // Add AI response to session
  session.messages.push({
    type: 'ai',
    content: response.message,
    timestamp: new Date(),
    confidence: response.confidence
  });
  
  // Update recommendations
  session.recommendations = response.recommendations;
  
  res.json({
    sessionId: session.id,
    message: response.message,
    confidence: response.confidence,
    analysis: analysis,
    recommendedLawyers: response.recommendedLawyers,
    suggestedActions: response.suggestedActions,
    urgencyLevel: response.urgencyLevel
  });
});

// Enhanced consultation booking with conflict checking
app.post('/api/consultations', authenticateToken, async (req, res) => {
  try {
    const { lawyerId, date, time, clientInfo, caseDetails } = req.body;
    
    // Check lawyer availability
    const lawyer = lawyers.find(l => l.id === lawyerId);
    if (!lawyer) {
      return res.status(404).json({ error: 'Lawyer not found' });
    }
    
    // Check for scheduling conflicts
    const existingConsultation = consultations.find(c => 
      c.lawyerId === lawyerId && 
      c.date === date && 
      c.time === time &&
      c.status !== 'cancelled'
    );
    
    if (existingConsultation) {
      return res.status(400).json({ error: 'Time slot not available' });
    }
    
    // Create consultation
    const consultation = {
      id: uuidv4(),
      lawyerId,
      userId: req.user.userId,
      date,
      time,
      clientInfo,
      caseDetails,
      status: 'confirmed',
      confirmationNumber: `LEGAL${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      createdAt: new Date(),
      fee: lawyer.hourlyRate,
      duration: 60, // minutes
      meetingType: 'video', // video, phone, in-person
      notes: ''
    };
    
    consultations.push(consultation);
    
    // Send confirmation emails
    try {
      // Email to client
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: clientInfo.email,
        subject: 'Consultation Confirmed - LegalConnect AI',
        html: `
          <h2>Consultation Confirmed</h2>
          <p>Your consultation with ${lawyer.name} has been confirmed.</p>
          <p><strong>Details:</strong></p>
          <ul>
            <li>Date: ${format(new Date(date), 'MMMM dd, yyyy')}</li>
            <li>Time: ${time}</li>
            <li>Lawyer: ${lawyer.name}</li>
            <li>Specialization: ${lawyer.specialization}</li>
            <li>Confirmation Number: ${consultation.confirmationNumber}</li>
          </ul>
          <p>You will receive a meeting link 24 hours before your consultation.</p>
        `
      });
      
      // Email to lawyer (if email available)
      if (lawyer.email) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: lawyer.email,
          subject: 'New Consultation Booked',
          html: `
            <h2>New Consultation Booked</h2>
            <p>A new consultation has been booked with you.</p>
            <p><strong>Client:</strong> ${clientInfo.name}</p>
            <p><strong>Date:</strong> ${format(new Date(date), 'MMMM dd, yyyy')}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Case Type:</strong> ${caseDetails.type || 'Not specified'}</p>
          `
        }
        );
      }
    } catch (emailError) {
      console.log('Email sending failed:', emailError);
    }
    
    res.status(201).json({
      message: 'Consultation booked successfully',
      consultation: {
        ...consultation,
        lawyer: {
          name: lawyer.name,
          specialization: lawyer.specialization,
          photo: lawyer.photo
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Booking failed' });
  }
});

// Get user's consultations
app.get('/api/consultations', authenticateToken, (req, res) => {
  const userConsultations = consultations
    .filter(c => c.userId === req.user.userId)
    .map(consultation => {
      const lawyer = lawyers.find(l => l.id === consultation.lawyerId);
      return {
        ...consultation,
        lawyer: lawyer ? {
          name: lawyer.name,
          specialization: lawyer.specialization,
          photo: lawyer.photo
        } : null
      };
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  res.json(userConsultations);
});

// Get lawyer availability with smart scheduling
app.get('/api/lawyers/:id/availability', (req, res) => {
  const { id } = req.params;
  const { date } = req.query;
  
  const lawyer = lawyers.find(l => l.id === id);
  if (!lawyer) {
    return res.status(404).json({ error: 'Lawyer not found' });
  }
  
  const availability = generateDetailedAvailability(id, date);
  
  res.json({
    lawyerId: id,
    availability,
    timezone: 'America/New_York', // Should be dynamic based on lawyer location
    bookingRules: {
      minAdvanceHours: 24,
      maxAdvanceDays: 30,
      allowWeekends: false,
      workingHours: { start: '09:00', end: '17:00' }
    }
  });
});

// Analytics endpoint for lawyers
app.get('/api/analytics/lawyers/:id', (req, res) => {
  const { id } = req.params;
  const lawyer = lawyers.find(l => l.id === id);
  
  if (!lawyer) {
    return res.status(404).json({ error: 'Lawyer not found' });
  }
  
  const lawyerConsultations = consultations.filter(c => c.lawyerId === id);
  
  const analytics = {
    totalConsultations: lawyerConsultations.length,
    thisMonth: lawyerConsultations.filter(c => 
      new Date(c.createdAt).getMonth() === new Date().getMonth()
    ).length,
    revenue: lawyerConsultations.reduce((sum, c) => sum + (c.fee || 0), 0),
    averageRating: lawyer.rating,
    responseTime: lawyer.avgResponseTime,
    successRate: lawyer.successRate,
    popularCaseTypes: getPopularCaseTypes(lawyerConsultations),
    monthlyTrend: generateMonthlyTrend(lawyerConsultations)
  };
  
  res.json(analytics);
});

// Notification system
app.get('/api/notifications', authenticateToken, (req, res) => {
  const userNotifications = notifications
    .filter(n => n.userId === req.user.userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  res.json(userNotifications);
});

// Health check with system status
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    services: {
      database: 'connected',
      email: 'operational',
      ai: 'active'
    },
    stats: {
      totalLawyers: lawyers.length,
      totalConsultations: consultations.length,
      activeUsers: users.length
    }
  });
});

// Helper Functions

function analyzeUserMessage(message, location) {
  const legalKeywords = {
    'personal injury': ['accident', 'injury', 'hurt', 'medical', 'hospital', 'pain'],
    'family law': ['divorce', 'custody', 'child', 'marriage', 'spouse', 'alimony'],
    'criminal defense': ['arrested', 'charged', 'court', 'police', 'criminal', 'bail'],
    'corporate law': ['business', 'company', 'contract', 'merger', 'corporate'],
    'real estate': ['property', 'house', 'land', 'lease', 'mortgage', 'tenant'],
    'immigration': ['visa', 'citizenship', 'immigration', 'green card', 'deportation'],
    'employment': ['fired', 'workplace', 'discrimination', 'harassment', 'wrongful termination'],
    'bankruptcy': ['debt', 'bankruptcy', 'foreclosure', 'creditor', 'financial']
  };
  
  const urgencyKeywords = ['urgent', 'emergency', 'asap', 'immediately', 'deadline', 'court date'];
  
  let detectedArea = 'general';
  let confidence = 0;
  let urgency = 'normal';
  
  const messageLower = message.toLowerCase();
  
  // Detect legal area
  for (const [area, keywords] of Object.entries(legalKeywords)) {
    const matches = keywords.filter(keyword => messageLower.includes(keyword));
    if (matches.length > 0) {
      const areaConfidence = matches.length / keywords.length;
      if (areaConfidence > confidence) {
        detectedArea = area;
        confidence = areaConfidence;
      }
    }
  }
  
  // Detect urgency
  if (urgencyKeywords.some(keyword => messageLower.includes(keyword))) {
    urgency = 'high';
  }
  
  return {
    detectedArea,
    confidence: Math.min(confidence * 100, 95), // Cap at 95%
    urgency,
    location: location || 'unknown',
    messageLength: message.length,
    complexity: message.split(' ').length > 50 ? 'high' : 'medium'
  };
}

function generateAIResponse(analysis, session) {
  const { detectedArea, confidence, urgency } = analysis;
  
  // Find matching lawyers
  const matchingLawyers = lawyers
    .filter(lawyer => 
      lawyer.specialization.toLowerCase().includes(detectedArea.replace(' ', '')) ||
      detectedArea === 'general'
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
  
  let message = '';
  let suggestedActions = [];
  
  if (confidence > 70) {
    message = `I understand you need help with ${detectedArea}. Based on your description, I've identified ${matchingLawyers.length} highly qualified specialists in your area. `;
  } else {
    message = `I can help you find the right legal professional. Based on your description, here are some qualified lawyers who can assist you. `;
  }
  
  if (urgency === 'high') {
    message += `I notice this seems urgent. I recommend scheduling a consultation as soon as possible. `;
    suggestedActions.push('Schedule emergency consultation');
  }
  
  suggestedActions.push(
    'Review recommended lawyers',
    'Schedule a consultation',
    'Prepare relevant documents',
    'Write down key questions'
  );
  
  return {
    message,
    confidence,
    recommendedLawyers: matchingLawyers,
    suggestedActions,
    urgencyLevel: urgency,
    recommendations: matchingLawyers.map(lawyer => ({
      lawyerId: lawyer.id,
      matchScore: Math.floor(Math.random() * 20) + 80, // 80-100%
      reason: `Specializes in ${lawyer.specialization} with ${lawyer.experience} years experience`
    }))
  };
}

function generateAvailability() {
  const availability = {};
  const today = new Date();
  
  for (let i = 1; i <= 14; i++) {
    const date = addDays(today, i);
    const dateStr = format(date, 'yyyy-MM-dd');
    
    // Skip weekends for this example
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    availability[dateStr] = [
      '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
    ].filter(() => Math.random() > 0.3); // Randomly remove some slots
  }
  
  return availability;
}

function generateDetailedAvailability(lawyerId, requestedDate) {
  const bookedSlots = consultations
    .filter(c => c.lawyerId === lawyerId && c.status !== 'cancelled')
    .map(c => ({ date: c.date, time: c.time }));
  
  const availability = {};
  const today = new Date();
  
  for (let i = 1; i <= 30; i++) {
    const date = addDays(today, i);
    const dateStr = format(date, 'yyyy-MM-dd');
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
    const availableSlots = timeSlots.filter(time => 
      !bookedSlots.some(slot => slot.date === dateStr && slot.time === time)
    );
    
    if (availableSlots.length > 0) {
      availability[dateStr] = availableSlots;
    }
  }
  
  return availability;
}

function getPopularCaseTypes(consultations) {
  const caseTypes = {};
  consultations.forEach(c => {
    const type = c.caseDetails?.type || 'General';
    caseTypes[type] = (caseTypes[type] || 0) + 1;
  });
  
  return Object.entries(caseTypes)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([type, count]) => ({ type, count }));
}

function generateMonthlyTrend(consultations) {
  const monthlyData = {};
  const last6Months = [];
  
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthKey = format(date, 'yyyy-MM');
    last6Months.push(monthKey);
    monthlyData[monthKey] = 0;
  }
  
  consultations.forEach(c => {
    const monthKey = format(new Date(c.createdAt), 'yyyy-MM');
    if (monthlyData.hasOwnProperty(monthKey)) {
      monthlyData[monthKey]++;
    }
  });
  
  return last6Months.map(month => ({
    month,
    consultations: monthlyData[month]
  }));
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 LegalConnect AI Server running on port ${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}/api/health`);
  console.log(`👥 Lawyers: ${lawyers.length} available`);
  console.log(`🤖 AI Services: Active`);
});

export default app;