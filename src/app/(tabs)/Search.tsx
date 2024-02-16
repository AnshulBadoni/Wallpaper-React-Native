import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, TextInput, FlatList } from "react-native";
import Loader from "@/src/components/reuseable/Loader";
import { Text, View } from "@/src/components/Themed";
import { ImageCard } from "@/src/components/reuseable";
import axios from "axios";

export default function TabTwoScreen() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const apikey = "XjrNRAQHiQfQcM5KujT1daeAeOX6UGej";
  const apiUrl = `https://wallhaven.cc/api/v1/search?q=${searchQuery}&apikey=${apikey}&page=${page}&purity=100`;
  const numColumns = 2;

  const fetchData = useCallback(() => {
    setLoading(true);
    axios
      .get(apiUrl)
      .then((response) => {
        const newData = response.data.data;
        setData((prevData) => [...prevData, ...newData]);
        setPage((prevPage) => prevPage + 1);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, [searchQuery, page]); 

  
  useEffect(() => {
    fetchData();
  }, [fetchData]); 

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(prevSearchQuery => prevSearchQuery !== text ? text : prevSearchQuery)} // Use functional update
      />
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={data}
          numColumns={numColumns}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemContainer}>
                <ImageCard wallpaper={item} />
               </View>
             );
          }}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={fetchData}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.flatlistContainer}
        />
      )}
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
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
    width: "80%",
  },
  itemContainer: {
    // flex: 1,
    marginHorizontal: 1,
    marginVertical:1
  },
  flatlistContainer: {
    flexGrow: 1,
    width: 100
  },
});