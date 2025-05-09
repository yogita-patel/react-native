import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState, useLayoutEffect } from "react";
import ImageContainerComponenet from "../../Components/ImageContainerComponenet";
import styles from "../../Styles/CommonStyle";
import ConfrimationDialog from "../../Components/ConfrimationDialog";
import LoaderComponent from "../../Components/LoaderComponent";
import DisplayInfoField from "../../Components/DisplayInfoField";
import DividerComponent from "../../Components/DividerComponent";
import { logoutUser } from "../../Controller/Authentication/LogoutController";
import { getLocalUser } from "../../Controller/global";
import { getBuisnessCity } from "../../Controller/Buisness/BuisnessController";
import { getCountryByID } from "../../Controller/Citizen/PersonalProfileController";
import ButtonComponent from "../../Components/ButtonComponent";
import Colors from "../../Constants/Colors";
import { pickImage } from "../../Controller/Image/UploadImage";
import { uploadImageFirebaseStorage } from "../../Controller/Image/UploadImage";
import { updateUserProfile } from "../../Controller/Citizen/PersonalProfileController";
import HyperlinkTextComponent from "../../Components/HyperlinkTextComponent";

const CitizenAccountScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [user, setUser] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  useLayoutEffect(() => {
    navigation.setParams({ openLogoutDialog: () => setShowLogoutDialog(true) });
    // setCategory(null);
    getCUrrentUSerInfo();
  }, [navigation]);

  const getCUrrentUSerInfo = async () => {
    try {
      setIsLoading(true);
      const currentUser = await getLocalUser();
      console.log("currentUser = ", currentUser);
      const city = await getBuisnessCity({ cityID: currentUser.cityID });
      const c = await getCountryByID({ countryID: currentUser.countryID });
      setUser(currentUser);
      setUserProfile(currentUser.userProfile);
      setCity(city);
      setCountry(c);
    } catch (e) {
      console.error("Failed to  getCUrrentUSerInfo:", e);
    } finally {
      setIsLoading(false);
    }
  };

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
      console.log("Exception: CitizenAccountScreen.js onLogout", e);
    }
  };

  const handleImageUploading = async ({ image }) => {
    try {
      const uploadedImg = await uploadImageFirebaseStorage({
        imageUrl: image,
        imagePath: "users/user_profile",
      });

      if (uploadedImg) {
        await updateUserProfile({
          image: uploadedImg,
          currentUSer: user,
          userid: user.userID,
        });
      }
    } catch (e) {
      console.error("Error  handleImageUploading:", e);
    } finally {
    }
  };
  const profilePicEdit = async () => {
    try {
      setIsLoading(true);
      const result = await pickImage();
      console.log("Image result:", result);
      if (result) {
        if (!result.canceled) {
          setUserProfile(result.assets[0].uri);
          await handleImageUploading({ image: result.assets[0].uri });
        }
      }
    } catch (e) {
      console.error("Failed to  profilePicEdit:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <ImageContainerComponenet
            onEditPress={profilePicEdit}
            imageUrl={userProfile}
          ></ImageContainerComponenet>
          <View style={styles.infoContainer}>
            {isLoading ? (
              <Text>Loading....</Text>
            ) : (
              <View>
                <DisplayInfoField
                  label={"Full Name: "}
                  value={user ? user.fullName : "--"}
                ></DisplayInfoField>
                <DividerComponent />

                <DisplayInfoField
                  label={"Email: "}
                  value={user ? user.email : "--"}
                ></DisplayInfoField>
                <DividerComponent />

                <DisplayInfoField
                  label={"Country: "}
                  value={country ? country.name : "--"}
                ></DisplayInfoField>
                <DividerComponent />
                <DisplayInfoField
                  label={"City: "}
                  value={city ? city.cityName : "--"}
                ></DisplayInfoField>
                <DividerComponent />
                {/* <DisplayInfoField
                  label={"Buisness Address: "}
                  value={"buisnessData.buisnessAddress"}
                ></DisplayInfoField>
                <DividerComponent />
                <DisplayInfoField
                  label={"Buisness city: "}
                  value={"city.cityName"}
                ></DisplayInfoField> */}
                <HyperlinkTextComponent
                  onTextPress={() =>
                    navigation.navigate("InitialScreen", {
                      isFromProfile: true,
                    })
                  }
                  text="Create buisness or Hospital here"
                />

                <View style={styles.confrimationbuttonContainer}>
                  {/* <ButtonComponent
                    onButtonPress={() =>
                      navigation.navigate("Create Buisness", {
                        buisnessData: buisnessData,
                        title: "Edit Business",
                        isForEdit: true,
                      })
                    }
                    label="Edit"
                  /> */}
                  <ButtonComponent
                    onButtonPress={() => console.log("deleteAccount")}
                    label="Delete Account"
                    bgColor={Colors.commonRed}
                  />
                </View>
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CitizenAccountScreen;
