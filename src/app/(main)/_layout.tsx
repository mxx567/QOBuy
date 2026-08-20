import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import { TabBarButton } from "../../components/common/TabBarButton";
import { StyleSheet} from "react-native";
import { Link, useRouter } from 'expo-router';
import { AddButton } from '@/src/components/common/AddButton';

const TabStyle = StyleSheet.create({
    tab:{
        alignSelf:"center",
        width: '100%',
        height:80,
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: [{
            offsetX: 0,
            offsetY: 15,
            blurRadius: 20
        }]
    },
    background:{
        flex:1,
    }
});


export default function Layout() {
    const router = useRouter();
    return (
        <Tabs style={TabStyle.background}>
            <TabSlot />
            <TabList style={TabStyle.tab}>
                <TabTrigger name="home" href={"/"} asChild>
                    <TabBarButton text="Home" image={require('../../assets/icons/home.png')} imageFocused={require('../../assets/icons/homef.png')} />
                </TabTrigger>
                <TabTrigger name="favorites" href={"/favorites"} asChild>
                    <TabBarButton text="Favorites" image={require('../../assets/icons/fav.png')} imageFocused={require('../../assets/icons/favf.png')} />
                </TabTrigger>
                <AddButton image={require('../../assets/icons/addd.png')} onPress={() => {router.push({pathname: '/add', params: {selectedSubCategory: ''}})}} />
                <TabTrigger name="messages" href="/messages" asChild>
                    <TabBarButton text="Chats" image={require('../../assets/icons/messages.png')} imageFocused={require('../../assets/icons/messagesf.png')}/>
                </TabTrigger>
                <TabTrigger name="myprofile" href="/myprofile" asChild>
                    <TabBarButton text="My Profile" image={require('../../assets/icons/user.png')} imageFocused={require('../../assets/icons/userf.png')}/>
                </TabTrigger>
                
                
            </TabList>    
        </Tabs>
    );
}