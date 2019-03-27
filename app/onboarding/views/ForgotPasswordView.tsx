import React, { Component } from 'react'
import {
    View,
    ImageBackground,
    Dimensions,
    StyleSheet,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { inject, observer } from 'mobx-react'
import { AuthStore } from '../../common/data/stores'
import { ThemeStore } from '../../common/theme'

import BackgroundImage from '../assets/images/background.png'
import { Text } from 'react-native-elements';


const { width, height } = Dimensions.get('window')

interface ForgotPasswordViewProps {
    authStore: AuthStore,
    themeStore: ThemeStore,
    navigation: any,
}

@inject("authStore", "themeStore")
@observer
export class ForgotPasswordView extends Component<ForgotPasswordViewProps> {

    render() {
        const { themeStore } = this.props
        const { colors: { secondary } } = themeStore

        return (
            <ImageBackground source={BackgroundImage} style={styles.backgroundContainer}>
                <View style={[styles.overlay, { backgroundColor: secondary }]} />
                <KeyboardAwareScrollView keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps="always"
                    style={styles.scrollViewContainer}>
                    <Text>Forgot Password</Text>
                </KeyboardAwareScrollView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    scrollViewContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        opacity: 0.8,
        width: width,
        height: height,
    },
});