import { useLocalSearchParams, useRouter } from "expo-router";
import { subCategory } from "@/src/data/subCategory";
import CommonButton from "@/src/components/common/CommonButton";
import { View, Text, StyleSheet } from "react-native";

const pageStyle = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor: '#1B1818',
        alignItems: "center",
        justifyContent: "center",
        gap: 5
    },
    text:{
        color: 'white',
        fontSize:20,
    }
});

export default function category() {
    const router = useRouter();
    const params = useLocalSearchParams<{ category: string }>();

    return (
        <View style={pageStyle.mainContainer}>
            <Text style={pageStyle.text}>{params.category}</Text>
        
            {subCategory[params.category.toLowerCase()]?.map((subCat) => (
                <CommonButton 
                    key={subCat.id}
                    title={subCat.name}
                    isNext
                    onPress={() => {}}
                />
            ))}
        </View>
    );
}