import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

type Props = {};
export default class Menu extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity
        style={{ position: 'absolute', top: 12, left: 12, zIndex: 20 }}
        onPress={this.props.goBack}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </TouchableOpacity>
    );
  }
}
