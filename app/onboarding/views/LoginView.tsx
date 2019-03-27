import React, { Component } from 'react'
import { 
    View, 
    ImageBackground, 
    Image,
    Dimensions, 
    StyleSheet, 
    Alert
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { Input, Button, Text } from 'react-native-elements'
import { inject, observer } from 'mobx-react';
import { AuthStore } from '../../common/data/stores'
import { ThemeStore } from '../../common/theme';
import { LinkButton } from '../../common/components'
// import { GenericApiError } from '../../common/services/api/APIProblem'

import BackgroundImage from '../assets/images/background.png'
import HeaderImage from '../assets/images/building5.png'
import LogoImage from '../assets/images/logo_white.png'
import { NavigationActions, StackActions } from 'react-navigation';


const { width, height } = Dimensions.get('window')

interface LoginViewProps {
    authStore: AuthStore,
    themeStore: ThemeStore,
    navigation: any, // TODO: Convert to NavigationStore
}

@inject("authStore", "themeStore")
@observer
export class LoginView extends Component<LoginViewProps> {

    componentWillUnmount() {
        this.props.authStore.reset();
    }

    _handleSignIn = async () => {
        const { navigation, authStore } = this.props

        try {
            await authStore.login()
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'App' })],
            });
            navigation.dispatch(resetAction);
        } catch(e) {
            Alert.alert(e.title, e.message)
        }
    }

    _hanldeSignUp = () => {
        this.props.navigation.navigate('Register')
    }

    render() {
        const { authStore, themeStore } = this.props
        const { values, errors, inProgress } = authStore;
        const { colors: { secondary }, theme } = themeStore

        return (
            <ImageBackground source={BackgroundImage} style={styles.backgroundContainer}>
                <View style={[styles.overlay, { backgroundColor: secondary }]} />
                <KeyboardAwareScrollView keyboardDismissMode="interactive"
                                         keyboardShouldPersistTaps="always" 
                                         style={ styles.scrollViewContainer }>
                        <View style={styles.headerContainer}>
                            <Image source={HeaderImage} style={styles.headerImage} resizeMode="contain" />
                            <Image source={LogoImage} style={styles.logoImage} resizeMode="contain" />
                        </View>
                        <View style={styles.formContainer}>
                            <Text style={[theme.Label.style, styles.formLabel]}>Fan - Fueled Merchandising</Text>
                            <Input
                                placeholder='Email'
                                value={values.email}
                                errorMessage={errors.email}
                                containerStyle={StyleSheet.flatten([
                                    styles.formInput,
                                    { backgroundColor: errors.email ? theme.colors.error : 'transparent' }
                                ])}
                                onChangeText={text => authStore.setEmail(text)}
                                onBlur={() => authStore.validateEmail()}
                            />
                            <Input
                                placeholder='Password'
                                value={values.password}
                                secureTextEntry={true}
                                errorMessage={errors.password}
                                containerStyle={StyleSheet.flatten([
                                    styles.formInput,
                                    { backgroundColor: errors.email ? theme.colors.error : 'transparent' }
                                ])}
                                onChangeText={text => authStore.setPassword(text)}
                                onBlur={() => authStore.validatePassword()}
                            />
                            <Button title="Log In"
                                containerStyle={styles.logInButtonContainer}
                                onPress={this._handleSignIn} />
                        </View>
                        <View style={styles.footerContainer}>
                            <LinkButton title="Sign Up" containerStyle={styles.linkButton} onPress={this._hanldeSignUp} />
                            <LinkButton title="Forgot Password?" onPress={() => { }} />
                        </View>
                    </KeyboardAwareScrollView>
                </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ff0000',
    },
    scrollViewContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    formContainer: {
        paddingTop: 20,
        paddingBottom: 40,
        paddingHorizontal: 40,
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formLabel: {
        marginBottom: 10,
    },
    formInput: {
        marginBottom: 40,
    },
    logInButtonContainer: {
        marginTop: 40,
        width: '75%',
    },
    overlay: {
        position: 'absolute',
        opacity: 0.8,
        width: width,
        height: height,
    },
    headerContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',  
    },
    headerImage: {
        width: 152,
        height: 189,
    },
    logoImage: {
        width: 285,
        height: 54,
    },
    footerContainer: {
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    linkButton: {
        marginRight: 30,
    },
});