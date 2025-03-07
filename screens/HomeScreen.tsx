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
  Alert
} from "react-native";
import { useCart } from "../context/CartContext";

type Product = {
  id: number;
  name: string;
  price: number;
  image: any; 
};

type HomeScreenProps = {
  navigation: any; 
};

const PRODUCTS: Product[] = [
  { id: 1, name: "Pure Serenity", price: 800, image: require("../assets/white.jpg") },
  { id: 2, name: "Blush Elegance", price: 1500, image: require("../assets/pink.jpg") },
  { id: 3, name: "Crimson Passion", price: 700, image: require("../assets/red.jpg") },
  { id: 4, name: "Golden Radiance", price: 1200, image: require("../assets/yellow.jpg") },
  { id: 5, name: "Sunset Glow", price: 1400, image: require("../assets/orange.jpg") },
  { id: 6, name: "Royal Amethyst", price: 1300, image: require("../assets/purple.jpg") },
  { id: 7, name: "Azure Whispers", price: 1400, image: require("../assets/blue.jpg") },
  { id: 8, name: "Emerald Grace", price: 1400, image: require("../assets/green.jpg") },
];

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { addToCart } = useCart();

  return (
    <ImageBackground 
      source={require("../assets/background.gif")}
      style={styles.background} 
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="black" translucent />

        <ImageBackground 
          source={require("../assets/banner.gif")} 
          style={styles.banner}
          resizeMode="cover"
        >
          <Text style={styles.bannerText}>🌼 AVAILABLE FLOWERS 🌼</Text>
        </ImageBackground>

        <View style={styles.container}>
          <FlatList
            data={PRODUCTS}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2} 
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: { item: Product }) => (

              <View style={styles.productCard}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>₱ {item.price.toFixed(2)}</Text>

                <TouchableOpacity 
                  style={styles.button} 
                  onPress={() => {
                    addToCart({ ...item, quantity: 1 }); 
                    Alert.alert("Success", "Item successfully added to cart!");
                  }}                  
                >
                  <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, 
  },

  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
    height: "100%",
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    letterSpacing: 2,
  },

  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F5E9E9",
  },

  list: {
    justifyContent: "center",
  },

  productCard: {
    backgroundColor: "#8E5A5E",
    borderRadius: 12,
    padding: 15,
    margin: 10,
    alignItems: "center",
    width: "45%", 
    elevation: 4, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderColor: "white",
    borderWidth: 3
  },

  image: {
    width: 150,
    height: 140,
    marginBottom: 12,
    borderRadius: 12
  },

  productName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "white"
  },

  productPrice: {
    fontSize: 16,
    color: "white",
    marginBottom: 10,
  },

  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
  },

  buttonText: {
    color: "#8E6E6F",
    fontSize: 16,
    fontWeight: "bold",
  },
});
