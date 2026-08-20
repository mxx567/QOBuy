import { View, Text, ScrollView, StatusBar } from "react-native";
import { StyleSheet } from "react-native";
import { ListingCard } from "../../components/common/ListingCard";
import { useEffect, useReducer, useState } from "react";
import { supabase } from "@/utils/supabase";
import date2string from "@/utils/date2string";
import { uploadedImage } from "@/utils/imgbb";

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
    }
    
});



export default function MyListingScreen(){
    const [listings, setListings] = useState<any[]>([]);

    const { profile } = useAuthContext();

    const {categories, subCategories} = useListingDescriptionContext();

    const router = useRouter();
    useEffect(() => {
        
        const getListings = async () => {
            try {
                const { data: listings, error } = await supabase.from('Listings').select("*").eq("user_id", profile?.id);
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
    }, [])

    return (
        <View style={pageStyle.myListingsPage}>
            <StatusBar />
            <CommonHeader headerText="My Listings"/>
            <ScrollView style={pageStyle.scrollContainer}>
                {listings.map((listing: any) => (
                    
                    <EditableListingCard 
                        onPress={() => {router.push({pathname: '/edit', params: {listingid: listing.id}})}}
                        key={listing.id} 
                        name={listing.name.toString()}
                        image={listing.pictures.length == 0 ? undefined : JSON.parse(listing.pictures[0]).uri}
                        price={listing.price.toString()}
                        isLiked={false}
                        category={subCategories.find((subc) => subc.id == listing.category).name}
                        publishDate={date2string(listing.created_at)}
                    />
                ))}
            </ScrollView>
        </View>
        
    );
}
