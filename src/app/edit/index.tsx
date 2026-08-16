import { useEffect, useState } from "react";
import { View, StatusBar, Alert, Image, Pressable, StyleSheet, ScrollView, ActivityIndicator  } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as expoImagePicker from 'expo-image-picker'

import { useAuthContext } from "@/src/hooks/AuthContext";
import { useListingDescriptionContext} from "@/src/hooks/ListingDescriptionContext";

import { uploadedImage, uploadToImgBB } from "@/utils/imgbb";
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
    const {profile} = useAuthContext();

    const [id, setId] = useState();
    const [listing, setListing] = useState<any>();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const { selectedCategory,setSelectedCategory, selectedSubCategoryId,setSelectedSubCategoryId, selectedRegion, setSelectedRegion, categories, subCategories, regionsMap, setIsEditMode,isLoading } = useListingDescriptionContext();
    const [price, setPrice] = useState<string>('');
    const [existingImg, setExistingImg] = useState<any[]>();
    
    const [titlec, setTitleC] = useState(0);
    const [descc, setdescC] = useState(0);

    useEffect(()=>{
        setIsEditMode(true);
    },[])
    
    const params = useLocalSearchParams<{listingid: string}>();

    const updateListing = async () => {
        const uploadPromises = image.map(singleImage => uploadToImgBB(singleImage.uri));
        const uploadedLinks = await Promise.all(uploadPromises);

        setExistingImg(existingImg?.map((img: uploadedImage)=>(JSON.stringify(img))))

        const { data, error } = await supabase
            .from('Listings') // Target table
            .update({
                name: title,
                category: selectedSubCategoryId,
                desc: description,
                price: price,
                pictures: existingImg?.concat(...uploadedLinks),
                place_id: selectedRegion
            }) // Data to modify
            .eq('id', id) // Filter to match row
            .select(); // Optional: returns the updated row(s)

        if (error) {
            console.error('Error updating data:', error.message);
            return null;
        }
        router.dismissTo('/(main)/(tabs)/myprofile');
        return data;
    };

    const removeListing = async () => {
        const { data, error } = await supabase
            .from('Listings') // Target table
            .delete().eq("id", id);

        if (error) {
            console.error('Error deleting data:', error.message);
            return null;
        }
        router.dismissTo('/(main)/(tabs)/myprofile');
        return data;
    };


    async function getListing(listingid: string) {
        const{ data,error } = await supabase.from('Listings').select("*").eq("id", listingid);

        if(error){
            console.log(error.message);
        }
        else{
            if(data && data.length > 0){
                return data[0];
            }
        }
    }

    useEffect(() => {
        async function loadData() {
            if (!params.listingid) return;
        
        
            const fetchedListing = await getListing(params.listingid) ; 
        
        
            if (fetchedListing) {
                setId(fetchedListing.id);
                setExistingImg(fetchedListing.pictures.map((img: string) => JSON.parse(img)));
                setTitle(fetchedListing.name);
                setDescription(fetchedListing.desc);
                setSelectedRegion(fetchedListing.place_id);
                setSelectedSubCategoryId(fetchedListing.category);
                setPrice(fetchedListing.price);
            }
        }

        loadData();
    }, [params.listingid]);

    useEffect(()=>{
        setTitleC(title.length);
        setdescC(description.length);
    },[title, description]);

    useEffect(() => {
        if (!selectedSubCategoryId || subCategories.length === 0) return;

        const matchedSubCategory = subCategories.find(
            (sc) => sc.id === selectedSubCategoryId
        );

        if (matchedSubCategory) {
            setSelectedCategory(matchedSubCategory.category_id);
        }
    }, [selectedSubCategoryId, subCategories]);


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
                
            <CommonHeader headerText="Edit Listing"/>
                
            <ScrollView contentContainerStyle={pageStyle.screenContainer}>
            <ScrollView contentContainerStyle={pageStyle.imgagesContainer} horizontal>
                {existingImg && existingImg.map((img) =>(
                    <Pressable key={existingImg.indexOf(img)} onPress={() => {setExistingImg([...existingImg.slice(0, existingImg.indexOf(img)), ...existingImg.slice(existingImg.indexOf(img) + 1)])}}>
                        <Image source={{uri: img.uri}} style={pageStyle.image} key = {existingImg.indexOf(img)}/>
                    </Pressable>
                ))}
                {image && image.map((img) =>(
                    <Pressable key = {image.indexOf(img)} onPress={() => setImage([...image.slice(0, image.indexOf(img)), ...image.slice(image.indexOf(img) + 1)])}>
                        <Image source={{uri: img.uri}} style={pageStyle.image}/>
                    </Pressable>
                ))}
                {image && <ImagePickerSmall key={21} onPress= {() => pickImage()}/>}
                </ScrollView>
                <InputLine placeholder="Title" value={title} onChangeText={setTitle} placeholderTextColor="#555" />
                <InputCounter title="Title should contain minimum of 16 symbols " currentSymbolC={titlec} maxSymbolC={64}/>
                    
                <OptionButton title={selectedCategory ? categories.find((c) => c.id == selectedCategory).name + ", " + subCategories?.find((subCategory)=> subCategory.id == selectedSubCategoryId).name: "Select Category" } isNext onPress={() => router.push('/categories')} />
                <InputLine placeholder="Description" value={description} onChangeText={setDescription} placeholderTextColor="#555" height={200} />
                <InputCounter title="Description should contain minimum of 64 symbols" currentSymbolC={descc} maxSymbolC={4096}/>
                
                <InputLine placeholder="Price" value={price} onChangeText={setPrice} placeholderTextColor="#555" inputMode="numeric" />
                    
                <OptionButton title={regionsMap.placeById.get(selectedRegion) ? regionsMap.placeById.get(selectedRegion).full_path : "Select a region"} isNext onPress={()=>{router.push("/regions")}}/>
                <CommonButton title="Publish" isNext={false} onPress= {()=> updateListing()}/>
                <CommonButton title="Remove" isNext={false} onPress= {()=> removeListing()}/>
            </ScrollView>
        </View>
    );
}