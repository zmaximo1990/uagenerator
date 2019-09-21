import { NavigationProp } from "react-navigation-stack/lib/typescript/types";
import { ViewStyle } from "react-native";

export interface ApplicationState {
  // TODO: Screens states here.
}

export interface BaseState {
  navigation?: NavigationProp;
}

export interface BaseStyle {
  container: ViewStyle;
  header: ViewStyle;
  section: ViewStyle;
}
