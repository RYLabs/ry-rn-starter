import { createStackNavigator } from "react-navigation"
import { LoginView, RegisterView } from "../../onboarding"
import { typography } from '../theme'

export const OnboardingNavigator = createStackNavigator({
    Login: { 
        screen: LoginView,
        navigationOptions: {
            headerMode: 'none',
        }
    },
    Register: { 
        screen: RegisterView,
        navigationOptions: {
            title: 'Sign Up',
        }
    },
},
{
    initialRouteName: "Login",
    //@ts-ignore
    defaultNavigationOptions: {
        headerTransparent: true,
        headerLayoutPreset: 'center',
        headerTintColor: '#fff',
        headerTitleStyle: {
            flexGrow: 1,
            textAlign:'center',
            fontFamily: typography.primary,
            fontWeight: undefined,
            fontStyle: undefined,
            fontSize: 24,
        },
        headerTitleContainerStyle: {
            marginLeft: -60,
            alignItems: 'center',
            justifyContent: 'center',
        }
    },
})