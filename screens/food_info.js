import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ring from '../ios/components/ring';

const FoodInfoPage = ({route}) => {
    const navigation = useNavigation();
  
    const backbtnclicked = () => {
      navigation.goBack();
    };

    const { name } = route.params;
  
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
    Title: {
      marginTop: 70,
      fontSize: 50,
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
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    titleContainer: {
      flex: 1,
      alignItems: 'center',
    },
    spacer: {
      width: 50,
    },
  });

export default FoodInfoPage;
