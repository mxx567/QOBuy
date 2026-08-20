import { View, StyleSheet, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import CommonHeader from '../../components/common/CommonHeader'
import OptionButton from '@/src/components/common/OptionButton';
import { supabase } from '@/utils/supabase';
import { useState, useEffect } from 'react';
import { useListingDescriptionContext } from '@/src/hooks/ListingDescriptionContext';

export default function RegionsScreen() {
    const router = useRouter();
    
    const { regionsMap, isSearchMode, setSelectedRegion } = useListingDescriptionContext();


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

    

  
  
    return (
        <View style={pageStyle.mainContainer}>
            <CommonHeader headerText={"Select a region"}/>
            <ScrollView>
                {  
                    regionsMap.placesByLevel.get(1)?.map((region : any)=>(
                        <OptionButton key = {region.id} title={region.name_en} onPress={()=>{router.push({pathname: '/regions/[region]', params: { region:  region.id }})}} isNext/>
                    ))
                }
                {isSearchMode &&
                    <OptionButton
                        title={"None"}
                        isNext
                        onPress={() => {
                            setSelectedRegion(0)
                            router.dismissTo('/search')
                        }}
                    />
                }
            </ScrollView>
            
        </View>
    );
}