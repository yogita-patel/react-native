import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../../Styles/CommonStyle";
import { fetchHealthTips } from "../../Controller/Citizen/CitizenHomeController";
import { getGreeting, getLocalUser } from "../../Controller/global";

const CitizenHomeScreen = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("Welcome");
  const [name, setName] = useState("");
  const fetchTips = async () => {
    try {
      const t = await fetchHealthTips();
      const u = await getLocalUser();
      setName(u.fullName);
      setTips(t);
    } catch (error) {
      console.error("Error fetching tips:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setGreeting(getGreeting);
    fetchTips();
  }, []);
  const healthTipItem = ({ item }) => (
    <View style={styles.tipCard}>
      <Text style={styles.tipText}>{item.tip}</Text>
    </View>
  );
  return (
    <View>
      <Text
        style={[styles.welcomeText, { textAlign: "center", marginTop: 10 }]}
      >
        {`${greeting}, ${name}`}
      </Text>
      <View style={styles.card}>
        <Text style={styles.infoHeading1}>🩺 Daily Health Tips</Text>
        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <FlatList
            data={tips}
            keyExtractor={(item) => item.id}
            renderItem={healthTipItem}
          />
        )}
      </View>
    </View>
  );
};

export default CitizenHomeScreen;
