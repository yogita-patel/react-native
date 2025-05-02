export class AttendanceModel {
  constructor({
    payrollID = "",
    payRate,
    duration,
    hours,
    status,
    grossSalary,
    netSalary,
    deduction,
    createdBy,
    employeeID,
    // isDelete = 0,
  }) {
    this.employeeID = employeeID;
    this.payrollID = payrollID;
    this.payRate = payRate;
    this.duration = duration;
    this.hours = hours;
    this.status = status;
    this.grossSalary = grossSalary;
    this.netSalary = netSalary;
    this.deduction = deduction;
    this.createdBy = createdBy;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.isDelete = 0;
  }

  toJson() {
    return {
      employeeID: this.employeeID,
      payrollID: this.payrollID,
      payRate: this.payRate,
      duration: this.duration,
      hours: this.hours,
      status: this.status,
      grossSalary: this.grossSalary,
      netSalary: this.netSalary,
      deduction: this.deduction,
      createdBy: this.createdBy,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      isDelete: this.isDelete,
    };
  }
}
