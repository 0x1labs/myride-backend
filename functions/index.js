const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');

const User = require('./models/user');
const Vehicle = require('./models/vehicle');
const ServiceRecord = require('./models/serviceRecord');
const Booking = require('./models/booking');
const NotificationSetting = require('./models/notificationSetting');

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(express.json());

async function authenticate(req, res, next) {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = header.replace('Bearer ', '');
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const snap = await db.collection('users').doc(decoded.uid).get();
    if (!snap.exists) {
      return res.status(401).json({ error: 'User not found' });
    }
    req.user = new User({ id: snap.id, ...snap.data() });
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Invalid token' });
  }
}

function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
}

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'MyRide backend operational' });
});

// Create a user
app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    const ref = await db.collection('users').add({
      name: user.name,
      phone: user.phone,
      licenseUrl: user.licenseUrl,
      insuranceUrl: user.insuranceUrl,
      notificationsEnabled: user.notificationsEnabled,
      role: user.role || 'user',
    });
    user.id = ref.id;
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Fetch a user
app.get('/api/users/:id', async (req, res) => {
  try {
    const snap = await db.collection('users').doc(req.params.id).get();
    if (!snap.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    const user = new User({ id: snap.id, ...snap.data() });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Get authenticated user
app.get('/api/users/me', authenticate, (req, res) => {
  res.json(req.user);
});

// Update authenticated user's phone
app.patch('/api/users/me', authenticate, async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ error: 'Phone is required' });
    }
    await db.collection('users').doc(req.user.id).update({ phone });
    req.user.phone = phone;
    res.json(req.user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update phone' });
  }
});

// Admin endpoint to add service record
app.post('/api/service-records', authenticate, requireAdmin, async (req, res) => {
  try {
    const record = new ServiceRecord(req.body);
    const ref = await db.collection('serviceRecords').add({
      vehicleId: record.vehicleId,
      cost: record.cost,
      parts: record.parts,
      distance: record.distance,
      location: record.location,
      distributor: record.distributor,
      notes: record.notes,
      createdAt: record.createdAt,
    });
    record.id = ref.id;
    res.status(201).json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add service record' });
  }
});

exports.api = functions.https.onRequest(app);
