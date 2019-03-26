import React, { Component } from 'react'
import { TouchableOpacity, View, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import DatePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'
import { Text } from 'react-native-elements';

export interface DateTimePickerProps {
    placeholder?: string;
    value?: Date | void;
    style?: ViewStyle;
    textStyle?: TextStyle;
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

        const { placeholder, value, } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={this._showDateTimePicker}>
                    <View style={styles.dropDownContiner}>
                        {value &&
                            <Text>{moment(value).format('MM/DD/YY')}</Text>
                        }
                        {!value &&
                            <Text>{placeholder}</Text>
                        }
                    </View>
                </TouchableOpacity>
                <DatePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDateChange}
                    onCancel={this._hideDateTimePicker}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    dropDownContiner: {
        flex:1,
        flexDirection: 'column',
        borderRadius: 30,
        height: 60,
    }
})