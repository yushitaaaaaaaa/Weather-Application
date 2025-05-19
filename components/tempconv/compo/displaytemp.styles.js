import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
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
    },
    convertedContainer: {
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: "rgba(135, 206, 235, 0.5)",
        width: '100%',
        alignItems: 'center',
    },
    convertedLabel: {
        fontSize: 16,
        color: "#EAECEE",
        marginBottom: 10,
    }
});