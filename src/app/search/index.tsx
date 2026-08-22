import CommonButton from "@/src/components/common/CommonButton";
import CommonHeader from "@/src/components/common/CommonHeader";
import InputLine from "@/src/components/common/InputLine";
import OptionButton from "@/src/components/common/OptionButton";
import RangeLine from "@/src/components/search/RangeLine";
import { useListingDescriptionContext } from "@/src/hooks/ListingDescriptionContext";
import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, Pressable, ScrollView } from "react-native";

type PriceSort = "cheapest" | "expensive" | "free";
type Condition = "used" | "new";

const pageStyle = StyleSheet.create({
    mainPage:{
        flexGrow: 1,
        alignItems: 'center',
        padding: 10,
        paddingBottom: 30,
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
    selectorSection: {
        width: '100%',
        marginTop: 18,
    },
    selectorHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    selectorRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        width: '100%',
    },
    selector: {
        backgroundColor: '#E0E0E0',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 24,
        paddingVertical: 10,
        flexGrow: 0,
        flexShrink: 0,
    },
    selectedSelector: {
        backgroundColor: '#4E4AC9',
    },
    selectorText: {
        color: 'black',
        textAlign: 'center',
    },
    selectedSelectorText: {
        color: 'white',
    },
    searchButton:{
        marginTop: 20
    }
    
})

export default function IndexScreen(){

    const router = useRouter();

    const [title, setTitle] = useState('');
    const [priceFrom, setPriceFrom] = useState(0);
    const [priceTo, setPriceTo] = useState(0);
    const [priceSort, setPriceSort] = useState<PriceSort>("cheapest");
    const [condition, setCondition] = useState<Condition | null>(null);
    const [listingCount, setListingCount] = useState<number | null>(null);

    const { selectedSubCategoryId,setSelectedCategory, setSelectedSubCategoryId, setSelectedRegion , selectedCategory, categories, subCategories, regionsMap, selectedRegion, setIsEditMode, setIsSearchMode } = useListingDescriptionContext();

    useEffect(()=>{
        setIsEditMode(false);
        setIsSearchMode(true);
        
    },[])

    useEffect(() => {
        let isCurrentRequest = true;

        async function getListingCount() {
            let query = supabase
                .from("Listings")
                .select("id", { count: "exact", head: true });

            if (title.trim()) {
                query = query.or(
                    `name.ilike.%${title}%,desc.ilike.%${title}%`
                );;
            }
        
            
            if (selectedSubCategoryId) {
                query = query.eq("category", selectedSubCategoryId);
            } else if (selectedCategory) {
                const categorySubcategoryIds = subCategories
                    .filter((subCategory) => subCategory.category_id == selectedCategory)
                    .map((subCategory) => subCategory.id);

                query = categorySubcategoryIds.length
                    ? query.in("category", categorySubcategoryIds)
                    : query.eq("category", -1);
            }
            if (selectedRegion) {
                const regionIds = [selectedRegion];
                const regionsToVisit = [selectedRegion];

                while (regionsToVisit.length) {
                    const regionId = regionsToVisit.pop();
                    if (regionId === undefined) {
                        continue;
                    }
                    const children = regionsMap.childrenByParent.get(regionId) ?? [];

                    for (const child of children) {
                        regionIds.push(child.id);
                        regionsToVisit.push(child.id);
                    }
                }

                query = query.in("place_id", regionIds);
            }
            if (priceFrom > 0) {
                query = query.gte("price", priceFrom);
            }
            if (priceTo > 0) {
                query = query.lte("price", priceTo);
            }
            if (priceSort === "free") {
                query = query.eq("price", 0);
            }
            if (condition) {
                query = query.eq("isUsed", condition === "used");
            }

            const { count, error } = await query;
            if (isCurrentRequest) {
                setListingCount(error ? null : count ?? 0);
            }
        }

        getListingCount();

        return () => {
            isCurrentRequest = false;
        };
    }, [title, priceFrom, priceTo, priceSort, condition, selectedCategory, selectedSubCategoryId, selectedRegion, subCategories, regionsMap.places]);

    return(
        <View style={{ flex: 1 }}>
            <CommonHeader headerText="Search Parameters"/>
            <ScrollView contentContainerStyle={pageStyle.mainPage}>
                <View style = {pageStyle.textWithIconContainer}>
                    <Image style={pageStyle.textIcon} source={require("../../assets/icons/titlename.png")}/>
                    <Text>{"Enter keywords"}</Text>
                </View>                
                <InputLine value={title} placeholder="Search" onChangeText={(text)=> setTitle(text)}/>
                <OptionButton withIcon icon={require("../../assets/icons/categories.png")} title={selectedCategory ? `${categories.find((c) => c.id == selectedCategory)?.name}${selectedSubCategoryId ? `, ${subCategories?.find((subCategory) => subCategory.id == selectedSubCategoryId)?.name ?? ""}` : ""}` : "Any Category"} isNext onPress={() => router.push('/categories')} />
                <OptionButton withIcon icon={require("../../assets/icons/location.png")} title={regionsMap.placeById.get(selectedRegion) ? regionsMap.placeById.get(selectedRegion).full_path : "Any Region"} isNext onPress={()=>{router.push("/regions")}}/>
                <View style = {pageStyle.textWithIconContainer}>
                    <Image style={pageStyle.textIcon} source={require("../../assets/icons/price.png")}/>
                    <Text>{"Set Price Range"}</Text>
                </View>     
                <RangeLine value1={String(priceFrom)} value2={String(priceTo)} onChangeText1={(from) => setPriceFrom(Number(from))} onChangeText2={(to) => setPriceTo(Number(to))} />
                <View style={pageStyle.selectorSection}>
                    <View style={pageStyle.selectorHeader}>
                        <Text>{"Sort by price"}</Text>
                    </View>
                    <View style={pageStyle.selectorRow}>
                        {([['cheapest', 'Cheapest'], ['expensive', 'Most Expensive'], ['free', 'Free']] as const).map(([value, label]) => (
                            <Pressable key={value} style={[pageStyle.selector, priceSort === value && pageStyle.selectedSelector]} onPress={() => setPriceSort(value)}>
                                <Text style={[pageStyle.selectorText, priceSort === value && pageStyle.selectedSelectorText]}>{label}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
                <View style={pageStyle.selectorSection}>
                    <View style={pageStyle.selectorHeader}>
                        <Text>{"Condition"}</Text>
                    </View>
                    <View style={pageStyle.selectorRow}>
                        {([['used', 'Used'], ['new', 'New']] as const).map(([value, label]) => (
                            <Pressable key={value} style={[pageStyle.selector, condition === value && pageStyle.selectedSelector]} onPress={() => setCondition(condition === value ? null : value)}>
                                <Text style={[pageStyle.selectorText, condition === value && pageStyle.selectedSelectorText]}>{label}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
                <View style={pageStyle.searchButton}>
                    <CommonButton title={listingCount === null ? "Search" : `Search (${listingCount})`} onPress={()=>{router.push({ pathname: '/search/searchresults', params: { title, priceFrom: String(priceFrom), priceTo: String(priceTo), priceSort, condition: condition ?? "" } })}} />
                </View>
            </ScrollView>
        </View>
        
        
    );
}