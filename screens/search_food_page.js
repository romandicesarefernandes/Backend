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
  const [ingredients, setIngredients] = useState([]);
  const [brands, setBrands] = useState([
    "Brand A",
    "Brand B",
    "Brand C",
    "Brand D",
    "Brand E",
    "Brand F",
    "Brand G",
    "Brand H",
    "Brand I"
  ]);
  const [servingSizes, setServingSize] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  const fetchFoodData = async (query) => {
    try {
      const foodDataResponse = await handleFood_search(query);
      
      console.log("API Response:", foodDataResponse);
      
      if (foodDataResponse && foodDataResponse.data && Array.isArray(foodDataResponse.data)) {
        const newImages = foodDataResponse.data.map(
          (item) => item.image || "https://i0.wp.com/static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg?ssl=1"
        );
        const newNames = foodDataResponse.data.map((item) => item.label);
        const newNutrients = foodDataResponse.data.map((item) => ({
          calories: item.nutrients.ENERC_KCAL || 0,
          fats: item.nutrients.FAT || 0,
          proteins: item.nutrients.PROCNT || 0,
          carbs: item.nutrients.CHOCDF || 0,
          fibers: item.nutrients.FIBTG || 0,
        }));
        const newBrands = foodDataResponse.data.map((item) => item.brand || "Generic Brand");
        const newServingSize = foodDataResponse.data.map((item) => item.serving_sizes || 100);
        const newIngredients = foodDataResponse.data.map((item) => item.content_label ? item.content_label.split(";") : []);
  
        setImages(newImages);
        setNames(newNames);
        setNutrients(newNutrients);
        setIngredients(newIngredients);
        setBrands(newBrands);
        setServingSize(newServingSize);
      } 
      else {
        console.error("No data found in the response or data is not an array.");
      }
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };
  
  

  useEffect(() => {
    fetchFoodData("Pasta");
  }, []);

  const handleCardPress = async (name, image) => {
    const index = names.indexOf(name);
    let nutrientData = nutrients[index];
    let ingredientData = ingredients[index];
    let brand = brands[index];
    let servingSize = servingSizes[index];
  
    navigation.navigate("food_info", {brand, name, imagei: image, nutrients: nutrientData, ingredients: ingredientData, servingSize});
  };

  const handleSearch = async () => {
    await fetchFoodData(searchPhrase);
  };
  

  return (
    <ScrollView>
    <View style={styles.header}>
        <SearchBar
          clicked={clicked}
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          setClicked={setClicked}
          onSearch={handleSearch}
        />
      </View>
      <View style={styles.container}>
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
  header: {
    backgroundColor: '#007260',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 150,
  },
});

export default SearchFoodPage;



