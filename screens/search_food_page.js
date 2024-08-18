import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView , Text} from "react-native";
import { handleFood_search, handleFood_request_nutrients} from "../scripts/handle_register";
import FoodCard from "../ios/components/food";
import SearchBar from "../ios/components/SearchBar";

const SearchFoodPage = ({ navigation, route}) => {
  const { mealType } = route.params; 
  const [images, setImages] = useState([
    "https://i0.wp.com/static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg?ssl=1"
  ]);
  const [names, setNames] = useState([
    "SomethingTest"
  ]);
  const [nutrients, setNutrients] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [brands, setBrands] = useState(["generic"]);
  const [servingSizes, setServingSize] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [noResults, setNoResults] = useState(false);


  const fetchFoodData = async (query) => {
    try {
      const foodDataResponse = await handleFood_search(query);
      
      console.log("API Response:", foodDataResponse);
      
      if (foodDataResponse && foodDataResponse.data && Array.isArray(foodDataResponse.data) && foodDataResponse.data.length > 0) {
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
        setNoResults(false);
      } 
      else {
        console.error("No data found in the response or data is not an array.");
        setNoResults(true);
      }
    } catch (error) {
      console.error("Error fetching food data:", error);
      setNoResults(true); 
    }
  };
  
  
  

  useEffect(() => {
    fetchFoodData("Pasta and Cheese and Beef and Rice and Apple");
  }, []);

  const handleCardPress = async (name, image) => {
    const index = names.indexOf(name);
    let nutrientData = nutrients[index];
    let ingredientData = ingredients[index];
    let brand = brands[index];
    let servingSize = servingSizes[index];
  
    navigation.navigate("food_info", {brand, name, imagei: image, nutrients: nutrientData, ingredients: ingredientData, servingSize, mealType});
  };

  const handleSearch = async () => {
    await fetchFoodData(searchPhrase);
  };
  

  return (
    <View>
      <View style={styles.header}>
        <SearchBar
          clicked={clicked}
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          setClicked={setClicked}
          onSearch={handleSearch}
        />
      </View>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Results:</Text>

          {noResults ? (
            <Text style={styles.noResultsText}>No results found. Please try a different search term.</Text>
          ) : (
            <FoodCard images={images} names={names} nutrients={nutrients} brands={brands} onCardPress={handleCardPress} />
          )}
          
          <View style={styles.spacer}/>
        </View>
      </ScrollView>
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
  },
  title: {
    alignSelf: 'start',
    fontSize: 24,
    marginLeft: 20,
    color: "#636363",
  },
  header: {
    backgroundColor: '#007260',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 150,
  },
  noResultsText: {
    fontSize: 18,
    color: "black",
    marginTop: 20,
    margin: 20
  },
  spacer: {
    height: 250,
  },
});


export default SearchFoodPage;


