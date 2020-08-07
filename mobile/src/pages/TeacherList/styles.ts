import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  teacherList: {
    marginTop: -40,
  },
  searchForm: {
    marginBottom: 8,
  },
  label: {
    color: "#d4c2ff",
    fontFamily: "Poppins_400Regular",
  },
  inputGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  inputBlock: {
    width: "48%",
  },

  input: {
    height: 54,
    backgroundColor: "#fff",
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
  },
});

export default styles;
