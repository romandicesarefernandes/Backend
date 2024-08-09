import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FoodRing from '../ios/components/foodring';

const FoodInfoPage = ({ route }) => {
  const navigation = useNavigation();

  const backbtnclicked = () => {
    navigation.goBack();
  };

  const { name, imagei, nutrients} = route.params;

  const totalMacros = nutrients.fats + nutrients.proteins + nutrients.carbs;
  const proteinPercentage = (nutrients.proteins / totalMacros) * 100;
  const fatPercentage = (nutrients.fats / totalMacros) * 100;
  const carbPercentage = (nutrients.carbs / totalMacros) * 100;
  const dailyIntakePercentage = (nutrients.calories/2000) * 100;
  

  return (
    <ScrollView>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={backbtnclicked}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.Title}>{name}</Text>
        </View>
        <View style={styles.spacer}/>
      </View>

      <View style={styles.container}>
        <Image source={{ uri: imagei }} style={styles.image} />
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
          <Text style={styles.titlepref}>Nutrition Label</Text>
        </View>
        <View style={styles.nutritionLabel}>
          <Text style={styles.labelTitle}>Nutrition Facts</Text>
          <View style={styles.separator} />
          <Text style={styles.servingSize}>Serving Size 1 cup (228g)</Text>
          <Text style={styles.servingsPerContainer}>Servings Per Container 2</Text>
          <View style={styles.separator} />
          <View style={styles.section}>
            <Text style={styles.boldText}>Amount Per Serving</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.section}>
            <Text style={styles.boldText}>Calories</Text>
            <Text style={styles.largeText}>{nutrients.calories}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.section}>
            <Text style={styles.boldText}>% Daily Value*</Text>
          </View>
          <View style={styles.nutrientRow}>
            <Text style={styles.boldText}>Total Fat</Text>
            <Text>{nutrients.fats}g</Text>
            <Text>{Math.round((nutrients.fats / 78) * 100)}%</Text>
          </View>
          <View style={styles.subNutrientRow}>
            <Text>Saturated Fat {nutrients.satfats}g</Text>
            <Text>10%</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.nutrientRow}>
            <Text style={styles.boldText}>Cholesterol</Text>
            <Text>30mg</Text>
            <Text>10%</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.nutrientRow}>
            <Text style={styles.boldText}>Sodium</Text>
            <Text>300mg</Text>
            <Text>13%</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.nutrientRow}>
            <Text style={styles.boldText}>Total Carbohydrate</Text>
            <Text>{nutrients.carbs}g</Text>
            <Text>{Math.round((nutrients.carbs / 275) * 100)}%</Text>
          </View>
          <View style={styles.subNutrientRow}>
            <Text>Dietary Fiber 3g</Text>
            <Text>12%</Text>
          </View>
          <View style={styles.subNutrientRow}>
            <Text>Sugars 5g</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.nutrientRow}>
            <Text style={styles.boldText}>Protein</Text>
            <Text>{nutrients.proteins}g</Text>
          </View>
          <View style={styles.separator} />
          <Text style={styles.note}>*Percent Daily Values are based on a 2,000 calorie diet.</Text>
        </View>

        <View style={styles.border} />
        <View style={styles.titleleft}>
          <Text style={styles.titlepref}>Ingredients</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
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
  note: {
    fontSize: 12,
    marginTop: 10,
  },
  border: {
    marginTop: 50,
    width: '95%',
    borderBottomWidth: 1,
    borderBottomColor: '#cbcbcb',
  },
  Title: {
    marginTop: 70,
    fontSize: 50,
  },
  titlepref: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70,
    marginBottom: 10,
    marginLeft: 20,
    width: 70,
    height: 50,
  },
  buttonText: {
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around', // Distribute space evenly
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
    width: '100%',
    height: 100,
    borderRadius: 10,
    resizeMode: 'contain',
    alignContent: 'center',
  },
  leftContent: {
    flex: 1,
    alignItems: 'start',
    marginTop: 70,
    marginBottom: 10,
    marginLeft: 20,
    paddingRight: 20,
  },
  middleContent: {
    flex: 1,
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 10,
  },
  rightContent: {
    flex: 1,
    alignItems: 'end',
    marginTop: 70,
    marginBottom: 10,
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
});

export default FoodInfoPage;


