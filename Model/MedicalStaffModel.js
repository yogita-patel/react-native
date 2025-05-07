class MedicalStaffModel {
  constructor({
    staffID = "",
    userID = "",
    hospitalId = "",
    role = "",
    specialty = "",
    shift = "",
    address = "",
    contact = "",
  } = {}) {
    this.staffID = staffID;
    this.hospitalId = hospitalId;
    this.role = role;
    this.specialty = specialty;
    this.shift = shift;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.isDelete = 0;
    this.address = address;
    this.contact = contact;
    this.userID = userID;
  }

  toJson() {
    return {
      staffID: this.staffID,
      userID: this.userID,
      hospitalId: this.hospitalId,
      role: this.role,
      specialty: this.specialty,
      shift: this.shift,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      isDelete: this.isDelete,
      address: this.address,
      contact: this.contact,
    };
  }

  // Setters
  setStaffIDstaffID(id) {
    this.staffID = id;
    this._updateTimestamp();
  }

  setHospitalId(id) {
    this.hospitalId = id;
    this._updateTimestamp();
  }

  setRole(role) {
    this.role = role;
    this._updateTimestamp();
  }

  setSpecialty(specialty) {
    this.specialty = specialty;
    this._updateTimestamp();
  }

  setShift(shift) {
    this.shift = shift;
    this._updateTimestamp();
  }

  setIsDelete(isDelete) {
    this.isDelete = isDelete;
    this._updateTimestamp();
  }

  _updateTimestamp() {
    this.updatedAt = new Date().toISOString();
  }
}

export default MedicalStaffModel;
