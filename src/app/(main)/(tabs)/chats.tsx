import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";
import { ListingCard } from "../../../components/common/ListingCard";
import { useEffect, useReducer, useState } from "react";
import { supabase } from "@/utils/supabase";
import date2string from "@/utils/date2string";
import { uploadedImage } from "@/utils/imgbb";

import { useNavigation, useRouter } from "expo-router";
import { useListingDescriptionContext } from "@/src/hooks/ListingDescriptionContext";
import { useAuthContext } from "@/src/hooks/AuthContext";
import ChatButton from "@/src/components/chat/ChatButton";

const pageStyle = StyleSheet.create({
    mainPage:{
        flex: 1,
        backgroundColor: '#1B1818',
        marginTop: 50,
    },
    text:{
        color: 'white',
        alignSelf: 'center',
    },
    loadingContainer:{
        flex:1,
        backgroundColor: '#1B1818',
        alignContent: 'center',
        justifyContent: 'center'
    }
});



export default function FavoritesScreen(){

    const [isLoading, setIsLoading] = useState(true);

    const navigation = useNavigation();

    const [chats, setChats] = useState<any[]>();

    const { profile, isLoading: isAuthLoading } = useAuthContext();

    const userId = profile?.id;



    async function getChats(user_id: string) {
        const { data: participantRows, error: participantError } = await supabase
            .from("chat_participants")
            .select("chat_id")
            .eq("user_id", user_id);

        if (participantError) throw participantError;

        const chatIds = [...new Set(participantRows.map(p => p.chat_id))];

        if (chatIds.length === 0) return [];

        const { data: messages, error: messagesError } = await supabase
            .from("messages")
            .select("chat_id, created_at, message, user_id")
            .in("chat_id", chatIds)
            .order("created_at", { ascending: false });

        if (messagesError) throw messagesError;

        const senderIds = [...new Set(messages.map(m => m.user_id))];

        const { data: profiles, error: profilesError } = await supabase
            .from("profiles")
            .select("id, username")
            .in("id", senderIds);

        if (profilesError) throw profilesError;

        const usernameMap = new Map(
            (profiles ?? []).map(p => [p.id, p.username])
        );

        const { data: listings, error: listingsError} = await supabase
            .from("Listings")
            .select("id, name, chats(id)")
            .in("chats.id", chatIds);
        
        if (listingsError) throw listingsError;

        const listingnameMap = new Map(
            (listings ?? []).map(l => [l.id, l.name])
        );


        const latestByChat = new Map();

        for (const msg of messages) {
            if (!latestByChat.has(msg.chat_id)) {
            latestByChat.set(msg.chat_id, {
                ...msg,
                sender_username: usernameMap.get(msg.user_id) ?? "Unknown",
            });
            }
        }

        const latestChatIds = [...latestByChat.keys()];

        const { data: chats, error: chatsError } = await supabase
            .from("chats")
            .select("*")
            .in("id", latestChatIds);

        if (chatsError) throw chatsError;

        return chats
            .map(chat => {
            const latest = latestByChat.get(chat.id);
            return {
                ...chat,
                last_message_listing: listingnameMap.get(chat.listing_id) ?? null,
                last_message: latest?.message ?? null,
                last_message_at: latest?.created_at ?? null,
                last_message_user: latest?.sender_username ?? null,
            };
            })
            .sort((a, b) => {
                const aTime = a.last_message_at ? new Date(a.last_message_at).getTime() : 0;
                const bTime = b.last_message_at ? new Date(b.last_message_at).getTime() : 0;
                return bTime - aTime;
            });
     }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (isAuthLoading) return;

            if (!userId) {
                setIsLoading(false);
                return;
            }

            const loadData = async () => {
                setIsLoading(true);
                const chats = await getChats(userId);
                setChats(chats);
                setIsLoading(false);
            };

            loadData();
        });
        

        return unsubscribe;
    }, [userId, isAuthLoading, navigation]);

    const router = useRouter();


    if (isAuthLoading || isLoading) {
        return (
        <View style={pageStyle.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
        </View>
        );
    }



    if (!userId) {
        return (
        <View style={pageStyle.mainPage}>
            <Text style={pageStyle.text}>Please log in to browse listings.</Text>
        </View>
        );
    }
    return (
        <ScrollView style={pageStyle.mainPage}>
            {chats?.map((chat) => 
                {console.log(chat.latest_message_listing);
                    return(
                        <ChatButton 
                        key={chat.id}
                        title={chat.last_message_listing} 
                        last_msg={(chat.last_message_user == profile?.username ? "You: " : chat.last_message_user + ": ") + chat.last_message} 
                        onPress={ () => {router.push({pathname: "/chats/[chat]", params: {
                            chatData: JSON.stringify({
                                chatid : chat.id,
                                listingid : chat.listing_id,
                                listing_name: chat.last_message_listing,
                                to : ""
                            })
                        }})}} />
                    );
                }
                
            )}
        </ScrollView>
    );
}
