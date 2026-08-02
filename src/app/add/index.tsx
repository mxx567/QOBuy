import { useRouter } from "expo-router";
import CommonButton from "@/src/components/common/CommonButton";
import CommonHeader from "@/src/components/common/CommonHeader";
import InputLine from "@/src/components/common/InputLine";
import { View, Text, StatusBar } from "react-native";

import { StyleSheet } from "react-native";

const pageStyle = StyleSheet.create({
    mainPage:{
        flex: 1,
        backgroundColor: '#1B1818',
        
        
    },
    screenContainer:{
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginTop: 20
    }
});


export default function AddScreen(){
    const router = useRouter();
    return (
        <View style={pageStyle.mainPage}>
            <StatusBar />
            <CommonHeader headerText="Create Listing" />
            <View style={pageStyle.screenContainer}>
                <InputLine placeholder="Title" value={""} onChangeText={() => {}} placeholderTextColor="#555" />
                <CommonButton title="Select Category" isNext onPress={() => router.push({pathname: '/categories'})} />
                <InputLine placeholder="Description" value={""} onChangeText={() => {}} placeholderTextColor="#555" height={200} />
                <InputLine placeholder="Price" value={""} onChangeText={() => {}} placeholderTextColor="#555" inputMode="numeric" />
            </View>
        </View>
    );
}