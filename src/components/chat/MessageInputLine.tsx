import { View, TextInput, StyleSheet, InputModeOptions  } from "react-native";



interface InputLineProps {
    value: string,
    onChangeText: (text: string) => void,
    placeholder?: string, 
    placeholderTextColor?: string, 
    secureTextEntry?: boolean, 
    inputMode?: InputModeOptions,
    height?: number
}

export default function MessageInputLine({value, onChangeText, placeholder, placeholderTextColor = "#000000" , secureTextEntry, inputMode = "text", height = 40}: InputLineProps) {
    const inputLineStyle = StyleSheet.create({
    input: {
        backgroundColor: '#E0E0E0',
        color: 'black',
        width: 300,
        
        borderRadius: 15,
        padding: 10,
        textAlign: 'left',
        textAlignVertical: 'top',
    }
});
    return (
        <View>
            <TextInput
                multiline
                style={inputLineStyle.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                secureTextEntry={secureTextEntry}
                inputMode={inputMode}
            />
        </View>
    );
}