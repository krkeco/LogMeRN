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



import { faAngleUp, faAngleDown, faPalette, faSave, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import ColorPicker from './ColorPicker'

export default class LogItem extends Component<Props> {
 constructor(props) {
    super(props);
    this.state = {
      value: '',
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
      icon={faAngleDown}
      onPress={() => this.setState({showData: !this.state.showData})}/>
    
    if(this.state.showData){
      showDataView = <View style={{alignItems:'center'}}>
      <AButton
      color={this.props.log.color}
      icon={faAngleUp}
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
                style={{ width: 300, backgroundColor: this.props.log.color, borderRadius: 5, margin: 5, alignItems:'center'}} >
                <Text  > {value} :: Value: {this.props.log.values[value].value}</Text>
                <Text> Note: {this.props.log.values[value].note}</Text>
                
              </TouchableOpacity>
        })}
      </View>
    }

    return (
      <View style={{flexDirection: 'column', backgroundColor: '#bbdefb', margin: 5, borderRadius: 5}} >
        <View >
          
          <View
            style={{height: 50, flex:1, flexDirection:'row'}}>
          
            
            <AButton
              color={this.props.log.color}
              onPress={() => {this.props.deleteLog(this.props.index)}}
              icon={faWindowClose}
              />
            
            {colorModal}
            
            <AButton
              icon={faPalette}
              color={this.props.log.color}
              onPress={()=>this.setState({viewColorModal: !this.state.viewColorModal})}/>
            
            <Text style={{height: 30, margin: 5, fontSize:25}} >{this.props.log.label}</Text>
            


              <Text style={{marginTop:22}}>log of: {this.props.prettyDate}</Text>

            </View>
            <View style={{flexDirection:'row',justifyContent: 'center',flex:1, alignItems: 'center'}}>
        
            
              <View>
              <Text>Value:</Text>      
               <TextInput
                placeholder={holderValue}
                style={{height: 35,width:50, borderColor: 'gray', borderWidth: 1, borderRadius: 5}}
                keyboardType="numeric"
                onChangeText={(text) => this.setState({value: text})}
                value={this.state.value}
              />
              </View>

              <View style={{marginLeft:10}}>
              <Text >Note/Text:</Text>
              <TextInput
                  placeholder={holderNote}
                  style={{height: 35,width: 200,  borderColor: 'gray', borderWidth: 1, borderRadius: 5}}
                  onChangeText={(note) => this.setState({note})}
                  
                  value={this.state.note}
                />
                </View>

              <View style={{paddingTop:20}}>
              <AButton            
                color={this.props.log.color}
                onPress={() => {this.props.saveLogData(this.props.date, this.state.value,this.state.note, this.props.log)}}
                icon={faSave}
                />
              </View>
              
              </View>

        </View>

          <View style={{alignItems: 'center'}}>
            {showDataView}
          </View>

      </View>
    );

  }
}