import * as Yup from "yup";

export const LoginValidation = () => {
  return Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be 6 character long.")
      .required("Password is required"),
  });
};
