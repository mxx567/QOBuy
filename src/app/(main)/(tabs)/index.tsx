import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";
import { ListingCard } from "../../../components/common/ListingCard";
import { useEffect, useReducer, useState } from "react";
import { supabase } from "@/utils/supabase";
import date2string from "@/utils/date2string";
import { uploadedImage } from "@/utils/imgbb";

import { useNavigation, useRouter } from "expo-router";
import { useListingDescriptionContext } from "@/src/hooks/ListingDescriptionContext";
import { useAuthContext } from "@/src/hooks/AuthContext";

const pageStyle = StyleSheet.create({
    mainPage:{
        flex: 1,
        backgroundColor: '#1B1818',
        marginTop: 50,
    },
    text:{
        color: 'white',
        alignSelf: 'center',
    },
    loadingContainer:{
        flex:1,
        backgroundColor: '#1B1818',
        alignContent: 'center',
        justifyContent: 'center'
    }
});



export default function IndexScreen(){
    const [listings, setListings] = useState<any[]>([]);

    const {categories, subCategories} = useListingDescriptionContext();

    const [likedListingIds, setLikedListingIds] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(true);


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

    
    const getListings = async () => {
        const { data, error } = await supabase.from("Listings").select("*");
        if (error) {
            console.error("Error fetching listings:", error.message);
            return;
        }
        setListings(data ?? []);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (isAuthLoading) return;

            if (!userId) {
                setListings([]);
                setLikedListingIds([]);
                setIsLoading(false);
                return;
            }

            const loadData = async () => {
                setIsLoading(true);
                await Promise.all([getLikedListings(), getListings()]);
                setIsLoading(false);
            };

            loadData();
        });
        

        return unsubscribe;
    }, [userId, isAuthLoading, navigation]);


    const router = useRouter();


    if (isAuthLoading || isLoading) {
        return (
        <View style={pageStyle.loadingContainer}>
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
    return (
        <ScrollView style={pageStyle.mainPage}>
            {listings.map((listing: any) => {
                const isLiked = likedListingIds.includes(listing.id);
                return(
                    <ListingCard 
                        onPress={() => {router.push({pathname: "/listings/[listing]", params: {listingid : listing.id}})}}
                        key={listing.id} 
                        name={listing.name.toString()}
                        image={listing.pictures.length == 0 ? undefined : JSON.parse(listing.pictures[0]).uri}
                        price={listing.price.toString()}
                        isLiked={isLiked}
                        category={subCategories.find((subc) => subc.id == listing.category).name}
                        onLikePress={(nextIsLiked)=>  toggleFavorite(listing.id, nextIsLiked)}
                        publishDate={date2string(listing.created_at)}
                    />
                );
            })}
        </ScrollView>
    );
}


