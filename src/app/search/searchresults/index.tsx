import CommonButton from "@/src/components/common/CommonButton";
import CommonHeader from "@/src/components/common/CommonHeader";
import InputLine from "@/src/components/common/InputLine";
import OptionButton from "@/src/components/common/OptionButton";
import RangeLine from "@/src/components/search/RangeLine";
import { useListingDescriptionContext } from "@/src/hooks/ListingDescriptionContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";

const pageStyle = StyleSheet.create({
    mainPage:{
        flex:1,
        alignItems: 'center',
        padding: 10
    },
    textWithIconContainer:{
        marginTop: 5,
        flexDirection: "row",
        gap: 10,
        width:'100%',
        height: 40,
        alignItems: 'center',
    },
    textIcon:{
        width:20,
        height:20
    },
    
})

export default function IndexScreen(){

    const router = useRouter();

    const [title, setTitle] = useState('');
    const [priceFrom, setPriceFrom] = useState(0);
    const [priceTo, setPriceTo] = useState(0);

    const { selectedSubCategoryId,setSelectedCategory, setSelectedSubCategoryId, setSelectedRegion , selectedCategory, categories, subCategories, regionsMap, selectedRegion, setIsEditMode, setIsSearchMode } = useListingDescriptionContext();

    useEffect(()=>{
        setIsEditMode(false);
        setIsSearchMode(true);
        setSelectedCategory(0);
        setSelectedSubCategoryId(0);
        setSelectedRegion(0);
    },[])

    return(
        <View>
            <CommonHeader headerText="Search results"/>
            <View style={pageStyle.mainPage}>
                
            </View>
        </View>
        
        
    );
}