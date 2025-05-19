import { Text, View } from "react-native";
import { styles } from "../compo/displaytemp.styles";
import { Ionicons } from '@expo/vector-icons';
import { UNITS } from "../compo/temperature";

export function DisplayTemp({ inputTemp, inputUnit, convertedTemp, showConverted }) {
    const getTemperatureIcon = (temp, unit) => {
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

    const oppositeUnit = inputUnit === UNITS.cel ? UNITS.farh : UNITS.cel;

    return (
        <View style={styles.container}>
            <View style={styles.tempContainer}>
                <Ionicons 
                    name={getTemperatureIcon(inputTemp, inputUnit)} 
                    size={40} 
                    color="skyblue" 
                />
                <Text style={styles.temp}>
                    {inputTemp || "0"} °{inputUnit}
                </Text>
            </View>
            
            {showConverted && (
                <View style={styles.convertedContainer}>
                    <Text style={styles.convertedLabel}>Converted Temperature:</Text>
                    <View style={styles.tempContainer}>
                        <Ionicons 
                            name={getTemperatureIcon(convertedTemp, oppositeUnit)} 
                            size={40} 
                            color="skyblue" 
                        />
                        <Text style={styles.temp}>
                            {convertedTemp} °{oppositeUnit}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
}