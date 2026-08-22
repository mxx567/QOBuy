import { View, Image, StyleSheet, Pressable, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'





export default function SearchBar({onPress} : {onPress() : void}){
    const insets = useSafeAreaInsets();
    const searchBarStyle = StyleSheet.create({
        container:{
            height: 100,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#4E4AC9'
        },
        searchBar:{
            flexDirection: 'row',
            backgroundColor: "#00000000",
            borderColor: "white",
            borderWidth: 2,
            borderRadius: 100,
            width: 330,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            marginTop: insets.top
        },
        image:{
            width: 20,
            height: 20,
            marginLeft: 'auto',
        },
        text:{
            color: 'white'
        }
    })
    return(
        <View style={searchBarStyle.container}>
            <Pressable style={searchBarStyle.searchBar} onPress={onPress}>
                <Text style={searchBarStyle.text}>{"Find a..."}</Text>
                <Image style={searchBarStyle.image} source={require("../../assets/icons/search.png")}/>
            </Pressable>
        </View>
    )
}