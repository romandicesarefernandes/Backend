import React from "react";
import { StyleSheet, View, Text, TouchableOpacity} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { ProgressBar, MD3Colors } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

export default function Patientcard({ totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFats = 0, caloriesGoal}) {
  const proteinCalories = totalProtein * 4;
  const carbsCalories = totalCarbs * 4;
  const fatsCalories = totalFats * 9;

  const totalMacroCalories = proteinCalories + carbsCalories + fatsCalories;
  const proteinPercentage = totalMacroCalories > 0 ? (proteinCalories / totalMacroCalories) * 100 : 0;
  const carbsPercentage = totalMacroCalories > 0 ? (carbsCalories / totalMacroCalories) * 100 : 0;
  const fatsPercentage = totalMacroCalories > 0 ? (fatsCalories / totalMacroCalories) * 100 : 0;

  const calorieGoals = caloriesGoal;
  const caloriePercentage = totalCalories / calorieGoals;

  const fakefunction = () => {

  }

  return (
    <View>
      <View style={styles.calorieContainer}>
        <Text>Calories</Text>
        <ProgressBar
          progress={caloriePercentage}
          color="#4CAF50"
          style={styles.progressBar}
        />
        <Text style={styles.calorieText}>
          {Math.round(totalCalories)} / {calorieGoals} cal
        </Text>
      </View>
      <View style={styles.cardContainer}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => fakefunction()}>
          <AntDesign
            name="left"
            size={25}
            color='black'
          />
          </TouchableOpacity>
        </View>
        <View style={styles.nutrientContainer}>
          <Text>Fat</Text>
          <AnimatedCircularProgress
            size={75}
            width={10}
            fill={fatsPercentage}  
            tintColor="#f7bf05"
            backgroundColor="#C1C7C9"
          />
          <Text style={styles.percentageText}>{fatsPercentage.toFixed(0)}%</Text>
          <Text>{Math.round(totalFats)}g</Text>
        </View>

        <View style={styles.nutrientContainer}>
          <Text>Protein</Text>
          <AnimatedCircularProgress
            size={75}
            width={10}
            fill={proteinPercentage} 
            tintColor="#a410fe"
            backgroundColor="#C1C7C9"
          />
          <Text style={styles.percentageText}>{proteinPercentage.toFixed(0)}%</Text>
          <Text>{Math.round(totalProtein)}g</Text>
        </View>

        <View style={styles.nutrientContainer}>
          <Text>Carbohydrates</Text>
          <AnimatedCircularProgress
            size={75}
            width={10}
            fill={carbsPercentage}  
            tintColor="#27d8ef"
            backgroundColor="#C1C7C9"
          />
          <Text style={styles.percentageText}>{carbsPercentage.toFixed(0)}%</Text>
          <Text>{Math.round(totalCarbs)}g</Text>
        </View>

        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => fakefunction()}>
          <AntDesign
            name="right"
            size={25}
            color='black'
          />
          </TouchableOpacity>
        </View>
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
    justifyContent: "center",
    marginTop: 0,
    padding: 5,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginTop: 0,
  },
  nutrientContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    marginRight:20
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    marginRight:5,
    
  },
  percentageText: {
    position: "absolute",
  },
  calorieContainer: {
    width: "100%", 
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 70
  },
});



