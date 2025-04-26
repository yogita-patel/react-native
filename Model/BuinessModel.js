export class BusinessModel {
  constructor({
    businessName = "",
    businessType = "",
    businessAddress = "",
    businessContact = "",
  }) {
    try {
      this.businessName = businessName;
      this.businessType = businessType;
      this.businessAddress = businessAddress;
      this.businessContact = businessContact;
      this.createdAt = new Date();
      this.isDelete = 0;
    } catch (e) {
      console.log("Error: BusinessModel.js", e);
    }
  }
  toJson() {
    return {
      businessName: this.businessName,
      businessType: this.businessType,
      businessAddress: this.businessAddress,
      businessContact: this.businessContact,
      authID: this.authID,
      userID: this.userID,
      createdAt: this.createdAt.toISOString(),
      isDelete: this.isDelete,
    };
  }
}
