const { parse } = require('url');
const User = require('./models/user');
const ServiceRecord = require('./models/serviceRecord');

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch (err) {
        reject(err);
      }
    });
  });
}

async function authenticate(req, res, db, admin) {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) {
    sendJson(res, 401, { error: 'Unauthorized' });
    return null;
  }
  const token = header.replace('Bearer ', '');
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const snap = await db.collection('users').doc(decoded.uid).get();
    if (!snap.exists) {
      sendJson(res, 401, { error: 'User not found' });
      return null;
    }
    return new User({ id: snap.id, ...snap.data() });
  } catch (err) {
    console.error(err);
    sendJson(res, 401, { error: 'Invalid token' });
    return null;
  }
}

function requireAdmin(res, user) {
  if (user.role !== 'admin') {
    sendJson(res, 403, { error: 'Forbidden' });
    return false;
  }
  return true;
}

function createApp({ db, admin } = {}) {
  return async function handler(req, res) {
    const url = parse(req.url, true);
    if (req.method === 'GET' && url.pathname === '/') {
      return sendJson(res, 200, { message: 'MyRide backend operational' });
    }

    if (!db) {
      return sendJson(res, 500, { error: 'Database not initialized' });
    }

    if (req.method === 'POST' && url.pathname === '/api/users') {
      try {
        const body = await parseBody(req);
        const user = new User(body);
        const ref = await db.collection('users').add({
          name: user.name,
          phone: user.phone,
          licenseUrl: user.licenseUrl,
          insuranceUrl: user.insuranceUrl,
          notificationsEnabled: user.notificationsEnabled,
          role: user.role || 'user',
        });
        user.id = ref.id;
        return sendJson(res, 201, user);
      } catch (err) {
        console.error(err);
        return sendJson(res, 500, { error: 'Failed to create user' });
      }
    }

    if (req.method === 'GET' && url.pathname.startsWith('/api/users/')) {
      const id = url.pathname.split('/').pop();
      if (id === 'me') {
        const user = await authenticate(req, res, db, admin);
        if (!user) return;
        return sendJson(res, 200, user);
      }
      try {
        const snap = await db.collection('users').doc(id).get();
        if (!snap.exists) {
          return sendJson(res, 404, { error: 'User not found' });
        }
        const user = new User({ id: snap.id, ...snap.data() });
        return sendJson(res, 200, user);
      } catch (err) {
        console.error(err);
        return sendJson(res, 500, { error: 'Failed to fetch user' });
      }
    }

    if (req.method === 'PATCH' && url.pathname === '/api/users/me') {
      const user = await authenticate(req, res, db, admin);
      if (!user) return;
      try {
        const body = await parseBody(req);
        const { phone } = body;
        if (!phone) {
          return sendJson(res, 400, { error: 'Phone is required' });
        }
        await db.collection('users').doc(user.id).update({ phone });
        user.phone = phone;
        return sendJson(res, 200, user);
      } catch (err) {
        console.error(err);
        return sendJson(res, 500, { error: 'Failed to update phone' });
      }
    }

    if (req.method === 'POST' && url.pathname === '/api/service-records') {
      const user = await authenticate(req, res, db, admin);
      if (!user) return;
      if (!requireAdmin(res, user)) return;
      try {
        const body = await parseBody(req);
        const record = new ServiceRecord(body);
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
        return sendJson(res, 201, record);
      } catch (err) {
        console.error(err);
        return sendJson(res, 500, { error: 'Failed to add service record' });
      }
    }

    res.writeHead(404); res.end();
  };
}

module.exports = createApp;
