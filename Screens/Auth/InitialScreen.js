import { Text, View } from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import IntroButtonComponent from "../../Components/IntroButtonComponent";
import styles from "../../Styles/CommonStyle";
import { getLocalUser } from "../../Controller/global";
import LoaderComponent from "../../Components/LoaderComponent";
import HyperlinkTextComponent from "../../Components/HyperlinkTextComponent";
import ConfrimationDialog from "../../Components/ConfrimationDialog";
import { logoutUser } from "../../Controller/Authentication/LogoutController";

const InitialScreen = ({ navigation, route }) => {
  const [userFname, setFname] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const routeData = useState(route.params);
  const [isPersoalProfile, setIsPersonalProfile] = useState(false);
  const [isFromBuisness, setIsFromBuisness] = useState(false);

  useLayoutEffect(() => {
    if (routeData && routeData[0]) {
      console.log("is route data---------", routeData);
      if (routeData && routeData[0].isFromProfile)
        setIsPersonalProfile(routeData[0].isFromProfile);
      if (routeData && routeData[0].isFromBuisness) setIsFromBuisness(true);
    }
  }, [navigation]);
  useEffect(() => {
    const getUser = async () => {
      try {
        LoaderComponent({ show: true });
        const user = await getLocalUser();
        console.log("isLogin = ", user);
        if (user) {
          setFname(user.fullName);
        }
      } catch (e) {
        console.error("Failed to  getUser:", e);
      } finally {
        LoaderComponent({ show: false });
      }
    };

    getUser();
  }, []);

  const onLogout = async () => {
    try {
      setShowDialog(false);
      setLoading(true);
      await logoutUser();
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (e) {
      console.log("Exception: initialScreen.js onLogout", e);
    }
  };
  return (
    <View style={styles.container}>
      {!isPersoalProfile && (
        <Text style={styles.welcomeText}>
          {userFname ? "Welcome " + userFname : "Welcome "}
        </Text>
      )}
      {!isFromBuisness && (
        <IntroButtonComponent
          iconName={"business"}
          onPress={() =>
            navigation.navigate("Create Buisness", { title: "Create Buisness" })
          }
          title={"Create a business"}
        />
      )}
      {!isFromBuisness && (
        <IntroButtonComponent
          iconName={"local-hospital"}
          onPress={() =>
            navigation.navigate("Create Buisness", {
              isHospital: true,
              title: "Create Hospital",
            })
          }
          title={"Create a hospital"}
        />
      )}
      {isPersoalProfile ? (
        <IntroButtonComponent
          iconName={"arrow-back"}
          onPress={() => navigation.goBack()}
          title={"Back"}
        />
      ) : (
        <IntroButtonComponent
          iconName={"person"}
          onPress={() => navigation.navigate("DashboardScreen")}
          title={"Book an appointment"}
        />
      )}
      {isFromBuisness ? (
        <IntroButtonComponent
          iconName={"arrow-back"}
          onPress={() => navigation.goBack()}
          title={"Back"}
        />
      ) : null}
      <ConfrimationDialog
        visible={showDialog}
        title="Logout"
        message="Are you sure do you want to Logout?"
        onConfirm={() => onLogout()}
        onCancel={() => setShowDialog(false)}
      />
      <LoaderComponent show={isLoading} />
      <HyperlinkTextComponent
        text="Logout"
        onTextPress={() => setShowDialog(true)}
      ></HyperlinkTextComponent>
    </View>
  );
};

export default InitialScreen;
