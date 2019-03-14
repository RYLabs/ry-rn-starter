import { createStackNavigator } from "react-navigation"
import { AppNavigator } from "./AppNavigator"
import { LoginView } from "../../onboarding"

export const RootNavigator = createStackNavigator(
  {
    Login: { screen: LoginView },
    App: { screen: AppNavigator },
  },
  {
    initialRouteName: "Login",
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
  },
)
