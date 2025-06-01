const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase app only if not already initialized
try {
  admin.app();
} catch (e) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const db = admin.firestore();

async function run() {
  console.log('Seeding mock data...');
  const users = [
    { name: 'Alice', phone: '111-222-3333', licenseUrl: '', insuranceUrl: '' },
    { name: 'Bob', phone: '444-555-6666', licenseUrl: '', insuranceUrl: '' },
  ];

  for (const userData of users) {
    const userRef = await db.collection('users').add({
      ...userData,
      notificationsEnabled: true,
    });
    console.log(`Created user ${userRef.id}`);

    const vehicleRef = await db.collection('vehicles').add({
      userId: userRef.id,
      type: 'bike',
      plate: `AB-${Math.floor(Math.random() * 1000)}`,
      totalDistance: 0,
    });
    console.log(`  Added vehicle ${vehicleRef.id}`);

    await db.collection('serviceRecords').add({
      vehicleId: vehicleRef.id,
      cost: 1000,
      parts: ['Oil Filter'],
      distance: 0,
      location: 'Mock Garage',
      distributor: 'Mock Distributor',
      notes: 'Initial service',
      createdAt: Date.now(),
    });
    console.log('  Added service record');
  }

  console.log('Mock data seeded successfully');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
