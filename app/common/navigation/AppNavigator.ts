import { createStackNavigator } from "react-navigation"
import { MainTabView } from "../../main"

export const AppNavigator = createStackNavigator({
    Main: { screen: MainTabView },
},
{
    initialRouteName: "Main",
})