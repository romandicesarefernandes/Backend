import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const FoodDiary = () => {
  const navigation = useNavigation();
  const [mealData, setMealData] = useState({
    breakfast: [
      { name: "Fries", brand: "Generic Brand", calories: 100 },
      { name: "Pancakes", brand: "Generic Brand", calories: 500 },
    ],
    lunch: [{ name: "Burger", brand: "Generic Brand", calories: 300 }],
    dinner: [],
    snacks: [],
  });

  const handleNavigate = (mealType) => {
    navigation.navigate("search_food_page", {
      mealType,
      onSelectFood: (food) => {
        setMealData((prevData) => ({
          ...prevData,
          [mealType]: [...prevData[mealType], food],
        }));
      },
    });
  };

  const confirmDeleteFoodItem = (mealType) => {
    if (mealData[mealType].length === 0) {
      Alert.alert("No items to delete", `There are no items in ${mealType} to delete.`);
      return;
    }
    
    navigation.navigate("delete_food_page", {
      mealType,
      mealItems: mealData[mealType],
      onDeleteFood: (index) => {
        setMealData((prevData) => ({
          ...prevData,
          [mealType]: prevData[mealType].filter((_, i) => i !== index),
        }));
      },
    });
  };

  const calculateTotalCalories = (mealType) => {
    return mealData[mealType].reduce((total, item) => total + item.calories, 0);
  };

  const renderMeal = (mealType, label) => (
    <View style={styles.mealContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label} - {calculateTotalCalories(mealType)}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDeleteFoodItem(mealType)}>
          <AntDesign name="ellipsis1" size={16} color="black"/>
        </TouchableOpacity>
      </View>
      <FlatList
        data={mealData[mealType]}
        keyExtractor={(item, index) => `${mealType}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.foodContainer}>
            <Text style={styles.foodText}>
              {item.name} - {item.brand} {item.calories} cals
            </Text>
          </View>
        )}
      />
      <View style={styles.actionRow}>
        <TouchableOpacity onPress={() => handleNavigate(mealType)}>
          <View style={styles.addButton}>
            <AntDesign name="pluscircleo" size={24} color='grey'/>
            <Text style={styles.addFoodLabel}>  Add Food</Text>
          </View>
        </TouchableOpacity>
        
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderMeal("breakfast", "Breakfast")}
      {renderMeal("lunch", "Lunch")}
      {renderMeal("dinner", "Dinner")}
      {renderMeal("snacks", "Snacks")}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  mealContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addFoodLabel: {
    fontSize: 16,
    fontWeight: "semibold",
    color: 'grey',
  },
  calories: {
    fontSize: 16,
    color: "#333",
  },
  foodContainer: {
    marginBottom: 5,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 10,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 10,
  },
});

export default FoodDiary;
