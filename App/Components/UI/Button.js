import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default class CustomButton extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPress = () => {
    if (this.props.onPress != undefined) {
      this.props.onPress();
    }
  };

  render() {
    let color = '#bbdefb';
    if (this.props.color != undefined) {
      color = this.props.color;
    }

    let icon = null;
    if (this.props.icon != undefined) {
      icon = <FontAwesomeIcon size={25} icon={this.props.icon} />;
    }

    return (
      <TouchableOpacity style={{}} onPress={() => this.onPress()}>
        <View
          style={{
            flexDirection: 'row',
            maxWidth: 150,
            height: 35,
            margin: 5,
            padding: 5,
            backgroundColor: color,
            borderRadius: 5,
          }}
        >
          {icon}
          <Text style={{ alignSelf: 'center' }}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
