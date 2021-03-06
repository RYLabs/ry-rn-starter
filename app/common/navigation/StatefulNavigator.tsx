import * as React from "react"
import { inject, observer } from "mobx-react"
// @ts-ignore: until they update @type/react-navigation
import { getNavigation, NavigationScreenProp, NavigationState } from "react-navigation"
import { RootNavigator } from "./RootNavigator"
import { NavigationStore } from "./NavigationStore"

interface StatefulNavigatorProps {
  navigationStore?: NavigationStore
}

@inject("navigationStore")
@observer
export class StatefulNavigator extends React.Component<StatefulNavigatorProps, {}> {
  // TODO: FIXME
    // @ts-ignore
  currentNavProp: NavigationScreenProp<NavigationState>

  getCurrentNavigation = () => {
    return this.currentNavProp
  }

  render() {
    // grab our state & dispatch from our navigation store
    // TODO: FIXME
    // @ts-ignore
    const { state, dispatch, actionSubscribers } = this.props.navigationStore

    // create a custom navigation implementation
    this.currentNavProp = getNavigation(
      RootNavigator.router,
      state,
      dispatch,
      actionSubscribers(),
      {},
      this.getCurrentNavigation,
    )

    return <RootNavigator navigation={this.currentNavProp} />
  }
}
