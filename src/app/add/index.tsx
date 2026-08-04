import { useRouter } from "expo-router";
import CommonHeader from "@/src/components/common/CommonHeader";
import CommonButton from "@/src/components/common/CommonButton";
import InputLine from "@/src/components/common/InputLine";
import { View, Text, StatusBar } from "react-native";



import { StyleSheet } from "react-native";
import { useState } from "react";
import { useListingCreationContext } from "@/src/hooks/ListingCreationContext";

import { subCategory } from "@/src/data/subCategory";

import { supabase } from "@/utils/supabase";
import category from "../categories/[category]";
import { useAuthContext } from "@/src/hooks/AuthContext";

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
    const {profile} = useAuthContext();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const { selectedCategory, selectedSubCategoryId } = useListingCreationContext();
    const [price, setPrice] = useState<number>(0);

    async function addListing() {
        const { error } = await supabase.from('Listings').insert({
            name: title,
            category: selectedSubCategoryId,
            desc: description,
            price: price,
            user_id: profile?.id
        });
        if(error){
            console.log(error.message);
        }
        else{
            router.navigate('/(main)/(tabs)/myprofile')
        }
    }


    return (
        <View style={pageStyle.mainPage}>
            <StatusBar />
            <CommonHeader headerText="Create Listing"/>
            <View style={pageStyle.screenContainer}>
                <InputLine placeholder="Title" value={title} onChangeText={setTitle} placeholderTextColor="#555" />
                <CommonButton title={selectedSubCategoryId ? selectedCategory + ", " + subCategory[selectedCategory.toLowerCase()].find(subCat => subCat.id == selectedSubCategoryId)?.name : "Select Category" } isNext onPress={() => router.push('/categories')} />
                <InputLine placeholder="Description" value={description} onChangeText={setDescription} placeholderTextColor="#555" height={200} />
                <InputLine placeholder="Price" value={price.toString()} onChangeText={(text) => setPrice(Number(text))} placeholderTextColor="#555" inputMode="numeric" />
                <CommonButton title="Publish" isNext={false} onPress= {()=> {addListing();}}/>
            </View>
        </View>
    );
}