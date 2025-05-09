import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useCallback } from "react";
import BuisnessListingCard from "../../Components/BuisnessListingCard";
import NoDataComponent from "../../Components/NoDataComponent";
import { useFocusEffect } from "@react-navigation/native";
import { getAllBuisnessOrHospital } from "../../Controller/Buisness/BuisnessController";
const BuisnessListScreen = () => {
  const [buisnessList, setBuisnessList] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getBuisnessList = async () => {
    if (loading || !hasMore) return;
    // const user = await getLocalUser();
    // console.log("buissnessID-----", user.businessID);
    setLoading(true);
    try {
      const {
        list: buisness,
        hasMore: more,
        lastDoc: newLastDoc,
      } = await getAllBuisnessOrHospital({
        lastDoc: lastDoc,
        cityId: null,
        isHospital: false,
      });
      setBuisnessList(buisness);
      setLastDoc(newLastDoc);
      setHasMore(more);
      //   console.log("HospitalList00000-------------------------", buisness);
    } catch (e) {
      console.log("Failed to getBuisnessList:", e);
    }
    setLoading(false);
  };
  useFocusEffect(
    useCallback(() => {
      console.log("callback--------------");
      setBuisnessList([]); // optional: reset list before fetch
      setLastDoc(null);
      setHasMore(true);
      getBuisnessList();
      return () => {};
    }, [])
  );
  return (
    <View>
      <FlatList
        data={buisnessList}
        renderItem={({ item }) => (
          <BuisnessListingCard
            onCardPress={() => null}
            item={item}
            type={"buisness"}
          />
        )}
        keyExtractor={(item) => item.id}
        onEndReached={getBuisnessList}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={!loading ? <NoDataComponent /> : null}
        ListFooterComponent={
          loading ? <ActivityIndicator size="small" /> : null
        }
      />
    </View>
  );
};

export default BuisnessListScreen;
