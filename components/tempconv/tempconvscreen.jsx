import { useState } from "react";
import { View, ImageBackground, Text, StatusBar, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UNITS, convertTempTo, getOppositeUnit } from "./compo/temperature";
import { Input } from "./compo/input";
import { DisplayTemp } from "./compo/displaytemp";
import { ConvertButton } from "./compo/convertbutton";
import { styles } from "./tempconv.styles";

export default function TempConvScreen() {
    const [inputTemp, setInputTemp] = useState("");
    const [inputUnit, setInputUnit] = useState(UNITS.cel);
    const [convertedTemp, setConvertedTemp] = useState("");
    const [showConverted, setShowConverted] = useState(false);

    const handleInputUnitToggle = () => {
        setInputUnit(getOppositeUnit(inputUnit));
        setShowConverted(false);
    };

    const getTemperatureIcon = () => {
        if (!inputTemp || isNaN(parseFloat(inputTemp))) {
            return <Ionicons name="thermometer-outline" size={80} color="skyblue" />;
        }
        
        const value = parseFloat(inputTemp);
        const celsiusValue = inputUnit === UNITS.cel ? value : convertTempTo(value, UNITS.cel);
        
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
        if (!inputTemp) return; 
        
        const oppositeUnit = getOppositeUnit(inputUnit);
        const converted = convertTempTo(parseFloat(inputTemp), oppositeUnit);
        
        setConvertedTemp(converted);
        setShowConverted(true);
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
                    <View style={styles.unitSelector}>
                        <Text style={styles.unitSelectorLabel}>Select Input Unit:</Text>
                        <TouchableOpacity 
                            style={[
                                styles.unitSelectorButton, 
                                inputUnit === UNITS.cel && styles.unitSelectorButtonActive
                            ]}
                            onPress={() => {
                                if (inputUnit !== UNITS.cel) handleInputUnitToggle();
                            }}
                        >
                            <Text style={[
                                styles.unitSelectorText,
                                inputUnit === UNITS.cel && styles.unitSelectorTextActive
                            ]}>°C</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[
                                styles.unitSelectorButton, 
                                inputUnit === UNITS.farh && styles.unitSelectorButtonActive
                            ]}
                            onPress={() => {
                                if (inputUnit !== UNITS.farh) handleInputUnitToggle();
                            }}
                        >
                            <Text style={[
                                styles.unitSelectorText,
                                inputUnit === UNITS.farh && styles.unitSelectorTextActive
                            ]}>°F</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.inputContainer}>
                        <Input 
                            defaultValue={inputTemp} 
                            onChange={(value) => {
                                setInputTemp(value);
                                setShowConverted(false); 
                            }} 
                            unit={inputUnit} 
                        />
                    </View>
                    
                    <View style={styles.detailBox}>
                        <DisplayTemp 
                            inputTemp={inputTemp}
                            inputUnit={inputUnit}
                            convertedTemp={convertedTemp}
                            showConverted={showConverted}
                        />
                    </View>
                    
                    <View style={styles.buttonContainer}>
                        <ConvertButton onPress={handleConvert} unit={getOppositeUnit(inputUnit)} />
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}