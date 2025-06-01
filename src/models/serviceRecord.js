module.exports = {
  collection: 'serviceRecords',
  schema: {
    vehicleId: 'reference',
    serviceDate: 'timestamp',
    cost: 'number',
    partsChanged: ['string'],
    distanceAtService: 'number',
    location: 'string',
    distributor: 'string',
    notes: 'string'
  }
};
