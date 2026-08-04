import { View, StyleSheet, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import CommonHeader from '../../components/common/CommonHeader'
import OptionButton from '@/src/components/common/OptionButton';
import { supabase } from '@/utils/supabase';
import { useState, useEffect } from 'react';

export default function RegionsScreen() {
    const router = useRouter();

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

    const [regions, setRegions] = useState<any[]>([]);



    useEffect(() => {
        
        const getRegions = async () => {
            try {
                const { data: regions, error } = await supabase.from("places").select("*").eq("level", '1');
                if (error) {
                    console.error('Error fetching regions:', error.message);
                    return;
                }

                if (regions && regions.length > 0) {
                    setRegions(regions);
                }
            } catch (error) {
                console.error('Error fetching regions:');
            }
        };

        getRegions();
    }, [])

  
  
  return (
    <View style={pageStyle.mainContainer}>
        <CommonHeader headerText={"Select a region"}/>
        <ScrollView>
            {
                regions.map((region : any)=>(
                    <OptionButton key = {region.id} title={region.name_en} onPress={()=>{router.push({pathname: '/regions/[region]', params: region.id})}} isNext/>
                ))
            }
        </ScrollView>
        
    </View>
    );
}