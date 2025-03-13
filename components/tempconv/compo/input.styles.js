import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    input: {
        backgroundColor: "#ffffff",
        height: 50,
        width: 200,
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 20,
        marginRight: 10,
        borderWidth: 2,
        borderColor: "skyblue",  
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    unitText: {
        fontSize: 20,
        color: "#EAECEE",  
        fontWeight: "bold",
        textTransform: "uppercase",
    }
});
