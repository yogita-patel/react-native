import * as Yup from "yup";

export const MedicalStaffAsignShiftValidation = () => {
  return Yup.object().shape({
    shiftDate: Yup.date().required("Date is required"),
    startTime: Yup.string().required("Start time is required"),
    endTime: Yup.string().required("End time is required"),
    breakStartTime: Yup.string().required("Break start time is required"),
    breakEndTime: Yup.string()
      .required("Break end time is required")
      .test(
        "is-after-start",
        "End time must be after start time",
        function (value) {
          const { breakStartTime } = this.parent;
          return value > breakStartTime;
        }
      ),
  });
};
