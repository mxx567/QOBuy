import { Stack } from "expo-router";

export default function EditLayout() {
    return (
        <Stack>
            <Stack.Screen name="[chat]" options={{ headerShown: false }} />
        </Stack>
    )
}