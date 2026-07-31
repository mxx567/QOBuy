import SignOutButton from "@/src/components/auth/SignOut";
import { useAuthContext } from "@/src/hooks/AuthContext";
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
    const { claims } = useAuthContext();

    return (
        <View style={pageStyle.mainPage}>
            <Text style={{color:'white'}}>{"Hello" + claims?.username}</Text>
            <SignOutButton />
        </View>
    );
}