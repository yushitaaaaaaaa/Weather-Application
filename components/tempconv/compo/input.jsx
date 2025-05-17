import { View, TextInput, Text } from "react-native";
import { styles } from "./input.styles";
import { Ionicons } from '@expo/vector-icons';

export function Input({ defaultValue = "", onChange, unit }) {
    return (
        <View style={styles.root}>
            <View style={styles.inputContainer}>
                <Ionicons name="thermometer-outline" size={20} color="#34495E" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    maxLength={4}
                    keyboardType="numeric"
                    placeholder="Enter temperature"
                    placeholderTextColor="#7f8c8d"
                    value={defaultValue.toString()}
                    onChangeText={(text) => {
                        const cleanedText = text.replace(/[^0-9.-]/g, ""); 
                        onChange(cleanedText);
                    }}
                />
            </View>
            <Text style={styles.unitText}>°{unit || "C"}</Text>
        </View>
    );
}
