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
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderTopColor: '#3E3737',
        borderBottomColor: '#3E3737',
        marginTop:-2,
        width: '100%',
        height:60,
        textAlign: 'center',
        lineHeight: 50,
        fontSize: 20,
        alignItems: 'center',
    },
    text: {
        marginLeft: 20,
        color: 'white',
        fontSize: 20,
        maxWidth: 260
    },
    image: {
        marginLeft: 20,
        width: 20,
        height: 20,
        borderRadius: 100,
    },
    isNext:{
        marginLeft: 'auto',
        marginRight: 20,
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