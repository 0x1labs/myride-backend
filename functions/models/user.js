/**
 * User model.
 * @typedef {Object} User
 * @property {string} id Firestore document id
 * @property {string} name User's name
 * @property {string} phone Phone number
 * @property {string} licenseUrl URL to driving license image
 * @property {string} insuranceUrl URL to insurance document
 * @property {boolean} notificationsEnabled Whether push notifications are enabled
 */

class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.phone = data.phone;
    this.licenseUrl = data.licenseUrl;
    this.insuranceUrl = data.insuranceUrl;
    this.notificationsEnabled = data.notificationsEnabled ?? true;
  }
}

module.exports = User;
