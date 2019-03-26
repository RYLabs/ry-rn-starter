import { createStackNavigator } from "react-navigation"
import { LoginView, RegisterView } from "../../onboarding"

export const OnboardingNavigator = createStackNavigator({
    Login: { screen: LoginView },
    Register: { screen: RegisterView },
},
{
    initialRouteName: "Login",
})