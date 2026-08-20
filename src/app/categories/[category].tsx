import { useLocalSearchParams, useRouter } from "expo-router";
import OptionButton from "@/src/components/common/OptionButton";
import { View, StyleSheet, ScrollView } from "react-native";
import CommonHeader from "@/src/components/common/CommonHeader";

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



    const { isSearchMode, setSelectedCategory, setSelectedSubCategoryId, subCategories, categories, isEditMode} = useListingDescriptionContext();

    const categoryId = Number(params.category);
    const category = categories.find((cat) => cat.id == categoryId);

    const selectCategory = (subCategoryId: number) => {
        setSelectedCategory(categoryId);
        setSelectedSubCategoryId(subCategoryId);
        if(isEditMode){
            router.dismissTo("/edit");
        }
        else if(isSearchMode){
            router.dismissTo("/search");
        }
        else{
            router.dismissTo("/add");
        }
    };



    return (
        <View style={pageStyle.mainContainer}>
            <CommonHeader headerText={category?.name ?? "Category"} />

            <ScrollView contentContainerStyle={pageStyle.mainContainer}>
                {isSearchMode &&
                    <OptionButton
                        title={`All of ${category?.name ?? "this category"}`}
                        isNext
                        onPress={() => selectCategory(0)}
                    />
                }
                {subCategories && subCategories.filter((subCat) => subCat.category_id == categoryId).map((subCat) => 
                    <OptionButton
                        key={subCat.id}
                        title={subCat.name}
                        isNext
                        onPress={() => selectCategory(subCat.id)}
                    />)
                }
            </ScrollView>
        </View>
    );
}
