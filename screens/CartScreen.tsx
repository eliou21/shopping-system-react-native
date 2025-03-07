import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
} from "react-native";
import { useCart } from "../context/CartContext";
import { MaterialIcons } from "@expo/vector-icons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  Checkout: undefined;
  Exit: undefined;
  Welcome: undefined;
};

type CartScreenProps = {
  navigation: BottomTabNavigationProp<RootStackParamList, "Cart">;
};

export default function CartScreen({ navigation }: CartScreenProps) {
  const { cart, updateQuantity, removeFromCart, proceedToCheckout } = useCart();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="black" translucent />

      {/* Banner */}
      <ImageBackground source={require("../assets/banner.gif")} style={styles.banner} resizeMode="cover">
        <Text style={styles.bannerText}>🌼 YOUR CART 🌼</Text>
      </ImageBackground>

      <View style={styles.container}>
        {cart.length === 0 ? (
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        ) : (
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                {/* Product Image */}
                <Image source={item.image} style={styles.image} />

                {/* Product Details */}
                <View style={styles.details}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>₱ {item.price.toFixed(2)}</Text>

                  <View style={styles.separator} />

                  <Text style={styles.productTotal}>Total: ₱ {(item.price * item.quantity).toFixed(2)}</Text>
                </View>

                {/* Quantity and Delete in One Row */}
                <View style={styles.rightSection}>
                  {/* Quantity Controls */}
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, -1)}>
                      <Text style={styles.quantityText}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.quantityNumber}>{item.quantity}</Text>

                    <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, 1)}>
                      <Text style={styles.quantityText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Delete Button */}
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert("Confirm Deletion", "Are you sure you want to delete this item?", [
                        { text: "Cancel", style: "cancel" },
                        { text: "Delete", onPress: () => removeFromCart(item.id), style: "destructive" },
                      ]);
                    }}
                    style={styles.deleteButton}
                  >
                    <MaterialIcons name="delete" size={26} color="#323433" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}

        {/* Checkout Button */}
        {cart.length > 0 && (
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => {
              proceedToCheckout();
              navigation.navigate("Checkout");
            }}
          >
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  banner: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  bannerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 2,
  },

  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F5E9E9",
  },

  emptyText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#323433",
  },

  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(142, 90, 94, 0.8)", 
    borderRadius: 12,
    padding: 10,
    marginVertical: 10,
    borderColor: "white",
    borderWidth: 2,
    justifyContent: "space-between",
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },

  details: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },

  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },

  productPrice: {
    fontSize: 12,
    color: "rgb(217, 217, 217)",
    marginTop: 2,
  },

  productTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "rgb(255, 225, 205)",
  },

  separator: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Light white-transparent line
    marginVertical: 2,
    width: "100%", // Ensures it's not too wide
    alignSelf: "center",
  },  

  rightSection: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    overflow: "hidden",
    width: 90, 
    justifyContent: "space-between",
  },

  quantityButton: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "#323433",
  },

  quantityText: {
    fontSize: 10,
    color: "white",
    fontWeight: "bold",
  },

  quantityNumber: {
    paddingHorizontal: 12,
    fontSize: 12,
    fontWeight: "bold",
    color: "#8E6E6F",
    backgroundColor: "#fff",
  },

  deleteButton: {
    padding: 5, 
  },

  checkoutButton: {
    backgroundColor: "#323433",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  checkoutText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F5E9E9",
    letterSpacing: 1,
  },
});

