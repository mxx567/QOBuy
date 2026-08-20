import SignOutButton from "@/src/components/auth/SignOut";
import CommonButton from "@/src/components/common/CommonButton";
import OptionButton from "@/src/components/common/OptionButton";
import { useAuthContext } from "@/src/hooks/AuthContext";
import { View, Text,Image } from "react-native";
import { supabase } from "@/utils/supabase";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const pageStyle = StyleSheet.create({
    mainPage:{
        flex: 1,
        alignItems: "center",
    },
    image:{
        marginTop:70,
        width:100,
        height:100,
        borderRadius:100
    },
    text:{
        color:'black',
        fontWeight: 'bold',
        fontSize:20,
        marginBottom: 30,        
    },
    buttons:{
        marginBottom: 15
    }
});

export default function ProfileScreen(){
    const { profile } = useAuthContext();

    const router = useRouter();

    async function onSignOutButtonPress() {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error('Error signing out:', error)
        }
    }


    return (
        <View style={pageStyle.mainPage}>
            <Image source={{uri: profile.avatar_url}} style={pageStyle.image}/>
            <Text style={pageStyle.text}> Hello, {profile.username}! 👋 </Text>
            <View style = {pageStyle.buttons}>
                <OptionButton withIcon icon={require("../../../assets/icons/categories.png")} title="My Listings" onPress={()=>{router.push("/mylistings")}} isNext/>
                <OptionButton withIcon icon={require("../../../assets/icons/options.png")} title="Options" onPress={()=>{}} isNext/>
            </View>
            
            
            <CommonButton title="Sign Out" onPress={()=>{onSignOutButtonPress()}}/>
        </View>
    );
}              