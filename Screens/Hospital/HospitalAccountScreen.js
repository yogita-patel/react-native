import { View, Text } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import Colors from "../../Constants/Colors";
import ConfrimationDialog from "../../Components/ConfrimationDialog";
import LoaderComponent from "../../Components/LoaderComponent";
import { logoutUser } from "../../Controller/Authentication/LogoutController";

const HospitalAccountScreen = ({ navigation }) => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useLayoutEffect(() => {
    navigation.setParams({ openLogoutDialog: () => setShowLogoutDialog(true) });
    // setCategory(null);
    // getBuisnessInfo();
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
      console.log("Exception: hospitalAccount.js onLogout", e);
    }
  };
  return (
    <View>
      <Text>HospitalAccountScreen</Text>
      <LoaderComponent show={isLoading} />
      <ConfrimationDialog
        visible={showLogoutDialog}
        title="Logout"
        message="re you sure you want to logout?"
        onConfirm={() => onLogout()}
        onCancel={() => setShowLogoutDialog(false)}
      />
    </View>
  );
};

export default HospitalAccountScreen;
