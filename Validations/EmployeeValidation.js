import * as Yup from "yup";

export const EmployeeValidation = () => {
  return Yup.object().shape({
    user: Yup.string().required("Please select user by email!"),
    contact: Yup.string()
      .required("Business contact is require")
      .matches(/^[0-9]+$/, "Only numbers are allowed")
      .min(10, "Contact number must be at least 10 digits")
      .max(15, "Contact number must be at most 15 digits"),

    // city: Yup.string().required("Please select City"),
    address: Yup.string().required("Business address is require"),
    // email: Yup.string().email("Invalid email").required("Email is required"),
    employeeRole: Yup.string().required("Please select Employee role"),
    payRate: Yup.number()
      .typeError("Pay rate must be a number")
      .required("Pay rate is required")
      .positive("Pay rate must be positive"),
    duration: Yup.string().required("Please select payment duration"),
    startTime: Yup.string().required("Start time is required"),
    endTime: Yup.string()
      .required("End time is required")
      .test(
        "is-after-start",
        "End time must be after start time",
        function (value) {
          const { startTime } = this.parent;
          if (!startTime || !value) return true;
          return value > startTime;
        }
      ),
    joiningDate: Yup.date().required("Date is required"),
    workingDays: Yup.array()
      // .of(Yup.string().oneOf( 'Invalid weekday selected'))
      .min(1, "Select at least one working day")
      .required("Working days are required"),
  });
};
