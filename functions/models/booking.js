/**
 * Booking model.
 * @typedef {Object} Booking
 * @property {string} id Firestore document id
 * @property {string} userId User creating booking
 * @property {string} vehicleId Related vehicle
 * @property {number} serviceDate Timestamp for service appointment
 * @property {string} location Service location
 */

class Booking {
  constructor(data) {
    this.id = data.id;
    this.userId = data.userId;
    this.vehicleId = data.vehicleId;
    this.serviceDate = data.serviceDate;
    this.location = data.location;
  }
}

module.exports = Booking;
