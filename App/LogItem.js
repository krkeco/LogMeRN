import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Button,
  TextInput,
  Modal,
  Picker,
  StatusBar,
} from 'react-native';

import AButton from './AButton.js';
import {getPrettyDate} from './Utils.js';



import { faAngleLeft, faPalette, faBars, faChartBar, faCalendar, faSave, faWindowClose, faPlus } from '@fortawesome/free-solid-svg-icons'
import ColorPicker from './ColorPicker'

export default class LogItem extends Component<Props> {
 constructor(props) {
    super(props);
    this.state = {
      value: 0,
      note: '',
      prettyDate: '',
      showData: false,
      isDateTimePickerVisible: false,
      viewColorModal: false,
      color: '#fff',
      floatColor: '#fff',
    }
  }


  componentDidMount(){
    // alert('lets check date')
   // this.checkInputData();
  }

  checkInputData = () => {
     Object.keys(this.props.log.values).map((value, index) =>{
      // alert('index'+index+' '+value+' '+this.props.prettyDate)
      if(value == this.props.prettyDate){
        // alert('this is a repeat date'+index+" "+JSON.stringify(this.props.log.values[value].value))
        this.setState({
          value: this.props.log.values[value].value, 
          note: this.props.log.values[value].note
        })
      }
    });
    this.setState({prettyDate: getPrettyDate(this.props.date)});
  }


  onColorChange = (color) =>{
    this.setState({ color: color })
    // alert(color)
  }

  setColor = () => {
    this.props.setColor(this.state.color);
  }

  render() {

    let colorModal = 
     <ColorPicker
     save={this.setColor}
     color={this.props.log.color}
     floatColor={this.state.color}
     onColorChange={this.onColorChange}
     viewColorModal={this.state.viewColorModal}
     toggle={()=>{this.setState({viewColorModal: !this.state.viewColorModal});}}
     />

  
    let holderValue = '';
    let holderNote = '';
    
    Object.keys(this.props.log.values).map((value, index) =>{
    
      if(value == this.props.prettyDate){
          holderValue = this.props.log.values[value].value;
          holderNote = this.props.log.values[value].note;
        }

    });

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

        {Object.keys(this.props.log.values).map((value, index) =>{
            
              return <TouchableOpacity 
                key={index} 
                onPress={() => {
                  let thisDate = new Date(value)//.getTime();
                  let newVal = (thisDate.getTime() + thisDate.getTimezoneOffset() * 60000);
                  // alert(thisDate+" "+value)
                  this.props.setDate(newVal);

                }}
                style={{height:25, backgroundColor: this.props.log.color, borderRadius: 5, margin: 5,}} >
                <Text  > {value} :: Value: {this.props.log.values[value].value} / Note: {this.props.log.values[value].note}</Text>
                
              </TouchableOpacity>
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
            <Text style={{height: 30, margin: 5, fontSize:25}} >{this.props.log.label}</Text>
            

            {colorModal}
            <AButton
              icon={faPalette}
              color={this.props.log.color}
              text="change color"
              onPress={()=>this.setState({viewColorModal: !this.state.viewColorModal})}/>


            </View>
      
            <Text>{this.props.prettyDate}</Text>
          
            
            <Text>Numeric Value:</Text>      
             <TextInput
              placeholder={holderValue}
              style={{height: 50, borderColor: 'gray', borderWidth: 1, borderRadius: 5}}
              keyboardType="numeric"
              onChangeText={(text) => this.setState({value: text})}
              value={this.state.value}
            />

            <Text style={{marginTop: 10}} >Note/Text:</Text>
            <TextInput
                placeholder={holderNote}
                style={{height: 50,width: 300,  borderColor: 'gray', borderWidth: 1, borderRadius: 5}}
                onChangeText={(note) => this.setState({note})}
                
                value={this.state.note}
              />

            <AButton            
              color={this.props.log.color}
              onPress={() => {this.props.saveLogData(this.props.date, this.state.value,this.state.note, this.props.log)}}
              text="Save this Log"
              />

        </View>

          
        {showDataView}

      </View>
    );

  }
}