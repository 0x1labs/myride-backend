const { parse } = require('url');

class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.phone = data.phone;
    this.licenseUrl = data.licenseUrl;
    this.insuranceUrl = data.insuranceUrl;
    this.notificationsEnabled = data.notificationsEnabled ?? true;
  }
}

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

function createApp({ db } = {}) {
  return async function handler(req, res) {
    const url = parse(req.url, true);
    if (req.method === 'GET' && url.pathname === '/') {
      return sendJson(res, 200, { message: 'MyRide backend operational' });
    }

    if (db && req.method === 'POST' && url.pathname === '/api/users') {
      try {
        const body = await parseBody(req);
        const user = new User(body);
        const ref = await db.collection('users').add({
          name: user.name,
          phone: user.phone,
          licenseUrl: user.licenseUrl,
          insuranceUrl: user.insuranceUrl,
          notificationsEnabled: user.notificationsEnabled,
        });
        user.id = ref.id;
        return sendJson(res, 201, user);
      } catch (err) {
        console.error(err);
        return sendJson(res, 500, { error: 'Failed to create user' });
      }
    }

    if (db && req.method === 'GET' && url.pathname.startsWith('/api/users/')) {
      try {
        const id = url.pathname.split('/').pop();
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

    res.writeHead(404); res.end();
  };
}

module.exports = createApp;
