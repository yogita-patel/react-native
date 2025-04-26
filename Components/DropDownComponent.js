import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "../Styles/CommonStyle";
import Colors from "../Constants/Colors";
import {
  fetchIDAndName,
  fetchByCondition,
} from "../Controller/FetchAPIs/coomonFetch";

const DropDownComponent = ({
  collectionName,
  labelField = "label",
  valueField = "value",
  // dropDOwnItems = [],
  placeholder = "Select an item",
  onSelectItem,
  label = "",
  maxHeight = null,
  error,
  touched,
  selectedValue,
  setSelectedValue,
  conditionLabel = null,
  conditionValue = null,
  noData = "There's nothing to show",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropDOwnItems, setDropDownItems] = useState([]);
  // const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        var data;
        console.log("conditionvalue", conditionLabel);
        if (!conditionLabel) {
          data = await fetchIDAndName(collectionName); //call API to get country
        } else {
          data = await fetchByCondition({
            collectionName: collectionName,
            condition: conditionLabel,
            value: conditionValue,
          });
        }
        // console.log("data", data);
        const dropdownData = data.map((item) => ({
          //bind data to add into dropdown
          label: item[labelField],
          value: item.id,
          key: item.id,
        }));
        console.log("dropdownData", dropdownData);
        setDropDownItems(dropdownData); //set label and value to dropdown
      } catch (error) {
        console.error("Error: DropDownComponent.js loadItems", error);
      }
    };

    loadItems();
  }, [collectionName, conditionLabel, conditionValue]);

  return (
    <View style={styles.commonMarging10}>
      <Text style={styles.label}>{label}</Text>
      <DropDownPicker
        open={isOpen}
        value={selectedValue}
        items={dropDOwnItems}
        setOpen={setIsOpen}
        setValue={(callback) => {
          const value = callback(selectedValue);
          setSelectedValue(value);
          if (onSelectItem) {
            const selectedItem = dropDOwnItems.find(
              (item) => item.value === value
            );
            onSelectItem(selectedItem);
          }
        }}
        setItems={setDropDownItems}
        // setItems={() => {}}
        noDataText={noData}
        placeholder={placeholder}
        listMode="SCROLLVIEW"
        style={[styles.input, error && { borderColor: "red" }]}
        arrowIconStyle={{
          tintColor: Colors.primary,
        }}
        dropDownContainerStyle={{
          maxHeight: 150,
          borderColor: Colors.primary,
          backgroundColor: Colors.commonwhite,
          zIndex: 2000,
          // zIndexInverse: 2000,
        }}
      />
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default DropDownComponent;
