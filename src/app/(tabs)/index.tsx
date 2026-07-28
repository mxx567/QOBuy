import { View, Text } from "react-native";

import { StyleSheet } from "react-native";

const pageStyle = StyleSheet.create({
    mainPage:{
        flex: 1,
        backgroundColor: '#1B1818',
        alignItems: "center",
        justifyContent: "center",
    }
});

export default function IndexScreen(){
    return (
        <View style={pageStyle.mainPage}>
            <Text style={{color:'white'} }>Index</Text>
        </View>
    );
}


