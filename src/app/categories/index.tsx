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
        alignItems: "center",
    },
    text:{
        color: 'black',
        fontSize:20,
    },
    scrollContainer:{
        alignItems: "center",
    }
});

export default function CategoriesScreen() {
    const router = useRouter();
    const {categories, isSearchMode, setSelectedCategory} = useListingDescriptionContext();
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
                {isSearchMode &&
                    <OptionButton
                        title={"None"}
                        isNext
                        onPress={() => {
                            setSelectedCategory(0)
                            router.dismissTo('/search')
                        }}
                    />
                }
                
            </ScrollView>
        </View>
  );
}
