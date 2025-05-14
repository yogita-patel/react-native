import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from "react-native";
import React, { useState } from "react";
import LogoHeadingComponent from "../../Components/LogoHeadingComponent";
import { Formik } from "formik";
import styles from "../../Styles/CommonStyle";
import TextInputComponent from "../../Components/TextInputComponent";
import Constants from "../../Constants/Strings";
import ButtonComponent from "../../Components/ButtonComponent";
import HyperlinkTextComponent from "../../Components/HyperlinkTextComponent";
import DropDownComponent from "../../Components/DropDownComponent";
import PasswordInputComponent from "../../Components/PasswordInputComponent";
import LabelComponent from "../../Components/LabelComponent";
import { RegistrationValidation } from "../../Validations/RegisterValidation";
import { onRegister } from "../../Controller/Authentication/RegisterationController";

const RegisterScreen = ({ navigation }) => {
  const [roleId, setRoleId] = useState();
  const [cityId, setCityId] = useState();
  const [countryId, setContryId] = useState();

  const validation = RegistrationValidation();
  const handelTypeSelection = (item, setFieldValue) => {
    setRoleId(item.value);
    console.log("roleId");
    console.log(roleId);
    setFieldValue("role", item.value);
  };
  //------------------ calls on country selection -------------------
  const handelCountrySelection = (item, setFieldValue) => {
    setContryId(item.value);
    console.log("country");
    console.log(countryId);
    setFieldValue("country", item.value);
  };

  //-------------------- calls on city selection -----------------------
  const handelCitySelection = (item, setFieldValue) => {
    try {
      setCityId(item.value);
      setFieldValue("city", item.value);
    } catch (e) {
      console.log("Error: RegisterScreen.js handelCitySelection:", e);
    }
  };

  return (
    <SafeAreaView nestedScrollEnabled={true}>
      <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <LogoHeadingComponent />
          <Formik
            initialValues={{
              email: "",
              password: "",
              fullname: "",
              city: "",
              confirmPassword: "",
              // role: "",
              country: "",
              // bname: "",
              // btype: "",
              // baddress: "",
              // bcontact: "",
              // hname: "",
              // haddress: "",
              // hcontact: "",
            }}
            validationSchema={validation}
            enableReinitialize
            onSubmit={(values) => {
              console.log("register clicked:", values);
              const istrue = onRegister(values);
              if (istrue) {
                navigation.navigate("InitialScreen");
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <>
                <TextInputComponent
                  placeholder={Constants.strings.fullNamePlaceholder}
                  label={Constants.labels.fullNameLabel}
                  onChangeText={handleChange("fullname")}
                  value={values.fullname}
                  onBlur={handleBlur("fullname")}
                  error={touched.fullname && errors.fullname}
                />
                <View style={{ zIndex: 3000, position: "relative" }}>
                  <DropDownComponent
                    collectionName={"Countries"}
                    label="Country"
                    placeholder="Select your country"
                    labelField="name"
                    valueField="countryID"
                    maxHeight={1000}
                    onSelectItem={(item) =>
                      handelCountrySelection(item, setFieldValue)
                    }
                    error={errors.country}
                    touched={errors.country}
                    selectedValue={values.country}
                    setSelectedValue={(val) => setFieldValue("country", val)}
                  />
                </View>
                <View style={{ zIndex: 1000, position: "relative" }}>
                  <DropDownComponent
                    collectionName={"Cities"}
                    label="City"
                    placeholder="Select your city"
                    labelField="cityName"
                    valueField="ID"
                    maxHeight={1000}
                    onSelectItem={(item) =>
                      handelCitySelection(item, setFieldValue)
                    }
                    noData={
                      !countryId
                        ? "Please select country"
                        : "No city found for this country"
                    }
                    error={errors.city}
                    touched={errors.city}
                    selectedValue={values.city}
                    setSelectedValue={(val) => setFieldValue("city", val)}
                    conditionLabel={"countryID"}
                    conditionValue={countryId}
                  />
                </View>
                <TextInputComponent
                  placeholder={Constants.strings.emailPlaceholder}
                  label={Constants.labels.emailLabel}
                  onChangeText={handleChange("email")}
                  value={values.email}
                  onBlur={handleBlur("email")}
                  error={touched.email && errors.email}
                />
                {/* <TextInputComponent
            placeholder={Constants.strings.passwordPlaceholder}
            onChangeText={setPassword}
            secureTextEntry={true}
            label={Constants.labels.passwordLabel}
          /> */}
                <LabelComponent label={Constants.labels.passwordLabel} />
                <PasswordInputComponent
                  placeholder={Constants.strings.passwordPlaceholder}
                  onChangeText={handleChange("password")}
                  value={values.password}
                  onBlur={handleBlur("password")}
                  error={touched.password && errors.password}
                />
                <LabelComponent label={Constants.labels.repasswordLabel} />
                <PasswordInputComponent
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  placeholder={Constants.strings.repasswordPlaceholder}
                  onBlur={handleBlur("confirmPassword")}
                  error={touched.confirmPassword && errors.confirmPassword}
                />
                {/* <View>
                  <DropDownComponent
                    collectionName={"Roles"}
                    labelField="roleName"
                    valueField="ID"
                    label="Role"
                    placeholder="Select your role"
                    onSelectItem={(item) =>
                      handelTypeSelection(item, setFieldValue)
                    }
                    error={errors.role}
                    touched={touched.role}
                    selectedValue={values.role}
                    setSelectedValue={(val) => setFieldValue("role", val)}
                  />
                </View>
                {roleId == 1 ? (
                  <View>
                    <TextInputComponent
                      placeholder={Constants.strings.businessNamePlaceholder}
                      // onChangeText={setText}
                      label={Constants.labels.businessNameLabel}
                      onChangeText={handleChange("bname")}
                      value={values.bname}
                      onBlur={handleBlur("bname")}
                      error={touched.bname && errors.bname}
                    />
                    <TextInputComponent
                      placeholder={Constants.strings.businessTypePlaceholder}
                      label={Constants.labels.businessTypeLabel}
                      onChangeText={handleChange("btype")}
                      value={values.btype}
                      onBlur={handleBlur("btype")}
                      error={touched.btype && errors.btype}
                    />
                    <TextInputComponent
                      placeholder={Constants.strings.businessAddressPlaceholder}
                      label={Constants.labels.businessAddressLabel}
                      onChangeText={handleChange("baddress")}
                      value={values.baddress}
                      onBlur={handleBlur("baddress")}
                      error={touched.baddress && errors.baddress}
                    />
                    <TextInputComponent
                      placeholder={Constants.strings.businessContactPlaceholder}
                      label={Constants.labels.businessContactLabel}
                      onChangeText={handleChange("bcontact")}
                      value={values.bcontact}
                      onBlur={handleBlur("bcontact")}
                      error={touched.bcontact && errors.bcontact}
                    />
                  </View>
                ) : roleId == 2 ? (
                  <View>
                    <TextInputComponent
                      placeholder={Constants.strings.hospitalNamePlaceholder}
                      label={Constants.labels.hospitalNameLabel}
                      onChangeText={handleChange("hname")}
                      value={values.hname}
                      onBlur={handleBlur("hname")}
                      error={touched.hname && errors.hname}
                    />
                    <TextInputComponent
                      placeholder={Constants.strings.hospitalAddressPlaceholder}
                      label={Constants.labels.hospitalAddressLabel}
                      onChangeText={handleChange("haddress")}
                      value={values.haddress}
                      onBlur={handleBlur("haddress")}
                      error={touched.haddress && errors.haddress}
                    />
                    <TextInputComponent
                      placeholder={Constants.strings.hospitalContactPlaceholder}
                      label={Constants.labels.hospitalContactLabel}
                      onChangeText={handleChange("hcontact")}
                      value={values.hcontact}
                      onBlur={handleBlur("hcontact")}
                      error={touched.hcontact && errors.hcontact}
                    />
                  </View>
                ) : null} */}
                <ButtonComponent
                  onButtonPress={handleSubmit}
                  label="Register"
                />
                <HyperlinkTextComponent
                  onTextPress={() => navigation.goBack()}
                  text="Already have account? Login here"
                />
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
