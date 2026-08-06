import { useEffect, useState } from "react";
import { View, StatusBar, Alert, Image, Pressable, StyleSheet, ScrollView  } from "react-native";
import { useRouter } from "expo-router";
import * as expoImagePicker from 'expo-image-picker'

import { useListingDescriptionContext } from "@/src/hooks/ListingDescriptionContext";
import { useAuthContext } from "@/src/hooks/AuthContext";

import { uploadToImgBB } from "@/utils/imgbb";
import { supabase } from "@/utils/supabase";

import InputCounter from "@/src/components/common/InputCounter";
import OptionButton from "@/src/components/common/OptionButton";
import { ImagePickerSmall } from "@/src/components/img/imagePicker";

import InputLine from "@/src/components/common/InputLine";
import CommonButton from "@/src/components/common/CommonButton";
import CommonHeader from "@/src/components/common/CommonHeader";

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
    },
    imgagesContainer:{
        flexDirection:'row',
        gap:5,
        padding:10
    },
    image:{
        height:100,
        width:100,
        borderRadius: 12
    }
});





export default function AddScreen(){
    const router = useRouter();
    const { profile } = useAuthContext();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const { selectedCategory, selectedSubCategoryId, selectedRegion, setSelectedCategory, setSelectedRegion, setSelectedSubCategoryId, categories, subCategories, regionsMap,setIsEditMode } = useListingDescriptionContext();
    const [price, setPrice] = useState<number>(0);

    const [titlec, setTitleC] = useState(0);
    const [descc, setdescC] = useState(0);


    function getCategoryTitle(){
        const selectedCategoryItem = categories?.find((c) => c.id === selectedCategory);
        const selectedSubCategoryItem = subCategories?.find((sc) => sc.id === selectedSubCategoryId);

        return(
            selectedCategoryItem && selectedSubCategoryItem
                ? `${selectedCategoryItem.name}, ${selectedSubCategoryItem.name}`
                : "Select Category"
        );
    }
    
    async function addListing() {
        
        const uploadPromises = image.map(singleImage => uploadToImgBB(singleImage.uri));
        const uploadedLinks = (await Promise.all(uploadPromises)).map(uploadedLink => JSON.stringify(uploadedLink));
        const { error } = await supabase.from('Listings').insert({
            name: title,
            category: selectedSubCategoryId,
            desc: description,
            price: price,
            pictures: uploadedLinks,
            place_id: selectedRegion,
            user_id: profile?.id
        });
        if(error){
            console.log(error.message);
        }
        else{
            router.navigate('/(main)/(tabs)/myprofile')
        }
        
        
    }  

    useEffect(()=>{
        setIsEditMode(false);
        setSelectedCategory(0);
        setSelectedRegion(0);
        setSelectedSubCategoryId(0)
    }, [])

    useEffect(()=>{
        setTitleC(title.length);
        setdescC(description.length);
    },[title, description]);


    useEffect(()=>{
       
    },[selectedCategory, selectedSubCategoryId])

    const [image, setImage] = useState<expoImagePicker.ImagePickerAsset[]>([]);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library.
        // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
        // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
        // so the app users aren't surprised by a system dialog after picking a video.
        // See "Invoke permissions for videos" sub section for more details.
        const permissionResult = await expoImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert('Permission required', 'Permission to access the media library is required.');
            return;
        }

        let result = await expoImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 0.4,
            allowsMultipleSelection:true,
            selectionLimit: 20
        });

        if (!result.canceled && image) {
            setImage(image.concat(...result.assets));
        }
    };

    return (
        <View style={pageStyle.mainPage}>
            <StatusBar />
            
            <CommonHeader headerText="Create Listing"/>
            
            <ScrollView contentContainerStyle={pageStyle.screenContainer}>
                <ScrollView contentContainerStyle={pageStyle.imgagesContainer} horizontal>
                    {image && image.map((img) =>(
                        <Pressable onPress={() => setImage([...image.slice(0, image.indexOf(img)), ...image.slice(image.indexOf(img) + 1)])}>
                            <Image source={{uri: img.uri}} style={pageStyle.image} key = {image.indexOf(img)}/>
                        </Pressable>
                    ))}
                    {image && <ImagePickerSmall onPress= {() => pickImage()}/>}
                </ScrollView>
                <InputLine placeholder="Title" value={title} onChangeText={setTitle} placeholderTextColor="#555" />
                <InputCounter title="Title should contain minimum of 16 symbols " currentSymbolC={titlec} maxSymbolC={64}/>
                
                <OptionButton title={getCategoryTitle()} isNext onPress={() => router.push('/categories')} />
                <InputLine placeholder="Description" value={description} onChangeText={setDescription} placeholderTextColor="#555" height={200} />
                <InputCounter title="Description should contain minimum of 64 symbols" currentSymbolC={descc} maxSymbolC={4096}/>
            
                <InputLine placeholder="Price" value={price.toString()} onChangeText={(text) => setPrice(Number(text))} placeholderTextColor="#555" inputMode="numeric" />
                
                <OptionButton title={regionsMap.placeById.get(selectedRegion) ? regionsMap.placeById.get(selectedRegion).full_path : "Select a region"} isNext onPress={()=>{router.push("/regions")}}/>
                <CommonButton title="Publish" isNext={false} onPress= {()=> {addListing();}}/>
            </ScrollView>
        </View>
    );
}