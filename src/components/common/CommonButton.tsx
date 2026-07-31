import { Pressable, StyleSheet, Text } from "react-native";

const CommonButtonStyle = StyleSheet.create({
    button: {
        backgroundColor: '#3E3737',
        borderRadius: 100,
        width: 300,
        height: 40,
        justifyContent: 'center',
        textAlign: 'center',
        lineHeight: 50,
        fontSize: 20,
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20
    }
});


export default function CommonButton({title, onPress}: { title: string, onPress: () => void}) {
    return (
        <Pressable style={CommonButtonStyle.button} onPress={onPress}>
            <Text style={CommonButtonStyle.text}>{title}</Text>
        </Pressable>
    );
}