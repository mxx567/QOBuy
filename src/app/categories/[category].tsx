import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import OptionButton from "@/src/components/common/OptionButton";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CommonHeader from "@/src/components/common/CommonHeader";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

import { useListingDescriptionContext } from "@/src/hooks/ListingDescriptionContext";

const pageStyle = StyleSheet.create({
    mainContainer:{
        flex:1,
        alignItems: "center",
    },
    text:{
        color: 'white',
        fontSize:20,
    }
});

export default function category() {
    const router = useRouter();
    const params = useLocalSearchParams<{ category: string }>();



    const { selectedCategory, isSearchMode , setSelectedCategory, selectedSubCategoryId, setSelectedSubCategoryId, subCategories, categories, isEditMode} = useListingDescriptionContext();



    return (
        <View style={pageStyle.mainContainer}>
            <CommonHeader headerText={categories.find((cat) => cat.id == params.category).name} />

            <ScrollView contentContainerStyle={pageStyle.mainContainer}>
                {subCategories && subCategories.filter((subCat) => subCat.category_id == Number(params.category)).map((subCat) => 
                    <OptionButton
                        key={subCat.id}
                        title={subCat.name}
                        isNext
                        onPress={() => {
                            setSelectedCategory(subCat.category_id);
                            setSelectedSubCategoryId(subCat.id);
                            if(isEditMode){
                                router.dismissTo("/edit");
                            }
                            else if(isSearchMode){
                                router.dismissTo("/search")
                            }
                            else{
                                router.dismissTo("/add")
                            }
                        }}
                    />)
                }
            </ScrollView>
        </View>
    );
}
