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

exports.api = functions.https.onRequest(app);
