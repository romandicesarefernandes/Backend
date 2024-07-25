import React from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text, Dimensions } from "react-native";
import COLORS from "../../constants/colors";

const FoodCard = ({ images, names, onCardPress }) => {
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth / 2.85 - 16; 

  const renderCards = () => {
    const rows = [];
    for (let i = 0; i < images.length; i += 3) {
      const rowItems = images.slice(i, i + 3).map((image, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, { width: cardWidth }]}
          onPress={() => onCardPress(index)}
        >
          <Image source={{ uri: image }} style={styles.image} />
          <Text style={styles.name}>{names[index]}</Text>
          <Text style={styles.calories}>500 cal</Text>
          <Text style={styles.calories}>Fats:30g</Text>
          <Text style={styles.calories}>Proteins:30g</Text>
          <Text style={styles.calories}>Carbs:40g</Text>
        </TouchableOpacity>
      ));
      rows.push(
        <View key={i} style={styles.row}>
          {rowItems}
        </View>
      );
    }
    return rows;
  };

  return <View style={styles.container}>{renderCards()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  card: {
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "rgba(255, 255, 255, 0.2)", // semi-transparent white
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "rgba(255, 255, 255, 0.0)",
    borderWidth: 0.7,
    borderColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    padding: 20,
  },
  image: {
    width: "100%",
    height: 90,
    borderRadius: 10,
    resizeMode: "contain"
  },
  name: {
    marginTop: 5,
    textAlign: "center",
  },
  calories: {
    textAlign: "left",
    fontSize: 11,
  },
});

export default FoodCard;

