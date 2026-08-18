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
                <TabTrigger name="favorites" href={"/favorites"} asChild>
                    <TabBarButton text="Favorites" image={require('../../assets/icons/favfilled.png')} />
                </TabTrigger>
                <TabBarButton text="Add" image={require('../../assets/icons/add.png')} onPress={() => {router.push({pathname: '/add', params: {selectedSubCategory: ''}})}} />
                <TabTrigger name="messages" href="/messages" asChild>
                    <TabBarButton text="Chats" image={require('../../assets/icons/messages.png')} />
                </TabTrigger>
                <TabTrigger name="myprofile" href="/myprofile" asChild>
                    <TabBarButton text="My Profile" image={require('../../assets/icons/user.png')} />
                </TabTrigger>
                
                
            </TabList>    
        </Tabs>
    );
}