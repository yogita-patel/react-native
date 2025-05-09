import { View, Text } from "react-native";
import React from "react";
import styles from "../Styles/CommonStyle";
const BuisnessListingCard = () => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onSelect(item)}>
      <Text style={styles.label}>{"item.name"}</Text>
      <Text style={styles.label}>{"item.type"}</Text>
      <Text style={styles.label}>
        {"item.city"}, {"item.country"}
      </Text>
      <Text style={styles.label}>
        {item.contactInfo?.phone || "Phone: Not available"}
      </Text>
      {/* <Text style={styles.specialities}>
            {item.specialities?.join(', ') || 'Specialities: Not listed'}
          </Text> */}
    </TouchableOpacity>
  );
};

export default BuisnessListingCard;
