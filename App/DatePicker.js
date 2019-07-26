import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {faCalendar} from '@fortawesome/free-solid-svg-icons'

import DateTimePicker from "react-native-modal-datetime-picker";

import AButton from './AButton.js';

type Props = {};

export default class DatePicker extends Component<Props> {
 constructor(props) {
    super(props);
    this.state = {
    }
  }


  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
 
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
 
  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    
    this.props.returnDate(date.getTime());
    
    this.hideDateTimePicker();
  };


  render() {
    let text = "";
    if(this.props.text != null){
      text = this.props.text;
    }

    return (
    <View>     
      <AButton 
      text={text}
      icon={faCalendar}
       onPress={this.showDateTimePicker} />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
      />
    </View>
    );
  }
}