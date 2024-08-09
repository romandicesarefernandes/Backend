import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { handleFood_search, handleFood_request_nutrients} from "../scripts/handle_register";
import FoodCard from "../ios/components/food";
import SearchBar from "../ios/components/SearchBar";

const SearchFoodPage = ({ navigation }) => {
  const [images, setImages] = useState([
    "https://i0.wp.com/static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg?ssl=1",
    "https://i0.wp.com/static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg?ssl=1",
    "https://i0.wp.com/static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg?ssl=1",
    "https://i0.wp.com/static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg?ssl=1",
    "https://i0.wp.com/static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg?ssl=1",
    "https://i0.wp.com/static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg?ssl=1",
    "https://i0.wp.com/static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg?ssl=1",
    "https://i0.wp.com/static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg?ssl=1",
    "https://i0.wp.com/static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg?ssl=1",
  ]);
  const [names, setNames] = useState(["testfood1", 
                                      "testfood2", 
                                      "testfood3",
                                      "testfood4",
                                      "testfood5",
                                      "testfood6",
                                      "testfood7",
                                      "testfood8",
                                      "testfood9"
  ]);
  const [nutrients, setNutrients] = useState([
    { calories: 1260, fats: 45, proteins: 29, carbs: 167 },
    { calories: 400, fats: 20, proteins: 20, carbs: 30 },
    { calories: 450, fats: 25, proteins: 25, carbs: 35 },
    { calories: 300, fats: 10, proteins: 10, carbs: 20 },
    { calories: 600, fats: 35, proteins: 35, carbs: 45 },
    { calories: 550, fats: 30, proteins: 30, carbs: 40 },
    { calories: 500, fats: 30, proteins: 30, carbs: 40 },
    { calories: 400, fats: 20, proteins: 20, carbs: 30 },
    { calories: 450, fats: 25, proteins: 25, carbs: 35 },
  ]);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  const fetchFoodData = async (query) => {
    const foodData = await handleFood_search(query);
  
    if (foodData) {
      const newImages = foodData.map((item) => item.food.image || "https://i0.wp.com/static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg?ssl=1");
      const newNames = foodData.map((item) => item.food.label);
      const newNutrients = foodData.map((item) => ({
        calories: item.food.nutrients.ENERC_KCAL || 0,
        fats: item.food.nutrients.FAT || 0,
        proteins: item.food.nutrients.PROCNT || 0,
        carbs: item.food.nutrients.CHOCDF || 0,
      }));
  
      setImages(newImages);
      setNames(newNames);
      setNutrients(newNutrients);
    }
  };

  useEffect(() => {
    fetchFoodData("");
  }, []);

  const handleCardPress = async (name, image) => {
    const index = names.indexOf(name);
    let nutrientData = nutrients[index];
  
    if (!nutrientData) {
      const response = await handleFood_request_nutrients(name);
      nutrientData = JSON.parse(response);
      setNutrients((prevNutrients) => {
        const newNutrients = [...prevNutrients];
        newNutrients[index] = nutrientData;
        return newNutrients;
      });
    }
  
    navigation.navigate("food_info", { name, imagei: image, nutrients: nutrientData });
  };

  const handleSearch = async () => {
    await fetchFoodData(searchPhrase);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <SearchBar
          clicked={clicked}
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          setClicked={setClicked}
          onSearch={handleSearch}
        />
        <FoodCard images={images} names={names} nutrients={nutrients} onCardPress={handleCardPress} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
  },
});

export default SearchFoodPage;



