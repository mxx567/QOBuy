import { Stack } from "expo-router";

export default function RegionLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="[region]" options={{ headerShown: false }} />
        </Stack>
    )
}