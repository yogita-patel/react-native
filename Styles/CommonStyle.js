import { StyleSheet } from "react-native";
import Colors from "../Constants/Colors";

//theme color #01a3a4

const styles = StyleSheet.create({
  fullScreenCenterItemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  size20text: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  logoImage: {
    resizeMode: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  coloredLogo: {
    width: 60,
    height: 60,
  },
  appnametext: {
    fontSize: 16,
    color: Colors.commonblack,
    fontWeight: "bold",
  },
  commonMarging10: {
    marginTop: 10,
  },

  input: {
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 8,
    padding: 20,
    fontSize: 12,
  },
  label: {
    padding: 5,
    fontSize: 14,
    fontWeight: "500",
  },
  button: {
    marginBottom: 20,
    marginTop: 20,
    width: 100,
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: Colors.primary,
  },
  buttonText: {
    padding: 10,
    fontSize: 14,
    color: Colors.commonwhite,
    fontWeight: "500",
  },
  linkText: {
    textAlign: "center",
    color: Colors.primary,
    textDecorationLine: "underline",
  },
  button: {
    width: "90%",
    height: 60,
    backgroundColor: "#01a3a4",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1, // Takes full screen height
    justifyContent: "center", // Centers vertically
    alignItems: "center", // Centers horizontally
    backgroundColor: "#f8f9fa", // Optional background color
  },
});
export default styles;
