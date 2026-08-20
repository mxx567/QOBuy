import { uploadedImage } from "@/utils/imgbb";
import { useRef, useState } from "react";
import { FlatList, View, Image, StyleSheet, Dimensions, Text } from "react-native";


const screenWidth = Dimensions.get('window').width;

const CarouselStyle = StyleSheet.create({
    indexContainer:{
        position: 'absolute',
        zIndex: 10,
        backgroundColor: "#fffefe",
        width: 60,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginTop: 10,
    },
    indexText:{
        color:'black',
        fontSize: 14
    },
    mainContainer:{
        boxShadow:[{
            offsetX:0,
            offsetY:-2,
            blurRadius:5,
            inset: true
        }],
    }
});

export default function Carousel({data} : {data : uploadedImage[]}){

    const [focusedIndex, setFocusedIndex] = useState(0);

    const _onViewableItemsChanged = useRef(({ viewableItems } : {viewableItems : any}) => {
        if (viewableItems && viewableItems.length > 0) {
            const currentIndex = viewableItems[0].index;
            setFocusedIndex(currentIndex+1);
        }
    }).current;
    return(
        <View>
            <View style= {CarouselStyle.indexContainer}>
                <Text style = {CarouselStyle.indexText}>{focusedIndex + "/" + data.length}</Text>
            </View>
            {data && 
            <FlatList
                horizontal
                snapToAlignment="center"
                decelerationRate={'fast'}
                pagingEnabled
                data = {data}
                keyExtractor={item => data.indexOf(item).toString()}
                showsHorizontalScrollIndicator = {false}
                onViewableItemsChanged={_onViewableItemsChanged}
                style = {CarouselStyle.mainContainer}
                renderItem={({item}) =>{
                    if (!item?.uri) {
                        return (
                            <Image
                            source={{ uri: "https://i.ibb.co.com/9mGCjPYY/notfound.png" }}
                            style={{ width: screenWidth, height: 300 }}
                            />
                        );
                    }
                    return(
                        <Image source={{uri: item.uri}} style={{width: screenWidth, height:300}}/>
                    )
                }}>

            </FlatList>}
        </View>
    )
}