import { Pressable, Text, StyleSheet, ImageSourcePropType, Image } from "react-native";

interface LikeButtonDesc {
    isLiked: boolean;
    width?: number;
    height?: number;
    onPress?(): void;
}

export const LikeButton = ({isLiked = false, width = 50, height = 50, onPress}: LikeButtonDesc) => {
    return (
        <Pressable onPress={onPress}>
            <Image style={{width: width, height: height}} source = {isLiked?  require('../assets/icons/favfilled.png') : require('../assets/icons/fav.png')}/>
        </Pressable>
    );
};


