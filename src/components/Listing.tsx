import { Pressable, Text, StyleSheet, ImageSourcePropType, Image } from "react-native";

interface ListingProps {
    image?: ImageSourcePropType,
    name?: string,
    isLiked?: boolean,
    category?: string,
    publishDate?: string,
    price?: string,
    onPress(): void
};

const Listing = ({image = require('../assets/images/default/notfound.png'), name ='UNKNOWN' ,isLiked = false , category = 'Unknown',publishDate = 'Jan 01, 1970 at 10:00', price = 'Null', onPress} : ListingProps) => {
    return (
        <Pressable >
            <Image source = {image}/>

            <Text>{name}</Text>
            <Text>{price}</Text>
            <Text>{category}</Text>
            <Text>{publishDate}</Text>
        </Pressable>
    );
};


export {Listing};