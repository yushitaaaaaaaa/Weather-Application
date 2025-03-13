import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1E272E",  // Dark background for consistency
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    boxContainer: { 
        backgroundColor: "#34495E",  // Same as forecastBox
        padding: 20,
        borderRadius: 10,
        width: "90%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    inputContainer: {
        marginBottom: 20,
        width: "100%",
        alignItems: "center",
    },
    displayContainer: {
        marginBottom: 20,
        width: "100%",
        alignItems: "center",
    },
    buttonContainer: {
        marginTop: 10,
        width: "100%",
        alignItems: "center",
    }
});
