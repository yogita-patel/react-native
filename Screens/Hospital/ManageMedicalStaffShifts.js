import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import styles from "../../Styles/CommonStyle";
import { Formik } from "formik";
import TextInputComponent from "../../Components/TextInputComponent";
import LoaderComponent from "../../Components/LoaderComponent";
import TimePickerComponent from "../../Components/TimePickerComponent";
import { MedicalStaffValidation } from "../../Validations/MedicalStaffValidation";
import ButtonComponent from "../../Components/ButtonComponent";
import { MedicalStaffAsignShiftValidation } from "../../Validations/MedicalStaffAsignShiftValidation";
import { asignMedicalStaffShift } from "../../Controller/Hospital/MedicalStaffController";

const ManageMedicalStaffShifts = ({ navigation, route }) => {
  const validation = MedicalStaffAsignShiftValidation();
  const [isLoading, setLoading] = useState(false);
  const staffData = useState(route.params);
  useLayoutEffect(() => {
    if (staffData && staffData.length > 0 && staffData[0]) {
      const title = staffData[0].title;
      navigation.setOptions({
        title: title,
      });
    } else {
      navigation.setOptions({ title: "Manage Shift" });
    }
    console.log("staffData-------", staffData);
  }, [navigation, staffData]);

  const onAsignShift = async ({ Values }) => {
    try {
      setLoading(true);
      if (staffData) {
        const userID = staffData[0].staffData.userID;
        const staffID = staffData[0].staffData.staffID;
        console.log("Staff ID and USerID", staffID, userID);
        const added = await asignMedicalStaffShift({
          values: Values,
          staffId: staffID,
          userId: userID,
        });
        //  dispatch(setNeedsRefresh(true));
        if (added) navigation.goBack();
      }
    } catch (e) {
      console.log("Error: ManageMedicalStaffShifts.js onAsignShift:", e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Formik
            initialValues={{
              startTime: "",
              endTime: "",
              shiftDate: "",
              breakStartTime: "",
              breakEndTime: "",
            }}
            validationSchema={validation}
            enableReinitialize
            onSubmit={async (values) => {
              console.log("values ;", values);
              await onAsignShift({ Values: values });
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
                <Text style={[styles.welcomeText, { fontSize: 20 }]}>
                  {staffData
                    ? "Assign Shift to " + staffData[0].staffData.name
                    : "Assign Shift"}
                </Text>
                <TimePickerComponent
                  label="Shift date"
                  mode="date"
                  onConfirm={(date) => setFieldValue("shiftDate", date)}
                  error={errors.shiftDate}
                  touched={touched.shiftDate}
                  //   externalTime={
                  //     isForEdit
                  //       ? employeeData[0].employeeData.shiftDate.toDate()
                  //       : null
                  //   }
                />
                <TimePickerComponent
                  label="Start Time"
                  onConfirm={(time) => setFieldValue("startTime", time)}
                  error={errors.startTime}
                  touched={touched.startTime}
                  //   externalTime={
                  //     isForEdit
                  //       ? employeeData[0].employeeData.startTime.toDate()
                  //       : null
                  //   }
                />

                <TimePickerComponent
                  label="End Time"
                  onConfirm={(time) => setFieldValue("endTime", time)}
                  error={errors.endTime}
                  touched={touched.endTime}
                  //   externalTime={
                  //     isForEdit
                  //       ? employeeData[0].employeeData.endTime.toDate()
                  //       : null
                  //   }
                />
                <TimePickerComponent
                  label="Break Start Time"
                  onConfirm={(time) => setFieldValue("breakStartTime", time)}
                  error={errors.breakStartTime}
                  touched={touched.breakStartTime}
                  //   externalTime={
                  //     isForEdit
                  //       ? employeeData[0].employeeData.endTime.toDate()
                  //       : null
                  //   }
                />
                <TimePickerComponent
                  label="Break End Time"
                  onConfirm={(time) => setFieldValue("breakEndTime", time)}
                  error={errors.breakEndTime}
                  touched={touched.breakEndTime}
                  //   externalTime={
                  //     isForEdit
                  //       ? employeeData[0].employeeData.endTime.toDate()
                  //       : null
                  //   }
                />
                <ButtonComponent onButtonPress={handleSubmit} label="Assign" />
                <LoaderComponent show={isLoading} />
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ManageMedicalStaffShifts;
