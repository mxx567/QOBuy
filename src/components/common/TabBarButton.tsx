import {Image, Text, StyleSheet, Pressable, ImageSourcePropType} from "react-native"

interface TabBarButtonDesc {
    text: string;
    image: ImageSourcePropType;
    isFocused?: boolean;
}

const TabBarButtonStyle = StyleSheet.create({
    button:{
        width: 80,
        height: 60,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    buttonPressed:{
        width: 80,
        height: 60,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#7A6D6D',
    },
    image:{
        width:30,
        height:30
    },
    text:{
        alignSelf: 'center',
        color: 'white',
        fontFamily: 'HelveticaNeue-Light',
        fontSize: 12,
    }
})


const TabBarButton = ({text, image, isFocused, ...props}: TabBarButtonDesc) =>{
    return(
    <Pressable {...props} style={isFocused ? TabBarButtonStyle.buttonPressed : TabBarButtonStyle.button}>
        <Image source={image} style = {TabBarButtonStyle.image}/>
        <Text style = {TabBarButtonStyle.text}>{text}</Text>
    </Pressable>)
}


export {TabBarButton, TabBarButtonDesc}