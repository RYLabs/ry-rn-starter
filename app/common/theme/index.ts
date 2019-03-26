import { observable } from "mobx"
import { FullTheme, Colors } from 'react-native-elements'
import { Platform } from 'react-native'
import { LinkButtonProps } from "../components";

export const primaryColor: string = '#1fbbe1'
export const secondaryColor: string = '#072956'

export interface AppTheme extends FullTheme {
    LinkButton: Partial<LinkButtonProps>
}

export interface AppColors extends Colors {}

export const colors = {
    primary: primaryColor,
    secondary: secondaryColor,
}

export const typography = {
    primary: Platform.select({ ios: "OpenSans-Regular", android: "OpenSans-Regular" }),
    secondary: Platform.select({ ios: "OpenSans-Regular", android: "OpenSans-Regular" }),
    bold: Platform.select({ ios: "OpenSans-Bold", android: "OpenSans-Bold" }),
}

export const theme: AppTheme = {
    colors: colors,
    Input: {
        inputContainerStyle: {
            borderRadius: 5,
            borderBottomWidth: 0,
            backgroundColor: '#fff'
        },
        labelStyle: {
            fontFamily: typography.primary,
        }
    },
    Button: {
        raised: true,
        containerStyle: {
            width: '75%',
        },
        buttonStyle: {
            backgroundColor: primaryColor,
            minHeight: 60,
            borderRadius: 30,
        },
        titleStyle: {
            color: '#fff',
            fontFamily: typography.bold,
            fontSize: 15,
            ...Platform.select({
                ios: {
                    fontWeight: '700',
                    fontStyle: 'normal',
                }
            }),
        }
    },
    Text: {
        h4Style: {
            color: '#fff',
            fontSize: 15,
        },
    },
    LinkButton: {
        containerStyle: {
            margin: 0,
            padding: 0,
        },
        titleStyle: {
            color: colors.primary,
            fontFamily: typography.bold,
            fontSize: 15,
            ...Platform.select({
                ios: {
                    fontWeight: '700',
                    fontStyle: 'normal',
                }
            }),
        }
    }
} as AppTheme

export class ThemeStore  {
    
    @observable colors = colors
    @observable typography = typography
    @observable theme = theme

}