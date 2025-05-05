class AlertModel {
  constructor({
    alertID,
    title,
    description,
    createdAt = new Date(),
    updatedAt = new Date(),
    isRead = false,
    isDelete = false,
    buisnessID,
    alertType,
  }) {
    this.alertID = alertID;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isRead = isRead;
    this.isDelete = isDelete;
    this.buisnessID = buisnessID;
    this.alertType = alertType;
  }

  markAsRead() {
    this.isRead = true;
    this.updatedAt = new Date();
  }

  markAsDeleted() {
    this.isDelete = true;
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      alertID: this.alertID,
      title: this.title,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isRead: this.isRead,
      isDelete: this.isDelete,
      buisnessID: this.buisnessID,
      alertType: this.alertType,
    };
  }
}

export default AlertModel;
