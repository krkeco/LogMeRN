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
import {getPrettyDate} from './Utils.js';

import { faAngleLeft, faBars, faChartBar, faCalendar, faSave, faWindowClose, faPlus } from '@fortawesome/free-solid-svg-icons'


export default class LogItem extends Component<Props> {
 constructor(props) {
    super(props);
    this.state = {
      value: 0,
      note: '',
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
            let mNote = null;
            if(data.note != null){
              mNote = <Text>Note: {data.note}</Text>
            }
              return <View key={index}>
                <Text style={{height:25}}  >{getPrettyDate(data.date)} : Data Value {data.value}</Text>
                {mNote}
              </View>
            })}
      </View>
    }

    return (
      <View style={{flexDirection: 'column', backgroundColor: '#dcdcdc', margin: 5}} >
        <View >
          
          <View
            style={{height: 50, flex:1, flexDirection:'row'}}>
          
            
            <AButton
              color={this.props.log.color}
              onPress={() => {this.props.deleteLog(this.props.index)}}
              icon={faWindowClose}
              />
            <Text style={{height: 30, margin: 5, fontSize:25}} >{this.props.log.name}</Text>

            </View>
      
            <Text>{this.props.prettyDate}</Text>
          
            
            <Text>Numeric Value:</Text>      
             <TextInput
              style={{height: 50, borderColor: 'gray', borderWidth: 1, borderRadius: 5}}
              keyboardType="numeric"
              onChangeText={(text) => this.setState({value: text})}
              value={this.state.value}
            />

            <Text style={{marginTop: 10}} >Note/Text:</Text>
            <TextInput
                style={{height: 50,width: 300,  borderColor: 'gray', borderWidth: 1, borderRadius: 5}}
                onChangeText={(note) => this.setState({note})}
                
                value={this.state.note}
              />

            <AButton            
              color={this.props.log.color}
              onPress={() => {this.props.saveLogData(this.props.date, this.state.value, this.props.log)}}
              text="Save this Log"
              />

        </View>

          
        {showDataView}

      </View>
    );

  }
}