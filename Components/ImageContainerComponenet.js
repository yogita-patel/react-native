import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import images from "../Constants/ImagePath";
import styles from "../Styles/CommonStyle";
import Colors from "../Constants/Colors";

//round image container
const ImageContainerComponenet = ({
  imageUrl = null,
  onEditPress,
  size = 80,
}) => {
  return (
    <View style={styles.container}>
      <View style={{ width: size, height: size, justifyContent: "center" }}>
        <Image
          source={imageUrl ? { uri: imageUrl } : images.DeafultUser}
          style={[
            styles.image,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
        />
        <TouchableOpacity style={styles.editIcon} onPress={onEditPress}>
          <MaterialCommunityIcons
            name="pencil"
            size={20}
            color={Colors.commonwhite}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImageContainerComponenet;
