import { View, Text, StyleSheet } from "react-native";



interface MessageProps {
    value: string,
    desc: string,
    msgbyuser: boolean
}

export default function InputLine({value,desc, msgbyuser}: MessageProps) {
    const messageStyle = StyleSheet.create({
        messageContainer: {
            alignSelf: msgbyuser ? 'flex-end' : 'flex-start',
            backgroundColor: '#525252',
            minWidth: 20,
            maxWidth:260,
            borderRadius: 20,
            padding: 10,
            textAlign: 'right',
            textAlignVertical: 'top',
        },
        text:{
            color: 'white',
        },
        descMsg: {
            alignSelf: msgbyuser ? 'flex-end' : 'flex-start',
            color: "#4b4b4b",
            fontSize: 10,
            marginLeft:7
        }
    });
    return (
        <View>
            <View style = {messageStyle.messageContainer}>
                <Text style = {messageStyle.text}>{value}</Text>
            </View>
            <Text style = {messageStyle.descMsg}>{desc}</Text>
        </View>
       
    );
}