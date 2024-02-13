import {StyleSheet, Image} from 'react-native'
import { Text, View } from '@/src/components/Themed';
import { useLocalSearchParams } from 'expo-router';


const ImageDetailScreen = () => {
  const { id } = useLocalSearchParams();
    return (
      <View style={styles.container}>
        {/* <Image
        style={styles.image }
        source={{
          uri: wallpaper.thumbs.large,
        }}
      /> */}
      <Text>Just to test Link : {id}</Text>
      </View>
    );
  }

export default ImageDetailScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
    //   width: 200,    
    //   height: 300,
    //   borderRadius: 10,
    //   marginTop: 5,
    //   marginBottom: 5,
    //   resizeMode: 'cover' ,
    },
    
  });