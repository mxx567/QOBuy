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
    const { profile } = useAuthContext();

    return (
        <View style={pageStyle.mainPage}>
            <Text style={{color:'white'}}>{"Hello, " + profile?.username + "! :thumps_up:"}</Text>
            <SignOutButton />
        </View>
    );
}