import { View, Text, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { ListingCard } from "../../../components/common/ListingCard";
import { useEffect, useReducer, useState } from "react";
import { supabase } from "@/utils/supabase";
import date2string from "@/utils/date2string";
import { uploadedImage } from "@/utils/imgbb";

import { useRouter } from "expo-router";
import { useListingDescriptionContext } from "@/src/hooks/ListingDescriptionContext";

const pageStyle = StyleSheet.create({
    mainPage:{
        flex: 1,
        backgroundColor: '#1B1818',
        marginTop: 50,
    }
});



export default function IndexScreen(){
    const [listings, setListings] = useState<any[]>([]);

    const {categories, subCategories} = useListingDescriptionContext();

    const router = useRouter();
    useEffect(() => {
        
        const getListings = async () => {
            try {
                const { data: listings, error } = await supabase.from('Listings').select();
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
        <ScrollView style={pageStyle.mainPage}>
            {listings.map((listing: any) => (
                
                <ListingCard 
                    onPress={() => {router.push({pathname: '/edit', params: {listingid: listing.id}})}}
                    key={listing.id} 
                    name={listing.name.toString()}
                    image={JSON.parse(listing.pictures[0]).uri}
                    price={listing.price.toString()}
                    isLiked={false}
                    category={subCategories.find((subc) => subc.id == listing.category).name}
                    publishDate={date2string(listing.created_at)}
                />
            ))}
        </ScrollView>
    );
}


