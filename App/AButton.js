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

// import { faAngleLeft, faBars, faBarChart, faCalendar, faSave, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'


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

    let icon = null;
    if(this.props.icon != undefined){
      icon = <FontAwesomeIcon size= {25} icon={ this.props.icon } />
    }
  
    return (
         <TouchableOpacity 
          style={{}}
          onPress={() => this.onPress()}>
      <View 
      style={{flexDirection: 'row', maxWidth: 150, height: 35, margin:5, padding:5, backgroundColor: color, borderRadius: 5}}>
          {icon}
          <Text style={{alignSelf: 'center'}}>{this.props.text}</Text>
      </View>
        </TouchableOpacity>
    );

  }
}