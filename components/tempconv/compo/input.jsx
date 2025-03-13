// import { View, TextInput, Text } from "react-native";
// import { styles } from "./input.styles";

// export function Input({ defaultValue = "", onChange, unit }) { // FIXED: Added defaultValue fallback
//     return (
//         <View style={styles.root}>
//             <TextInput
//                 style={styles.input}
//                 maxLength={4}
//                 keyboardType="numeric"
//                 placeholder="Enter temperature"
//                 defaultValue={defaultValue.toString()} // FIXED: Ensures defaultValue is always a string
//                 onChangeText={(text) => {
//                     onChange(text);
//                 }}
//             />
//             <Text style={styles.unitText}>{unit}</Text>
//         </View>
//     );
// }
import { View, TextInput, Text } from "react-native";
import { styles } from "./input.styles";

export function Input({ defaultValue = "", onChange, unit }) {
    return (
        <View style={styles.root}>
            <TextInput
                style={styles.input}
                maxLength={4}
                keyboardType="numeric"
                placeholder="Enter temperature"
                value={defaultValue.toString()} // ✅ Use value instead of defaultValue
                onChangeText={(text) => {
                    const cleanedText = text.replace(/[^0-9.]/g, ""); // ✅ Prevents non-numeric input
                    onChange(cleanedText);
                }}
            />
            <Text style={styles.unitText}>{unit || "°C"}</Text> {/* ✅ Prevents undefined unit */}
        </View>
    );
}
