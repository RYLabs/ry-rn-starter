import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { inject, observer } from 'mobx-react';
import { AuthStore } from '../../common/data/stores'
import { StackActions, NavigationActions } from 'react-navigation';

interface Props { 
    authStore: AuthStore,
    navigation: any, // TODO: Convert to NavigationStore
}

@inject("authStore")
@observer
export class LoginView extends Component<Props> {

    componentWillUnmount() {
        this.props.authStore.reset();
    }

    handleSignIn = async () => {
        const { navigation, authStore } = this.props
        await authStore.login()
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'App' })],
        });

        navigation.dispatch(resetAction);
    }

    render() {
        const { authStore } = this.props
        const { values, errors, inProgress } = authStore;

        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <TextInput
                        label='Email'
                        value={values.email}
                        onChangeText={text => authStore.setEmail(text)}
                    />
                    <TextInput
                        label='Password'
                        value={values.password}
                        onChangeText={text => authStore.setPassword(text)}
                    />
                    <Button mode="outlined" onPress={this.handleSignIn}>
                        Sign In
                </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    formContainer: {
        width: '100%',
        height: 'auto'
    },
});