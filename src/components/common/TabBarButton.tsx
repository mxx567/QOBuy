import {Image, Text, StyleSheet, Pressable, ImageSourcePropType} from "react-native"

interface TabBarButtonDesc {
    text: string;
    image: ImageSourcePropType;
    imageFocused: ImageSourcePropType;
    isFocused?: boolean;
    onPress?: () => void;
}

const TabBarButtonStyle = StyleSheet.create({
    button:{
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image:{
        width:30,
        height:30,
    },
    text:{
        alignSelf: 'center',
        color: '#6f6f6f',
        fontFamily: 'HelveticaNeue-Light',
        fontSize: 12,
    },
    textFocused:{
        alignSelf: 'center',
        color: '#4E4AC9',
        fontFamily: 'HelveticaNeue-Light',
        fontSize: 12,
    }
})


const TabBarButton = ({text, image, imageFocused , isFocused, onPress, ...props}: TabBarButtonDesc) =>{
    return(
    <Pressable {...props} style={TabBarButtonStyle.button} onPress={onPress}>
        <Image source={isFocused? imageFocused : image} style = {TabBarButtonStyle.image}/>
        <Text style = {isFocused?  TabBarButtonStyle.textFocused : TabBarButtonStyle.text}>{text}</Text>
    </Pressable>)
}


export {TabBarButton, TabBarButtonDesc}