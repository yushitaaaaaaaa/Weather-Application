import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#ffffff",
        height: 50,
        width: 200,
        borderRadius: 10,
        marginRight: 10,
        borderWidth: 2,
        borderColor: "skyblue",  
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        paddingHorizontal: 10,
    },
    inputIcon: {
        marginRight: 5,
    },
    input: {
        flex: 1,
        fontSize: 20,
        color: "#34495E",
        height: '100%',
    },
    unitText: {
        fontSize: 24,
        color: "#EAECEE",  
        fontWeight: "bold",
    }
});