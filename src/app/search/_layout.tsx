import { Stack } from "expo-router";

export default function MyListingsLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="searchresults/index" options={{headerShown:false}} />
        </Stack>
    )
}