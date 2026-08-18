import ChatHeader from "@/src/components/chat/ChatHeader";
import Message from "@/src/components/chat/Message";
import MessageInputLine from "@/src/components/chat/MessageInputLine";
import MessageSendButton from "@/src/components/chat/MessageSendButton";
import CommonButton from "@/src/components/common/CommonButton";
import InputLine from "@/src/components/common/InputLine";
import { useAuthContext } from "@/src/hooks/AuthContext";
import { supabase } from "@/utils/supabase";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View,Text, ActivityIndicator, ScrollView, StyleSheet, StatusBar } from "react-native";

interface Message{
    user_id : string,
    message : string,
    chat_id : string
}

interface ChatParticipant{
    user_id : string;
    avatar_url : string | null;
    username: string;
}

const pageStyle = StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor: '#1B1818',
    },
    messageSendBar:{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        padding: 10,
        flexDirection:'row'
    }
})

export default function ChatScreen(){

    const params  = useLocalSearchParams<{
        chat: string,
    }>();

    const chatData = params.chat ? JSON.parse(params.chat as string) : null;

    const { profile, isLoading: isAuthLoading } = useAuthContext();

    const userId = profile?.id;

    const [isLoading, setIsLoading] = useState<boolean>();
    const [isCreatingChat, setIsCreatingChat] = useState<boolean>(false);

    const [ messages, setMessages ] = useState<any[]>();
    const [ tmessage, setTMessage ] = useState("");

    const [listingName, setListingName] = useState('');

    const [chatParticipants, setChatParticipants] = useState<any[]>();

    const [chatInfo, setChatInfo] = useState<any>(chatData);


    async function getUserdata(id:string) {
        const {data, error} = await supabase.from("profiles").select("*").eq("id", id);
        if(error){
            console.log("Error fetching user: ", error.message);
        }
        if(data){
            return data[0];
        }
        return null;
    }


    async function getChatParticipants(chatid:string) {
        const {data, error} = await supabase.from("chat_participants").select("user_id, profiles(avatar_url, username)").eq("chat_id", chatid);
        if(error){
            console.log("Cant get chat participants ", error.message);
            return;
        }
        if(data){
            setChatParticipants(data.map((user) => { 
                const profile = Array.isArray(user.profiles)
                    ? user.profiles[0]
                    : user.profiles;
                return ({
                    user_id : user.user_id,
                    avatar_url : profile?.avatar_url,
                    username: profile?.username
                })
             }));
        }   
        return;
    }

    async function CreateChat(listingid: number, to: string) {
        const { data : chatData, error: chatError} = await supabase.from('chats').insert({
            listing_id: listingid
        }).select()
        if(chatError){
            console.log("Failed to create chat: " + chatError.message);
            return;
        }
        
        const { data : uchatData, error: uchatError} = await supabase.from('chat_participants').insert({
            chat_id : chatData[0].id,
            user_id : profile?.id,
        })
        if(uchatError){
            console.log("Failed to create chat: " + uchatError.message);
            return;
        }

        const { data : u2chatData, error: u2chatError} = await supabase.from('chat_participants').insert({
            chat_id : chatData[0].id,
            user_id : to,
        })
        if(u2chatError){
            console.log("Failed to create chat: " + u2chatError.message);
            return;
        }
        if(chatData){
           return chatData[0];
        }
    }
    
    async function getAllMessages(chatid: string) {
        const {data, error} = await supabase.from("messages").select("*").eq("chat_id", chatid);
        if(error){
            console.log("Failed to get chat messages :" + error.message)
            return;
        }
        if(data){
            setMessages(data);
        }
    }


    async function sendMessageToDB(message: Message) {
        const {data, error} = await supabase.from("messages").insert({
            user_id : message.user_id,
            message : message.message,
            chat_id: message.chat_id
        })
        if(error){
            throw error.message;
        }
        return;
    }

    async function sendMessage(message:string) {
        if(!userId) return;

        const prev = messages;
        
        let currentChatId = chatInfo.chatid;
        if (currentChatId === "create") {
            // Prevent duplicate chat creation
            if (isCreatingChat) return;
            
            setIsCreatingChat(true);
            const chatd = await CreateChat(chatInfo.listingid, chatInfo.to);
            setIsCreatingChat(false);
            
            if (!chatd) {
                console.log("Failed to create chat before sending message");
                return;
            }
            currentChatId = chatd.id;
            const updated = { ...chatInfo, chatid: chatd.id };
            setChatInfo(updated);
        }
        
        const nmessage: Message = {
            user_id: userId,
            message: message,
            chat_id: currentChatId
        }

        setMessages([...(messages ?? []), nmessage])
        try{
            await sendMessageToDB(nmessage);
            setTMessage("");
        }
        catch(error){
            setMessages(prev);
            console.log(error);
        }
    }



    useEffect(() => {
        if (isAuthLoading) return;
        
        if (!userId) {
            return;
        }
        const loadData = async () => {
            setIsLoading(true);
            
            if(chatInfo.chatid === "create"){
                const user = await getUserdata(chatInfo.to);

                const to: ChatParticipant = {
                    user_id: user?.id,
                    avatar_url: user?.avatar_url,
                    username: user?.username
                }
                setChatParticipants([to, profile])
            }

            setListingName(chatInfo?.listing_name);
            
            
            if (chatInfo?.chatid && chatInfo?.chatid !== "create") {
                await getAllMessages(chatInfo.chatid);
                await getChatParticipants(chatInfo.chatid);
            }
            setIsLoading(false);       
        };
            
        loadData();
            
            
    }, [userId, isAuthLoading, chatInfo?.chatid]);

    if (isAuthLoading || isLoading) {
        return (
            <View >
                <ActivityIndicator size="large"  />
            </View>
        );
        }
    
    if (!userId) {
        return (
            <View >
                <Text >Please log in to browse listings.</Text>
            </View>
        );    
    }

    return(
        <View style ={pageStyle.mainContainer}>
            <StatusBar />
            <ChatHeader listingname={listingName} userNames={(chatParticipants?.map((cp) => {return(cp.user_id != userId ? cp.username  : "You")}).join(", ")) ?? ''}/>
            <ScrollView>
                {messages?.map((message) =>(
                    <Message key = {messages.indexOf(message)} value={message.message}/>
                ))}
            </ScrollView>
            <View style = {pageStyle.messageSendBar}>
                <MessageInputLine placeholder="Type a message..." value={tmessage} onChangeText={setTMessage} placeholderTextColor="#555"/>
                <MessageSendButton title="send" onPress={() => sendMessage(tmessage)} disabled={isCreatingChat} />
            </View>
            
        </View>
    );
}