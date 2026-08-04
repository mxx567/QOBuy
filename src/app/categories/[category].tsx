import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { subCategory } from "@/src/data/subCategory";
import OptionButton from "@/src/components/common/OptionButton";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CommonHeader from "@/src/components/common/CommonHeader";

import { useEffect } from "react";

import { useListingCreationContext } from "@/src/hooks/ListingCreationContext";

const pageStyle = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor: '#1B1818',
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

    const { selectedCategory, setSelectedCategory, selectedSubCategoryId, setSelectedSubCategoryId} = useListingCreationContext();
   
    return (
        <View style={pageStyle.mainContainer}>
            <CommonHeader headerText={params.category} />

            <ScrollView contentContainerStyle={pageStyle.mainContainer}>
                {subCategory[params.category.toLowerCase()]?.map((subCat) => (
                    <OptionButton
                        key={subCat.id}
                        title={subCat.name}
                        isNext
                        onPress={() => {
                            setSelectedCategory(params.category);
                            setSelectedSubCategoryId(subCat.id);
                            router.dismissTo("/add")
                        }}
                    />
                ))}
            </ScrollView>
        </View>
    );
}
