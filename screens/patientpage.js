import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Patientcard from "../ios/components/patientcard";
import FoodDiary from "../ios/components/FoodDiary";
import COLORS from "../constants/colors";
import DateTimePicker from '@react-native-community/datetimepicker';

const Patientpage = ({ route, navigation }) => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [mealData, setMealData] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  });

  const [calorieGoal, setCalorieGoal] = useState(route.params?.calorieGoal || 2000);
  const [date, setDate] = useState(new Date());

  const handleIconPress = (icon) => {
    setSelectedIcon(icon);
    if (icon === 'goal') {
      navigation.navigate('patientgoals', { calorieGoal });
    }
  };

  const addFoodItem = (mealType, food) => {
    setMealData((prevData) => ({
      ...prevData,
      [mealType]: [...(prevData[mealType] || []), food],
    }));
  };

  useEffect(() => {
    if (route.params?.selectedFood) {
      const { mealType, food } = route.params.selectedFood;
      addFoodItem(mealType, food);
    }

    if (route.params?.calorieGoal) {
      setCalorieGoal(route.params.calorieGoal);
    }
  }, [route.params?.selectedFood, route.params?.calorieGoal]);

  const deleteFoodItem = (mealType, index) => {
    setMealData((prevData) => ({
      ...prevData,
      [mealType]: prevData[mealType].filter((_, i) => i !== index),
    }));
  };

  const calculateTotalNutrients = () => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    Object.keys(mealData).forEach(mealType => {
      mealData[mealType].forEach(item => {
        totalCalories += item.calories || 0;
        totalProtein += item.proteins || 0;
        totalCarbs += item.carbs || 0;
        totalFats += item.fats || 0;
      });
    });

    return { totalCalories, totalProtein, totalCarbs, totalFats };
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const changeDateByDays = (days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setDate(newDate);
  };

  const { condition } = route.params;
  const { totalCalories, totalProtein, totalCarbs, totalFats } = calculateTotalNutrients();

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
            color='white'
          />
        </TouchableOpacity>
        <View style={styles.dateContainer}>
          <TouchableOpacity onPress={() => changeDateByDays(-1)}>
          <AntDesign
            name="left"
            size={35}
            color='white'
          />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDateChange()}>
            <Text style={styles.dateText}>
              {(
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="compact"
                  onChange={handleDateChange}
                />
              )}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeDateByDays(1)}>
          <AntDesign
            name="right"
            size={35}
            color='white'
          />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleIconPress("goal")}
        >
          <AntDesign
            name="user"
            size={35}
            color="white"
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Patientcard
          totalCalories={totalCalories}
          totalProtein={totalProtein}
          totalCarbs={totalCarbs}
          totalFats={totalFats}
          caloriesGoal={calorieGoal}
        />
        <View style={styles.separator} />
        <FoodDiary
          mealData={mealData}
          onAddFood={addFoodItem}
          onDeleteFood={deleteFoodItem}
          navigation={navigation}
          conditionData={condition}
        />
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
    marginVertical: 20,
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
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:30
  },
  dateText: {
    color: 'white',
    fontSize: 25,
    marginHorizontal: 10,
  },
  dateNavigator: {
    color: 'white',
    fontSize: 20,
    marginHorizontal: 10,
  },
  iconButton: {
    marginTop: 30,
  },
  contentContainer: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
});

export default Patientpage;



