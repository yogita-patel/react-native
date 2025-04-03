import { View, Text, Image } from "react-native";
import React from "react";
import images from "../Constants/ImagePath";
import styles from "../Styles/CommonStyle";
import Constants from "../Constants/Strings";

const LogoHeadingComponent = () => {
  return (
    <View style={styles.logoContainer}>
      <Image source={images.ColoredLogo} style={styles.coloredLogo} />
      <Text style={styles.appnametext}>{Constants.strings.appName}</Text>
    </View>
  );
};

export default LogoHeadingComponent;
