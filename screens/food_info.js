import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FoodRing from '../ios/components/foodring';
import COLORS from '../constants/colors';

const FoodInfoPage = ({ route }) => {
  const navigation = useNavigation();

  const backbtnclicked = () => {
    navigation.goBack();
  };

  const nutiritonreportclicked = () => {
    navigation.navigate("full_nutrition_report", {nutrients, name, servingSize, dailyIntakePercentage});
  };

  const { name, imagei, nutrients, ingredients, brand, servingSize} = route.params;

  const totalMacros = nutrients.fats + nutrients.proteins + nutrients.carbs;
  const proteinPercentage = (nutrients.proteins / totalMacros) * 100;
  const fatPercentage = (nutrients.fats / totalMacros) * 100;
  const carbPercentage = (nutrients.carbs / totalMacros) * 100;
  const dailyIntakePercentage = Math.round((nutrients.calories / 2000) * 100);

  return (
    <ScrollView>
      <View style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={backbtnclicked}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Image source={{ uri: imagei }} style={styles.image} />
        <View style={styles.titleContainer}>
          <Text style={styles.Title}>{name}</Text>
          {brand && <Text style={styles.brandText}>{brand}</Text>}
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.border} />
        <View style={styles.row}>
          <View style={styles.leftContent}>
            <Text style={styles.titlepref}>Daily Intake</Text>
            <Text>{dailyIntakePercentage}%</Text>
          </View>
          <View style={styles.middleContent}>
            <FoodRing
              proteinPercentage={proteinPercentage}
              fatPercentage={fatPercentage}
              carbPercentage={carbPercentage}
            />
          </View>
          <View style={styles.rightContent}>
            <View style={styles.macroContainer}>
              <View style={[styles.macroCircle, { backgroundColor: '#a410fe' }]} />
              <Text>Protein: {proteinPercentage.toFixed(0)}%</Text>
            </View>
            <View style={styles.macroContainer}>
              <View style={[styles.macroCircle, { backgroundColor: '#f7bf05' }]} />
              <Text>Fat: {fatPercentage.toFixed(0)}%</Text>
            </View>
            <View style={styles.macroContainer}>
              <View style={[styles.macroCircle, { backgroundColor: '#27d8ef' }]} />
              <Text>Carbs: {carbPercentage.toFixed(0)}%</Text>
            </View>
          </View>
        </View>
        <View style={styles.border} />

        <View style={styles.titleleft}>
          <Text style={styles.titlepref}>Nutrition</Text>
          <View style={styles.nutrientContainer}>
            <View style={styles.row}>
              <Text style={styles.largeCaloriesText}>{Math.round(nutrients.calories)} cal</Text>
              <Text style={styles.servingSizeText}>Serving Size: ({servingSize}g)</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.nutritionInfo}>
              <View style={styles.nutrientRow}>
                <Text style={styles.boldText}>Total Fat</Text>
                <Text>{Math.round(nutrients.fats)}g</Text>
              </View>
              <View style={styles.subNutrientRow}>
                <Text>Saturated Fat N/Ag</Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.nutrientRow}>
                <Text style={styles.boldText}>Cholesterol</Text>
                <Text>N/A mg</Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.nutrientRow}>
                <Text style={styles.boldText}>Sodium</Text>
                <Text>N/A mg</Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.nutrientRow}>
                <Text style={styles.boldText}>Total Carbohydrate</Text>
                <Text>{Math.round(nutrients.carbs)}g</Text>
              </View>
              <View style={styles.subNutrientRow}>
                <Text>Dietary Fiber {Math.round(nutrients.fibers)}g</Text>
              </View>
              <View style={styles.subNutrientRow}>
                <Text>Sugars 5g</Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.nutrientRow}>
                <Text style={styles.boldText}>Protein</Text>
                <Text>{Math.round(nutrients.proteins)}g</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.fullNutritionBtn} onPress={nutiritonreportclicked}>
          <Text style={styles.nutritionBtnText}>View Full Nutrition Label </Text>
        </TouchableOpacity>
        </View>

        <View style={styles.border} />
        <View style={styles.titleleft}>
          <Text style={styles.titlepref}>Ingredients</Text>
        </View>
        <View style={styles.ingredientsContainer}>
          {ingredients && ingredients.length > 0 ? (
            <Text style={styles.ingredientText}>{ingredients.join(', ')}</Text>
          ) : (
            <Text>No ingredients available</Text>
          )}
        </View>
        <View style={styles.border} />
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  header: {
    backgroundColor: '#007260',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 100,
  },
  brandText: {
    fontSize: 20,
    color: 'grey',
    marginTop: 5,
  },
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20, 
  },
  nutritionLabel: {
    width: '90%',
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
  },
  labelTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#000',
    marginVertical: 5,
  },
  servingSize: {
    fontSize: 16,
  },
  servingsPerContainer: {
    fontSize: 16,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boldText: {
    fontWeight: 'bold',
  },
  largeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  nutrientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  subNutrientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
  },
  nutrientContainer: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
    maxWidth: 360
  },
  
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  
  servingSizeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  largeCaloriesText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 70
  },
  
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  
  nutritionInfo: {
    marginTop: 10,
    
  },
  fullNutritionBtn: {
    marginTop: 20,
    alignItems: 'start',
    justifyContent: 'start',
    width: 'auto',
    height: 50,
  },
  nutritionBtnText: {
    color: 'grey',
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  note: {
    fontSize: 12,
    marginTop: 10,
  },
  border: {
    marginTop: 5,
    width: '95%',
    borderBottomWidth: 1,
    borderBottomColor: '#cbcbcb',
  },
  Title: {
    marginTop: 20,
    marginRight: 40,
    fontSize: 40,
  },
  titlepref: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
    marginLeft: 20,
    width: 70,
    height: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 24
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  spacer: {
    width: 80,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'contain',
    alignContent: 'start',
    marginLeft: 20,
    marginTop: 20
  },
  leftContent: {
    flex: 1,
    alignItems: 'start',
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 20,
    paddingRight: 20,
  },
  middleContent: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  rightContent: {
    flex: 1,
    alignItems: 'end',
    marginTop: 30,
    marginBottom: 20,
    marginRight: 20,
  },
  titleleft: {
    alignSelf: 'start',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  macroContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  macroCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  ingredientsContainer: {
    marginRight: 20,
    marginBottom: 20,
    alignItems: 'start',
    padding: 20,
  },
  
  ingredientText: {
    fontSize: 16,
    marginBottom: 5,
    alignItems: 'center'
  }
  
});

export default FoodInfoPage;


