import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { CartProvider } from "../context/CartContext";
import HomeScreen from "./HomeScreen";
import CartScreen from "./CartScreen";
import CheckoutScreen from "./CheckoutScreen";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type RootTabParamList = {
  Home: undefined;
  Cart: undefined;
  Checkout: undefined;
  Exit: undefined;
  Welcome: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function UserNavigation() {
  const navigation = useNavigation<NavigationProp<RootTabParamList>>();

  return (
    <CartProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#F5E9E9",
          tabBarInactiveTintColor: "rgb(220, 191, 191)",
          tabBarStyle: { backgroundColor: "#323433" },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => <Entypo name="home" size={20} color={color} />,
            tabBarButton: (props) => <TouchableOpacity {...(props as TouchableOpacityProps)} activeOpacity={1} />,
          }}
        />

        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarIcon: ({ color }) => <FontAwesome name="shopping-cart" size={20} color={color} />,
            tabBarButton: (props) => <TouchableOpacity {...(props as TouchableOpacityProps)} activeOpacity={1} />,
          }}
        />

        <Tab.Screen
          name="Checkout"
          component={CheckoutScreen}
          options={{
            tabBarIcon: ({ color }) => <MaterialIcons name="payment" size={20} color={color} />,
            tabBarButton: (props) => <TouchableOpacity {...(props as TouchableOpacityProps)} activeOpacity={1} />,
          }}
        />

        <Tab.Screen
          name="Exit"
          component={() => null}
          options={{
            tabBarIcon: ({ color }) => <Ionicons name="exit-outline" size={20} color={color} />,
            tabBarButton: (props) => (
              <TouchableOpacity
                {...(props as TouchableOpacityProps)}
                activeOpacity={1}
                onPress={() => navigation.navigate("Welcome")}
              />
            ),
          }}
        />
        
      </Tab.Navigator>
    </CartProvider>
  );
}