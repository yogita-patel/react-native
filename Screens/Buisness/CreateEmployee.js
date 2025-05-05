import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import IntroButtonComponent from "../../Components/IntroButtonComponent";
import styles from "../../Styles/CommonStyle";
import { Formik } from "formik";
import { EmployeeValidation } from "../../Validations/EmployeeValidation";
import DropDownComponent from "../../Components/DropDownComponent";
import TextInputComponent from "../../Components/TextInputComponent";
import Constants from "../../Constants/Strings";
import ButtonComponent from "../../Components/ButtonComponent";
import WorkingDayComponent from "../../Components/WorkingDayComponent";
import TimePickerComponent from "../../Components/TimePickerComponent";
import LabelComponent from "../../Components/LabelComponent";
import { getBuisness } from "../../Controller/Buisness/BuisnessController";
import LoaderComponent from "../../Components/LoaderComponent";
import {
  addEmployee,
  updateEmployeeData,
} from "../../Controller/Employees/EmployeeController";
const CreateEmployee = ({ navigation, route }) => {
  const [isExistingUSer, setIsExistingUser] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [roleId, setRoleId] = useState();
  const validation = EmployeeValidation();
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [joiningDate, set] = useState(null);
  const [cityID, setCityID] = useState();
  const [isLoading, setLoading] = useState(false);
  const [buisnessID, setBuisnessId] = useState();
  const employeeData = useState(route.params);
  const [isForEdit, setIsForEdit] = useState(false);

  const getBuisnessCity = async () => {
    try {
      const b = await getBuisness();
      setCityID(b.citId);
      setBuisnessId(b.buisnessID);
      // console.log("businesssssssssssssId", b);
    } catch (e) {
      console.error("Failed to  getBuisnessCity:", e);
    } finally {
    }
  };
  useEffect(() => {
    getBuisnessCity();
  }, []);

  //change header title while  screen calls for edit
  useLayoutEffect(() => {
    getBuisnessCity();
    if (employeeData && employeeData.length > 0 && employeeData[0]) {
      // console.log(
      //   "change navcigation title----",
      //   employeeData[0].employeeData.joiningDate.toDate()
      // );
      // console.log(
      //   "change navcigation title----",
      //   employeeData[0].employeeData.name
      // );
      const title = employeeData[0].title;
      navigation.setOptions({ title: title });
      setIsForEdit(true);
    } else {
      navigation.setOptions({ title: "Add Employee" });
      setIsForEdit(false);
    }
    console.log("EmployeeData-------", employeeData);
  }, [navigation, employeeData]);

  const selectExistingUser = async () => {
    try {
      setIsExistingUser(true);
    } catch (e) {
      console.log("Exception: buisnessAccout.js selectExistingUser", e);
    } finally {
    }
  };

  const handelTypeSelection = (item, setFieldValue) => {
    setRoleId(item.value);
    console.log("roleId");
    console.log(roleId);
    setFieldValue("role", item.value);
  };
  const handleDuration = (item, setFieldValue) => {
    // setRoleId(item.value);
    // console.log("roleId");
    // console.log(roleId);
    setFieldValue("duration", item.value);
  };

  const handleEmployeeSelection = (item, setFieldValue) => {
    try {
      setEmployee(item.value);
      //   setFieldValue("city", item.value);
    } catch (e) {
      console.log("Error: CreateEmployee.js handleEmployeeSelection:", e);
    }
  };

  // const handelCitySelection = (item, setFieldValue) => {
  //   try {
  //     setCityId(item.value);
  //     setFieldValue("city", item.value);
  //   } catch (e) {
  //     console.log("Error: RegisterScreen.js handelCitySelection:", e);
  //   }
  // };

  const onWorkdaysChange = async () => {
    try {
      console.log("workdays:");
      setWorkdays;
      // setFieldValue("workingDays", setWorkdays);
    } catch (e) {
      console.log("Error: CreateEmployee.js onWorkdaysChange:", e);
    }
  };

  const onAddEmployee = async ({ Values }) => {
    try {
      console.log("add Employee:", Values);
      setLoading(true);
      const added = await addEmployee({
        values: Values,
        buisnessID: buisnessID,
      });
      //  dispatch(setNeedsRefresh(true));
      navigation.goBack();
    } catch (e) {
      console.log("Error: CreateEmployee.js onAddEmployee:", e);
    } finally {
      setLoading(false);
    }
  };
  const [workingDays, setWorkdays] = useState([]);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {isForEdit ? null : !isExistingUSer ? (
            <View>
              <IntroButtonComponent
                iconName={"add"}
                onPress={selectExistingUser}
                title={"Add Existing User"}
              ></IntroButtonComponent>
              <Text style={[styles.label, { textAlign: "center" }]}>OR</Text>
              <IntroButtonComponent
                iconName={"share"}
                onPress={() => console.log("Employee")}
                title={"Invite as a User"}
              ></IntroButtonComponent>
            </View>
          ) : null}
          {(isForEdit || isExistingUSer) && (
            <View>
              <Formik
                initialValues={{
                  user: employeeData[0]?.employeeData.userID || "",
                  contact: employeeData[0]?.employeeData.contact || "",
                  // city: "",
                  address: employeeData[0]?.employeeData.address || "",
                  // email: "",
                  employeeRole: employeeData[0]?.employeeData.roleID || "",
                  payRate: employeeData[0]?.employeeData.payRate || "",
                  duration:
                    employeeData[0]?.employeeData.paymentDurationID || "",
                  startTime:
                    employeeData[0]?.employeeData.startTime?.toDate?.() ||
                    employeeData[0]?.employeeData.startTime ||
                    "",
                  endTime:
                    employeeData[0]?.employeeData.endTime.toDate() ||
                    employeeData[0]?.employeeData.endTime ||
                    "",
                  joiningDate:
                    employeeData[0]?.employeeData.joiningDate.toDate() ||
                    employeeData[0]?.employeeData.joiningDate ||
                    "",
                  workingDays: employeeData[0]?.employeeData.workingDays || "",
                }}
                validationSchema={validation}
                enableReinitialize
                onSubmit={async (values) => {
                  console.log("values ;", values);
                  if (isForEdit) {
                    // console.log("businesssssssssssssId", buisnessID);
                    const isEdited = await updateEmployeeData({
                      employeeData: values,
                      buisnessID: buisnessID,
                      employeeID: employeeData[0]?.employeeData.employeeID,
                    });
                    if (isEdited) {
                      navigation.goBack();
                    }
                  } else {
                    await onAddEmployee({ Values: values });
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
                    {isForEdit ? (
                      <Text style={[styles.welcomeText, { fontSize: 20 }]}>
                        {"Edit " +
                          employeeData[0].employeeData.name +
                          " Details"}
                      </Text>
                    ) : (
                      <DropDownComponent
                        collectionName={"Users"}
                        label="Users"
                        placeholder="Select Employee by email"
                        labelField="email"
                        valueField="userID"
                        maxHeight={1000}
                        onSelectItem={(item) =>
                          handleEmployeeSelection(item, setFieldValue)
                        }
                        error={errors.user}
                        touched={errors.user}
                        selectedValue={values.user}
                        setSelectedValue={(val) => setFieldValue("user", val)}
                        conditionLabel={"roleID"}
                        conditionValue={Constants.usersRole.citizen}
                      />
                    )}
                    <View style={styles.commonMarging20}></View>
                    <Text style={[styles.welcomeText, { fontSize: 20 }]}>
                      Personal-Info
                    </Text>
                    <TextInputComponent
                      placeholder={Constants.strings.contact}
                      label={Constants.labels.contact}
                      onChangeText={handleChange("contact")}
                      value={values.contact}
                      onBlur={handleBlur("contact")}
                      error={touched.contact && errors.contact}
                    />
                    {/* <DropDownComponent
                      collectionName={"Cities"}
                      label="City"
                      placeholder="Select your city"
                      labelField="cityName"
                      valueField="ID"
                      maxHeight={1000}
                      onSelectItem={(item) =>
                        handelCitySelection(item, setFieldValue)
                      }
                      // noData={
                      //   !countryId
                      //     ? "Please select country"
                      //     : "No city found for this country"
                      // }
                      error={errors.city}
                      touched={errors.city}
                      selectedValue={values.city}
                      setSelectedValue={(val) => setFieldValue("city", val)}
                      conditionLabel={"countryID"}
                      conditionValue={cityID}
                    /> */}
                    <TextInputComponent
                      placeholder={Constants.strings.address}
                      label={Constants.labels.address}
                      onChangeText={handleChange("address")}
                      value={values.address}
                      onBlur={handleBlur("address")}
                      error={touched.address && errors.address}
                    />
                    <View style={styles.commonMarging20}></View>
                    <Text style={[styles.welcomeText, { fontSize: 20 }]}>
                      Work-Info
                    </Text>
                    <DropDownComponent
                      collectionName={"Roles"}
                      labelField="roleName"
                      valueField="ID"
                      label="Role"
                      placeholder="Select your role"
                      onSelectItem={(item) =>
                        handelTypeSelection(item, setFieldValue)
                      }
                      error={errors.employeeRole}
                      touched={touched.employeeRole}
                      selectedValue={values.employeeRole}
                      setSelectedValue={(val) =>
                        setFieldValue("employeeRole", val)
                      }
                    />
                    <TextInputComponent
                      placeholder={Constants.strings.payrate}
                      label={Constants.labels.payrate}
                      onChangeText={handleChange("payRate")}
                      value={values.payRate}
                      keyboardType="numeric"
                      onBlur={handleBlur("payRate")}
                      error={touched.payRate && errors.payRate}
                    />
                    <DropDownComponent
                      collectionName={"PaymentDuration"}
                      labelField="duration"
                      valueField="durationID"
                      label="Payment time-line"
                      placeholder="select duration"
                      onSelectItem={(item) =>
                        handleDuration(item, setFieldValue)
                      }
                      error={errors.duration}
                      touched={touched.duration}
                      selectedValue={values.duration}
                      setSelectedValue={(val) => setFieldValue("duration", val)}
                    />
                    <TimePickerComponent
                      label="Start Time"
                      onConfirm={(time) => setFieldValue("startTime", time)}
                      error={errors.startTime}
                      touched={touched.startTime}
                      externalTime={
                        isForEdit
                          ? employeeData[0].employeeData.startTime.toDate()
                          : null
                      }
                    />

                    <TimePickerComponent
                      label="End Time"
                      onConfirm={(time) => setFieldValue("endTime", time)}
                      error={errors.endTime}
                      touched={touched.endTime}
                      externalTime={
                        isForEdit
                          ? employeeData[0].employeeData.endTime.toDate()
                          : null
                      }
                    />
                    <TimePickerComponent
                      label="Joining date"
                      mode="date"
                      onConfirm={(date) => setFieldValue("joiningDate", date)}
                      error={errors.joiningDate}
                      touched={touched.joiningDate}
                      externalTime={
                        isForEdit
                          ? employeeData[0].employeeData.joiningDate.toDate()
                          : null
                      }
                    />
                    <LabelComponent label={Constants.labels.weekdays} />
                    <WorkingDayComponent
                      onChange={(val) => setFieldValue("workingDays", val)}
                      error={errors.workingDays}
                      touched={touched.workingDays}
                      checked={
                        isForEdit
                          ? employeeData[0].employeeData.workingDays
                          : []
                      }
                    />
                    {/* <Text>Selected: {JSON.stringify(workdays)}</Text> */}
                    <ButtonComponent
                      onButtonPress={handleSubmit}
                      label={isForEdit ? "Edit" : "Add"}
                    />
                    <LoaderComponent show={isLoading} />
                  </>
                )}
              </Formik>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateEmployee;
