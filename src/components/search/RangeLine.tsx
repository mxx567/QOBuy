import { useEffect } from "react";
import { View, TextInput, StyleSheet, InputModeOptions, Text  } from "react-native";



interface RangeLineProps {
    value1: string,
    value2: string,
    onChangeText1: (text: string) => void,
    onChangeText2: (text: string) => void,
    placeholder1?: string, 
    placeholder2?: string, 
    placeholderTextColor?: string, 
    
    height?: number
}

export default function RangeLine({value1, value2 ,onChangeText1, onChangeText2, placeholder1, placeholder2 , placeholderTextColor = "#555" , height = 40}: RangeLineProps) {
    const rangeLineStyle = StyleSheet.create({
        rangeCotainer:{
            flexDirection: 'row',
            gap: 20
        },
        inputContainer:{
            flexDirection: 'column',
            height: 80,
        },
        input: {
            backgroundColor: '#E0E0E0',
            color: 'black',
            width: 160,
            height: height,
            borderRadius: 10,
            padding: 10,
            textAlign: 'left',
            textAlignVertical: 'top',
        }
    });

    return (
        <View style={rangeLineStyle.rangeCotainer}>
            <View style={rangeLineStyle.inputContainer}> 
                <Text>
                    {"From:"}
                </Text>
                <TextInput  
                    style={rangeLineStyle.input}
                    value={value1}
                    onChangeText={onChangeText1}
                    placeholder={placeholder1}
                    inputMode="numeric"
                    placeholderTextColor={placeholderTextColor}
                />
            </View>
            <View>
                <Text>
                    {"To:"}
                </Text>
                <TextInput  
                    style={rangeLineStyle.input}
                    value={value2}
                    onChangeText={onChangeText2}
                    placeholder={placeholder2}
                    inputMode="numeric"
                    placeholderTextColor={placeholderTextColor}
                />
            </View>
            
        </View>
    );
}