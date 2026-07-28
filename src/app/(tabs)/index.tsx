import { View, Text } from "react-native";

import { StyleSheet } from "react-native";

import { Listing } from "../../components/Listing";

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
            <Listing onPress={() => {}} />
        </View>
    );
}


