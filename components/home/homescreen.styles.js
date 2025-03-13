import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1E272E",  // Dark theme background
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    contentContainer: { 
        backgroundColor: "#34495E", // Matching forecast screen box style
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
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 15,
        textAlign: "center",
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#EAECEE",
        marginTop: 15,
        textAlign: "center",
    },
    box: {
        width: "80%",
        padding: 15,
        backgroundColor: "skyblue",
        borderRadius: 10,
        marginTop: 5,
        alignItems: "center",
    },
    text: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
    },
});
