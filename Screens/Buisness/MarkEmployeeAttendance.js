import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import styles from "../../Styles/CommonStyle";
import { Formik } from "formik";
import ButtonComponent from "../../Components/ButtonComponent";

import TimePickerComponent from "../../Components/TimePickerComponent";
import Constants from "../../Constants/Strings";
import { AttendanceEmployeeValidation } from "../../Validations/AttendanceValidation";
import TextInputComponent from "../../Components/TextInputComponent";
import { markAttendance } from "../../Controller/Employees/AttendanceController";
import { useFormikContext } from "formik";
import LoaderComponent from "../../Components/LoaderComponent";
const MarkEmployeeAttendance = ({ navigation, route }) => {
  const { employee } = route.params;
  const validation = AttendanceEmployeeValidation();
  const [isLoading, setIsLoadind] = useState(false);
  //   const resetForm = useFormikContext();

  useLayoutEffect(() => {
    console.log("mark Attendance----------------", employee);
    navigation.setOptions({
      title: employee?.name || "Employee Details",
    });
  }, [navigation, employee]);
  const initialValues = {
    checkin: "",
    checkout: "",
    // city: "",
    break: "",
    // email: "",
    attendanceDate: "",
  };
  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={[styles.welcomeText, { fontSize: 20 }]}>
            Mark Attendance of {employee.name}
          </Text>
          <Formik
            initialValues={initialValues}
            validationSchema={validation}
            enableReinitialize={true}
            onSubmit={async (values, { resetForm }) => {
              setIsLoadind(true);
              console.log("values ;", values);
              console.log("Emplyee data---------------------", employee);
              console.log(
                "check buisness id before markAttendance:-",
                employee.businessID
              );
              await markAttendance({
                values: values,
                employeeID: employee.employeeID,
                buisnessID: employee.businessID,
              });
              setIsLoadind(false);
              navigation.goBack();
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
                <TimePickerComponent
                  label={Constants.labels.checkin}
                  onConfirm={(time) => setFieldValue("checkin", time)}
                  error={errors.checkin}
                  touched={touched.checkin}
                />
                <TimePickerComponent
                  label={Constants.labels.checkout}
                  onConfirm={(time) => setFieldValue("checkout", time)}
                  error={errors.checkout}
                  touched={touched.checkout}
                />
                <TextInputComponent
                  placeholder={Constants.strings.breakHours}
                  label={Constants.labels.break}
                  onChangeText={handleChange("break")}
                  value={values.break}
                  keyboardType="numeric"
                  onBlur={handleBlur("break")}
                  error={touched.break && errors.break}
                />
                <TimePickerComponent
                  label="Date"
                  mode="date"
                  onConfirm={(date) => setFieldValue("attendanceDate", date)}
                  error={errors.attendanceDate}
                  touched={touched.attendanceDate}
                />
                <ButtonComponent
                  onButtonPress={handleSubmit}
                  label="Add"
                  align="center"
                />
                <LoaderComponent show={isLoading} />
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MarkEmployeeAttendance;
