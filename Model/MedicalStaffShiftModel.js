export class MedicalStaffShift {
  constructor({
    staffID = "",
    shiftID = "",
    userID = "",
    hospitalID = "",
    shiftDate = "",
    shiftStart = "",
    shiftEnd = "",
    breakStart = null,
    breakEnd = null,
  }) {
    this.staffID = staffID;
    this.shiftID = shiftID;
    this.userID = userID;
    this.hospitalID = hospitalID;
    this.shiftDate = shiftDate;
    this.shiftStart = shiftStart;
    this.shiftEnd = shiftEnd;
    this.breakStart = breakStart;
    this.breakEnd = breakEnd;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.isDelete = 0;
  }

  toJson() {
    return {
      staffID: this.staffID,
      shiftDate: this.shiftDate,
      hospitalID: this.hospitalID,
      userID: this.userID,
      shiftID: this.shiftID,
      shiftStart: this.shiftStart,
      shiftEnd: this.shiftEnd,
      breakStart: this.breakStart,
      breakEnd: this.breakEnd,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      isDelete: this.isDelete,
    };
  }
}
