import { ImageSourcePropType, Image , Pressable, StyleSheet, Text } from "react-native";

interface MessageButtonProps {
    title: string;
    disabled: boolean;
    onPress: () => void;
    icon?: ImageSourcePropType;
}

const MessageButtonStyle = StyleSheet.create({
    button: {
        flexDirection: 'row',
        backgroundColor: '#3E3737',
        borderRadius: 100,
        width: 40,
        height: 40,
        justifyContent: 'center',
        textAlign: 'center',
        lineHeight: 50,
        fontSize: 20,
        alignItems: 'center',
    },
    image: {
        width: 20,
        height: 20,
        borderRadius: 100,
    }
});


export default function MessageSendButton({title, disabled , onPress}: MessageButtonProps) {
    return (
        <Pressable style={MessageButtonStyle.button} onPress={onPress} disabled={disabled}>
            <Image source={require('../../assets/icons/send.png')} style={MessageButtonStyle.image} />
        </Pressable>
    );
}