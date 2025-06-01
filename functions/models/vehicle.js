/**
 * Vehicle model.
 * @typedef {Object} Vehicle
 * @property {string} id Firestore document id
 * @property {string} userId Owner's user id
 * @property {string} type Vehicle type (bike or car)
 * @property {string} photoUrl URL to vehicle photo
 * @property {string} vin VIN number
 * @property {string} engine Engine number
 * @property {string} plate Number plate
 * @property {string} bluebookUrl URL to bluebook document
 * @property {number} totalDistance Total distance travelled
 */

class Vehicle {
  constructor(data) {
    this.id = data.id;
    this.userId = data.userId;
    this.type = data.type;
    this.photoUrl = data.photoUrl;
    this.vin = data.vin;
    this.engine = data.engine;
    this.plate = data.plate;
    this.bluebookUrl = data.bluebookUrl;
    this.totalDistance = data.totalDistance ?? 0;
  }
}

module.exports = Vehicle;
