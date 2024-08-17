import React from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import COLORS from "../../constants/colors";
import Ring from "./ring";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { StatusBar } from "react-native";

export default function Patientcard(names, nutrients, brands) {



  return (
    <View
      style={{
        borderRadius: 10,
        elevation: 3,// semi-transparent white
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "rgba(255, 255, 255, 0.0)",
        borderColor: COLORS.primary,
        flexDirection: "row",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 2,
        justifyContent: "space-between",
        marginTop: 50,
        padding: 20,
      }}
    >
      <View style={{alignItems: "center", justifyContent: "center" }}>
        <Text>Fat</Text>
        <AnimatedCircularProgress
          size={100}
          width={12}
          fill={80}
          tintColor="#f7bf05"
          onAnimationComplete={() => console.log("onAnimationComplete")}
          backgroundColor="#C1C7C9"
        />
        <Text style={{ position: "absolute" }}>80%</Text>
        <Text>150g</Text>
      </View>

      <View style={{alignItems: "center", justifyContent: "center" }}>
        <Text>Protein</Text>
        <AnimatedCircularProgress
          size={100}
          width={12}
          fill={80}
          tintColor="#a410fe"
          onAnimationComplete={() => console.log("onAnimationComplete")}
          backgroundColor="#C1C7C9"
          />
        <Text style={{ position: "absolute" }}>80%</Text>
        <Text>150g</Text>
      </View>

      <View style={{alignItems: "center", justifyContent: "center" }}>
        <Text>Carbohydrates</Text>
        <AnimatedCircularProgress
          size={100}
          width={12}
          fill={80}
          tintColor="#27d8ef"
          onAnimationComplete={() => console.log("onAnimationComplete")}
          backgroundColor="#C1C7C9"
        />
        <Text style={{ position: "absolute" }}>80%</Text>
        <Text> 200g</Text>
      </View>
    </View>
  );
}
