import OptionButton from "@/src/components/common/OptionButton";
import CommonHeader from "@/src/components/common/CommonHeader";
import { useRouter } from "expo-router";
import { View, StyleSheet, ScrollView } from "react-native";



type Category ={
    id: number;
    icon?: string;
    name: string;
}
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

const categories: Category[] = [
    {
        id: 1,
        name: "Electronics",
    },
    {
        id: 2,
        name: "Fashion",
    },
    {
        id: 3,
        name: "Home",
    },
    {
        id: 4,
        name: "Books",
    },
    {
        id: 5,
        name: "Sports",
    },
    {
        id: 6,
        name: "Beauty",
    },
    {
        id: 7,
        name: "Automotive",
    },
    {
        id: 8,
        name: "Toys",
    },
    {
        id: 9,
        name: "Groceries",
    },
    {
        id: 10, 
        name: "Pets",
    },
    {
        id: 11,
        name: "Health",
    }
];

export default function CategoriesScreen() {
  const router = useRouter();

  return (
    <View style={pageStyle.mainContainer}>
        <CommonHeader headerText="Categories" />

        <ScrollView contentContainerStyle={pageStyle.mainContainer}>
            {categories.map((category) => (
                <OptionButton key={category.id} title={category.name} isNext onPress={() => router.push({
                    pathname: '/categories/[category]',
                    params: { category: category.name }
                })} />
            ))}
        </ScrollView>
    </View>
  );
}
