import React, { Component }  from "react"
import { 
    TextStyle, 
    ViewStyle,
    TouchableOpacity, 
    View,
    Text,
    TouchableOpacityProps
} from "react-native"
import { theme } from '../theme'
import { observer } from "mobx-react";

export interface LinkButtonProps extends TouchableOpacityProps {
    title: string;
    containerStyle?: ViewStyle;
    titleStyle?: TextStyle;
    onPress: () => void;
}

@observer
export class LinkButton extends Component<LinkButtonProps> {

    render() {
        const {
            title,
            containerStyle,
            titleStyle,
            onPress,
        } = this.props

        return (
            <TouchableOpacity onPress={onPress}>
                <View style={[theme.LinkButton.containerStyle, containerStyle]}>
                    <Text style={[theme.LinkButton.titleStyle, titleStyle]}>{title}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}