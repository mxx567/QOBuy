import { View, StyleSheet, ActivityIndicator } from 'react-native';

const LoadingStyle = StyleSheet.create({
    loadingContainer:{
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default function LoadingScreen(){
    return(
        <View style={LoadingStyle.loadingContainer}>
            <ActivityIndicator color="#000000"/>
        </View>
    );
}