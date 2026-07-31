import SignOutButton from "@/src/components/auth/SignOut";
import { View, Text } from "react-native";

import { StyleSheet } from "react-native";

const pageStyle = StyleSheet.create({
    mainPage:{
        flex: 1,
        backgroundColor: '#1B1818',
        alignItems: "center",
        justifyContent: "center",
    }
});

export default function ProfileScreen(){
    return (
        <View style={pageStyle.mainPage}>
            <Text style={{color:'white'}}>Profile</Text>
            <SignOutButton />
        </View>
    );
}