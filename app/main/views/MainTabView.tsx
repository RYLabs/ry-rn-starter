import React, { Component } from 'react'
import { Text } from 'react-native'
import { Card, Button } from 'react-native-elements'
import { inject, observer } from 'mobx-react';
import { AuthStore } from '../../common/data/stores'
import { StackActions, NavigationActions } from 'react-navigation';

interface Props {
    authStore: AuthStore,
    navigation: any, // TODO: Convert to NavigationStore
}

@inject("authStore")
@observer
export class MainTabView extends Component<Props> {

    handleLogout = async() => {
        const { navigation, authStore } = this.props
        await authStore.logout()
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })],
        });

        navigation.dispatch(resetAction);
    }

    render() {
        return (
            <Card
                title='MAIN VIEW'>
                <Text style={{ marginBottom: 10 }}>
                    This is the main view.
                </Text>
                <Button title='LOGOUT' onPress={this.handleLogout} />
            </Card>
        )
    }
}