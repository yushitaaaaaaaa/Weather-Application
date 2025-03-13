import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1E272E",
        alignItems: "center",
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 15,
        textAlign: "center",
    },
    forecastBox: { 
        backgroundColor: "#34495E",
        padding: 20,
        borderRadius: 10,
        width: "90%",
        alignItems: "center",
        marginTop: 20,
    },
    forecastItem: {  // Styling for each forecast entry
        width: "100%",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#566573",
        alignItems: "center",
    },
    dateText: {  // Date and time styling
        fontSize: 16,
        color: "#EAECEE",
        textAlign: "center",
    },
    temperatureText: {  // Temperature styling (Bold)
        fontSize: 20,
        fontWeight: "bold",
        color: "skyblue",
        textAlign: "center",
        marginTop: 5,
    },
});
