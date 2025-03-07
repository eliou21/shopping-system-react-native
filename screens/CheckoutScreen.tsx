import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
  Platform,
  ImageBackground,
} from "react-native";
import { useCart } from "../context/CartContext";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

type RootTabParamList = {
  Home: undefined;
  Cart: undefined;
  Checkout: undefined;
  Exit: undefined;
  Welcome: undefined;
};

type CheckoutScreenProps = {
  navigation: BottomTabNavigationProp<RootTabParamList, "Checkout">;
};

export default function CheckoutScreen({ navigation }: CheckoutScreenProps) {
  const { checkoutCart, checkout, clearCheckoutCart } = useCart();

  const totalPrice: number = checkoutCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleConfirmOrder = () => {
    Alert.alert("Confirm Purchase", "Do you want to complete this order?", [
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => {
          clearCheckoutCart();
          navigation.navigate("Cart");
        },
      },
      {
        text: "Confirm",
        onPress: () => {
          checkout(navigation);
          Alert.alert("Order Placed", "Thank you for your purchase!");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="black" translucent />

      {/* Banner Section */}
      <ImageBackground
        source={require("../assets/banner.gif")}
        style={styles.banner}
        resizeMode="cover"
      >
        <Text style={styles.bannerText}>🌼 CHECKOUT 🌼</Text>
      </ImageBackground>

      {/* Cart Container */}
      <View style={styles.container}>
        {checkoutCart.length === 0 ? (
          <Text style={styles.emptyText}>No items to checkout.</Text>
        ) : (
          <>
            <View style={{ flex: 1 }}>
              <View style={styles.cartContainer}>
                <FlatList
                  data={checkoutCart}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                      <Image source={item.image} style={styles.itemImage} />
                      <View style={styles.itemDetails}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <View style={styles.itemRow}>
                          <Text style={styles.itemPrice}>₱{item.price.toFixed(2)}</Text>
                          <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                        </View>
                      </View>
                    </View>
                  )}
                  ItemSeparatorComponent={() => <View style={styles.separator} />}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>

            {/* Checkout Section */}
            <View style={styles.bottomContainer}>
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total:</Text>
                <Text style={styles.totalPrice}>₱{totalPrice.toFixed(2)}</Text>
              </View>

              <TouchableOpacity style={styles.checkoutButton} onPress={handleConfirmOrder}>
                <Text style={styles.checkoutText}>Complete Purchase</Text>
              </TouchableOpacity>
            </View>
          </>
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
    color: "black",
  },

  cartContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    flexGrow: 1,
    maxHeight: "100%",
  },

  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },

  itemDetails: {
    flex: 1,
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#323433",
  },

  itemPrice: {
    fontSize: 14,
    color: "#777",
  },

  itemQuantity: {
    fontSize: 14,
    color: "#777",
    fontWeight: "bold",
  },

  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 5,
  },

  bottomContainer: {
    justifyContent: "flex-end",
  },

  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },

  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#323433",
  },

  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#323433",
  },

  checkoutButton: {
    backgroundColor: "#323433",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  checkoutText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F5E9E9",
    letterSpacing: 1,
  },
});