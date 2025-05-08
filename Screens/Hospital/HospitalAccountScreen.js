import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import Colors from "../../Constants/Colors";
import ConfrimationDialog from "../../Components/ConfrimationDialog";
import LoaderComponent from "../../Components/LoaderComponent";
import styles from "../../Styles/CommonStyle";
import { logoutUser } from "../../Controller/Authentication/LogoutController";
import ImageContainerComponenet from "../../Components/ImageContainerComponenet";
import DisplayInfoField from "../../Components/DisplayInfoField";
import DividerComponent from "../../Components/DividerComponent";
import ButtonComponent from "../../Components/ButtonComponent";
import {
  getBuisness,
  getBuisnessCategory,
  getBuisnessCity,
  getHospitaltype,
} from "../../Controller/Buisness/BuisnessController";
import { updateProfileImage } from "../../Controller/Buisness/BuisnessController";
import {
  pickImage,
  uploadImageFirebaseStorage,
} from "../../Controller/Image/UploadImage";

const HospitalAccountScreen = ({ navigation }) => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buisnessImage, setBuisnessImage] = useState(null);
  const [hospitalData, setHospitalData] = useState({});
  const [city, setCity] = useState(null);
  const [hospitalType, setHospitalType] = useState(null);
  const [category, setCategory] = useState(null);
  useLayoutEffect(() => {
    navigation.setParams({ openLogoutDialog: () => setShowLogoutDialog(true) });
    setCategory(null);
    getHospitalInfo();
  }, [navigation]);

  const buisnessProfilePicEdit = async () => {
    try {
      setIsLoading(true);
      const result = await pickImage();
      console.log("Image result:", result);
      if (result) {
        if (!result.canceled) {
          setBuisnessImage(result.assets[0].uri);
          await handleImageUploading({ image: result.assets[0].uri });
        }
      }
    } catch (e) {
      console.error("Failed to  buisnessProfilePicEdit:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUploading = async ({ image }) => {
    try {
      const uploadedImg = await uploadImageFirebaseStorage({
        imageUrl: image,
      });
      if (uploadedImg) {
        await updateProfileImage({ image: uploadedImg });
      }
    } catch (e) {
      console.error("Error  handleImageUploading:", e);
    } finally {
    }
  };

  const getHospitalInfo = async () => {
    try {
      setIsLoading(true);
      const b = await getBuisness();
      setHospitalData(b);
      setBuisnessImage(b.buisnessProfile);
      const cat = await getBuisnessCategory({ catID: b.buisnessCategory });
      setCategory(cat);
      console.log("buisnesscat------ :", cat);
      const c = await getBuisnessCity({ cityID: b.cityId });
      setCity(c);
      const h = await getHospitaltype({ type: b.hospitalType });
      setHospitalType(h.hospitalTypeName);
      console.log("setHospitalType------ :", h.hospitalTypeName);
      console.log("buisness = ", hospitalData);
    } catch (e) {
      console.error("Failed to  getHospitalInfo:", e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getHospitalInfo();
  }, []);

  const onLogout = async () => {
    try {
      setShowLogoutDialog(false);
      setIsLoading(true);
      await logoutUser();
      setIsLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (e) {
      console.log("Exception: hospitalAccount.js onLogout", e);
    }
  };
  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View>
            <ImageContainerComponenet
              onEditPress={buisnessProfilePicEdit}
              imageUrl={""}
            ></ImageContainerComponenet>
            <View style={styles.infoContainer}>
              {isLoading ? (
                <Text>Loading....</Text>
              ) : (
                <View>
                  <DisplayInfoField
                    label={"Hospital: "}
                    value={hospitalData ? hospitalData.buisnessName : ""}
                  ></DisplayInfoField>
                  <DividerComponent />

                  <DisplayInfoField
                    label={"Hospital Email: "}
                    value={hospitalData ? hospitalData.buisnessEmail : ""}
                  ></DisplayInfoField>
                  <DividerComponent />

                  <DisplayInfoField
                    label={"Hospital Contact: "}
                    value={hospitalData ? hospitalData.buisnessContact : ""}
                  ></DisplayInfoField>
                  <DividerComponent />
                  <DisplayInfoField
                    label={"Hospital Category: "}
                    value={category ? category.catName : ""}
                  ></DisplayInfoField>
                  <DividerComponent />
                  <DisplayInfoField
                    label={"Hospital Address: "}
                    value={hospitalData ? hospitalData.buisnessAddress : ""}
                  ></DisplayInfoField>
                  <DividerComponent />
                  <DisplayInfoField
                    label={"Hospital Type: "}
                    value={hospitalType ? hospitalType : ""}
                  ></DisplayInfoField>
                </View>
              )}
            </View>
            <View style={styles.confrimationbuttonContainer}>
              <ButtonComponent
                onButtonPress={() =>
                  navigation.navigate("Create Buisness", {
                    buisnessData: hospitalData,
                    title: "Edit Hospital",
                    isForEdit: true,
                    isHospital: true,
                  })
                }
                label="Edit"
              />
              <ButtonComponent
                onButtonPress={() => console.log("log")}
                label="Delete Account"
                bgColor={Colors.commonRed}
              />
            </View>
            <LoaderComponent show={isLoading} />
            <ConfrimationDialog
              visible={showLogoutDialog}
              title="Logout"
              message="re you sure you want to logout?"
              onConfirm={() => onLogout()}
              onCancel={() => setShowLogoutDialog(false)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HospitalAccountScreen;
