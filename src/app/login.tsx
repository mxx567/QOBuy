import { StyleSheet, View, Image, Text } from "react-native";
import { useState } from "react";
import { supabase } from "@/utils/supabase";
import InputLine from "@/src/components/common/InputLine";
import CommonButton from "../components/common/CommonButton";
import CommonErrorText from "../components/common/CommonErrorText";
import { useRouter } from 'expo-router'


const router = useRouter();

const loginStyle = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor: '#1B1818',
        alignItems: "center",
        justifyContent: "center",
        gap: 5
    },
    logo:{
        width:450,
        height: 105,
        marginBottom: 20
    },
    text:{
        color: 'white',
        fontSize:20,
    }
});

function getFriendlyAuthError(error: { message?: string } | null) {
  if (!error?.message) return "";

  const message = error.message.toLowerCase();

  if (message.includes("invalid login credentials")) {
    return "Email or password is incorrect. Please try again.";
  }
  if (message.includes("email not confirmed")) {
    return "Please confirm your email before signing in.";
  }
  if (message.includes("user not found")) {
    return "No account found for that email.";
  }
  if (message.includes("network")) {
    return "Network issue. Please check your connection and try again.";
  }

  return "Unable to sign in right now. Please try again.";
}


export default function LoginScreen() {
    const [iemail, setIEmail] = useState('');
    const [ipassword, setIPassword] = useState('');
    const [message, setMessage] = useState('');

    async function signInWithEmail() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: iemail,
            password: ipassword,
        })
        if(error){
            setMessage(getFriendlyAuthError(error));
        }
    }

    return (
        <View style={loginStyle.mainContainer}>
            <Image style={loginStyle.logo} source={require('../assets/icons/Logo.png')} />
            <Text style = {loginStyle.text}>Sign in</Text>
            <InputLine placeholder="Email" value={iemail} onChangeText={setIEmail} placeholderTextColor="#555" />
            <InputLine placeholder="Password" secureTextEntry value={ipassword} onChangeText={setIPassword} placeholderTextColor="#555" />
            <CommonErrorText value = {message}/>
            <CommonButton title="Next" onPress={() => signInWithEmail()} />
            <CommonButton title="Sign-up" onPress={() => {
                router.push('/signup')
            }} />
        </View>
    )
}