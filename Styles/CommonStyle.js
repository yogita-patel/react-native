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
    color: Colors.commonwhite,
  },
  size10text: {
    fontSize: 10,
    fontWeight: "bold",
    color: Colors.commonwhite,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.primary,
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
  commonMarging20: {
    marginTop: 20,
  },
  commonLeftMargine10: {
    marginLeft: 10,
  },

  commonmarginVertical10: {
    marginVertical: 10,
  },
  commonmarginHorizontol10: {
    marginHorizontal: 10,
  },
  input: {
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 8,
    padding: 20,
    fontSize: 12,
  },
  smallInput: {
    borderColor: Colors.primary,
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 8,
    fontSize: 10,
  },
  errorText: {
    color: "red",
    marginTop: 4,
    fontSize: 12,
    marginLeft: 5,
  },
  passwordInput: {
    height: 60,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 50,
    fontSize: 12,
  },
  label: {
    padding: 5,
    fontSize: 14,
    fontWeight: "500",
  },
  smallButton: {
    marginBottom: 20,
    marginTop: 20,
    width: 120,
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
    // alignContent: "space-between",
    // padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#f8f9fa",
  },
  passwordContainer: {
    width: "100%",
    marginVertical: 10,
  },

  eyeIcon: {
    position: "absolute",
    right: 16,
    top: 13,
  },

  modalbg: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  loaderbg: {
    padding: 20,
    backgroundColor: Colors.commonwhite,
    borderRadius: 10,
    elevation: 5,
  },
  rightText: {
    fontSize: 18,
    textAlign: "right",
    color: "black",
  },
  //confrimation css
  confrimationOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  confrimationbuttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  Confrimationbutton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  cancelText: {
    color: Colors.commonRed,
    fontSize: 16,
  },
  confirmText: {
    color: Colors.commonwhite,
    fontSize: 16,
  },
  confrimationtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  //app bar style
  appbarStyle: {
    backgroundColor: Colors.primary,
  },
  appbarTintColor: Colors.commonwhite,
  appbarTitleStyle: {
    fontWeight: "bold",
    alignSelf: "center",
    color: Colors.commonwhite,
  },
  //display info style
  infoContainer: {
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    padding: 8,
    marginTop: 10,
    width: "100%",
    alignSelf: "center",
  },
  image: {
    backgroundColor: Colors.primary,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 3,
  },
  infoHeading1: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.commonblack,
  },
  infoValue1: {
    fontSize: 18,
    fontWeight: 500,
    color: Colors.commonblack,
    flexWrap: "wrap",
    flexShrink: 1,
  },
  //divider

  divider: {
    borderWidth: 0.4,
    borderColor: Colors.primary,
    marginVertical: 15,
  },

  //card
  card: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  actions: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    zIndex: 1,
    alignContent: "flex-end",
  },

  //search field

  searchContainer: {
    flexDirection: "row",
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    marginVertical: 8,
  },

  searchInput: {
    flex: 1,
    height: 40,
    color: "grey",
  },

  //small button
  smallButtonShadow: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    // backgroundColor: Colors.commonGreen, // green shade
    borderRadius: 6,
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  smallButtonText: {
    color: Colors.commonwhite,
    fontSize: 12,
    fontWeight: "600",
  },

  //small date/time picker
  smalldatePickerContainer: {
    flexDirection: "row",
    // flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    // width: "50%",
  },
  searchDateContriner: {
    flexDirection: "row",
    alignItems: "center",
    // padding: 10,
    justifyContent: "space-between",
  },

  //Month year picker style
  monthModalBackground: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center",
  },
  monthPickerContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    width: "90%",
  },
  monthPickerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  pickerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    maxHeight: 200,
  },
  pickerItem: {
    padding: 12,
    alignItems: "center",
  },
  selectedItem: {
    backgroundColor: "#dceeff",
    borderRadius: 10,
  },
  pickerAction: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pickerCancel: { color: Colors.commonRed, fontWeight: "500" },
  pickerConfrim: { color: Colors.commonGreen, fontWeight: "500" },

  //DashBoard citizen
  tipCard: {
    padding: 12,
    margin: 4,
    borderRadius: 10,
  },
  tipTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
  },
});
export default styles;
