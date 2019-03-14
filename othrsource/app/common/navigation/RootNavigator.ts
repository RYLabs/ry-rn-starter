import { createStackNavigator } from "react-navigation"
import { AppNavigator } from "./AppNavigator"

export const RootNavigator = createStackNavigator(
  {
    appStack: { screen: AppNavigator },
  },
  {
    // headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
  },
)
