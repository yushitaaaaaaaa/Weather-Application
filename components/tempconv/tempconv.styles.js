import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%', 
  },
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
  boxContainer: { 
    backgroundColor: "rgba(52, 73, 94, 0.85)",
    padding: 25,
    borderRadius: 15,
    width: "95%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,  
    marginVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  detailBox: {
    width: '100%',
    backgroundColor: "rgba(135, 206, 235, 0.25)", 
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
  buttonContainer: {
    marginTop: 15,
    width: "100%",
    alignItems: "center",
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
  unitSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    width: "100%",
  },
  unitSelectorLabel: {
    fontSize: 16,
    color: "#EAECEE",
    marginRight: 10,
  },
  unitSelectorButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "rgba(135, 206, 235, 0.25)",
    borderRadius: 8,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "rgba(135, 206, 235, 0.5)",
  },
  unitSelectorButtonActive: {
    backgroundColor: "skyblue",
  },
  unitSelectorText: {
    fontSize: 16,
    color: "#EAECEE",
    fontWeight: "bold",
  },
  unitSelectorTextActive: {
    color: "#ffffff",
  }
});