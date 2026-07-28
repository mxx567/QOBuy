import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import { StyleSheet, Image } from "react-native";
import { TabBarButton } from "../components/TabBarButton";
import { useFonts } from 'expo-font';



const TabStyle = StyleSheet.create({
    tab:{
        backgroundColor: '#3E3737',
        borderRadius: 35,
        alignSelf:"center",
        width:350,
        height:80,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 10,
        gap: 20
    },
    background:{
        flex:1,
        backgroundColor: '#1B1818',
    }
});

export default function Layout(){
    const [fontsLoaded] = useFonts({
        'HelveticaNeue-Light': require('../assets/fonts/HelveticaNeue-Light.otf'),
        'HelveticaNeue-Bold': require('../assets/fonts/HelveticaNeue-Bold.otf'),
    });
    return(
        
        <Tabs style={TabStyle.background}>
            <TabSlot />
            <TabList style={TabStyle.tab}>
                <TabTrigger name="home" href={"/"} asChild>
                    <TabBarButton text="Home" image={require('../assets/icons/home.png')} />
                </TabTrigger>
                <TabTrigger name="add" href={"/add"} asChild>
                    <TabBarButton text="Add" image={require('../assets/icons/add.png')} />
                </TabTrigger>
                <TabTrigger name="article" href="/myprofile" asChild>
                    <TabBarButton text="My Profile" image={require('../assets/icons/user.png')} />
                </TabTrigger>
            </TabList>
        </Tabs>
    );
}




