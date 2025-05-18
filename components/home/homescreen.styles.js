import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%', 
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(30, 39, 46, 0.7)', 
        borderRadius: 10,
        padding: 20,
        marginTop: 150,
    },
    loadingText: {
        color: '#fff',
        marginTop: 10,
        fontSize: 16,
    },
    contentContainer: { 
        backgroundColor: "rgba(52, 73, 94, 0.85)", // Semi-transparent box
        padding: 25,
        borderRadius: 15,
        width: "95%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,  // Shadow for Android
        marginVertical: 20,
    },
    heading: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 15,
        textAlign: "center",
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    locationText: {
        fontSize: 18,
        color: "#EAECEE",
        marginLeft: 5,
        fontWeight: "500",
    },
    weatherIconContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    weatherCondition: {
        fontSize: 22,
        color: "#fff",
        fontWeight: "bold",
        marginTop: 5,
    },
    detailsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
    },
    detailBox: {
        width: '47%',  // Two items per row
        backgroundColor: "rgba(135, 206, 235, 0.25)",  // Lighter skyblue with transparency
        padding: 15,
        borderRadius: 12,
        marginVertical: 8,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    detailLabel: {
        fontSize: 16,
        color: "#EAECEE",
        marginTop: 5,
    },
    detailValue: {
        fontSize: 20,
        color: "skyblue",
        fontWeight: "bold",
        marginTop: 5,
    },
});