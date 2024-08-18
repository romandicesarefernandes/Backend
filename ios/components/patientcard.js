import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { ProgressBar, MD3Colors } from "react-native-paper";

export default function Patientcard({ totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFats = 0 }) {
  const proteinCalories = totalProtein * 4;
  const carbsCalories = totalCarbs * 4;
  const fatsCalories = totalFats * 9;

  const totalMacroCalories = proteinCalories + carbsCalories + fatsCalories;

  // Ensure totalMacroCalories is greater than 0 to avoid NaN
  const proteinPercentage = totalMacroCalories > 0 ? (proteinCalories / totalMacroCalories) * 100 : 0;
  const carbsPercentage = totalMacroCalories > 0 ? (carbsCalories / totalMacroCalories) * 100 : 0;
  const fatsPercentage = totalMacroCalories > 0 ? (fatsCalories / totalMacroCalories) * 100 : 0;

  const calorieGoal = 2000;
  const caloriePercentage = totalCalories / calorieGoal;

  return (
    <View>
      <View style={styles.cardContainer}>
        <View style={styles.nutrientContainer}>
          <Text>Fat</Text>
          <AnimatedCircularProgress
            size={100}
            width={12}
            fill={fatsPercentage}  // Test with a static value of 50%
            tintColor="#f7bf05"
            backgroundColor="#C1C7C9"
          />
          <Text style={styles.percentageText}>{fatsPercentage.toFixed(0)}%</Text>
          <Text>{Math.round(totalFats)}g</Text>
        </View>

        <View style={styles.nutrientContainer}>
          <Text>Protein</Text>
          <AnimatedCircularProgress
            size={100}
            width={12}
            fill={proteinPercentage}  // Test with a static value of 50%
            tintColor="#a410fe"
            backgroundColor="#C1C7C9"
          />
          <Text style={styles.percentageText}>{proteinPercentage.toFixed(0)}%</Text>
          <Text>{Math.round(totalProtein)}g</Text>
        </View>

        <View style={styles.nutrientContainer}>
          <Text>Carbohydrates</Text>
          <AnimatedCircularProgress
            size={100}
            width={12}
            fill={carbsPercentage}  // Test with a static value of 50%
            tintColor="#27d8ef"
            backgroundColor="#C1C7C9"
          />
          <Text style={styles.percentageText}>{carbsPercentage.toFixed(0)}%</Text>
          <Text>{Math.round(totalCarbs)}g</Text>
        </View>
      </View>
      <View style={styles.calorieContainer}>
        <Text style={styles.labelText}>Calories</Text>
        <ProgressBar
          progress={caloriePercentage}
          color="#4CAF50"
          style={styles.progressBar}
        />
        <Text style={styles.calorieText}>
          {Math.round(totalCalories)} / {calorieGoal} cal
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "rgba(255, 255, 255, 0.0)",
    borderColor: "#007260",
    flexDirection: "row",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 2,
    justifyContent: "space-between",
    marginTop: 50,
    padding: 20,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  nutrientContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  percentageText: {
    position: "absolute",
  },
  calorieContainer: {
    width: "100%",  // Ensure it takes the full width of the container
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});



