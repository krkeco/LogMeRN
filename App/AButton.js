import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Button,
  TextInput,
  StatusBar,
} from 'react-native';

export default class AButton extends Component<Props> {
 constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
  
    return (
      <View>
         <TouchableOpacity 
          style={{marginTop:10}}
          onPress={() => this.props.onPress()}>
          <Text>{this.props.text}</Text>
        </TouchableOpacity>
      </View>
    );

  }
}