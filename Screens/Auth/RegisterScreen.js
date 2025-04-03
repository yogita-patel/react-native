import { SafeAreaView, KeyboardAvoidingView, ScrollView } from "react-native";
import React, { useState } from "react";
import LogoHeadingComponent from "../../Components/LogoHeadingComponent";
import styles from "../../Styles/CommonStyle";
import TextInputComponent from "../../Components/TextInputComponent";
import Constants from "../../Constants/Strings";
import ButtonComponent from "../../Components/ButtonComponent";
import HyperlinkTextComponent from "../../Components/HyperlinkTextComponent";

const RegisterScreen = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [emailText, setText] = useState("");
  return (
    <SafeAreaView style={{ alignSelf: "center", alignItems: "center" }}>
      <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <LogoHeadingComponent />
          <TextInputComponent
            placeholder={Constants.strings.emailPlaceholder}
            onChangeText={setText}
            label={Constants.labels.emailLabel}
          />
          <TextInputComponent
            placeholder={Constants.strings.passwordPlaceholder}
            onChangeText={setPassword}
            secureTextEntry={true}
            label={Constants.labels.passwordLabel}
          />
          <ButtonComponent
            onButtonPress={() => console.log("login pressed")}
            label="Register"
          />
          <HyperlinkTextComponent
            onTextPress={() => navigation.goBack()}
            text="Already have account? Login here"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
