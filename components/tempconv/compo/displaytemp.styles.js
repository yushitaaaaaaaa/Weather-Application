import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 15,
        textAlign: "center",
    },
    tempContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    temp: {
        fontSize: 42,
        color: "skyblue",
        fontWeight: "bold",
        textAlign: "center",
        marginLeft: 10,
    }
});