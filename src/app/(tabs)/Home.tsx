import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import axios from "axios";
import { ImageCard } from "@/src/components/reuseable";

import Loader from "@/src/components/reuseable/Loader";

export default function Home() {
    const numColumns = 2;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const searchTerm = '';
    const apikey = 'XjrNRAQHiQfQcM5KujT1daeAeOX6UGej';
    const apiUrl = `https://wallhaven.cc/api/v1/search?q=${searchTerm}&apikey=${apikey}&page=1`;
    
    useEffect(() => {
        axios.get(apiUrl)
            .then(response => {
                setData(response.data.data); // Assuming the data property contains the array of items
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <Loader />
            ) : error ? (
                <Text>Error: {error.message}</Text>
            ) : (
              
                <FlatList
                    style={styles.items}
                    data={data}
                    numColumns={numColumns}
                    renderItem={({ item }) => <ImageCard wallpaper={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />

            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    items: {
        flex: 1,
    },
    text: {
        // fontSize: 24, // Adjust the font size as needed
    },
});
