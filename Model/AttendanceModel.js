export class AttendanceModel {
  constructor({
    attendanceID = "",
    employeeID,
    checkIn,
    checkOut,
    breakIn = "",
    breakOut = "",
    breakTime = "",
    attendanceDate,
    createdBy,
    hoursWorked,
    buisnessID,
    status,
    userID,
    // isDelete = 0,
  }) {
    this.attendanceID = attendanceID;
    this.employeeID = employeeID;
    this.userID = userID;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.breakIn = breakIn;
    this.breakOut = breakOut;
    this.breakTime = breakTime;
    this.buisnessID = buisnessID;
    this.attendanceDate = attendanceDate;
    this.hoursWorked = hoursWorked;
    this.createdBy = createdBy;
    (this.status = status), (this.createdAt = new Date());
    this.updatedAt = new Date();
    this.isDelete = 0;
  }

  toJson() {
    return {
      attendanceID: this.attendanceID,
      status: this.status,
      employeeID: this.employeeID,
      userID: this.userID,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      breakIn: this.breakIn,
      breakOut: this.breakOut,
      breakTime: this.breakTime,
      buisnessID: this.buisnessID,
      attendanceDate: this.attendanceDate,
      hoursWorked: this.hoursWorked,
      createdBy: this.createdBy,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      isDelete: this.isDelete,
    };
  }
}
