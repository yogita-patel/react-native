export class UserModel {
  constructor({
    fullName = "",
    email = "",
    roleID = 0,
    cityID = 0,
    authID = "",
    userID = null,
    countryID = null,
    businessID = null,
    hospitalID = null,
    doctorID = null,
    employeeID = null,
  }) {
    try {
      this.fullName = fullName;
      this.email = email;
      this.userID = userID;
      this.roleID = roleID;
      this.cityID = cityID;
      this.createdAt = new Date();
      this.authID = authID;
      this.countryID = countryID;
      (this.businessID = businessID),
        (this.hospitalID = hospitalID),
        (this.doctorID = doctorID),
        (this.employeeID = employeeID);
    } catch (e) {
      console.log("Error: UserModel.js", e);
    }
  }

  setName(name) {
    if (!name) throw new Error("Name is required");
    this.name = name.trim();
  }

  setEmail(email) {
    if (!email) throw new Error("Email is required");
    this.email = email.trim().toLowerCase();
  }

  setCityId(city) {
    this.cityID = city.trim();
  }

  setAddress(address) {
    this.address = address.trim();
  }

  setRoleId(roleId) {
    if (!roleId) throw new Error("Role ID is required");
    this.roleId = roleId;
  }

  setauthID(authID) {
    this.authID = authID.trim();
  }
  setUserID(userID) {
    this.userID = userID.trim();
  }

  setBusinessId(businessID) {
    if (!businessID) throw new Error("Business ID is required");
    this.roleId = roleId;
  }

  setHospitalID(hospitalID) {
    this.hospitalID = hospitalID.trim();
  }
  setDoctorID(doctorID) {
    this.doctorID = doctorID.trim();
  }
  setEmployeeID(employeeID) {
    this.employeeID = employeeID.trim();
  }

  toJson() {
    return {
      fullName: this.fullName,
      email: this.email,
      roleID: this.roleID,
      cityID: this.cityID,
      authID: this.authID,
      userID: this.userID,
      createdAt: this.createdAt.toISOString(),
      businessID: this.businessID,
      hospitalID: this.hospitalID,
      doctorID: this.doctorID,
      employeeID: this.employeeID,
      countryID: this.countryID,
    };
  }
}
