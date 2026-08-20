import { View, Text, Image, StyleSheet } from "react-native"
import { useEffect, useState } from "react"
import { supabase } from "@/utils/supabase";
import date2string from "@/utils/date2string";

const userCardStyle = StyleSheet.create({
    userCardContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        height: 80,
    },
    avatar:{
        width:70,
        height:70,
        borderRadius: 100
    },
    userNameText:{
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        maxWidth:190
    },
    avatarSkeleton:{
        width:70,
        height:70,
        borderRadius: 100,
        backgroundColor: '#6f6f6f',
    },
    textSkeleton:{
        color: 'white',
        fontSize: 20,
        backgroundColor: '#6f6f6f',
        height: 15,
        width: 225,
        borderRadius:10,
        fontWeight: 'bold'
    },
    textSkeletonCont:{
        gap:10
    },
    userDesc:{
        color: '#6f6f6f',
        maxWidth:190
    }
})

export default function UserCard({userid} : {userid : string}){
    const [user,setUser] = useState<any[]>();
    const [isLoading, setIsLoading] = useState(true);

    async function getUser() {
        const {data, error} = await supabase.from('profiles').select("*").eq("id", userid);
        if(error){
            console.log("Error fetching user " + userid + ":" + error.message);
        }
        if(data){
            console.log(data)
            setUser(data);
        }
    }

    useEffect(()=>{
        const loadData = async () => {
                setIsLoading(true);
                await Promise.all([getUser()]);
                setIsLoading(false);
            };

        loadData();
    },[])

    if(isLoading){
       return(
            <View style = {userCardStyle.userCardContainer}>
                <View style = {userCardStyle.avatarSkeleton}></View>
                <View style = {userCardStyle.textSkeletonCont}>
                    <Text style = {userCardStyle.textSkeleton}></Text>
                    <Text style = {userCardStyle.textSkeleton}></Text>
                </View>
            </View>
        ); 
    }
    return(
            <View style={userCardStyle.userCardContainer}>
                <Image style = {userCardStyle.avatar} source={{uri: user && user[0].avatar_url}}/>
                <View> 
                    <Text style={userCardStyle.userNameText}>{user && user[0].username}</Text>
                    <Text style={userCardStyle.userDesc}>{user && "Profile created at: " +  date2string(user[0].updated_at)}</Text>
                </View>
            </View>
        
    );
}
