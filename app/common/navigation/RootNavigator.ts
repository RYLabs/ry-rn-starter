import { createStackNavigator } from "react-navigation"
import { AppNavigator } from "./AppNavigator"
import { OnboardingNavigator } from "./OnboardingNavigator"

export const RootNavigator = createStackNavigator(
  {
    OnBoarding: { screen: OnboardingNavigator },
    App: { screen: AppNavigator },
  },
  {
    initialRouteName: "OnBoarding",
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
  },
)
