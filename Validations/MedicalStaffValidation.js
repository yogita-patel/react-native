import * as Yup from "yup";

export const MedicalStaffValidation = () => {
  return Yup.object().shape({
    user: Yup.string().required("Please select doctor by email!"),
    contact: Yup.string()
      .required("Business contact is require")
      .matches(/^[0-9]+$/, "Only numbers are allowed")
      .min(10, "Contact number must be at least 10 digits")
      .max(15, "Contact number must be at most 15 digits"),
    address: Yup.string().required("Business address is require"),
    staffRole: Yup.string().required("Please select role"),
    docSpeciality: Yup.string().required("Please select role"),
  });
};
