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
            <CommonHeader headerText="Search Parameters"/>
            <View style={pageStyle.mainPage}>
                <View style = {pageStyle.textWithIconContainer}>
                    <Image style={pageStyle.textIcon} source={require("../../assets/icons/titlename.png")}/>
                    <Text>{"Enter keywords"}</Text>
                </View>                
                <InputLine value={title} placeholder="Search" onChangeText={(text)=> setTitle(text)}/>
                <OptionButton withIcon icon={require("../../assets/icons/categories.png")} title={selectedCategory ? categories.find((c) => c.id == selectedCategory).name + ", " + subCategories?.find((subCategory)=> subCategory.id == selectedSubCategoryId).name: "Any Category" } isNext onPress={() => router.push('/categories')} />
                <OptionButton withIcon icon={require("../../assets/icons/location.png")} title={regionsMap.placeById.get(selectedRegion) ? regionsMap.placeById.get(selectedRegion).full_path : "Any Region"} isNext onPress={()=>{router.push("/regions")}}/>
                <View style = {pageStyle.textWithIconContainer}>
                    <Image style={pageStyle.textIcon} source={require("../../assets/icons/price.png")}/>
                    <Text>{"Set Price Range"}</Text>
                </View>     
                <RangeLine value1={String(priceFrom)} value2={String(priceTo)} onChangeText1={(from) => setPriceFrom(Number(from))} onChangeText2={(to) => setPriceTo(Number(to))} />
                <CommonButton title="Search" onPress={()=>{router.push('/search/searchresults')}} />
            </View>
        </View>
        
        
    );
}