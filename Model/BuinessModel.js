export class BusinessModel {
  constructor({
    ownerId = "",
    buisnessName = "",
    buisnessEmail = "",
    buisnessAddress = "",
    buisnessContact = "",
    buisnessCategory = "",
    cityId = "",
    buisnessProfile = "",
    buisnessID = "",
    hospitalType = "",
  }) {
    try {
      this.ownerId = ownerId;
      this.buisnessName = buisnessName;
      this.buisnessEmail = buisnessEmail;
      this.buisnessAddress = buisnessAddress;
      this.buisnessContact = buisnessContact;
      this.buisnessCategory = buisnessCategory;
      this.buisnessProfile = buisnessProfile;
      (this.cityId = cityId), (this.createdAt = new Date());
      this.updatedAt = new Date();
      this.isDelete = 0;
      this.buisnessID = buisnessID;
      this.hospitalType = hospitalType;
    } catch (e) {
      console.log("Error: buisnessModel.js", e);
    }
  }
  toJson() {
    return {
      ownerId: this.ownerId,
      cityId: this.cityId,
      buisnessName: this.buisnessName,
      buisnessEmail: this.buisnessEmail,
      buisnessAddress: this.buisnessAddress,
      buisnessContact: this.buisnessContact,
      buisnessCategory: this.buisnessCategory,
      buisnessProfile: this.buisnessProfile,
      hospitalType: this.hospitalType,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      isDelete: this.isDelete,
      buisnessID: this.buisnessID,
    };
  }
}
