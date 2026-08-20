import { Pressable, Text, StyleSheet, ImageSourcePropType, Image, View } from "react-native";
import { LikeButton } from "./LikeButton";
import { useState } from "react";
import SmallButton from "./SmallButton";
import CommonButton from "./CommonButton";

interface EditableListingProps {
    image?: string,
    name?: string,
    isLiked?: boolean,
    category?: string,
    publishDate?: string,
    price?: string,
    onPress(): void
};


const ListingStyle = StyleSheet.create({
    listingContainer:{
        padding: 15
    },
    listingDataContainer:{
        flexDirection : 'row',
        height: 200,
        alignItems: 'center',
        gap: 10
    },
    listingImage:{
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    title:{
        fontFamily: 'HelveticaNeue-Bold',
        color: '#020202',
        fontWeight: 'bold',
        fontSize: 20,
        maxWidth: 150
    },
    price:{
        fontFamily: 'HelveticaNeue-Bold',
        color: 'black',
        fontWeight: 'bold',
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
    },
    editButtons:{
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    }
});



const EditableListingCard = ({image, name ='UNKNOWN' ,isLiked = false , category = 'Unknown',publishDate = 'Jan 01, 1970 at 10:00', price = 'Null', onPress} : EditableListingProps) => {
    if(image === undefined){
        image = 'https://i.ibb.co.com/9mGCjPYY/notfound.png';
    }
    const [liked, setLiked] = useState(isLiked);
    return (
        <View style={ListingStyle.listingContainer}>
            <View style={ListingStyle.listingDataContainer}>
                <Image source = {{uri: image}} style={ListingStyle.listingImage}/>

                <View style = {ListingStyle.rightContainer}>
                    <Text style = {ListingStyle.title}>{name}</Text>
                    <Text style = {ListingStyle.price}>{price + " KZT"}</Text>
                    <View style = {ListingStyle.bottomContainer}>
                        <View style ={ListingStyle.catdate}>
                            <Text style = {ListingStyle.smallText}>{category}</Text>
                            <Text style = {ListingStyle.smallText}>{publishDate}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={ListingStyle.editButtons}>
                <CommonButton title="Edit" onPress={onPress}/>
                
            </View>
        </View>
    );
};


export {EditableListingCard};