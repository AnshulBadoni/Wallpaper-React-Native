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
            <Text style={styles.title}># {wallpaper.purity}</Text>
            <Text style={styles.details}># {wallpaper.category}</Text>
            <Text style={styles.details}>{wallpaper.resolution}</Text>
            <TouchableOpacity style={styles.button} onPress={handleDownload}>
              <Text style={styles.buttonText}>Download</Text>
            </TouchableOpacity>
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
  title: {
    // backgroundColor: 'rgba(246, 246, 246, 0.21)',
    borderRadius: 50,
    width: 100,
    fontSize: 16,
    marginTop: '150%',
    marginBottom: 5,
    marginStart: 10
  },
  details: {
    // backgroundColor: 'rgba(246, 246, 246, 0.21)',
    borderRadius: 50,
    width:100,
    fontSize: 16,
    marginStart: 10,
    marginBottom: 5
  },
  button: {
    // backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
