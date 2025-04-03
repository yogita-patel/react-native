import { View, Text } from "react-native";
import React from "react";
import IntroButtonComponent from "../../Components/IntroButtonComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../Styles/CommonStyle";

const InitialScreen = () => {
  return (
    <View style={styles.container}>
      <IntroButtonComponent
        iconName={"user"}
        onPress={() => console.log("Button pressed")}
        title={"Business"}
      />
    </View>
  );
};

export default InitialScreen;
