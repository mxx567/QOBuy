import { Stack } from "expo-router";

export default function CategoriesLayout() {
    return (
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="[category]" options={{ headerShown: false }} />
        

    </Stack>
    )
}