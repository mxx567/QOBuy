import { Pressable, Text, StyleSheet, ImageSourcePropType, Image, View } from "react-native";
import { LikeButton } from "./LikeButton";
import { useEffect, useState } from "react";

interface ListingProps {
    image?: string,
    name?: string,
    isLiked?: boolean,
    category?: string,
    publishDate?: string,
    price?: string,
    onPress(): void,
    onLikePress(nextValue : boolean): void
};


const ListingStyle = StyleSheet.create({
    listingContainer:{
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
        color: '#6f6f6f',
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



const ListingCard = ({image, name ='UNKNOWN' ,isLiked = false , category = 'Unknown',publishDate = 'Jan 01, 1970 at 10:00', price = 'Null', onPress, onLikePress} : ListingProps) => {
    if(image === undefined){
        image = 'https://i.ibb.co.com/9mGCjPYY/notfound.png';
    }
    const [liked, setLiked] = useState(isLiked);

    useEffect(() => {
        setLiked(isLiked);
    }, [isLiked]);
    return (
        <Pressable style={ListingStyle.listingContainer} onPress={onPress}>
            <Image source = {{uri: image}} style={ListingStyle.listingImage}/>

            <View style = {ListingStyle.rightContainer}>
                <Text style = {ListingStyle.title}>{name}</Text>
                <Text style = {ListingStyle.price}>{price + " KZT"}</Text>
                <View style = {ListingStyle.bottomContainer}>
                    <View style ={ListingStyle.catdate}>
                        <Text style = {ListingStyle.smallText}>{category}</Text>
                        <Text style = {ListingStyle.smallText}>{publishDate}</Text>
                    </View>
                    <LikeButton isLiked={liked} width={30} height={30} onPress = {()=>{
                            const nextLiked = !liked;
                            setLiked(nextLiked);
                            onLikePress?.(nextLiked);
                            
                        }}/>
                </View>
            </View>
        </Pressable>
    );
};


export {ListingCard};