import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import axios from "axios";
import { ImageCard } from "@/src/components/reuseable";
import Loader from "@/src/components/reuseable/Loader";

export default function Home() {
    const numColumns = 2;
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<any>(null);
    const [page, setPage] = useState<number>(1);
    const searchTerm = '';
    const apikey = 'XjrNRAQHiQfQcM5KujT1daeAeOX6UGej';
    const apiUrl = `https://wallhaven.cc/api/v1/search?q=${searchTerm}&apikey=${apikey}&page=${page}`;
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get(apiUrl)
            .then(response => {
                const newData = response.data.data;
                setData(prevData => [...prevData, ...newData]);
                setPage(prevPage => prevPage + 1);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false);
            });
    };

    const renderFooter = () => {
        if (!loading) return null;
        return <Loader />;
    };

    return (
        <View style={styles.container}>
            {error && <Text>Error: {error.message}</Text>}
            <FlatList
                style={styles.items}
                data={data}
                numColumns={numColumns}
                renderItem={({ item }) => <ImageCard wallpaper={item} />}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={fetchData}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
            />
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
});
