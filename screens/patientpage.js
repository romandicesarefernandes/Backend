import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { AntDesign, Foundation, Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import Patientcard from "../ios/components/patientcard";
import FoodDiary from "../ios/components/FoodDiary";
import AddButtom from "../ios/components/AddButtom";
import { handleFood_search } from "../scripts/handle_register";
import COLORS from "../constants/colors";

const Patientpage = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleIconPress = (icon) => {
    setSelectedIcon(icon);
    if (icon === "home") {
      handleFood_search("potato", "lays");
    }
    // Add more conditional logic here if needed for other icons
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleIconPress("setting")}
        >
          <AntDesign
            name="setting"
            size={35}
            color={selectedIcon === "setting" ? "green" : "white"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleIconPress("home")}
        >
          <AntDesign
            name="home"
            size={35}
            color={selectedIcon === "home" ? "green" : "white"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleIconPress("restaurant-outline")}
        >
          <Ionicons
            name="restaurant-outline"
            size={35}
            color={selectedIcon === "restaurant-outline" ? "green" : "white"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Patientcard />
        <View style={styles.separator}/>
        <FoodDiary />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    width: "100%",
    backgroundColor: COLORS.primary,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 10,
  },
  iconButton: {
    marginTop: 30,
  },
  contentContainer: {
    paddingTop: 50, // Adjust this based on header height
    paddingHorizontal: 20,
    paddingBottom: 100, // Adjust this based on add button position
  },
  addButtonContainer: {
    right: 20,
    bottom: 20,
    position: "absolute",
  },
});

export default Patientpage;
