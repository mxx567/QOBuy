import { useEffect, useState } from "react";
import { LikeButton } from "./LikeButton";

export const ListingLikeButton = ({isLiked, onLikePress} : {isLiked : boolean, onLikePress(nextValue : boolean) : void}) =>{
    const [liked, setLiked] = useState(isLiked);
    
    useEffect(() => {
        setLiked(isLiked);
    }, [isLiked]);
    return(
        <LikeButton isLiked={liked} width={30} height={30} onPress = {()=>{
                                    const nextLiked = !liked;
                                    setLiked(nextLiked);
                                    onLikePress?.(nextLiked);
                                    
                                }}/>
    )
}