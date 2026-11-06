import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Supabase PostgreSQL Pool
const pool = new pg.Pool({
  host: process.env.DB_HOST || 'aws-0-ap-southeast-1.pooler.supabase.com',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER || 'postgres.xcckrdfkkqreggehypuh',
  password: process.env.DB_PASSWORD || 'BENTRA@2056',
  database: process.env.DB_NAME || 'postgres',
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 8000
});

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// In-memory fallback data cache
let fallbackLeads = [];
let fallbackBookings = [];

// 1. Healthcheck & DB Status
app.get('/api/health', async (req, res) => {
  let dbStatus = 'disconnected';
  try {
    const result = await pool.query('SELECT NOW() as current_time');
    dbStatus = 'connected (Supabase PostgreSQL)';
  } catch (err) {
    dbStatus = `offline (${err.message})`;
  }

  res.json({
    status: 'online',
    service: 'Brentra Ventures Enterprise Backend API',
    database: dbStatus,
    supabaseProject: 'xcckrdfkkqreggehypuh',
    version: '1.2.0',
    timestamp: new Date().toISOString()
  });
});

// 2. Leads & Quotes API (Supabase public.leads)
app.post('/api/leads', async (req, res) => {
  const { fullName, phone, email, vertical, locationName, customDetails } = req.body;
  
  if (!phone && !email) {
    return res.status(400).json({ error: 'Phone or email is required' });
  }

  const leadId = `BV-${Math.floor(100000 + Math.random() * 900000)}`;
  const newLead = {
    id: leadId,
    fullName: fullName || 'Anonymous Client',
    phone: phone || '',
    email: email || '',
    vertical: vertical || 'realty-infrastructure',
    locationName: locationName || 'Patna, Bihar',
    customDetails: customDetails || '',
    status: 'PENDING_REVIEW',
    createdAt: new Date().toISOString()
  };

  try {
    await pool.query(`
      INSERT INTO public.leads (id, full_name, phone, email, vertical, location_name, custom_details, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `, [newLead.id, newLead.fullName, newLead.phone, newLead.email, newLead.vertical, newLead.locationName, newLead.customDetails, newLead.status]);
    
    return res.status(201).json({ success: true, lead: newLead, storage: 'supabase' });
  } catch (err) {
    console.error('Supabase write fallback:', err.message);
    fallbackLeads.unshift(newLead);
    return res.status(201).json({ success: true, lead: newLead, storage: 'fallback' });
  }
});

app.get('/api/leads', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.leads ORDER BY created_at DESC LIMIT 100');
    return res.json({ success: true, count: result.rows.length, leads: result.rows, storage: 'supabase' });
  } catch (err) {
    return res.json({ success: true, count: fallbackLeads.length, leads: fallbackLeads, storage: 'fallback' });
  }
});

// 3. Facility Booking API (Supabase public.facility_bookings)
app.post('/api/bookings', async (req, res) => {
  const { 
    customerName, phone, address, pincode, serviceItems, 
    totalAmount, paymentMethod, appointmentDate, appointmentSlot 
  } = req.body;

  const bookingId = `BK-${Date.now().toString().slice(-6)}`;
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  const newBooking = {
    bookingId,
    otp,
    customerName: customerName || 'Valued Customer',
    phone: phone || '',
    address: address || '',
    pincode: pincode || '800001',
    serviceItems: serviceItems || [],
    totalAmount: totalAmount || 0,
    paymentMethod: paymentMethod || 'cash_after_service',
    appointmentDate: appointmentDate || 'Today',
    appointmentSlot: appointmentSlot || 'Morning 10 AM',
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };

  try {
    await pool.query(`
      INSERT INTO public.facility_bookings (
        id, customer_name, phone, locality, flat_house_no, landmark, city, pincode,
        slot_date, slot_time, payment_method, total_amount, status, otp_code, items
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    `, [
      bookingId,
      newBooking.customerName,
      newBooking.phone,
      address || 'Patna',
      '',
      '',
      'Patna',
      pincode || '800001',
      newBooking.appointmentDate,
      newBooking.appointmentSlot,
      newBooking.paymentMethod,
      newBooking.totalAmount,
      newBooking.status,
      otp,
      JSON.stringify(newBooking.serviceItems)
    ]);

    return res.status(201).json({ success: true, booking: newBooking, storage: 'supabase' });
  } catch (err) {
    console.error('Supabase write fallback for booking:', err.message);
    fallbackBookings.unshift(newBooking);
    return res.status(201).json({ success: true, booking: newBooking, storage: 'fallback' });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.facility_bookings ORDER BY created_at DESC LIMIT 100');
    return res.json({ success: true, count: result.rows.length, bookings: result.rows, storage: 'supabase' });
  } catch (err) {
    return res.json({ success: true, count: fallbackBookings.length, bookings: fallbackBookings, storage: 'fallback' });
  }
});

// 4. Facility Services & Categories from Supabase
app.get('/api/services', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.facility_services ORDER BY category_id, price ASC');
    res.json({ success: true, count: result.rows.length, services: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.facility_categories ORDER BY starting_price ASC');
    res.json({ success: true, count: result.rows.length, categories: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/technicians', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.technicians ORDER BY rating DESC');
    res.json({ success: true, count: result.rows.length, technicians: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Daily Patna Mandi Rates from Supabase
app.get('/api/mandi-rates', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.mandi_rates ORDER BY id ASC');
    res.json({ success: true, count: result.rows.length, rates: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve frontend static build if dist directory exists
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback handler for SPA
app.use((req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).json({
        message: 'Brentra Ventures API Server is connected to Supabase.',
        api_endpoints: [
          '/api/health',
          '/api/leads',
          '/api/bookings',
          '/api/services',
          '/api/categories',
          '/api/technicians',
          '/api/mandi-rates'
        ]
      });
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Brentra Ventures Server running on port ${PORT} (Connected to Supabase)`);
});
