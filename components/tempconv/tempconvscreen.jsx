import { useState } from "react";
import { View } from "react-native";
import { UNITS, convertTempTo, getOppositeUnit } from "../tempconv/compo/temperature";
import { Input } from "./compo/input";
import { DisplayTemp } from "./compo/displaytemp";
import { ConvertButton } from "./compo/convertbutton";
import { styles } from "./tempconv.styles";

export default function TempConvScreen() {
    const [temp, setTemp] = useState("");
    const [unit, setUnit] = useState(UNITS.cel);

    const handleConvert = () => {
        if (!temp) return; 
        const newUnit = getOppositeUnit(unit);
        setTemp(convertTempTo(parseFloat(temp), newUnit)); 
        setUnit(newUnit);
    };

    return (
        <View style={styles.container}>
            <View style={styles.boxContainer}> {/* Everything in a single styled box */}
                <View style={styles.inputContainer}>
                    <Input defaultValue={temp} onChange={setTemp} unit={unit} />
                </View>
                <View style={styles.displayContainer}>
                    <DisplayTemp temp={temp} unit={unit} />
                </View>
                <View style={styles.buttonContainer}>
                    <ConvertButton onPress={handleConvert} unit={getOppositeUnit(unit)} />
                </View>
            </View>
        </View>
    );
    
}
