import { Pressable, StyleSheet, Text, View } from "react-native";

interface ConditionSelectorProps {
    value: boolean;
    onChange: (isUsed: boolean) => void;
}

const conditionSelectorStyle = StyleSheet.create({
    container: {
        width: '100%',
        gap: 10,
        padding: 10
    },
    title: {
        fontWeight: 'bold'
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    option: {
        alignSelf: 'flex-start',
        backgroundColor: '#E0E0E0',
        borderRadius: 16,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 10,
        flexShrink: 0,
    },
    selectedOption: {
        backgroundColor: '#4E4AC9',
    },
    optionText: {
        color: 'black',
        textAlign: 'center',
    },
    selectedOptionText: {
        color: 'white',
    },
});

export default function ConditionSelector({ value, onChange }: ConditionSelectorProps) {
    return (
        <View style={conditionSelectorStyle.container}>
            <Text style={conditionSelectorStyle.title}>Item condition</Text>
            <View style={conditionSelectorStyle.row}>
                <Pressable
                    style={[conditionSelectorStyle.option, value && conditionSelectorStyle.selectedOption]}
                    onPress={() => onChange(true)}
                >
                    <Text style={[conditionSelectorStyle.optionText, value && conditionSelectorStyle.selectedOptionText]}>Used</Text>
                </Pressable>
                <Pressable
                    style={[conditionSelectorStyle.option, !value && conditionSelectorStyle.selectedOption]}
                    onPress={() => onChange(false)}
                >
                    <Text style={[conditionSelectorStyle.optionText, !value && conditionSelectorStyle.selectedOptionText]}>New</Text>
                </Pressable>
            </View>
        </View>
    );
}