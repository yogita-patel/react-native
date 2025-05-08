import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Formik } from "formik";
import styles from "../../Styles/CommonStyle";
import { CreateBuisnessValidation } from "../../Validations/CreateBuisnessValidation";
import TextInputComponent from "../../Components/TextInputComponent";
import ButtonComponent from "../../Components/ButtonComponent";
import Constants from "../../Constants/Strings";
import DropDownComponent from "../../Components/DropDownComponent";
import {
  onCreateBuisness,
  updateBuisness,
} from "../../Controller/Buisness/BuisnessController";
import LoaderComponent from "../../Components/LoaderComponent";
import { getLocalUser } from "../../Controller/global";

const CreateBuisness = ({ route, navigation }) => {
  const [categoryID, setcategoryID] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [countryId, setContryId] = useState();
  const businessData = useState(route.params);
  const [isForHospital, setIsForHospital] = useState(false);
  const validation = CreateBuisnessValidation({ isHospital: isForHospital });
  const [isForEdit, setIsForEdit] = useState(false);
  // const data = useState(route.params); //used for hospital data if i use buisnessdata it'll create confusion

  const handelCategorySelection = (item, setFieldValue) => {
    try {
      setcategoryID(item.value);
      setFieldValue("bcat", item.value);
    } catch (e) {
      console.log("Error: RegisterScreen.js handelCategorySelection:", e);
    }
  };
  const handelCitySelection = (item, setFieldValue) => {
    try {
      // setCityId(item.value);
      setFieldValue("bcity", item.value);
    } catch (e) {
      console.log("Error: createBuisness.js handelCitySelection:", e);
    }
  };
  //change header title while  screen calls for edit
  useLayoutEffect(() => {
    if (businessData) {
      console.log("buisnessData=================", businessData);
      if (businessData[0].title) {
        console.log("change navigation title", businessData[0].title);
        const title = businessData[0].title;
        navigation.setOptions({ title: title });
      }
      if (businessData[0].isHospital) {
        setIsForHospital(true);
      }
      if (businessData[0].isForEdit) {
        setIsForEdit(true);
      }
    }
  }, [navigation, businessData]);
  const getCountryID = async () => {
    try {
      // console.log("buisnessdata for id", businessData[0].title);
      setIsLoading(true);
      const user = await getLocalUser();
      setContryId(user.countryID);
    } catch (error) {
      console.error("Error: createBuisness.js getCountryID", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCountryID();
  }, []);
  return (
    <View>
      <SafeAreaView nestedScrollEnabled={true}>
        <KeyboardAvoidingView>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Formik
              initialValues={{
                bname: isForEdit
                  ? businessData[0].buisnessData.buisnessName || ""
                  : "",
                email: isForEdit
                  ? businessData[0].buisnessData.buisnessEmail || ""
                  : "",
                baddress: isForEdit
                  ? businessData[0].buisnessData.buisnessAddress || ""
                  : "",
                bcontact: isForEdit
                  ? businessData[0].buisnessData.buisnessContact || ""
                  : "",
                bcat: isForEdit
                  ? businessData[0].buisnessData.buisnessCategory || ""
                  : isForHospital
                  ? Constants.buisnessCategoryId.hospital
                  : "",
                bcity: isForEdit
                  ? businessData[0].buisnessData.cityId || ""
                  : "",
                htype: isForEdit
                  ? businessData[0].buisnessData.hospitalType || ""
                  : "",
              }}
              validationSchema={validation}
              enableReinitialize
              onSubmit={async (values) => {
                console.log("register clicked:", values);
                setIsLoading(true);
                if (isForEdit) {
                  const updated = await updateBuisness({
                    businessId: businessData[0].buisnessData.buisnessID,
                    values: values,
                    isHospital: isForHospital,
                  });
                  if (updated) {
                    navigation.goBack();
                  }
                } else if (isForEdit && isForHospital) {
                } else {
                  const istrue = await onCreateBuisness({
                    values: values,
                    isHospital: isForHospital,
                  });
                  console.log(
                    "Register Done===========",
                    istrue,
                    isForHospital
                  );
                  if (istrue && isForHospital) {
                    console.log(
                      "if Register Done===========",
                      istrue,
                      isForHospital
                    );
                    navigation.navigate("HospitalDashboard");
                  } else if (istrue) {
                    navigation.navigate("BuisnessDashboard");
                  }
                }
                setIsLoading(false);
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
                  <View>
                    <TextInputComponent
                      placeholder={
                        isForHospital
                          ? Constants.strings.hospitalNamePlaceholder
                          : Constants.strings.businessNamePlaceholder
                      }
                      // onChangeText={setText}
                      label={
                        isForHospital
                          ? Constants.labels.hospitalNameLabel
                          : Constants.labels.businessNameLabel
                      }
                      onChangeText={handleChange("bname")}
                      value={values.bname}
                      onBlur={handleBlur("bname")}
                      error={touched.bname && errors.bname}
                    />
                    <TextInputComponent
                      placeholder={Constants.strings.emailPlaceholder}
                      label={Constants.labels.emailLabel}
                      onChangeText={handleChange("email")}
                      value={values.email}
                      onBlur={handleBlur("email")}
                      error={touched.email && errors.email}
                    />
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
                      error={errors.bcity}
                      touched={errors.bcity}
                      selectedValue={values.bcity}
                      setSelectedValue={(val) => setFieldValue("bcity", val)}
                      conditionLabel={"countryID"}
                      conditionValue={countryId}
                    />
                    <TextInputComponent
                      placeholder={
                        isForHospital
                          ? Constants.strings.hospitalAddressPlaceholder
                          : Constants.strings.businessAddressPlaceholder
                      }
                      label={
                        isForHospital
                          ? Constants.labels.hospitalAddressLabel
                          : Constants.labels.businessAddressLabel
                      }
                      onChangeText={handleChange("baddress")}
                      value={values.baddress}
                      onBlur={handleBlur("baddress")}
                      error={touched.baddress && errors.baddress}
                    />
                    <TextInputComponent
                      placeholder={
                        isForHospital
                          ? Constants.strings.businessContactPlaceholder
                          : Constants.strings.businessContactPlaceholder
                      }
                      label={
                        isForHospital
                          ? Constants.labels.hospitalContactLabel
                          : Constants.labels.businessContactLabel
                      }
                      onChangeText={handleChange("bcontact")}
                      value={values.bcontact}
                      onBlur={handleBlur("bcontact")}
                      error={touched.bcontact && errors.bcontact}
                      keyboardType="numeric"
                    />
                    {isForHospital && (
                      <DropDownComponent
                        collectionName={Constants.collectionName.hospitalType}
                        label="Hospital Type"
                        placeholder="Select hospital type"
                        labelField="hospitalTypeName"
                        valueField="hospitalTypeID"
                        maxHeight={1000}
                        // isDisable={isForHospital}
                        onSelectItem={(item) =>
                          setFieldValue("htype", item.value)
                        }
                        error={errors.htype}
                        touched={errors.htype}
                        selectedValue={values.htype}
                        setSelectedValue={(val) => setFieldValue("htype", val)}
                      />
                    )}
                    <DropDownComponent
                      collectionName={"BuisnessCategory"}
                      label="Category"
                      placeholder="Select your Category"
                      labelField="catName"
                      valueField="catID"
                      maxHeight={1000}
                      isDisable={isForHospital}
                      onSelectItem={(item) =>
                        handelCategorySelection(item, setFieldValue)
                      }
                      error={errors.bcat}
                      touched={errors.bcat}
                      selectedValue={values.bcat}
                      setSelectedValue={(val) => setFieldValue("bcat", val)}
                    />
                  </View>
                  <LoaderComponent show={isLoading} />
                  <ButtonComponent
                    onButtonPress={handleSubmit}
                    label={isForEdit ? "Edit" : "Create"}
                  />
                </>
              )}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default CreateBuisness;
