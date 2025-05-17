import { Text, TouchableOpacity } from "react-native";
import { styles } from "./convertbutton.styles";
import { Ionicons } from '@expo/vector-icons';

export function ConvertButton({onPress, unit}) {
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={styles.button}
            activeOpacity={0.8}
        >
            <Ionicons name="swap-horizontal" size={20} color="#fff" />
            <Text style={styles.buttonText}>Convert to °{unit}</Text>
        </TouchableOpacity>
    )
}