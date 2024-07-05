import React from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import COLORS from "../../constants/colors";
import Ring from "./ring";

export default function FoodCard({ images, names }) {
  console.log(names, "names");
  // Step 1: Accept images as a prop
  return (
    <View style = {styles.Card}>
        <Text> Hello world</Text>

        <View style = {styles.subcard}>

            <Text> 150 calories</Text>
            
       </View>
       <View style = {styles.subcard}>

<Text> Goya inc.</Text>

</View>
        

    </View>
  );
}

const styles = StyleSheet.create({
  Card: {
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "rgba(200, 200, 200, 0.5)", // semi-transparent grey 
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "rgba(255, 255, 255, 0.0)",
    borderWidth: 0.7,
    borderColor: COLORS.primary,
    
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    padding: 10,
  },
  subcard:{
    marginHorizontal: 0,
    borderWidth: 0.7,
    backgroundColor: "rgba(180, 180, 180, 0.5)",
    width: 100,
    margin: 2,
    borderRadius: 5,

    

  },
  cardContent: {},
  box: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    letterSpacing: 20,
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  image: {
    height: 100,
    width: 100,
  },
});