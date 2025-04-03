import { Text, View, Image } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import styles from "../Styles/CommonStyle";
import images from "../Constants/ImagePath";

const SplashScreen = () => {
  return (
    <View style={styles.fullScreenCenterItemContainer}>
      <Image source={images.Splashlogo} style={styles.logoImage} />
    </View>
  );
};

export default SplashScreen;
