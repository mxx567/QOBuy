import { StyleSheet, View, Text, Image } from "react-native";


const errorTextStyle = StyleSheet.create({
    container:{
        flexDirection:'row',
        gap:5,
        justifyContent: "center",
        width:340,
    },
    text:{
        fontSize:15,
        color: '#F84545',
        maxWidth:300,
    },
    icon:{
        width:18,
        height:18
    }
});

export default function CommonErrorText({value} : {value : string}){
    if(value != ''){
        return(
            <View style={errorTextStyle.container}>
                <Image source ={require("../../assets/icons/Error.png")} style={errorTextStyle.icon}/>
                <Text style={errorTextStyle.text}>{value}</Text>
            </View>
        );
    }
    else{
        return null;
    }
}