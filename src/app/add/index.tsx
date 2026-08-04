import { useRouter } from "expo-router";
import CommonButton from "@/src/components/common/CommonButton";
import CommonHeader from "@/src/components/common/CommonHeader";
import InputLine from "@/src/components/common/InputLine";
import { View, Text, StatusBar } from "react-native";

import { StyleSheet } from "react-native";
import { useState } from "react";
import { useListingCreationContext } from "@/src/hooks/ListingCreationContext";

import { subCategory } from "@/src/data/subCategory";

const pageStyle = StyleSheet.create({
    mainPage:{
        flex: 1,
        backgroundColor: '#1B1818',
        
        
    },
    screenContainer:{
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginTop: 20
    }
});


export default function AddScreen(){
    const router = useRouter();

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const { selectedCategory, selectedSubCategoryId } = useListingCreationContext();
    const [price, setPrice] = useState<number>(0);


    
    return (
        <View style={pageStyle.mainPage}>
            <StatusBar />
            <CommonHeader headerText="Create Listing" />
            <View style={pageStyle.screenContainer}>
                <InputLine placeholder="Title" value={title} onChangeText={setTitle} placeholderTextColor="#555" />
                <CommonButton title={selectedSubCategoryId ? selectedCategory + ", " + subCategory[selectedCategory.toLowerCase()].find(subCat => subCat.id == selectedSubCategoryId)?.name : "Select Category" } isNext onPress={() => router.push('/categories')} />
                <InputLine placeholder="Description" value={description} onChangeText={setDescription} placeholderTextColor="#555" height={200} />
                <InputLine placeholder="Price" value={price.toString()} onChangeText={(text) => setPrice(Number(text))} placeholderTextColor="#555" inputMode="numeric" />
            </View>
        </View>
    );
}