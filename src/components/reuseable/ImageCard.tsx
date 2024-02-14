import { StyleSheet, Image, Pressable } from "react-native";
import { Text, View } from "@/src/components/Themed";
import { Link } from "expo-router";

type itemProps = {
  wallpaper: any;
};
export default function ImageCard({ wallpaper }: itemProps) {
  return (
    <Link href={`/wallpapers/${wallpaper.id}`} asChild>
      <Pressable style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: wallpaper.thumbs.large,
          }}
        />
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    resizeMode: "cover",
  },
});
