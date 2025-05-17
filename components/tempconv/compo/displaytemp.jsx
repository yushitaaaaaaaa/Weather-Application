import { Text, View } from "react-native";
import { styles } from "./displaytemp.styles";
import { Ionicons } from '@expo/vector-icons';

export function DisplayTemp({ temp, unit }) {
    const getTemperatureIcon = () => {
        const numTemp = parseFloat(temp);
        
        if (isNaN(numTemp)) return "thermometer-outline";
        
        if ((unit === 'C' && numTemp > 30) || (unit === 'F' && numTemp > 86)) {
            return "sunny";
        } else if ((unit === 'C' && numTemp < 10) || (unit === 'F' && numTemp < 50)) {
            return "snow";
        } else {
            return "thermometer";
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.tempContainer}>
                <Ionicons name={getTemperatureIcon()} size={40} color="skyblue" />
                <Text style={styles.temp}>
                    {temp} °{unit}
                </Text>
            </View>
        </View>
    );
}
