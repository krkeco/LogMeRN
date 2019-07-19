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
      value: 0,
      prettyDate: '',
      showData: false,
      isDateTimePickerVisible: false,
    }
  }

  componentDidMount(){

    // this.setState({prettyDate: getPrettyDate(this.props.date)});
  }


  render() {

    let showDataView = <AButton
      color={this.props.log.color}
      text="Show Log Data"
      onPress={() => this.setState({showData: !this.state.showData})}/>

    if(this.state.showData){
      showDataView = <View>
      <AButton
      color={this.props.log.color}
      text="Hide Log Data"
      onPress={() => this.setState({showData: !this.state.showData})}/>

        {this.props.log.data.map((data, index) =>{
              return <Text style={{height:25}} key={index} >{data.date} {data.value}</Text>
            })}
      </View>
    }

    let ratingPicker = 
          <Picker
            selectedValue={this.state.value}
            style={{height: 30, width: 75, backgroundColor: this.props.log.color, borderRadius: 5}}
            onValueChange={(itemValue, itemIndex) =>{
                this.setState({value: itemValue});
              }
            }>
            <Picker.Item label="0" value="0" />
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
          </Picker>;
  
    return (
      <View style={{flexDirection: 'column', backgroundColor: '#dcdcdc', margin: 5}} >
        <View >
          
          <View
            style={{height: 50, flex:1, flexDirection:'row'}}>
          
            <Text style={{height: 30, margin: 5}} >{this.props.log.name} {this.state.value}</Text>
            
            <AButton
              color={this.props.log.color}
              onPress={() => {this.props.deleteLog(this.props.index)}}
              text="Delete this Log"
              />

            </View>
          
          <View
            style={{height: 50, flex:1, flexDirection:'row'}}>
            
            <Text>Rating:</Text>
      
            {ratingPicker}

            <Text>{this.props.prettyDate}</Text>
      
            <AButton            
              color={this.props.log.color}
              onPress={() => {this.props.saveLogData(this.props.date, this.state.value, this.props.log)}}
              text="Save this Log"
              />

          </View>

        </View>

          
        {showDataView}

      </View>
    );

  }
}