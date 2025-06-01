/**
 * ServiceRecord model.
 * @typedef {Object} ServiceRecord
 * @property {string} id Firestore document id
 * @property {string} vehicleId Related vehicle id
 * @property {number} cost Service cost
 * @property {string[]} parts Parts replaced
 * @property {number} distance Vehicle distance at service time
 * @property {string} location Servicing location
 * @property {string} distributor Name of distributor
 * @property {string} notes Additional notes
 * @property {number} createdAt Timestamp
 */

class ServiceRecord {
  constructor(data) {
    this.id = data.id;
    this.vehicleId = data.vehicleId;
    this.cost = data.cost;
    this.parts = data.parts || [];
    this.distance = data.distance;
    this.location = data.location;
    this.distributor = data.distributor;
    this.notes = data.notes;
    this.createdAt = data.createdAt || Date.now();
  }
}

module.exports = ServiceRecord;
