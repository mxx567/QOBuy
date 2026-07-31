import { StyleSheet, View, Text, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";
import { supabase } from "@/utils/supabase";

const loginStyle = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor: '#1B1818',
        alignItems: "center",
        justifyContent: "center",
        gap: 20
    },
    text:{
        color: 'white',
        fontSize: 50,
    },
    inputfield:{
        backgroundColor: '#242424',
        color: 'white',
        width: 300,
        height: 50,
        borderRadius: 10,   
    },
    loginButton:{
        backgroundColor: '#3E3737',
        color: 'white',
        borderRadius: 10,
        width: 100,
        height: 50,
        justifyContent: 'center',
        textAlign: 'center',
        lineHeight: 50,
        fontSize: 20
    }
});



export default function LoginScreen() {
    const [iemail, setIEmail] = useState('');
    const [ipassword, setIPassword] = useState('');

    async function signInWithEmail() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: iemail,
            password: ipassword,
        })
    }

    return (
        <View style={loginStyle.mainContainer}>
            <Text style={loginStyle.text}>Login</Text>
            <TextInput placeholder="Email" style={loginStyle.inputfield} value={iemail} onChangeText={setIEmail} />
            <TextInput placeholder="Password" secureTextEntry style={loginStyle.inputfield} value={ipassword} onChangeText={setIPassword} />
            <Pressable>
                <Text style={loginStyle.loginButton} onPress={() => {signInWithEmail()}}>
                    Login
                </Text>
            </Pressable>

        </View>
    )
}