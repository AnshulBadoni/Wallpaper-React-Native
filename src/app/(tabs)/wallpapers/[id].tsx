import { StyleSheet, Image, ImageBackground, TouchableOpacity, Linking } from "react-native";
import { Text, View } from "@/src/components/Themed";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Loader from "@/src/components/reuseable/Loader";
import axios from "axios";

const ImageDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const apiUrl = `https://wallhaven.cc/api/v1/w/${id}?apikey=XjrNRAQHiQfQcM5KujT1daeAeOX6UGej`;
  const [wallpaper, setWallpaper] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setWallpaper(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, [apiUrl]);

  const handleDownload = () => {
    if (wallpaper && wallpaper.path) {
      Linking.openURL(wallpaper.path);
    }
  };

  return (
    <View style={styles.container}>
      {error && <Text>Error: {error.message}</Text>}
      <Stack.Screen options={{ title: "Wallpaper" }} />

      {loading ? (
  <Loader />
) : (
  wallpaper && (
    <>
      <ImageBackground
        style={styles.imageContainer}
        source={{ uri: wallpaper.path }}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.details}>{wallpaper.resolution}</Text>
          <TouchableOpacity style={styles.button} onPress={handleDownload}>
            <Text style={styles.buttonText}>Download</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  )
)}

    </View>
  );
};

export default ImageDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 700
  },
  details: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    flex: 1, 
    textAlign:'center'
  },
  button: {
    backgroundColor: "blue",
    width:'45%',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  
});
