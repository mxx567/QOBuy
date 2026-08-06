import { View, StyleSheet, ScrollView } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import CommonHeader from '../../components/common/CommonHeader'
import OptionButton from '@/src/components/common/OptionButton';
import { supabase } from '@/utils/supabase';
import { useState, useEffect } from 'react';
import { useListingDescriptionContext } from '@/src/hooks/ListingDescriptionContext';


export default function RegionScreen() {
    const router = useRouter();

    const params  = useLocalSearchParams<{region : string}>();

    const { regionsMap, isEditMode } = useListingDescriptionContext();


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

    const { setSelectedRegion } = useListingDescriptionContext();

    console.log(regionsMap.childrenByParent)
    console.log(regionsMap.childrenByParent.get(1))
    return (
        <View style={pageStyle.mainContainer}>
            <CommonHeader headerText={"Select a District/City"}/>
            <ScrollView>
                {
                    regionsMap.childrenByParent.get(Number(params.region))?.map((regionData : any)=>(
                        <OptionButton key = {regionData.id} title={regionData.name_en} onPress={()=>{
                            if(regionData.type == "city_regional" || regionData.type == "village"){
                                setSelectedRegion(regionData.id);
                                if(isEditMode){
                                    router.dismissTo("/edit");
                                }
                                else{
                                    router.dismissTo("/add")
                                }
                                
                            }
                            else{
                                console.log(regionData.id);
                                router.push({pathname: '/regions/[region]', params: {region: String(regionData.id)}});
                            };
                        }} isNext/>
                    ))
                }
            </ScrollView>
            
        </View>
    );
}