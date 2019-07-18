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
      <View 
      style={{ maxWidth: 150, height: 35, margin:5, padding:5, backgroundColor: '#5f9ea0', borderRadius: 5}}>
         <TouchableOpacity 
          style={{}}
          onPress={() => this.props.onPress()}>
          <Text>{this.props.text}</Text>
        </TouchableOpacity>
      </View>
    );

  }
}