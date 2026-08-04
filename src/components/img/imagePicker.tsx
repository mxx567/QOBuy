import { Image, Text, Pressable, StyleSheet } from 'react-native'

const pickerStyle = StyleSheet.create({
    imagePickerButton:{
        width: 340,
        height: 300,
        backgroundColor: "#2f2c2c",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:20,
    },
    imageAdd:{
        width:200,
        height:200
    },
    ImagePickerButtonSmall:{
        width: 100,
        height: 100,
        backgroundColor: "#2f2c2c",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12
    },
    imageAddSmall:{
        width:50,
        height:50
    },
    text:{
        fontSize: 20,
        color: 'white'
    }

});


export function ImagePicker({onPress} : {onPress: () => void }){
    return(
        <Pressable onPress={onPress} style={pickerStyle.imagePickerButton}>
            <Image source={require('../../assets/icons/UploadAnImg.png')} style={pickerStyle.imageAdd}/>
            <Text style={pickerStyle.text}> Pick an image </Text>
        </Pressable>
    )
}

export function ImagePickerSmall( {onPress} : {onPress: () => void }){
    return(
        <Pressable onPress={onPress} style={pickerStyle.ImagePickerButtonSmall}>
            <Image source={require('../../assets/icons/add.png')} style={pickerStyle.imageAddSmall}/>
        </Pressable>
    )
}