import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
} from 'react-native';

import { faQuestion } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Button from './Button';
import { TriangleColorPicker } from 'react-native-color-picker';

export default class ColorPicker extends Component<Props> {
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
    let helperView = (
      <Button
        color={this.props.color}
        icon={faQuestion}
        onPress={() => this.setState({ showData: !this.state.showData })}
      />
    );

    if (this.state.showData) {
      helperView = (
        <View>
          <Button
            color={this.props.color}
            icon={faQuestion}
            onPress={() => this.setState({ showData: !this.state.showData })}
          />

          <Text>1. Select a color on the ring of colors</Text>
          <Text>2. Select a shade in the triangle palette</Text>
          <Text>3. Select the new color on the right of bar</Text>
          <Text>4. Select Save and Close</Text>
        </View>
      );
    }

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.viewColorModal}
        onRequestClose={() => {
          this.props.toggle();
        }}
      >
        <View style={{ marginTop: 22 }}>
          <View style={{ height: '100%' }}>
            <TriangleColorPicker
              style={{ flex: 1, backgroundColor: '#212021' }}
              defaultColor={this.props.color}
              oldColor={this.props.color}
              color={this.state.color}
              onColorChange={this.onColorChange}
              onColorSelected={(color) => this.props.onColorChange(color)}
              onOldColorSelected={(color) => this.props.onColorChange(color)}
            />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              {helperView}

              <Button
                color={this.props.floatColor}
                onPress={() => {
                  this.props.toggle();
                  this.props.save();
                }}
                text="Save and Close"
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
