import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ring from '../ios/components/ring';

const FoodInfoPage = ({ route }) => {
  const navigation = useNavigation();

  const backbtnclicked = () => {
    navigation.goBack();
  };

  const { name } = route.params;
  const { imagei } = route.params;

  return (
    <ScrollView>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={backbtnclicked}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.Title}>{name}</Text>
        </View>
        <View style={styles.spacer} />
      </View>

      <View style={styles.container}>
        <Image source={{ uri: imagei }} style={styles.image} />
        <View style={styles.border} />

        <View style={styles.titleleft}>
          <Text style={styles.titlepref}>Nutrition Label</Text>
          
        </View>
        <View style={styles.border} />
        <View style={styles.row}>
          <View style={styles.leftContent}>
            <Text style={styles.titlepref}>Daily Intake</Text>
            <Text>50%</Text>
          </View>
          <View style={styles.middleContent}>
            <Ring />
          </View>
          <View style={styles.rightContent}>

          </View>
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
  border: {
    marginTop: 50,
    width: "95%",
    borderBottomWidth: 1,
    borderBottomColor: "#cbcbcb",
  },
  Title: {
    marginTop: 70,
    fontSize: 50,
  },
  titlepref: {
    color: "black",
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 20
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
    marginBottom: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  spacer: {
    width: 80,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    resizeMode: "contain",
    alignContent: "center",
  },
  leftContent: {
    flex: 1,
    alignItems: 'flex-start',
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
    alignItems: 'flex-end',
    marginTop: 70,
    marginBottom: 10,
    marginRight: 20,
  },
  titleleft: {
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 70,
    marginBottom: 10,
  }
});

export default FoodInfoPage;
