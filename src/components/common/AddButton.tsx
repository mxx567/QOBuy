import {Image, Text, StyleSheet, Pressable, ImageSourcePropType} from "react-native"

interface AddButtonDesc {
    image: ImageSourcePropType;
    isFocused?: boolean;
    onPress?: () => void;
}

const TabBarButtonStyle = StyleSheet.create({
    button:{
        width: 75,
        height: 75,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
        backgroundColor: '#4E4AC9'
    },
    image:{
        width:35,
        height:35
    },
})


const AddButton = ({image, isFocused, onPress, ...props}: AddButtonDesc) =>{
    return(
    <Pressable {...props} style={TabBarButtonStyle.button} onPress={onPress}>
        <Image source={image} style = {TabBarButtonStyle.image}/>
    </Pressable>)
}


export {AddButton, AddButtonDesc}