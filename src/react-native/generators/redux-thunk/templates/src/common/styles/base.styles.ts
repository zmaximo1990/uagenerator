import * as buttons from "./buttons.styles";
import * as colors from "./colors.styles";
import * as spacing from "./spacing.styles";
import * as typography from "./typography.styles";
import { StyleSheet } from "react-native";
import { BaseStyle } from "../common.types";

export const styles = StyleSheet.create<BaseStyle>({
  container: {
    alignItems: "center",
    flex: 1,
  },
  header: {
    backgroundColor: colors.palette.primary,
  },
  section: {
    backgroundColor: colors.palette.secondary,
  },
});
