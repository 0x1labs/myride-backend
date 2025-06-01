module.exports = {
  collection: 'users',
  schema: {
    name: 'string',
    phone: 'string',
    notificationsEnabled: 'boolean',
    insurance: {
      number: 'string',
      expiry: 'timestamp'
    },
    drivingLicense: {
      number: 'string',
      expiry: 'timestamp'
    }
  }
};
