const createApp = require('../app');
const assert = require('node:assert');
const http = require('node:http');
const { test } = require('node:test');

function startServer(app) {
  return new Promise((resolve) => {
    const server = http.createServer(app);
    server.listen(0, () => resolve(server));
  });
}

test('GET / returns operational message', async (t) => {
  const app = createApp();
  const server = await startServer(app);
  t.after(() => server.close());
  const port = server.address().port;
  const res = await fetch(`http://localhost:${port}/`);
  const data = await res.json();
  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(data, { message: 'MyRide backend operational' });
});
