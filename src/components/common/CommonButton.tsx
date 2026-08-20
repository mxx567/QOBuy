import { ImageSourcePropType, Image , Pressable, StyleSheet, Text } from "react-native";

interface CommonButtonProps {
    title: string;
    disabled?: boolean;
    onPress: () => void;
    isNext?: boolean;
    withIcon?: boolean;
    icon?: ImageSourcePropType;
}

const CommonButtonStyle = StyleSheet.create({
    button: {
        flexDirection: 'row',
        backgroundColor: '#4E4AC9',
        borderRadius: 10,
        width: 340,
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


export default function CommonButton({title, disabled , onPress, isNext = false, withIcon = false, icon = require("../../assets/images/default/notfound.png")}: CommonButtonProps) {
    return (
        <Pressable style={CommonButtonStyle.button} onPress={onPress} disabled={disabled}>
            {withIcon && <Image source={icon} style={CommonButtonStyle.image} />}
            <Text style={CommonButtonStyle.text}>{title}</Text>
            {isNext && <Image source={require("../../assets/icons/forward.png")} style={CommonButtonStyle.image} />}
        </Pressable>
    );
}