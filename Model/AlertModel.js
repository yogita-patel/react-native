class AlertModel {
  constructor({
    alertID = "",
    title = "",
    description = "",
    // isRead = 0,
    // isDelete = 0,
    buisnessID = "",
    alertType = "",
  }) {
    this.alertID = alertID;
    this.title = title;
    this.description = description;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.isRead = 0;
    this.isDelete = 0;
    this.buisnessID = buisnessID;
    this.alertType = alertType;
  }

  markAsRead() {
    this.isRead = 0;
    this.updatedAt = new Date();
  }

  markAsDeleted() {
    this.isDelete = 0;
    this.updatedAt = new Date();
  }

  toJson() {
    return {
      alertID: this.alertID,
      title: this.title,
      description: this.description,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      isRead: this.isRead,
      isDelete: this.isDelete,
      buisnessID: this.buisnessID,
      alertType: this.alertType,
    };
  }
}

export default AlertModel;
