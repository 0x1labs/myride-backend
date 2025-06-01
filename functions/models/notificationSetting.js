/**
 * NotificationSetting model.
 * @typedef {Object} NotificationSetting
 * @property {string} id Firestore document id
 * @property {string} userId User id
 * @property {boolean} enabled Whether notifications are enabled
 */

class NotificationSetting {
  constructor(data) {
    this.id = data.id;
    this.userId = data.userId;
    this.enabled = data.enabled ?? true;
  }
}

module.exports = NotificationSetting;
