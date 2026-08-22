import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import { ListingCard } from "../../../components/common/ListingCard";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import date2string from "@/utils/date2string";

import { useNavigation, useRouter } from "expo-router";
import { useListingDescriptionContext } from "@/src/hooks/ListingDescriptionContext";
import { useAuthContext } from "@/src/hooks/AuthContext";
import SearchBar from "@/src/components/common/SearchBar";

const pageStyle = StyleSheet.create({
    pageContainer:{
        flex: 1,
    },
    mainPage:{
        padding: 15
    },
    text:{
        color: 'black',
        alignSelf: 'center',
    },
    loadingContainer:{
        flex:1,
        alignContent: 'center',
        justifyContent: 'center'
    }
});



export default function IndexScreen(){
    const [listings, setListings] = useState<any[]>([]);

    const {subCategories} = useListingDescriptionContext();

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
        const { data, error } = await supabase
            .from("Listings")
            .select("id, name, pictures, price, category, created_at, isUsed")
            .order("created_at", { ascending: false })
            .limit(30);
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
            <ActivityIndicator size="large" color="#4E4AC9" />
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
        <View style={pageStyle.pageContainer}>
            <SearchBar title="" onPress={()=>{router.push('/search')}}/>
            <FlatList
                style={pageStyle.mainPage}
                data={listings}
                keyExtractor={(listing) => String(listing.id)}
                initialNumToRender={5}
                maxToRenderPerBatch={5}
                windowSize={5}
                removeClippedSubviews
                renderItem={({ item: listing }) => {
                    const isLiked = likedListingIds.includes(listing.id);
                    return(
                        <ListingCard 
                            onPress={() => {router.push({pathname: "/listings/[listing]", params: {listing: listing.id}})}}
                            key={listing.id} 
                            isUsed={listing.isUsed}
                            name={listing.name.toString()}
                            image={listing.pictures.length == 0 ? undefined : JSON.parse(listing.pictures[0]).uri}
                            price={listing.price.toString()}
                            isLiked={isLiked}
                            category={subCategories.find((subc) => subc.id == listing.category)?.name}
                            onLikePress={(nextIsLiked)=>  toggleFavorite(listing.id, nextIsLiked)}
                            publishDate={date2string(listing.created_at)}
                        />
                    );
                }}
            />
        </View>
        
    );
}


