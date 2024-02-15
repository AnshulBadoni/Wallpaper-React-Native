import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, FlatList } from "react-native";
import { Text, View } from "@/src/components/Themed";
import { ImageCard } from "@/src/components/reuseable";

export default function TabTwoScreen() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const apikey = "XjrNRAQHiQfQcM5KujT1daeAeOX6UGej";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://wallhaven.cc/api/v1/search?q=${searchQuery}&apikey=${apikey}&page=1&sorting=random&purity=100`
        );
        const data = await response.json();
        console.log("Search Results:", data);
        setData(data);
      } catch (error) {
        console.error("Error searching:", error);
      }
    };

    if (searchQuery !== "") {
      fetchData();
    } else {
      setData([]);
    }
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={data}
        renderItem={({ item }) => {
          console.log("Rendering Item:", item); // Log the item being rendered
          return <ImageCard wallpaper={item} />;
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    borderWidth: 2,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 10,
    marginBottom: 20,
    width: "80%",
  },
});
