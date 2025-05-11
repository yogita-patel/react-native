class AppointmentModel {
  constructor({
    slotId = "",
    doctorId = "",
    patientId = "",
    date = "",
    startTime = "",
    appointmentID = "",
    hospitalID = "",
    status = "",
  }) {
    this.slotId = slotId;
    this.appointmentID = appointmentID;
    this.doctorId = doctorId;
    this.patientId = patientId;
    this.date = date;
    this.startTime = startTime;
    this.status = status;
    this.hospitalID = hospitalID;
    this.bookedAt = new Date();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  toJson() {
    return {
      appointmentID: this.appointmentID,
      slotId: this.slotId,
      doctorId: this.doctorId,
      patientId: this.patientId,
      date: this.date,
      hospitalID: this.hospitalID,
      startTime: this.startTime,
      status: this.status,
      bookedAt: this.bookedAt,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}

export default AppointmentModel;
