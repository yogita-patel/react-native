import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { Formik } from "formik";
import { MedicalStaffValidation } from "../../Validations/MedicalStaffValidation";
import styles from "../../Styles/CommonStyle";
import DropDownComponent from "../../Components/DropDownComponent";
import Constants from "../../Constants/Strings";
import TextInputComponent from "../../Components/TextInputComponent";
import ButtonComponent from "../../Components/ButtonComponent";
import LoaderComponent from "../../Components/LoaderComponent";
import { addMedicalStaff } from "../../Controller/Hospital/MedicalStaffController";
const CreateMedicalStaff = ({ navigation }) => {
  const validation = MedicalStaffValidation();
  const [isForEdit, setIsForEdit] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const onAddMedicalStaff = async ({ values }) => {
    try {
      setLoading(true);
      const isAdded = await addMedicalStaff({ values: values });
      if (isAdded) {
        navigation.goBack();
      }
    } catch (e) {
      console.log("Error: CreateMedicalStaff.js onAddMedicalStaff:", e);
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
              user: "",
              contact: "",
              address: "",
              staffRole: "",
              docSpeciality: "",
            }}
            validationSchema={validation}
            enableReinitialize
            onSubmit={async (values) => {
              console.log("values ;", values);
              onAddMedicalStaff({ values: values });
              //   if (isForEdit) {
              //     // console.log("businesssssssssssssId", buisnessID);
              //     const isEdited = await updateEmployeeData({
              //       employeeData: values,
              //       buisnessID: buisnessID,
              //       employeeID: employeeData[0]?.employeeData.employeeID,
              //     });
              //     if (isEdited) {
              //       navigation.goBack();
              //     }
              //   } else {
              //     await onAddEmployee({ Values: values });
              //   }
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
                <DropDownComponent
                  collectionName={"Users"}
                  label="Users"
                  placeholder="Select Doctor by email"
                  labelField="email"
                  valueField="userID"
                  maxHeight={1000}
                  onSelectItem={(item) => setFieldValue("user", item.value)}
                  error={errors.user}
                  touched={errors.user}
                  selectedValue={values.user}
                  setSelectedValue={(val) => setFieldValue("user", val)}
                  conditionLabel={"roleID"}
                  conditionValue={Constants.usersRole.citizen}
                />
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
                <View style={{ zIndex: 3000, position: "relative" }}>
                  <DropDownComponent
                    collectionName={"MedicalStaffRole"}
                    labelField="role"
                    valueField="medicalStaffRoleID"
                    label="Role"
                    placeholder="Select staff role"
                    onSelectItem={(item) =>
                      setFieldValue("staffRole", item.value)
                    }
                    error={errors.staffRole}
                    touched={touched.staffRole}
                    selectedValue={values.staffRole}
                    setSelectedValue={(val) => setFieldValue("staffRole", val)}
                  />
                </View>
                <View style={{ zIndex: 2000, position: "relative" }}>
                  <DropDownComponent
                    collectionName={"DoctorSpecialties"}
                    labelField="SpecialityType"
                    valueField="SpecialityID"
                    label="Doctor Speciality"
                    placeholder="Select Doctor Speciality"
                    onSelectItem={(item) =>
                      setFieldValue("docSpeciality", item.value)
                    }
                    error={errors.docSpeciality}
                    touched={touched.docSpeciality}
                    selectedValue={values.docSpeciality}
                    setSelectedValue={(val) =>
                      setFieldValue("docSpeciality", val)
                    }
                  />
                </View>
                <ButtonComponent
                  onButtonPress={handleSubmit}
                  label={isForEdit ? "Edit" : "Add"}
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

export default CreateMedicalStaff;
