import React, { Component } from 'react'
import {
    View,
    ImageBackground,
    Dimensions,
    StyleSheet,
    Alert
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { Input, Button, Text } from 'react-native-elements'
import { inject, observer } from 'mobx-react'
import { DateTimePicker } from '../../common/components/DateTimePicker'
import { AuthStore } from '../../common/data/stores'
import { ThemeStore } from '../../common/theme'

import BackgroundImage from '../assets/images/background.png'
import { NavigationActions, StackActions } from 'react-navigation';


const { width, height } = Dimensions.get('window')

interface RegisterViewProps {
    authStore: AuthStore,
    themeStore: ThemeStore,
    navigation: any,
}

@inject("authStore", "themeStore")
@observer
export class RegisterView extends Component<RegisterViewProps> {

    componentWillUnmount() {
        this.props.authStore.reset();
    }

    handleSignUp = async () => {
        const { navigation, authStore } = this.props

        try {
            await authStore.signUp()
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'App' })],
            });
            navigation.dispatch(resetAction);
        } catch (e) {
            Alert.alert(e.title, e.message)
        }
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
                    style={styles.scrollViewContainer}>
                    <View style={styles.formContainer}>
                        <Input
                            placeholder='First Name'
                            value={values.firstName}
                            containerStyle={styles.formInput}
                            onChangeText={text => authStore.setFirstName(text)}
                        />
                        <Input
                            placeholder='Last Name'
                            value={values.lastName}
                            containerStyle={styles.formInput}
                            onChangeText={text => authStore.setLastName(text)}
                        />
                        <Input
                            placeholder='Email'
                            value={values.email}
                            containerStyle={styles.formInput}
                            onChangeText={text => authStore.setEmail(text)}
                        />
                        <View style={styles.formInputContainer}>
                            <Input
                                placeholder='Password'
                                value={values.password}
                                secureTextEntry={true}
                                onChangeText={text => authStore.setPassword(text)}
                            />
                            <Text style={[theme.Label.style, styles.formLabel]}>Password must me at least 8 characters</Text>
                        </View>
                        <View style={styles.formInputContainer}>
                            <DateTimePicker placeholder="Date of Birth"
                                value={values.dob}
                                onChangeDate={date => authStore.setDob(date)}
                            />
                            <Text style={[theme.Label.style, styles.formLabel]}>You must me 18 years or older to use OTHRsource</Text>
                        </View>
                        <Button title="Submit"
                            containerStyle={styles.logInButtonContainer}
                            onPress={this.handleSignUp} />
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
        backgroundColor: '#FFF',
    },
    scrollViewContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    formContainer: {
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 40,
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formLabel: {
        paddingHorizontal: 10,
        marginTop: 10,
    },
    formInputContainer: {
        width: '100%',
        marginBottom: 40,
    },
    formInput: {
        marginBottom: 40,
    },
    logInButtonContainer: {
        marginTop: 20,
        width: '75%',
    },
    overlay: {
        position: 'absolute',
        opacity: 0.8,
        width: width,
        height: height,
    },
});