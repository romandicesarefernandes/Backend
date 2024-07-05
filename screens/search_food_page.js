
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { handleFood_search } from "../scripts/handle_register";
import FoodCard from "../ios/components/food";
import SearchBar from "../ios/components/SearchBar";
import Card from "../ios/components/card";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
let images = [];
let names = [];

async function getFoodData(ingr, brand) {
  const Data = await handleFood_search(ingr, brand);
  const foodData = JSON.parse(Data);
  console.log(foodData[0].food.foodId);

 // console.log("\n" + images[1]);
  return foodData;
}

const SearchFoodPage = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const data = getFoodData("rice", "");

  console.log("\n" + data);

  return (
    <LinearGradient
    colors={['#FFFFFF', '#007260']}
    style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 25}}
> 
<View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          position: "absolute",
          top: 0,
          width: "100%",
          backgroundColor: "white",
          padding: 30,
          flex: 1,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,

          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => setSelectedIcon("setting")}
        >
          <AntDesign
            name="setting"
            size={35}
            color={selectedIcon === "setting" ? "green" : "black"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => {
            setSelectedIcon("home");
            handleFood_search("potato", "lays");
          }}
        >
          <AntDesign
            name="home"
            size={35}
            color={selectedIcon === "home" ? "green" : "black"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => setSelectedIcon("restaurant-outline")}
        >
          <Ionicons
            name="restaurant-outline"
            size={35}
            color={selectedIcon === "restaurant-outline" ? "green" : "black"}
          />
        </TouchableOpacity>
      </View>
    <ScrollView>
      <View style={styles.container}>
        <SearchBar></SearchBar>
        <View style = {styles.mainContainer}> 
        <FoodCard images={images} names={names} />
        <FoodCard images={images} names={names} />
        <FoodCard images={images} names={names} />
        <FoodCard images={images} names={names} />
        <FoodCard images={images} names={names} />
        <FoodCard images={images} names={names} />
        <FoodCard images={images} names={names} />

        </View>
        
      </View>
    </ScrollView>

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    // justifyContent: "center",

    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row'
},
});

export default SearchFoodPage;