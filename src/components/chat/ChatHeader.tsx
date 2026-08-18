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
        gap:10
    },
    charInfo:{
        flexDirection: 'column'
    },
    chatAvatar:{
        width: 40,
        height: 40,
        borderRadius: 100
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: "bold",
    },
    descText: {
        color: '#4b4b4b',
        fontSize: 14,
        fontWeight: "bold",
    }
});

export default function ChatHeader({listingname, userNames, chaticon}: {listingname: string, userNames: string, chaticon?: string}){
    if(chaticon === undefined){
        chaticon = 'https://i.ibb.co.com/9mGCjPYY/notfound.png';
    }
    const router = useRouter();
    return(
        <View style={headerStyle.header}>
            <Pressable onPress={() => router.back()}>
                <Image source={require('../../assets/icons/back.png')} style={headerStyle.backIcon} />
            </Pressable>
            <Image style={headerStyle.chatAvatar} source={{uri: chaticon}}/>
            <View style={headerStyle.charInfo}>
                <Text style={headerStyle.headerText}>{listingname}</Text>
                <Text style={headerStyle.descText}>{userNames}</Text>
            </View>
            
        </View>
    );
}