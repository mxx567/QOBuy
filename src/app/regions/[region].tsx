import { View, StyleSheet, ScrollView } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import CommonHeader from '../../components/common/CommonHeader'
import OptionButton from '@/src/components/common/OptionButton';
import { supabase } from '@/utils/supabase';
import { useState, useEffect } from 'react';
import { useListingDescriptionContext } from '@/src/hooks/ListingDescriptionContext';
import { Region } from '@/src/hooks/ListingDescriptionContext';


export default function RegionScreen() {
    const router = useRouter();

    const params  = useLocalSearchParams<{regionid : string}>();



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
    const [regiondata, setRegionData] = useState<any[]>([]);

    

    useEffect(() => {
        
        const getRegionData = async () => {
            try {
                const { data: regiondata, error } = await supabase.from("places").select("*").eq("parent_id", params.regionid);
                if (error) {
                    console.error("Supabase Error Message:", error.message);
                    return;
                }
                if (regiondata && regiondata.length > 0) {
                    setRegionData(regiondata);
                }
            } catch (error) {
                console.error('Error fetching region data:');
            }
        };

        getRegionData();
    }, [])

  
  
  return (
    <View style={pageStyle.mainContainer}>
        <CommonHeader headerText={"Select a District/City"}/>
        <ScrollView>
            {
                regiondata.map((regionData : any)=>(
                    <OptionButton key = {regionData.id} title={regionData.name_en} onPress={()=>{
                        if(regionData.type == "city_regional" || regionData.type == "village"){
                            setSelectedRegion({regId: regionData.id, full_path: regionData.full_path});
                            router.dismissTo("/add");
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