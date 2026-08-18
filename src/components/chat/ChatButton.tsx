import { ImageSourcePropType, Image , Pressable, StyleSheet, Text, View } from "react-native";

interface OptionButtonProps {
    title: string;
    last_msg: string;
    onPress: () => void;
    icon?: ImageSourcePropType;
}

const ChatButtonStyle = StyleSheet.create({
    button: {
        flexDirection: 'row',
        width: '100%',
        height:60,
        textAlign: 'center',
        lineHeight: 50,
        fontSize: 20,
        gap: 10,
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        maxWidth: 260
    },
    image: {
        marginLeft: 20,
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    lastMsg: {
        color: "#4b4b4b"
    }
});


export default function ChatButton({title, onPress, last_msg, icon = require("../../assets/images/default/notfound.png")}: OptionButtonProps) {
    return (
        <Pressable style={ChatButtonStyle.button} onPress={onPress}>
            <Image source={icon} style={ChatButtonStyle.image}/>
            <View>
                <Text style={ChatButtonStyle.text}>{title}</Text>
                <Text style={ChatButtonStyle.lastMsg}>{last_msg}</Text>
            </View>
        </Pressable>
    );
}