import { View, Text, StyleSheet} from 'react-native';

export default function InputCounter({title, currentSymbolC, maxSymbolC}:{title : string, currentSymbolC: number, maxSymbolC: number}){
    const inputCountStyle = StyleSheet.create({
        container:{
            flexDirection: 'row',
            width: 330,
        },
        text:{
            fontSize: 12,
            color: '#988d8d',
        },
        counter:{
            fontSize: 12,
            color: '#988d8d',
            marginLeft: 'auto'
        }
    });

    return(
        <View style={inputCountStyle.container}>
            <Text style={inputCountStyle.text}>{title}</Text>
            <Text style={inputCountStyle.counter}>{currentSymbolC + '/' + maxSymbolC}</Text>
        </View>
    );
};