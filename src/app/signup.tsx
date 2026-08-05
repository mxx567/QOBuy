import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { useState } from 'react'
import InputLine from '../components/common/InputLine';
import CommonButton from '../components/common/CommonButton';
import CommonErrorText from '../components/common/CommonErrorText';
import { supabase } from '@/utils/supabase';
import CommonHeader from '../components/common/CommonHeader';



const loginStyle = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor: '#1B1818',
    },
    inputContainer:{
        marginTop:100,
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

export default function SignUpScreen(){
    const [iemail, setIEmail] = useState('');
    const [iusername, setIUsername] = useState('');
    const [ipassword, setIPassword] = useState('');
    const [icpassword, setIcPassword] = useState('');
    const [message, setMessage] = useState('');


    async function signUp() {
        if(ipassword != icpassword){
            setMessage("Password and conformation password should be the same!");
            return null;
        };

        const { data, error } = await supabase.auth.signUp({
            email: iemail,
            password: ipassword,
            options: {
                data: {
                    username: iusername,
                    full_name: iusername
                }
            }
        });

        if (!error && data.user) {
            await supabase.from('profiles').upsert({
                id: data.user.id,
                username: iusername,
                full_name: iusername,
            });
        }
        if(error){
            setMessage(error.message);
        };
    }

    return(
        <View style = {loginStyle.mainContainer}>
            <StatusBar/>
            <CommonHeader headerText="Sign Up" />
            <View style = {loginStyle.inputContainer}>
                <Text style = {loginStyle.text}>Sign up</Text>
                <InputLine placeholder="Email" value={iemail} onChangeText={setIEmail} placeholderTextColor="#555" />
                <InputLine placeholder="Username" value={iusername} onChangeText={setIUsername} placeholderTextColor="#555" />
                <InputLine placeholder="Password" secureTextEntry value={ipassword} onChangeText={setIPassword} placeholderTextColor="#555" />
                <InputLine placeholder="Confirm Password" secureTextEntry value={icpassword} onChangeText={setIcPassword} placeholderTextColor="#555" />
                <CommonErrorText value = {message}/>
                <CommonButton title="Next" onPress={() => signUp()} />
            </View>
        </View>
        
    )
}