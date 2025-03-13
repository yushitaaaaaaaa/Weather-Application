import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    button: {
        backgroundColor: "skyblue",  // Sky Blue (Similar to forecast's temperature)
        justifyContent: "center",
        alignItems: "center",
        width: 180, 
        padding: 15, 
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#ffffff",
        textTransform: "uppercase",
        textAlign: "center",
    }
});
