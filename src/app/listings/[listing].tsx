import { useAuthContext } from "@/src/hooks/AuthContext";
import { useListingDescriptionContext } from "@/src/hooks/ListingDescriptionContext";
import { uploadedImage } from "@/utils/imgbb";
import { supabase } from "@/utils/supabase";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View, Text, Image, StatusBar } from "react-native";
import category from "../categories/[category]";
import Carousel from "@/src/components/common/carousel";
import CommonHeader from "@/src/components/common/CommonHeader";
import { LikeButton } from "@/src/components/common/LikeButton";
import { ListingLikeButton } from "@/src/components/common/ListingLikeButton";
import date2string from "@/utils/date2string";

const pageStyle = StyleSheet.create({
    mainPage:{
        flex:1,
        backgroundColor: '#1B1818'
    },
    text:{
        color: 'white',
    },
    image:{
        width: 200,
        height: 200
    },
    loadingContainer:{
        flex:1,
        backgroundColor: '#1B1818',
        alignContent: 'center',
        justifyContent: 'center'
    },
    nameText:{
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },
    priceText:{
        fontSize: 32,
        fontWeight:'bold',
        color: 'white'
    },
    namePriceContainer:{
        flexDirection: 'row',
        padding: 15
    },
    likeButton:{
        marginLeft: 'auto',
        marginRight: 10,
        marginTop: -25,
        backgroundColor: "#2f2f2f",
        borderRadius: 100,
        width:45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center'
    }
});



export default function ListingScreen(){
    const params = useLocalSearchParams<{listingid: string}>();
    
    const [isLiked, setIsLiked] = useState<boolean>();

    const {subCategories, regionsMap} = useListingDescriptionContext();

    const [listing, setListing ] = useState<any[]>();

    const [likedListingIds, setLikedListingIds] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [existingImg, setExistingImg] = useState<any[]>();
    const navigation = useNavigation(); 

    const { profile, isLoading: isAuthLoading } = useAuthContext();

    const userId = profile?.id;

    const likeListing = async (listingId: number) => {
        if (!userId) return;
        const { error } = await supabase.from("liked").insert({ user_id: userId, listing_id: listingId });
        if (error) throw error;
    };

    const unLikeListing = async (listingId: number) => {
        if (!userId) return;
        const { error } = await supabase.from("liked").delete().eq("listing_id", listingId).eq("user_id", userId);
        if (error) throw error;
    };

    const getLikedListings = async () => {
        if (!userId) {
            setLikedListingIds([]);
            return;
        }

        const { data, error } = await supabase.from("liked").select("listing_id").eq("user_id", userId);
        if (error) {
            console.error("Error fetching liked listings:", error.message);
            return;
        }

        return (data ?? []).map((row: any) => row.listing_id);
    };

    async function toggleFavorite(listingId : number, isFavorited: boolean) {
        // Optimistic prediction

        if(!userId) return;

        
        try {
            // actual process
            if (isFavorited) {
                await likeListing(listingId);
            } else {
                await unLikeListing(listingId);
            }
            
        } catch (err) {
            // rollback if prediction failed
            console.log("Couldn't update favorite, try again");
        }
    }
    
    const getListing = async () => {
        const { data, error } = await supabase.from("Listings").select("*").eq("id", params.listingid);
        if (error) {
            console.error("Error fetching listing:", error.message);
            return;
        }
        if(data){
            return data;
        }
    };

    useEffect(() => {
        if (isAuthLoading) return;
    
        if (!userId) {
            setLikedListingIds([]);
            setIsLoading(false);
            return;
        }
    
        const loadData = async () => {
            setIsLoading(true);
            const fetchedLikedListings = await getLikedListings();
            const fetchedListing = await getListing();
            if(fetchedListing){
                setExistingImg(fetchedListing[0].pictures.map((img: string) => JSON.parse(img)));
                setIsLiked(fetchedLikedListings?.includes(Number(params.listingid)));
                setListing(fetchedListing);
            }
            setIsLoading(false);
            
            console.log(isLiked);
        };
        
        loadData();
        
    }, [userId, isAuthLoading]);


    if (isAuthLoading || isLoading) {
        return (
        <View style={pageStyle.loadingContainer} >
            <ActivityIndicator size="large" color="#fff" />
        </View>
        );
    }

    if (!userId) {
        return (
        <View style={pageStyle.mainPage}>
            <Text style={pageStyle.text}>Please log in to browse listings.</Text>
        </View>
        );
    }

   
    return(
        <View style= {pageStyle.mainPage}>
            
            <StatusBar/>
            <CommonHeader headerText="Listing"/>
            {listing && 
                
                <ScrollView>
                    {existingImg && <Carousel data={existingImg}/>}
                    <View style = {pageStyle.namePriceContainer}>
                        <View>
                            
                            <Text style= {pageStyle.nameText}>{listing[0].name}</Text>
                            <Text style= {pageStyle.priceText}>{listing[0].price} KZT</Text>
                            <Text style = {pageStyle.text}>{date2string(listing[0].created_at)}</Text>
                        </View>
                        <View style = {pageStyle.likeButton}>
                            <ListingLikeButton isLiked={isLiked ? true : false} onLikePress={(nextIsLiked)=>  toggleFavorite(listing[0].id, nextIsLiked)}/>
                        </View>
                    </View>
                    
                    <Text style= {pageStyle.text}>{listing[0].desc}</Text>
                    <Text style= {pageStyle.text}>{subCategories.find((subc) => subc.id == listing[0].category).name}</Text>
                    
                </ScrollView>
            }
            
        </View>
    );
}