import { Pressable, View, Image, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
const headerStyle = StyleSheet.create({
    header: {
        height: 80,
        width: '100%',
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        boxShadow: [{
            offsetX: 0,
            offsetY: -12,
            blurRadius:20
        }]
    },
    backIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    headerText: {
        color: 'black',
        fontSize: 18,
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