import { View, Text, Image } from "react-native";
import React from "react";
import styles from "../Styles/CommonStyle";
import DividerComponent from "./DividerComponent";
import SmallBUttonComponent from "./SmallButtonComponent";
import MaterialIconComponent from "./MaterialIconComponent";
import Colors from "../Constants/Colors";
import images from "../Constants/ImagePath";

//patient list card
const PatientCard = ({ item, onHistory }) => {
  const IconLabelComponent = ({ iconName, label }) => {
    return (
      <View style={styles.content}>
        <MaterialIconComponent iconName={iconName} color={Colors.shade2Black} />
        <Text style={[styles.label]}>{label}</Text>
      </View>
    );
  };
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Image
          source={
            item.userProfile ? { uri: item.userProfile } : images.DeafultUser
          }
          //   source={images.DeafultUser}
          style={[
            styles.image,
            { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
          ]}
        />
        <View>
          <IconLabelComponent iconName={"person"} label={item.fullName} />
          <IconLabelComponent iconName={"email"} label={item.email} />
          {/* <IconLabelComponent iconName={"badge"} label={"role"} /> */}
        </View>
      </View>

      <DividerComponent />
      <View style={[styles.content]}>
        <SmallBUttonComponent onPress={onHistory} label="View History" />
      </View>
    </View>
  );
};

export default PatientCard;
