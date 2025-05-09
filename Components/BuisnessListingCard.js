import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../Styles/CommonStyle";

const BuisnessListingCard = ({ item, onCardPress, type = null }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onCardPress}>
      <Text style={styles.infoHeading1}>{item.buisnessName}</Text>
      <Text style={styles.label}>
        {type ? item.businessTypeName : item.hospitalTypeName}
      </Text>
      <Text style={styles.label}>{item.cityName}</Text>
      <Text style={styles.label}>{item.buisnessContact}</Text>
      {/* <Text style={styles.specialities}>
            {item.specialities?.join(', ') || 'Specialities: Not listed'}
          </Text> */}
    </TouchableOpacity>
  );
};

export default BuisnessListingCard;
