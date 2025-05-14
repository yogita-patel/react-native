import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../Styles/CommonStyle";

//earch text field
const SearchFieldComponent = ({
  value,
  onChangeText,
  placeholder = "Search...",
  icon = "search",
  style = {},
  onSearch,
  onclose,
}) => {
  // console.log("value", value);
  return (
    <View style={[styles.searchContainer, style]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.searchInput}
        placeholderTextColor="#888"
      />
      <MaterialIcons
        name={icon}
        size={24}
        color="#888"
        style={styles.icon}
        onPress={onSearch}
      />
      {value ? (
        <MaterialIcons
          name="close"
          size={24}
          color="#888"
          style={styles.icon}
          onPress={onclose}
        />
      ) : null}
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     backgroundColor: "#f0f0f0",
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     alignItems: "center",
//     marginVertical: 8,
//   },
//   icon: {
//     marginRight: 8,
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     color: "#000",
//   },
// });

export default SearchFieldComponent;
