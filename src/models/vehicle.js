module.exports = {
  collection: 'vehicles',
  schema: {
    userId: 'reference',
    photoUrl: 'string',
    vin: 'string',
    engineNumber: 'string',
    plateNumber: 'string',
    bluebook: {
      documentUrl: 'string',
      expiry: 'timestamp'
    },
    totalDistance: 'number'
  }
};
