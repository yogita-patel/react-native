const strings = {
  appName: "BethelCity",
  emailPlaceholder: "Enter E-mail",
  fullNamePlaceholder: "Enter your full-name",
  contact: "Enter Contact number",
  address: "Enter Address",
  payrate: "Enter hourly rate",
  businessNamePlaceholder: "Enter your business",
  businessTypePlaceholder: "Enter your business type",
  businessAddressPlaceholder: "Enter your business address",
  businessContactPlaceholder: "Enter your business contact number",
  hospitalNamePlaceholder: "Enter hospital name",
  hospitalAddressPlaceholder: "Enter hospital address",
  hospitalContactPlaceholder: "Enter hospital Contact",
  passwordPlaceholder: "Enter password",
  repasswordPlaceholder: "Re-Enter password",
  welcomeMessage: "Welcome to our App!",
  loginButton: "Login",
  signUpButton: "Sign Up",
  homeTitle: "Home",
  profileTitle: "Profile",
  logoutMessage: "Are you sure you want to log out?",
  errorMessage: "Something went wrong. Please try again.",
  successMessage: "Action completed successfully!",
  breakHours: "Enter Break in hours",
};

const labels = {
  emailLabel: "E-mail",
  passwordLabel: "Password",
  repasswordLabel: "Re-Password",
  fullNameLabel: "Full-Name",
  contact: "Contact-number",
  address: "Address",
  payrate: "Payrate($)",
  weekdays: "Select Week-Days",
  businessNameLabel: "Business Name",
  businessTypeLabel: "Business Type",
  businessContactLabel: "Buisness Contact",
  businessAddressLabel: "Business Address",
  hospitalNameLabel: "Hospital Name",
  hospitalAddressLabel: "Hospital Address",
  hospitalContactLabel: "Hospital Contact",
  checkin: "Check-in Time",
  checkout: "Check-out Time",
  break: "Break in hours",
  attendanceDate: "Attendance Date",
};

const usersRole = {
  buisnessOwner: "Buisness-Owner",
  hospitalAdmin: "Hospital-Admin",
  citizen: "Citizen",
  employee: "Employee",
  manager: "Manager",
  doctor: "Doctor",
};
const dayNameMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const employeesRoleID = {
  manager: "b9Fwrf4hXDHBLGG6WWmf",
  hospitalAdmin: "ebi6hVgOW5gesatZ3rY8",
  buisnessAdmin: "DyQJvGoJ5qTXM2slPAuc",
  buisnessOwner: "AzxXDrXZ9gwqbseGt6rA",
};

const collectionName = {
  country: "Countries",
  city: "Cities",
  buisness: "Buisness",
  employee: "Employees",
  user: "Users",
  attendance: "Attendance",
  buisnessCategory: "BuisnessCategory",
  attendanceStatus: "AttendanceStatus",
  buisnessAlert: "BuisnessAlert",
  hospitalType: "HospitalType",
  medicalStaff: "MedicalStaff",
  medicalStaffRole: "MedicalStaffRole",
  medicalStaffShift: "MedicalStaffSchedules",
  doctorSpeciality: "DoctorSpecialties",
  appointment: "AppointmentBooking",
  slots: "Slots",
};

const attendanceStatus = {
  present: "SucJ6B691QyRhkTmTmB0",
  absent: "nAa5ACDkdmIFKd88ljFp",
  late: "JuVcVBoJhPBgrl7OhMet",
};

const appointmentStatus = {
  booked: "Booked",
  cancel: "Canceled",
  // late: "JuVcVBoJhPBgrl7OhMet",
};

const alertType = {
  buisnessAlert: "BuisnessAlert",
};

const buisnessCategoryId = {
  hospital: "fDYmbIMl0E5Jh8ls7OjG",
};

const lazyLoadLimit = 10;

export default {
  strings,
  labels,
  usersRole,
  collectionName,
  lazyLoadLimit,
  attendanceStatus,
  alertType,
  employeesRoleID,
  dayNameMap,
  buisnessCategoryId,
  appointmentStatus,
};
