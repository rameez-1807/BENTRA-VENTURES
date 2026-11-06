import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// In-memory data store for live demo & testing
const leads = [];
const bookings = [];

// API Endpoints
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Brentra Ventures Enterprise Backend API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Quote & Lead Submission
app.post('/api/leads', (req, res) => {
  const { fullName, phone, email, vertical, locationName, customDetails } = req.body;
  
  if (!phone && !email) {
    return res.status(400).json({ error: 'Phone or email is required' });
  }

  const newLead = {
    id: `BV-${Math.floor(100000 + Math.random() * 900000)}`,
    fullName: fullName || 'Anonymous Client',
    phone: phone || '',
    email: email || '',
    vertical: vertical || 'realty-infrastructure',
    locationName: locationName || 'Patna, Bihar',
    customDetails: customDetails || '',
    createdAt: new Date().toISOString(),
    status: 'PENDING_REVIEW'
  };

  leads.unshift(newLead);
  res.status(201).json({ success: true, lead: newLead });
});

app.get('/api/leads', (req, res) => {
  res.json({ success: true, count: leads.length, leads });
});

// Facility Booking API
app.post('/api/bookings', (req, res) => {
  const { customerName, phone, address, pincode, serviceItems, totalAmount, paymentMethod, appointmentDate, appointmentSlot } = req.body;

  const newBooking = {
    bookingId: `BK-${Date.now().toString().slice(-6)}`,
    otp: Math.floor(1000 + Math.random() * 9000).toString(),
    customerName: customerName || 'Valued Customer',
    phone: phone || '',
    address: address || '',
    pincode: pincode || '800001',
    serviceItems: serviceItems || [],
    totalAmount: totalAmount || 0,
    paymentMethod: paymentMethod || 'COD',
    appointmentDate: appointmentDate || new Date().toISOString().split('T')[0],
    appointmentSlot: appointmentSlot || 'Morning 10 AM',
    status: 'TECHNICIAN_ASSIGNED',
    createdAt: new Date().toISOString()
  };

  bookings.unshift(newBooking);
  res.status(201).json({ success: true, booking: newBooking });
});

app.get('/api/bookings', (req, res) => {
  res.json({ success: true, count: bookings.length, bookings });
});

// Serve frontend static build if dist directory exists
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback handler for SPA or API notice
app.use((req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).json({
        message: 'Brentra Ventures API Server is running.',
        api_endpoints: ['/api/health', '/api/leads', '/api/bookings']
      });
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Brentra Ventures Server running on port ${PORT}`);
});
