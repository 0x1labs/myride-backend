const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

async function seed() {
  const users = [
    {
      id: 'user1',
      name: 'Alice Example',
      phone: '555-1000',
      licenseUrl: 'https://example.com/license1.jpg',
      insuranceUrl: 'https://example.com/insurance1.jpg',
      notificationsEnabled: true,
    },
    {
      id: 'user2',
      name: 'Bob Rider',
      phone: '555-2000',
      licenseUrl: 'https://example.com/license2.jpg',
      insuranceUrl: 'https://example.com/insurance2.jpg',
      notificationsEnabled: false,
    },
  ];

  const vehicles = [
    {
      id: 'vehicle1',
      userId: 'user1',
      type: 'bike',
      photoUrl: 'https://example.com/bike1.jpg',
      vin: 'VINB123456',
      engine: 'ENG1000',
      plate: 'BK-123',
      bluebookUrl: 'https://example.com/bluebook1.pdf',
      totalDistance: 5000,
    },
    {
      id: 'vehicle2',
      userId: 'user2',
      type: 'car',
      photoUrl: 'https://example.com/car1.jpg',
      vin: 'VINC654321',
      engine: 'ENG2000',
      plate: 'CR-456',
      bluebookUrl: 'https://example.com/bluebook2.pdf',
      totalDistance: 12000,
    },
  ];

  const serviceRecords = [
    {
      id: 'record1',
      vehicleId: 'vehicle1',
      cost: 120,
      parts: ['oil filter'],
      distance: 4800,
      location: 'Service Center A',
      distributor: 'Distributor A',
      notes: 'Regular maintenance',
      createdAt: Date.now(),
    },
    {
      id: 'record2',
      vehicleId: 'vehicle2',
      cost: 300,
      parts: ['brake pads', 'coolant'],
      distance: 11500,
      location: 'Service Center B',
      distributor: 'Distributor B',
      notes: 'Brake replacement',
      createdAt: Date.now(),
    },
  ];

  const bookings = [
    {
      id: 'booking1',
      userId: 'user1',
      vehicleId: 'vehicle1',
      serviceDate: Date.now() + 7 * 24 * 60 * 60 * 1000,
      location: 'Service Center A',
    },
  ];

  const notificationSettings = [
    { id: 'notif1', userId: 'user1', enabled: true },
    { id: 'notif2', userId: 'user2', enabled: false },
  ];

  for (const u of users) {
    await db.collection('users').doc(u.id).set(u);
  }

  for (const v of vehicles) {
    await db.collection('vehicles').doc(v.id).set(v);
  }

  for (const r of serviceRecords) {
    await db.collection('serviceRecords').doc(r.id).set(r);
  }

  for (const b of bookings) {
    await db.collection('bookings').doc(b.id).set(b);
  }

  for (const n of notificationSettings) {
    await db.collection('notificationSettings').doc(n.id).set(n);
  }

  console.log('Mock data added');
}

seed().then(() => process.exit()).catch(err => {
  console.error(err);
  process.exit(1);
});
