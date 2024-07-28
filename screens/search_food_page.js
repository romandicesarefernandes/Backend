import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Text} from "react-native";
import { handleFood_search } from "../scripts/handle_register";
import FoodCard from "../ios/components/food";
import SearchBar from "../ios/components/SearchBar";

const SearchFoodPage = ({navigation}) => {
  const [images, setImages] = useState([
    "https://banner2.cleanpng.com/20180722/gfc/kisspng-user-profile-2018-in-sight-user-conference-expo-5b554c0968c377.0307553315323166814291.jpg",
    "https://example.com/default-image2.jpg",
    "https://example.com/default-image2.jpg",

  ]);
  const [names, setNames] = useState(["pasta", "rice", "chicken"]);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const fetchFoodData = async () => {
      const foodData = await handleFood_search("pasta", "");
      const newImages = foodData.map(item => item.food.image);
      const newNames = foodData.map(item => item.food.knownAs);
      setImages(newImages);
      setNames(newNames);
    };

    fetchFoodData();
  }, []);

  const handleCardPress = (name, imagei) => {
    navigation.navigate('food_info', {name, imagei})
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <SearchBar
          clicked={clicked}
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          setCLicked={setClicked}
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


