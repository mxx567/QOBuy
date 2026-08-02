import { Pressable, View, Image, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
const headerStyle = StyleSheet.create({
    header: {
        height: 60,
        width: '100%',
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: '#2f2c2c',
    },
    backIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: "bold",
    }
});

export default function CommonHeader({headerText}: {headerText: string}){
    const router = useRouter();
    return(
        <View style={headerStyle.header}>
            <Pressable onPress={() => router.back()}>
                <Image source={require('../../assets/icons/back.png')} style={headerStyle.backIcon} />

            </Pressable>
            <Text style={headerStyle.headerText}>{headerText}</Text>
        </View>
    );
}