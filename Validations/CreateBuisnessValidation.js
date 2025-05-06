import * as Yup from "yup";

export const CreateBuisnessValidation = ({ isHospital = null }) => {
  return Yup.object().shape({
    bname: Yup.string().required("Business name is require"),

    baddress: Yup.string().required("Business address is require"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    bcontact: Yup.string()
      .required("Business contact is require")
      .matches(/^[0-9]+$/, "Only numbers are allowed")
      .min(10, "Contact number must be at least 10 digits")
      .max(15, "Contact number must be at most 15 digits"),
    bcat: Yup.string().required("Please select Category"),
    bcity: Yup.string().required("Please select City"),
    htype: isHospital
      ? Yup.string().required("Please select hospital type")
      : Yup.string().nullable(),
  });
};
