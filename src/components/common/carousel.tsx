import { uploadedImage } from "@/utils/imgbb";
import { useRef, useState } from "react";
import { FlatList, View, Image, StyleSheet, Dimensions, Text } from "react-native";


const screenWidth = Dimensions.get('window').width;

const CarouselStyle = StyleSheet.create({
    indexContainer:{
        position: 'absolute',
        zIndex: 10,
        backgroundColor: "#1f1e1e",
        width: 60,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginTop: 10
    },
    indexText:{
        color:'white',
        fontSize: 14
    },
});

export default function Carousel({data} : {data : uploadedImage[]}){

    const [focusedIndex, setFocusedIndex] = useState(0);

    const _onViewableItemsChanged = useRef(({ viewableItems } : {viewableItems : any}) => {
        if (viewableItems && viewableItems.length > 0) {
            const currentIndex = viewableItems[0].index;
            setFocusedIndex(currentIndex+1);
            console.log("Current Focused Index:", currentIndex);
        }
    }).current;
    return(
        <View>
            <View style= {CarouselStyle.indexContainer}>
                <Text style = {CarouselStyle.indexText}>{focusedIndex + "/" + data.length}</Text>
            </View>
            <FlatList
                horizontal
                snapToAlignment="center"
                decelerationRate={'fast'}
                pagingEnabled
                data = {data}
                keyExtractor={item => data.indexOf(item).toString()}
                showsHorizontalScrollIndicator = {false}
                onViewableItemsChanged={_onViewableItemsChanged}
                renderItem={({item}) =>{
                        if(!item.uri){
                            
                            return <View></View>
                        } 
                        
                    return(
                        <Image source={{uri: item.uri}} style={{width: screenWidth, height:300}}/>
                    )
                }}>

            </FlatList>
        </View>
    )
}