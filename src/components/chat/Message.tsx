import { View, Text, StyleSheet } from "react-native";



interface MessageProps {
    value: string,
}

export default function InputLine({value}: MessageProps) {
    const messageStyle = StyleSheet.create({
        messageContainer: {
            backgroundColor: '#525252',
            borderWidth: 2,
            minWidth: 40,
            maxWidth:260,
            borderRadius: 20,
            padding: 10,
            textAlign: 'left',
            textAlignVertical: 'top',
        },
        text:{
            color: 'white',
        }
    });
    return (
        <View style = {messageStyle.messageContainer}>
            <Text style = {messageStyle.text}>{value}</Text>
        </View>
    );
}