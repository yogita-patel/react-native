export class EmployeeModel {
  constructor({
    employeeID = "",
    userID,
    businessID,
    roleID,
    payRate,
    address,
    contact,
    workingDays,
    paymentDurationID,
    startTime,
    endTime,
    joiningDate,
  }) {
    this.employeeID = employeeID;
    this.userID = userID;
    this.businessID = businessID;
    this.roleID = roleID;
    this.payRate = payRate;
    this.address = address;
    this.contact = contact;
    this.workingDays = workingDays;
    this.paymentDurationID = paymentDurationID;
    this.startTime = startTime;
    this.endTime = endTime;
    this.joiningDate = joiningDate;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.isDelete = 0;
  }

  toJson() {
    return {
      employeeID: this.employeeID,
      userID: this.userID,
      businessID: this.businessID,
      roleID: this.roleID,
      payRate: this.payRate,
      address: this.address,
      contact: this.contact,
      workingDays: this.workingDays,
      paymentDurationID: this.paymentDurationID,
      startTime: this.startTime,
      endTime: this.endTime,
      joiningDate: this.joiningDate,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      isDelete: this.isDelete,
    };
  }
}
