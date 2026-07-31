import { StyleSheet, View, Text } from "react-native";


const errorTextStyle = StyleSheet.create({
    text:{
        fontSize:15,
        color: 'red',
        maxWidth:300,
    }
});

export default function CommonErrorText({value} : {value : string}){
    if(value != ''){
        return(
            <View>
                <Text style={errorTextStyle.text}>{value}</Text>
            </View>
        );
    }
    else{
        return null;
    }
}