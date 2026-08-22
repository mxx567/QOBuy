import { Pressable, View, Image, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function ChatHeader({listingname, userNames, chaticon}: {listingname: string, userNames: string, chaticon?: string}){
    const insets = useSafeAreaInsets();
    const headerStyle = StyleSheet.create({
        header: {
            height: 60 + insets.top, 
            width: '100%',
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            gap:10,
            boxShadow: [{
                offsetX: 0,
                offsetY: -12,
                blurRadius:20
            }]
        },
        charInfo:{
            flexDirection: 'column'
        },
        chatAvatar:{
            width: 40,
            height: 40,
            borderRadius: 100,
            marginTop: insets.top
        },
        backIcon: {
            width: 24,
            height: 24,
            marginTop: insets.top
        },
        headerText: {
            color: 'black',
            fontSize: 18,
            fontWeight: "bold",
            marginTop: insets.top
        },
        descText: {
            color: '#4b4b4b',
            fontSize: 14,
            fontWeight: "bold",
        }
    });



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