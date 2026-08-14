import { useAuthContext } from "@/src/hooks/AuthContext";
import { useListingDescriptionContext } from "@/src/hooks/ListingDescriptionContext";
import { uploadedImage } from "@/utils/imgbb";
import { supabase } from "@/utils/supabase";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View, Text, Image, StatusBar } from "react-native";
import category from "../categories/[category]";
import Carousel from "@/src/components/common/carousel";

const pageStyle = StyleSheet.create({
    mainPage:{
        flex:1,
        backgroundColor: '#1B1818'
    },
    text:{
        color: 'white',
        alignSelf: 'center',
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
    }
});



export default function ListingScreen(){
    const params = useLocalSearchParams<{listingid: string}>();
    
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

        setLikedListingIds((data ?? []).map((row: any) => row.listing_id));
    };

    async function toggleFavorite(listingId : number, isFavorited: boolean) {
        // Optimistic prediction

        if(!userId) return;

        const previous = likedListingIds;

        const next = isFavorited
            ? likedListingIds.filter((id) => id !== listingId)
            : [...likedListingIds, listingId];

        setLikedListingIds(next);
        try {
            // actual process
            if (isFavorited) {
                await likeListing(listingId);
            } else {
                await unLikeListing(listingId);
            }
            
        } catch (err) {
            // rollback if prediction failed
            setLikedListingIds(previous);
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
            await Promise.all([getLikedListings()]);
            const fetchedListing = await getListing();
            if(fetchedListing){
                setExistingImg(fetchedListing[0].pictures.map((img: string) => JSON.parse(img)));
                setListing(fetchedListing);
            }
            
            setIsLoading(false);
            
        
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
            {listing && 
                <ScrollView>
                    {existingImg && <Carousel data={existingImg}/>}
                    <Text style= {pageStyle.text}>{listing[0].name}</Text>
                    <Text style= {pageStyle.text}>{listing[0].desc}</Text>
                    <Text style= {pageStyle.text}>{subCategories.find((subc) => subc.id == listing[0].category).name}</Text>
                    <Text style= {pageStyle.text}>{listing[0].price} KZT</Text>
                </ScrollView>
            }
            
        </View>
    );
}