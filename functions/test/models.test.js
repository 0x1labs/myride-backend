const User = require('../models/user');
const Vehicle = require('../models/vehicle');
const ServiceRecord = require('../models/serviceRecord');

describe('Model defaults', () => {
  test('User defaults', () => {
    const user = new User({ name: 'Test', phone: '123' });
    expect(user.notificationsEnabled).toBe(true);
    expect(user.role).toBe('user');
  });

  test('Vehicle defaults', () => {
    const vehicle = new Vehicle({ userId: '1', type: 'bike' });
    expect(vehicle.totalDistance).toBe(0);
  });

  test('ServiceRecord defaults', () => {
    const record = new ServiceRecord({});
    expect(Array.isArray(record.parts)).toBe(true);
    expect(typeof record.createdAt).toBe('number');
  });
});
