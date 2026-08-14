import { Stack } from "expo-router";

export default function EditLayout() {
    return (
        <Stack>
            <Stack.Screen name="[listing]" options={{ headerShown: false }} />
        </Stack>
    )
}