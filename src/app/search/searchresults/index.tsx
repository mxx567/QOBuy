import { ListingCard } from "@/src/components/common/ListingCard";
import SearchBar from "@/src/components/common/SearchBar";
import date2string from "@/utils/date2string";
import { supabase } from "@/utils/supabase";
import { useListingDescriptionContext } from "@/src/hooks/ListingDescriptionContext";
import { useFavorites } from "@/src/hooks/useFavorites";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, View, StyleSheet, Text } from "react-native";

const pageStyle = StyleSheet.create({
    page:{
        flex: 1
    },
    resultsScroll:{
        flex: 1
    },
    mainPage:{
        flexGrow: 1,
        width: '100%',
        alignItems: 'center',
        padding: 10,
        paddingBottom: 30
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
    statusText:{
        color: 'black',
        textAlign: 'center',
        marginVertical: 20
    },
    pagination:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
        paddingVertical: 12,
        width: '100%'
    },
    pageButton:{
        color: '#4E4AC9',
        fontWeight: 'bold'
    },
    disabledButton:{
        color: '#999'
    }
})

export default function IndexScreen(){

    const router = useRouter();
    const params = useLocalSearchParams<{ title?: string; priceFrom?: string; priceTo?: string }>();
    const [listings, setListings] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const pageSize = 10;

    const { selectedSubCategoryId, selectedCategory, subCategories, regionsMap, selectedRegion } = useListingDescriptionContext();
    const { likedListingIds, toggleFavorite } = useFavorites();

    useEffect(() => {
        setPage(0);
    }, [params.title, params.priceFrom, params.priceTo, selectedCategory, selectedSubCategoryId, selectedRegion]);

    useEffect(() => {
        let isCurrentRequest = true;

        async function getListings() {
            setIsLoading(true);
            let query = supabase
                .from("Listings")
                .select("*", { count: "exact" })
                .order("created_at", { ascending: false });

            const keyword = typeof params.title === "string" ? params.title.trim() : "";
            if (keyword) {
                query = query.or(`name.ilike.%${keyword}%,desc.ilike.%${keyword}%`);
            }

            if (selectedSubCategoryId) {
                query = query.eq("category", selectedSubCategoryId);
            } else if (selectedCategory) {
                const categoryIds = subCategories
                    .filter((subCategory) => subCategory.category_id == selectedCategory)
                    .map((subCategory) => subCategory.id);
                query = categoryIds.length ? query.in("category", categoryIds) : query.eq("category", -1);
            }

            if (selectedRegion) {
                const regionIds = [selectedRegion];
                const regionsToVisit = [selectedRegion];
                while (regionsToVisit.length) {
                    const regionId = regionsToVisit.pop();
                    if (regionId === undefined) continue;
                    for (const child of regionsMap.childrenByParent.get(regionId) ?? []) {
                        regionIds.push(child.id);
                        regionsToVisit.push(child.id);
                    }
                }
                query = query.in("place_id", regionIds);
            }

            const priceFrom = Number(params.priceFrom ?? 0);
            const priceTo = Number(params.priceTo ?? 0);
            if (priceFrom > 0) query = query.gte("price", priceFrom);
            if (priceTo > 0) query = query.lte("price", priceTo);

            const from = page * pageSize;
            const { data, count, error } = await query.range(from, from + pageSize - 1);
            if (isCurrentRequest) {
                setListings(error ? [] : data ?? []);
                setTotalCount(error ? 0 : count ?? 0);
                setIsLoading(false);
            }
        }

        getListings();
        return () => { isCurrentRequest = false; };
    }, [page, params.title, params.priceFrom, params.priceTo, selectedCategory, selectedSubCategoryId, selectedRegion, subCategories, regionsMap.places]);

    const totalPages = Math.ceil(totalCount / pageSize);

    return(
        <View style={pageStyle.page}>
            <SearchBar onPress={() => router.dismissTo('/search')}/>
            <ScrollView style={pageStyle.resultsScroll} contentContainerStyle={pageStyle.mainPage}>
                {isLoading && <ActivityIndicator size="large" color="#4E4AC9" />}
                {!isLoading && listings.length === 0 && <Text style={pageStyle.statusText}>No listings found.</Text>}
                {!isLoading && listings.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        name={listing.name}
                        image={listing.pictures?.length ? JSON.parse(listing.pictures[0]).uri : undefined}
                        price={String(listing.price)}
                        isLiked={likedListingIds.includes(listing.id)}
                        category={subCategories.find((subCategory) => subCategory.id == listing.category)?.name}
                        publishDate={date2string(listing.created_at)}
                        onPress={() => router.push({ pathname: '/listings/[listing]', params: { listing: String(listing.id) } })}
                        onLikePress={(nextIsLiked) => toggleFavorite(listing.id, nextIsLiked)}
                    />
                ))}
                {!isLoading && totalPages > 0 && (
                    <View style={pageStyle.pagination}>
                        <Pressable disabled={page === 0} onPress={() => setPage((currentPage) => currentPage - 1)}>
                            <Text style={page === 0 ? pageStyle.disabledButton : pageStyle.pageButton}>Previous</Text>
                        </Pressable>
                        <Text style={pageStyle.statusText}>{page + 1} / {totalPages}</Text>
                        <Pressable disabled={page >= totalPages - 1} onPress={() => setPage((currentPage) => currentPage + 1)}>
                            <Text style={page >= totalPages - 1 ? pageStyle.disabledButton : pageStyle.pageButton}>Next</Text>
                        </Pressable>
                    </View>
                )}
            </ScrollView>
        </View>
        
        
    );
}