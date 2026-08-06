import OptionButton from "@/src/components/common/OptionButton";
import CommonHeader from "@/src/components/common/CommonHeader";
import { useRouter } from "expo-router";
import { View, StyleSheet, ScrollView } from "react-native";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { useListingDescriptionContext } from "@/src/hooks/ListingDescriptionContext";


const pageStyle = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor: '#1B1818',
        alignItems: "center",
    },
    text:{
        color: 'white',
        fontSize:20,
    },
    scrollContainer:{
        backgroundColor: '#1B1818',
        alignItems: "center",
    }
});

export default function CategoriesScreen() {
    const router = useRouter();
    const {categories} = useListingDescriptionContext();
    return (
        <View style={pageStyle.mainContainer}>
            <CommonHeader headerText="Categories" />

            <ScrollView contentContainerStyle={pageStyle.scrollContainer}>
                {categories && categories.map((category) => (
                    <OptionButton key={category.id} title={category.name} isNext onPress={() => router.push({
                        pathname: '/categories/[category]',
                        params: { category: category.id }
                    })} />
                ))}
                
            </ScrollView>
        </View>
  );
}
