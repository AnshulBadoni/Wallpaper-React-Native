import { Stack } from "expo-router";

export default function WallpaperStack() {
    return <Stack>
        <Stack.Screen name = 'index' options={{title: 'Wallpaper'}} />
    </Stack>
}