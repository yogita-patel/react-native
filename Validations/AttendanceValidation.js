import * as Yup from "yup";

export const AttendanceEmployeeValidation = () => {
  return Yup.object().shape({
    checkin: Yup.string().required("Please select check-in time"),
    checkout: Yup.date().required("Please select check-out time"),
    //   .test(
    //     "is-after-check-in",
    //     "Check-out must be after check-in",
    //     function (value) {
    //       const { checkin } = this.parent;
    //       return value && checkin && new Date(value) > new Date(checkin);
    //     }
    //   ),
    break: Yup.number()
      .required("Break time is required")
      .min(0, "Break cannot be negative")
      .max(4, "Break cannot exceed 4 hours"),
    attendanceDate: Yup.date().required("Please select Attendance date"),
  });
};
