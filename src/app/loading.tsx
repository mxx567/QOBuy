import { View, StyleSheet, ActivityIndicator } from 'react-native';

const LoadingStyle = StyleSheet.create({
    loadingContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default function LoadingScreen(){
    return(
        <View style={LoadingStyle.loadingContainer}>
            <ActivityIndicator size ="large" color={"#4E4AC9"}/>
        </View>
    );
}