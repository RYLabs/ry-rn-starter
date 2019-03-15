import React, { Component } from 'react';
// @ts-ignore
import { createAppContainer } from "react-navigation"
import { RootStore, AuthStore } from "./common/data/stores"
import { RootNavigator } from "./common/navigation/RootNavigator"
import { Provider as StoreProvider, observer } from "mobx-react"
import SplashScreen from 'react-native-splash-screen'

const AppContainer = createAppContainer(RootNavigator);

interface Props {}
interface AppState {
  rootStore?: RootStore
}

@observer
export default class App extends Component<Props, AppState> {

  /**
   * When the component is mounted. This happens asynchronously and simply
   * re-renders when we're good to go.
   */
  async componentDidMount() {
    SplashScreen.hide()
    // this.setState({
    //   rootStore: await setupRootStore(),
    // })
  }

  /**
   * Are we allowed to exit the app?  This is called when the back button
   * is pressed on android.
   *
   * @param routeName The currently active route name.
   */
  canExit(routeName: string) {
    return false
  }

  render() {
    const rootStore = this.state && this.state.rootStore

    // Before we show the app, we have to wait for our state to be ready.
    // In the meantime, don't render anything. This will be the background
    // color set in native by rootView's background color.
    //
    // This step should be completely covered over by the splash screen though.
    //
    // You're welcome to swap in your own component to render if your boot up
    // sequence is too slow though.
    
    // if (!rootStore) {
    //   return null
    // }

    // otherwise, we're ready to render the app

    // --- am: begin list of stores ---
    const otherStores = {
      authStore: new AuthStore()
    }
    // --- am: end list of stores ---

    return (
      <StoreProvider rootStore={rootStore} {...otherStores}>
          <AppContainer />
      </StoreProvider>
    
      // <Provider rootStore={rootStore} navigationStore={rootStore.navigationStore} {...otherStores}>
      //   <BackButtonHandler canExit={this.canExit}>
      //     <StatefulNavigator />
      //   </BackButtonHandler>
      // </Provider>
    )
  }
}