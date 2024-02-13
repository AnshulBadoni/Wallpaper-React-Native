import {StyleSheet, Image} from 'react-native'
import { Text, View } from '@/src/components/Themed';


export default function Loader() {
    return (
      <View style={styles.container}>
        <Image
        style={styles.image }
        source={require("../../../assets/images/load.gif")}
      />

      </View>
    );
  }
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 65, 
    },
    
  });