import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import IntroButtonComponent from "../../Components/IntroButtonComponent";
import styles from "../../Styles/CommonStyle";
import { getLocalUser } from "../../Controller/Authentication/InitialScreenCOntroller";
import LoaderComponent from "../../Components/LoaderComponent";
import HyperlinkTextComponent from "../../Components/HyperlinkTextComponent";
import ConfrimationDialog from "../../Components/ConfrimationDialog";
import { logoutUser } from "../../Controller/Authentication/LogoutController";

const InitialScreen = ({ navigation }) => {
  const [userFname, setFname] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      try {
        LoaderComponent({ show: true });
        const user = await getLocalUser();
        setFname(user.fullName);
        // console.log("isLogin = ", user);
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
      <Text style={styles.welcomeText}>{"Welcome " + userFname}</Text>
      <IntroButtonComponent
        iconName={"business"}
        onPress={() => console.log("create a business")}
        title={"Create a business"}
      />
      <IntroButtonComponent
        iconName={"local-hospital"}
        onPress={() => redirectToLogin()}
        title={"Create a hospital"}
      />
      <IntroButtonComponent
        iconName={"person"}
        onPress={() => redirectToLogin()}
        title={"Book an appointment"}
      />
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
