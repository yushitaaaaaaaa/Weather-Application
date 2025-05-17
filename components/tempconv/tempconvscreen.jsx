import { useState } from "react";
import { View, ImageBackground, Text, StatusBar, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UNITS, convertTempTo, getOppositeUnit } from "../tempconv/compo/temperature";
import { Input } from "./compo/input";
import { DisplayTemp } from "./compo/displaytemp";
import { ConvertButton } from "./compo/convertbutton";
import { styles } from "./tempconv.styles";

export default function TempConvScreen() {
    const [temp, setTemp] = useState("");
    const [unit, setUnit] = useState(UNITS.cel);

    const getTemperatureIcon = () => {
        if (!temp || isNaN(parseFloat(temp))) {
            return <Ionicons name="thermometer-outline" size={80} color="skyblue" />;
        }
        
        const value = parseFloat(temp);
        const celsiusValue = unit === UNITS.cel ? value : convertTempTo(value, UNITS.cel);
        
        if (celsiusValue < 0) {
            return <Ionicons name="snow-outline" size={80} color="skyblue" />;
        } else if (celsiusValue < 15) {
            return <Ionicons name="thermometer-outline" size={80} color="skyblue" />;
        } else if (celsiusValue < 25) {
            return <Ionicons name="sunny-outline" size={80} color="skyblue" />;
        } else {
            return <Ionicons name="flame-outline" size={80} color="skyblue" />;
        }
    };

    const handleConvert = () => {
        if (!temp) return; 
        const newUnit = getOppositeUnit(unit);
        setTemp(convertTempTo(parseFloat(temp), newUnit)); 
        setUnit(newUnit);
    };

    return (
        <ImageBackground 
            source={require("../../assets/temp-bg.jpg")} 
            style={styles.backgroundImage}
        >
            <StatusBar barStyle="light-content" />
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.boxContainer}>
                    
                    <View style={styles.weatherIconContainer}>
                        {getTemperatureIcon()}
                        <Text style={styles.weatherCondition}>
                            {temp ? `${temp}° ${unit}` : "Temperature"}
                        </Text>
                    </View>
                    
                    <View style={styles.inputContainer}>
                        <Input defaultValue={temp} onChange={setTemp} unit={unit} />
                    </View>
                    
                    <View style={styles.detailBox}>
                        <DisplayTemp temp={temp} unit={unit} />
                    </View>
                    
                    <View style={styles.buttonContainer}>
                        <ConvertButton onPress={handleConvert} unit={getOppositeUnit(unit)} />
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}
