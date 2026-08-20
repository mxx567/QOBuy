import { ImageSourcePropType, Image , Pressable, StyleSheet, Text, View } from "react-native";

interface OptionButtonProps {
    title: string;
    onPress: () => void;
    isNext?: boolean;
    withIcon?: boolean;
    icon?: ImageSourcePropType;
}

const OptionButtonStyle = StyleSheet.create({
    button: {
        flexDirection: 'row',
        width: '100%',
        height:65,
        textAlign: 'center',
        fontSize: 20,
        alignItems: 'center',
        padding: 20,
        gap: 15
    },
    text: {
        color: 'black',
        fontSize: 20,
        maxWidth: 260
    },
    image: {
        width: 20,
        height: 20,
    },
    isNext:{
        marginLeft: 'auto',
    }
});


export default function OptionButton({title, onPress, isNext = false, withIcon = false, icon = require("../../assets/images/default/notfound.png")}: OptionButtonProps) {
    return (
        <Pressable style={OptionButtonStyle.button} onPress={onPress}>
            {withIcon && <Image source={icon} style={OptionButtonStyle.image} />}
            <Text style={OptionButtonStyle.text}>{title}</Text>
            <View style={OptionButtonStyle.isNext}>
                {isNext && <Image source={require("../../assets/icons/forward.png")} style={OptionButtonStyle.image} />}
            </View>
            
        </Pressable>
    );
}