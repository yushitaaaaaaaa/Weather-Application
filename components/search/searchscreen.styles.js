import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1E272E",  // Dark background
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    contentContainer: { 
        backgroundColor: "#34495E",  // Matching forecast screen box style
        padding: 25,
        borderRadius: 10,
        width: "90%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,  // Shadow for Android
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#EAECEE",
        marginBottom: 15,
        textAlign: "center",
    },
    input: {
        width: "80%",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
        fontSize: 18,
        marginBottom: 15,
        textAlign: "center",
        borderColor: "skyblue",
        borderWidth: 2,
    },
    weatherButton: {
        backgroundColor: "skyblue",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 20,
    },
    weatherButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
    resultText: {
        fontSize: 20,
        color: "skyblue",
        marginTop: 20,
        fontWeight: "bold",
    },
});
