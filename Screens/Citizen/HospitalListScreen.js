import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import BuisnessListingCard from "../../Components/BuisnessListingCard";
import Constants from "../../Constants/Strings";
import DropDownComponent from "../../Components/DropDownComponent";
import styles from "../../Styles/CommonStyle";
import { getAllBuisnessOrHospital } from "../../Controller/Buisness/BuisnessController";
import NoDataComponent from "../../Components/NoDataComponent";
import { useFocusEffect } from "@react-navigation/native";
const HospitalListScreen = ({ navigation }) => {
  const [cityId, setCityId] = useState();
  const [countryId, setContryId] = useState();
  const [hospitalList, setHospitalList] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getHospital = async () => {
    if (loading || !hasMore) return;
    // const user = await getLocalUser();
    // console.log("buissnessID-----", user.businessID);
    setLoading(true);
    try {
      const {
        list: hospital,
        hasMore: more,
        lastDoc: newLastDoc,
      } = await getAllBuisnessOrHospital({
        lastDoc: lastDoc,
        cityId: null,
        isHospital: true,
      });
      setHospitalList(hospital);
      setLastDoc(newLastDoc);
      setHasMore(more);
      console.log("HospitalList00000-------------------------", hospital);
    } catch (e) {
      console.log("Failed to getHospital:", e);
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      console.log("callback--------------");
      setHospitalList([]); // optional: reset list before fetch
      setLastDoc(null);
      setHasMore(true);
      getHospital();
      return () => {};
    }, [])
  );
  return (
    <View>
      <View
        style={[styles.commonmarginHorizontol10, styles.commonmarginVertical10]}
      >
        <DropDownComponent
          collectionName={Constants.collectionName.city}
          label="Search Hospital by City"
          placeholder="Select city"
          labelField="cityName"
          valueField="ID"
          maxHeight={1000}
          onSelectItem={(item) => setCityId(item.value)}
          noData={
            !countryId
              ? "Please select country"
              : "No city found for this country"
          }
          selectedValue={cityId}
          setSelectedValue={() => setCityId()}
          //   conditionLabel={"countryID"}
          //   conditionValue={countryId}
        />
      </View>
      <FlatList
        data={hospitalList}
        renderItem={({ item }) => (
          <BuisnessListingCard
            onCardPress={() =>
              navigation.navigate("DoctorListScreen", {
                hospitalData: item,
                title: `${item.buisnessName} Doctors`,
              })
            }
            item={item}
          />
        )}
        keyExtractor={(item) => item.id}
        onEndReached={getHospital}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={!loading ? <NoDataComponent /> : null}
        ListFooterComponent={
          loading ? <ActivityIndicator size="small" /> : null
        }
      />
    </View>
  );
};

export default HospitalListScreen;
