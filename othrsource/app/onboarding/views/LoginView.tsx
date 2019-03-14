import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

interface Props { }
export default class LoginView extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Text>Login View</Text>
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
});