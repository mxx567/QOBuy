import { View, Text } from "react-native";

import { StyleSheet } from "react-native";

import { ListingCard } from "../../components/ListingCard";

const pageStyle = StyleSheet.create({
    mainPage:{
        flex: 1,
        backgroundColor: '#1B1818',

        marginTop: 50,
    }
});

export default function IndexScreen(){
    return (
        <View style={pageStyle.mainPage}>
            <ListingCard onPress={() => {}} name = "ПРОДАМ ГАРАЖ" price = "1000 $" isLiked= {false} />
        </View>
    );
}


