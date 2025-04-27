import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import styles from "../../Styles/CommonStyle";
import { CreateBuisnessValidation } from "../../Validations/CreateBuisnessValidation";
import TextInputComponent from "../../Components/TextInputComponent";
import ButtonComponent from "../../Components/ButtonComponent";
import Constants from "../../Constants/Strings";
import DropDownComponent from "../../Components/DropDownComponent";
import { onCreateBuisness } from "../../Controller/Buisness/BuisnessController";
import LoaderComponent from "../../Components/LoaderComponent";
import { getLocalUser } from "../../Controller/global";

const CreateBuisness = ({ navigation }) => {
  const validation = CreateBuisnessValidation();
  const [categoryID, setcategoryID] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [countryId, setContryId] = useState();
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

  useEffect(() => {
    const getCountryID = async () => {
      try {
        setIsLoading(true);
        const user = await getLocalUser();
        setContryId(user.countryID);
      } catch (error) {
        console.error("Error: createBuisness.js getCountryID", error);
      } finally {
        setIsLoading(false);
      }
    };

    getCountryID();
  }, []);
  return (
    <View>
      <SafeAreaView nestedScrollEnabled={true}>
        <KeyboardAvoidingView>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Formik
              initialValues={{
                bname: "",
                email: "",
                baddress: "",
                bcontact: "",
                bcat: "",
                bcity: "",
              }}
              validationSchema={validation}
              enableReinitialize
              onSubmit={async (values) => {
                console.log("register clicked:", values);
                setIsLoading(true);
                const istrue = await onCreateBuisness(values);
                setIsLoading(false);
                if (istrue) {
                  navigation.navigate("BuisnessDashboard");
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
                      keyboardType="numeric"
                    />
                    <DropDownComponent
                      collectionName={"BuisnessCategory"}
                      label="Category"
                      placeholder="Select your Category"
                      labelField="catName"
                      valueField="catID"
                      maxHeight={1000}
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
                    label="Create"
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
