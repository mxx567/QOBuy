import { Pressable, Text, StyleSheet, ImageSourcePropType, Image, View } from "react-native";
import { LikeButton } from "./LikeButton";
import { useState } from "react";

interface ListingProps {
    image?: ImageSourcePropType,
    name?: string,
    isLiked?: boolean,
    category?: string,
    publishDate?: string,
    price?: string,
    onPress(): void
};


const ListingStyle = StyleSheet.create({
    listingContainer:{
        flexDirection : 'row',
        height: 200,
        backgroundColor: '#242424',
        alignItems: 'center',
        gap: 10
    },
    listingImage:{
        width: 150,
        height: 150,
        marginLeft:20,
        borderRadius: 10,
    },
    title:{
        fontFamily: 'HelveticaNeue-Bold',
        color: 'white',
        fontSize: 20
    },
    price:{
        fontFamily: 'HelveticaNeue-Bold',
        color: 'white',
        fontSize: 20
    },
    smallText:{
        fontFamily: 'HelveticaNeue-Light',
        color: '#4b4b4b',
        fontSize: 12
    },
    rightContainer:{
        gap: 10,
    },
    bottomContainer:{
        flexDirection: "row",
        gap: 10,       
    },
    catdate:{
        minWidth:120,
    }
});



const ListingCard = ({image = require('../../assets/images/default/notfound.png'), name ='UNKNOWN' ,isLiked = false , category = 'Unknown',publishDate = 'Jan 01, 1970 at 10:00', price = 'Null', onPress} : ListingProps) => {
    const [liked, setLiked] = useState(isLiked);
    return (
        <Pressable style={ListingStyle.listingContainer} onPress={onPress}>
            <Image source = {image} style={ListingStyle.listingImage}/>

            <View style = {ListingStyle.rightContainer}>
                <Text style = {ListingStyle.title}>{name}</Text>
                <Text style = {ListingStyle.price}>{price}</Text>
                <View style = {ListingStyle.bottomContainer}>
                    <View style ={ListingStyle.catdate}>
                        <Text style = {ListingStyle.smallText}>{category}</Text>
                        <Text style = {ListingStyle.smallText}>{publishDate}</Text>
                    </View>
                    <LikeButton isLiked={liked} width={30} height={30} onPress = {() => {setLiked(!liked)}}/>
                </View>
            </View>
        </Pressable>
    );
};


export {ListingCard};