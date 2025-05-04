import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import ImageContainerComponenet from "../../Components/ImageContainerComponenet";
import styles from "../../Styles/CommonStyle";
import DisplayInfoField from "../../Components/DisplayInfoField";
import DividerComponent from "../../Components/DividerComponent";
import LoaderComponent from "../../Components/LoaderComponent";
import ButtonComponent from "../../Components/ButtonComponent";
import { logoutUser } from "../../Controller/Authentication/LogoutController";
import {
  getBuisness,
  getBuisnessCategory,
  getBuisnessCity,
  updateProfileImage,
} from "../../Controller/Buisness/BuisnessController";
import Colors from "../../Constants/Colors";
import ConfrimationDialog from "../../Components/ConfrimationDialog";
import {
  pickImage,
  uploadImageFirebaseStorage,
} from "../../Controller/Image/UploadImage";

const BuisnessAcoountScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [buisnessData, setBuisnessData] = useState(null);
  const [city, setCity] = useState(null);
  const [category, setCategory] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [buisnessImage, setBuisnessImage] = useState(null);

  useLayoutEffect(() => {
    navigation.setParams({ openLogoutDialog: () => setShowLogoutDialog(true) });
    setCategory(null);
    getBuisnessInfo();
  }, [navigation]);

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
      console.log("Exception: buisnessAccout.js onLogout", e);
    }
  };

  const getBuisnessInfo = async () => {
    try {
      setIsLoading(true);
      const b = await getBuisness();
      setBuisnessData(b);
      setBuisnessImage(b.buisnessProfile);
      const cat = await getBuisnessCategory({ catID: b.buisnessCategory });
      setCategory(cat);
      console.log("buisnesscat :", cat);
      const c = await getBuisnessCity({ cityID: b.cityId });
      setCity(c);
      console.log("buisness = ", b);
    } catch (e) {
      console.error("Failed to  getBuisnessInfo:", e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getBuisnessInfo();
  }, []);

  const deletAccount = async () => {
    try {
      setShowDialog(true);
    } catch (e) {
      console.error("Failed to  deletAccount:", e);
    } finally {
      //   setIsLoading(false);
    }
  };

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

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <ImageContainerComponenet
            onEditPress={buisnessProfilePicEdit}
            imageUrl={buisnessImage}
          ></ImageContainerComponenet>
          <View style={styles.infoContainer}>
            {isLoading ? (
              <Text>Loading....</Text>
            ) : (
              <View>
                <DisplayInfoField
                  label={"Buisness: "}
                  value={buisnessData.buisnessName}
                ></DisplayInfoField>
                <DividerComponent />

                <DisplayInfoField
                  label={"Buisness Email: "}
                  value={buisnessData.buisnessEmail}
                ></DisplayInfoField>
                <DividerComponent />

                <DisplayInfoField
                  label={"Buisness Contact: "}
                  value={buisnessData.buisnessContact}
                ></DisplayInfoField>
                <DividerComponent />
                <DisplayInfoField
                  label={"Buisness Category: "}
                  value={category.catName}
                ></DisplayInfoField>
                <DividerComponent />
                <DisplayInfoField
                  label={"Buisness Address: "}
                  value={buisnessData.buisnessAddress}
                ></DisplayInfoField>
                <DividerComponent />
                <DisplayInfoField
                  label={"Buisness city: "}
                  value={city.cityName}
                ></DisplayInfoField>
              </View>
            )}
            <LoaderComponent show={isLoading} />
            <ConfrimationDialog
              visible={showDialog}
              title="Delete"
              message="Are you sure do you want to Delete your Buisness?"
              onConfirm={() => console.log("delete")}
              onCancel={() => setShowDialog(false)}
            />
            <ConfrimationDialog
              visible={showLogoutDialog}
              title="Logout"
              message="re you sure you want to logout?"
              onConfirm={() => onLogout()}
              onCancel={() => setShowLogoutDialog(false)}
            />
          </View>
          <View style={styles.confrimationbuttonContainer}>
            <ButtonComponent
              onButtonPress={() =>
                navigation.navigate("Create Buisness", {
                  buisnessData: buisnessData,
                  title: "Edit Business",
                })
              }
              label="Edit"
            />
            <ButtonComponent
              onButtonPress={deletAccount}
              label="Delete Account"
              bgColor={Colors.commonRed}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BuisnessAcoountScreen;
