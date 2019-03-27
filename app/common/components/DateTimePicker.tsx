import React, { Component } from 'react'
import { TouchableOpacity, View, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import DatePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'
import { Text, Icon, TextProps } from 'react-native-elements'
import { theme } from '../theme';

const maximumDate = moment().subtract(8, 'years').toDate();

export interface DateTimePickerProps {
    placeholder?: string;
    value?: Date | void;
    errorMessage?: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
    errorStyle?: TextStyle;
    errorProps?: TextProps;
    onChangeDate?: (date?: Date) => void;
}

export class DateTimePicker extends Component<DateTimePickerProps> {
    state = {
        isDateTimePickerVisible: false,
    };

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })

    _handleDateChange = (date) => {
        this._hideDateTimePicker()

        const { onChangeDate } = this.props
        if (onChangeDate) onChangeDate(date)
    };

    render() {

        const { placeholder, value, style, errorMessage, errorStyle, errorProps } = this.props

        return (
            <View style={[styles.container, style]}>
                <TouchableOpacity onPress={this._showDateTimePicker}>
                    <View style={styles.dropDownContiner}>
                        {value &&
                            <Text style={styles.valueLabel}>{moment(value).format('MM/DD/YY')}</Text>
                        }
                        {!value &&
                            <Text style={styles.label}>{placeholder}</Text>
                        }
                        <Icon name="expand-more" type="material" color="rgba(0,0,0,0.6)" size={40} />
                    </View>
                    {!!errorMessage && (
                        <Text
                            {...errorProps}
                            style={[
                                styles.error,
                                errorStyle && errorStyle,
                            ]}
                        >
                            {errorMessage}
                        </Text>
                    )}
                </TouchableOpacity>
                <DatePicker
                    maximumDate={maximumDate}
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDateChange}
                    onCancel={this._hideDateTimePicker}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        borderRadius: 5,
        paddingVertical: 2,
        paddingHorizontal: 2,
        justifyContent: 'center',
    },
    dropDownContiner: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 5,
        minHeight: 50,
        paddingHorizontal: 4,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        color: '#86939e',
        fontSize: 18,
        flex: 1,
        maxHeight: 30,
    },
    valueLabel: {
        color: 'black',
        fontSize: 18,
        flex: 1,
        maxHeight: 30,
    },
    error: {
        margin: 5,
        fontSize: 12,
        color: theme.colors.error,
    },
})