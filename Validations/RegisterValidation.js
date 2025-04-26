import * as Yup from "yup";

export const RegistrationValidation = () => {
  return Yup.object().shape({
    fullname: Yup.string().required("Full-Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be 6 character long.")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm password is required"),
    city: Yup.string().required("Please select city"),
    country: Yup.string().required("Please select country"),
    // role: Yup.string().required("Please select role"),
    // bname:
    //   roleId == 1
    //     ? Yup.string().required("Business name is require")
    //     : Yup.string().nullable(),
    // btype:
    //   roleId == 1
    //     ? Yup.string().required("Business type is require")
    //     : Yup.string().nullable(),
    // baddress:
    //   roleId == 1
    //     ? Yup.string().required("Business address is require")
    //     : Yup.string().nullable(),
    // bcontact:
    //   roleId == 1
    //     ? Yup.string()
    //         .required("Business contact is require")
    //         .matches(/^[0-9]+$/, "Only numbers are allowed")
    //         .min(10, "Contact number must be at least 10 digits")
    //         .max(15, "Contact number must be at most 15 digits")
    //     : Yup.string().nullable(),
    // hname:
    //   roleId == 2
    //     ? Yup.string().required("Hospital name is require")
    //     : Yup.string().nullable(),
    // haddress:
    //   roleId == 2
    //     ? Yup.string().required("Hospital address is require")
    //     : Yup.string().nullable(),
    // hcontact:
    //   roleId == 2
    //     ? Yup.string()
    //         .required("Hospital contact is require")
    //         .matches(/^[0-9]+$/, "Only numbers are allowed")
    //         .min(10, "Contact number must be at least 10 digits")
    //         .max(15, "Contact number must be at most 15 digits")
    //     : Yup.string().nullable(),
  });
};
