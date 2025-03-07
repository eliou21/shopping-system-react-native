import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp } from "@react-navigation/stack";

// Define navigation type for TypeScript
type WelcomeScreenProps = {
  navigation: StackNavigationProp<any, "WelcomeScreen">;
};

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  return (
    <View style={styles.container}>
      <Image 
        source={require("../assets/background.gif")} 
        style={styles.background} 
        contentFit="cover"
      />

      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace("UserNavigation")}
        >
          <Text style={styles.buttonText}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  overlay: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  button: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 15,
    marginTop: 150,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8E6E6F",
  },
});
