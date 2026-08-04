import { View, Text, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { ListingCard } from "../../../components/common/ListingCard";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { subCategory } from "@/src/data/subCategory";


const pageStyle = StyleSheet.create({
    mainPage:{
        flex: 1,
        backgroundColor: '#1B1818',
        marginTop: 50,
    }
});



export default function IndexScreen(){
    const [listings, setListings] = useState<any[]>([]);

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
                    onPress={() => console.log(listing.created_at)}
                    key={listing.id} 
                    name={listing.name.toString()}
                    price={listing.price.toString()}
                    isLiked={false}
                    category={listing.category.toString()}
                    publishDate={listing.publishDate}
                />
            ))}
        </ScrollView>
    );
}


