import { View, TextInput, StyleSheet  } from "react-native";

const inputLineStyle = StyleSheet.create({
    input: {
        backgroundColor: '#00000000',
        color: 'white',
        borderWidth: 2,
        borderColor: '#555',
        width: 300,
        height: 40,
        borderRadius: 100,
        padding: 10,
    }
});

export default function InputLine({value, onChangeText, placeholder, placeholderTextColor = "#000000" , secureTextEntry}: { value: string, onChangeText: (text: string) => void, placeholder?: string, placeholderTextColor?: string, secureTextEntry?: boolean}) {
    return (
        <View>
            <TextInput
                style={inputLineStyle.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
}