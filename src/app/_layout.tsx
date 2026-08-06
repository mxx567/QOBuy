import AuthProvider from '../providers/AuthProvider';
import { Stack } from 'expo-router';
import { useAuthContext } from '../hooks/AuthContext';
import { ListingDescriptionProvider } from '../hooks/ListingDescriptionContext';


function RootNavigator(){
    const { isLoggedIn,isLoading } = useAuthContext()
    return(
        <Stack screenOptions={{ headerShown: false }} >
            <Stack.Protected guard={isLoading} >
                <Stack.Screen name="loading" options={{headerShown:false}}/>
            </Stack.Protected>
            <Stack.Protected guard={isLoggedIn && !isLoading} >
                <Stack.Screen name="(main)" options={{headerShown: false}} />
                <Stack.Screen name="add" options={{headerShown: false}}/>
            </Stack.Protected>
            <Stack.Protected guard={!isLoggedIn && !isLoading}>
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="signup" options={{ headerShown: false }} />  
            </Stack.Protected>
        </Stack>
    )
}


export default function Layout(){
    
    return(
        <AuthProvider>
            <ListingDescriptionProvider>
                <RootNavigator />
            </ListingDescriptionProvider>
        </AuthProvider>
    );
}




