import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { handleFood_search } from "../scripts/handle_register";
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
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  const fetchFoodData = async (query) => {
    const foodData = await handleFood_search(query, "");
    const newImages = foodData.map((item) => item.food.image);
    const newNames = foodData.map((item) => item.food.knownAs);
    setImages(newImages);
    setNames(newNames);
  };

  useEffect(() => {
    fetchFoodData("");
  }, []);

  const handleCardPress = (name, imagei) => {
    navigation.navigate("food_info", { name, imagei });
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
        <FoodCard images={images} names={names} onCardPress={handleCardPress} />
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


