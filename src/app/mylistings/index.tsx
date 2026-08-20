import { View, FlatList, StatusBar } from "react-native";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import date2string from "@/utils/date2string";

import { useRouter } from "expo-router";
import { useListingDescriptionContext } from "@/src/hooks/ListingDescriptionContext";
import { useAuthContext } from "@/src/hooks/AuthContext";
import CommonHeader from "@/src/components/common/CommonHeader";
import { EditableListingCard } from "@/src/components/common/EditableListingCard";

const pageStyle = StyleSheet.create({
    myListingsPage:{
        flex: 1,
    },
    scrollContainer:{
        flex: 1
    }
});



export default function MyListingScreen(){
    const [listings, setListings] = useState<any[]>([]);

    const { profile } = useAuthContext();

    const {subCategories} = useListingDescriptionContext();

    const router = useRouter();
    useEffect(() => {
        
        const getListings = async () => {
            try {
                if (!profile?.id) {
                    setListings([]);
                    return;
                }

                const { data: listings, error } = await supabase
                    .from('Listings')
                    .select("id, name, pictures, price, category, created_at")
                    .eq("user_id", profile.id)
                    .order("created_at", { ascending: false });
                if (error) {
                    console.error('Error fetching listings:', error.message);
                    return;
                }

                if (listings && listings.length > 0) {
                    setListings(listings);
                }
            } catch (error) {
                console.error('Error fetching listings:');
            }
        };

        getListings();
    }, [profile?.id])

    return (
        <View style={pageStyle.myListingsPage}>
            <StatusBar />
            <CommonHeader headerText="My Listings"/>
            <FlatList
                style={pageStyle.scrollContainer}
                data={listings}
                keyExtractor={(listing) => String(listing.id)}
                initialNumToRender={5}
                maxToRenderPerBatch={5}
                windowSize={5}
                removeClippedSubviews
                renderItem={({ item: listing }) => (
                    <EditableListingCard 
                        onPress={() => {router.push({pathname: '/edit', params: {listingid: listing.id}})}}
                        key={listing.id} 
                        name={listing.name.toString()}
                        image={listing.pictures.length == 0 ? undefined : JSON.parse(listing.pictures[0]).uri}
                        price={listing.price.toString()}
                        isLiked={false}
                        category={subCategories.find((subc) => subc.id == listing.category)?.name}
                        publishDate={date2string(listing.created_at)}
                    />
                )}
            />
        </View>
        
    );
}
