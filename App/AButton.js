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

  onPress = () => {
    if(this.props.onPress != undefined){
      this.props.onPress();
    }
  }

  render() {
    let color = '#5f9ea0';
    if(this.props.color != undefined){
      color = this.props.color;
    }
  
    return (
      <View 
      style={{ maxWidth: 150, height: 35, margin:5, padding:5, backgroundColor: color, borderRadius: 5}}>
         <TouchableOpacity 
          style={{}}
          onPress={() => this.onPress()}>
          <Text>{this.props.text}</Text>
        </TouchableOpacity>
      </View>
    );

  }
}