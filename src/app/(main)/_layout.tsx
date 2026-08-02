import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import { TabBarButton } from "../../components/common/TabBarButton";
import { StyleSheet} from "react-native";
import { Link, useRouter } from 'expo-router';

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


export default function Layout() {
    const router = useRouter();
    return (
        <Tabs style={TabStyle.background}>
            <TabSlot />
            <TabList style={TabStyle.tab}>
                <TabTrigger name="home" href={"/"} asChild>
                    <TabBarButton text="Home" image={require('../../assets/icons/home.png')} />
                </TabTrigger>
                <TabBarButton text="Add" image={require('../../assets/icons/add.png')} onPress={() => {router.push('/add')}} />
                <TabTrigger name="article" href="/myprofile" asChild>
                    <TabBarButton text="My Profile" image={require('../../assets/icons/user.png')} />
                </TabTrigger>
            </TabList>    
        </Tabs>
    );
}