import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import { ListingCard } from "../../../components/common/ListingCard";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import date2string from "@/utils/date2string";

import { useNavigation, useRouter } from "expo-router";
import { useListingDescriptionContext } from "@/src/hooks/ListingDescriptionContext";
import { useAuthContext } from "@/src/hooks/AuthContext";
import { useFavorites } from "@/src/hooks/useFavorites";

const pageStyle = StyleSheet.create({
    mainPage:{
        flex: 1,
        padding: 15
    },
    text:{
        color: 'black',
        alignSelf: 'center',
    },
    textBig:{
        color: 'black',
        fontSize: 48,
        fontWeight: 'bold'
    },
    loadingContainer:{
        flex:1,
        alignContent: 'center',
        justifyContent: 'center'
    }
});



export default function FavoritesScreen(){
    const router = useRouter();
    const [listings, setListings] = useState<any[]>([]);

    const {subCategories} = useListingDescriptionContext();

    const [isListingsLoading, setIsListingsLoading] = useState(true);

    const navigation = useNavigation();

    const { profile, isLoading: isAuthLoading } = useAuthContext();

    const userId = profile?.id;
    const { likedListingIds, isLoading: areFavoritesLoading, toggleFavorite, refreshFavorites } = useFavorites();

    
    const getListings = async (listingIds: number[]) => {
        if (listingIds.length === 0) {
            setListings([]);
            setIsListingsLoading(false);
            return;
        }

        setIsListingsLoading(true);
        const { data, error } = await supabase
            .from("Listings")
            .select("id, name, pictures, price, category, created_at, isUsed")
            .in("id", listingIds);
        if (error) {
            console.error("Error fetching listings:", error.message);
            setIsListingsLoading(false);
            return;
        }
        setListings(data ?? []);
        setIsListingsLoading(false);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (!isAuthLoading && userId) refreshFavorites();
        });
        

        return unsubscribe;
    }, [userId, isAuthLoading, navigation, refreshFavorites]);

    useEffect(() => {
        if (!isAuthLoading && userId) getListings(likedListingIds);
    }, [likedListingIds, isAuthLoading, userId]);


    if (isAuthLoading || areFavoritesLoading || isListingsLoading) {
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
        <FlatList
            style={pageStyle.mainPage}
            data={listings}
            keyExtractor={(listing) => String(listing.id)}
            ListHeaderComponent={<Text style={pageStyle.textBig}>{"Favorites"}</Text>}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            windowSize={5}
            removeClippedSubviews
            renderItem={({ item: listing }) => {
                const isLiked = likedListingIds.includes(listing.id);
                return(
                    <ListingCard 
                        onPress={() => {router.push({pathname: "/listings/[listing]", params: {listing: listing.id}})}}
                        name={listing.name.toString()}
                        image={listing.pictures.length == 0 ? undefined : JSON.parse(listing.pictures[0]).uri}
                        price={listing.price.toString()}
                        isUsed={listing.isUsed}
                        isLiked={isLiked}
                        category={subCategories.find((subc) => subc.id == listing.category)?.name}
                        onLikePress={(nextIsLiked)=>  toggleFavorite(listing.id, nextIsLiked)}
                        publishDate={date2string(listing.created_at)}
                    />
                );
            }}
        />
    );
}

