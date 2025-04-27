import { KeyboardAvoidingView, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import LogoHeadingComponent from "../../Components/LogoHeadingComponent";
import styles from "../../Styles/CommonStyle";
import TextInputComponent from "../../Components/TextInputComponent";
import Constants from "../../Constants/Strings";
import ButtonComponent from "../../Components/ButtonComponent";
import HyperlinkTextComponent from "../../Components/HyperlinkTextComponent";
import LoaderComponent from "../../Components/LoaderComponent";
import LabelComponent from "../../Components/LabelComponent";
import PasswordInputComponent from "../../Components/PasswordInputComponent";
import { Formik } from "formik";
import { LoginValidation } from "../../Validations/LoginValidation";
import { loginUser } from "../../Controller/Authentication/LoginController";
const LoginScreen = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [emailText, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const validation = LoginValidation();
  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <LogoHeadingComponent />
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validation}
            enableReinitialize
            onSubmit={async (values) => {
              console.log("login clicked:", values);
              setIsLoading(true);
              const user = await loginUser(values);
              setIsLoading(false);
              if (user.businessID) {
                //if current user have buisness then it redirect to buisness dashboard
                navigation.navigate("BuisnessDashboard");
              } else {
                navigation.navigate("InitialScreen");
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <TextInputComponent
                  placeholder={Constants.strings.emailPlaceholder}
                  onChangeText={handleChange("email")}
                  label={Constants.labels.emailLabel}
                  value={values.email}
                  onBlur={handleBlur("email")}
                  error={touched.email && errors.email}
                />
                <LabelComponent label={Constants.labels.passwordLabel} />
                <PasswordInputComponent
                  placeholder={Constants.strings.passwordPlaceholder}
                  onChangeText={handleChange("password")}
                  value={values.password}
                  onBlur={handleBlur("password")}
                  error={touched.password && errors.password}
                />
                <ButtonComponent onButtonPress={handleSubmit} label="Login" />
                <LoaderComponent show={isLoading}></LoaderComponent>
                <HyperlinkTextComponent
                  onTextPress={() => navigation.navigate("Register")}
                  text="Don't have account? Register here"
                />
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
