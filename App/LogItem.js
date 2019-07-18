import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Button,
  TextInput,
  Picker,
  StatusBar,
} from 'react-native';

import AButton from './AButton.js';

export default class LogItem extends Component<Props> {
 constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {
  
    return (
      <View style={{height:50, margin:5}} >
        <View
          style={{flex:1, flexDirection:'row'}}>
          
          <TouchableOpacity 
            onPress={() => this.props.selectLog(this.props.log)} >
            
            <Text style={{height:50, width: 200}} >log {this.props.log.name}</Text>
          </TouchableOpacity>
           
          <Picker
            selectedValue={this.state.language}
            style={{height: 50, width: 100}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({language: itemValue})
            }>
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
          </Picker>

          <AButton
            onPress={() => {this.props.deleteLog(this.props.index)}}
            text="Delete this Log"
            />

        </View>
      </View>
    );

  }
}