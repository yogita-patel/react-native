import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import AlertCard from "../../Components/AlertCard";
import styles from "../../Styles/CommonStyle";
import {
  getAlert,
  markAsReadNotification,
} from "../../Controller/Notification/AlertController";
import LoaderComponent from "../../Components/LoaderComponent";
import NoDataComponent from "../../Components/NoDataComponent";
import { formatDate } from "../../Controller/global";

const AlertScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const routeData = useState(route.params);
  const [notification, setNotification] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const fetchNotifications = async () => {
    try {
      if (isLoading || !hasMore) return;
      setIsLoading(true);
      const type = routeData[0].type || "";
      const {
        list: newNotification,
        hasMore: moew,
        lastDoc: newLastDoc,
      } = await getAlert({ lastDoc: lastDoc, type: type });
      console.log("New Notification------", newNotification);
      setNotification(newNotification);
      //set data for lazy loading------------
      setHasMore(moew);
      setLastDoc(newLastDoc);
      await markAsReadNotification({ type: type });
      // navigation.setOptions({ title: title });
    } catch (e) {
      console.log("Error in AlertScreen.js fetchNotifications:", e);
    } finally {
      setIsLoading(false);
    }
  };
  useLayoutEffect(() => {
    fetchNotifications();
  }, [navigation]);

  return (
    <View style={[styles.commonmarginHorizontol10, styles.commonMarging10]}>
      <FlatList
        data={notification}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AlertCard
            date={item.createdAt ? formatDate(Date(item.createdAt)) : ""}
            description={item.description}
            title={item.title}
          />
        )}
        onEndReached={fetchNotifications}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={!isLoading ? <NoDataComponent /> : null}
        ListFooterComponent={
          isLoading ? <ActivityIndicator size="small" /> : null
        }
      />
      {/* <LoaderComponent show={isLoading} /> */}
    </View>
  );
};

export default AlertScreen;
