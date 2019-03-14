import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'

interface Props { }
export class LoginView extends Component<Props> {
    state = {
        email: '',
        password: '',
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    label='Email'
                    value={this.state.email}
                    onChangeText={text => this.setState({ text })}
                />
                <TextInput
                    label='Password'
                    value={this.state.password}
                    onChangeText={text => this.setState({ text })}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#FFF',
    },
});