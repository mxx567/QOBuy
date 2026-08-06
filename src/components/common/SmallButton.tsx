import { ImageSourcePropType, Image , Pressable, StyleSheet, Text } from "react-native";

interface SmallButtonProps {
    title: string;
    onPress: () => void;
    isNext?: boolean;
    withIcon?: boolean;
    icon?: ImageSourcePropType;
}

const SmallButtonStyle = StyleSheet.create({
    button: {
        flexDirection: 'row',
        backgroundColor: '#3E3737',
        borderRadius: 100,
        width: 100,
        height: 40,
        justifyContent: 'center',
        textAlign: 'center',
        lineHeight: 50,
        fontSize: 20,
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
        maxWidth:270,
    },
    image: {
        width: 20,
        height: 20,
        borderRadius: 100,
    }
});


export default function SmallButton({title, onPress, isNext = false, withIcon = false, icon = require("../../assets/images/default/notfound.png")}: SmallButtonProps) {
    return (
        <Pressable style={SmallButtonStyle.button} onPress={onPress}>
            {withIcon && <Image source={icon} style={SmallButtonStyle.image} />}
            <Text style={SmallButtonStyle.text}>{title}</Text>
            {isNext && <Image source={require("../../assets/icons/forward.png")} style={SmallButtonStyle.image} />}
        </Pressable>
    );
}