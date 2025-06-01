module.exports = {
  collection: 'bookings',
  schema: {
    userId: 'reference',
    vehicleId: 'reference',
    serviceDate: 'timestamp',
    location: 'string',
    notes: 'string'
  }
};
