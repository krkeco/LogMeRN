import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Button,
  Picker,
  TextInput,
  Text,
  StatusBar,
  Alert,
} from 'react-native';

// import Storage from 'react-native-storage';
// import AsyncStorage from '@react-native-community/async-storage';

import DatePicker from './DatePicker.js';
import DialogInput from 'react-native-dialog-input';
import AButton from './AButton.js';
import LogItem from './LogItem.js';
import GraphData from './GraphData.js';
import SampleLine from './SampleLine.js';

 
import {getPrettyDate} from './Utils.js';

import { faAngleLeft, faBars, faChartBar, faCalendar, faSave, faWindowClose, faPlus } from '@fortawesome/free-solid-svg-icons'


import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'

export default class Logs extends Component<Props> {
 constructor(props) {
    super(props);
    this.state = {
      newLog: false,
      deleteLog: false,
      deleteBook: false,
      showGraph: false,
      newLogText: 'log',
      date: 1562482800000,
      prettyDate: '2019-07-07',
    }
  }

  componentDidMount(){
    
  }

  addLog = (title) => {
    this.props.logBook.logs.push(this.newLog(title));
    
    this.setState({newLog: false},this.props.saveData);
  }

  newLog = (title) =>{
    let r = 125+ Math.floor(Math.random()*130);
      let g = 125+ Math.floor(Math.random()*130);
      let b = 125+ Math.floor(Math.random()*130);
      let o = 1;
      let colour = `rgba(${r}, ${g}, ${b}, ${o})`;

    let newLog = {
      "color":colour,
      "label":title,
      "values":{}
      // "values":[]
    }
    return newLog;
  }

  logData = () => {
    alert('going to do something!')
  }

  saveLogData = (date,value,note,log) => {

    let key = getPrettyDate(date);
    log.values[key] = this.newLogObject(value,note);
    
    this.props.saveData();

  }
  // newLogEntry =  (value,date,note) => {
  //   let newEntry = {
  //     "date": date,
  //     "value": value,
  //     "note": note,
  //   }
  //   return newEntry;
  // } 
  newLogObject =  (value,note) => {
    let newEntry = {
      "value": value,
      "note": note,
    }
    return newEntry;
  }

  returnDate = (date) => {
    this.setState({
      date: date,
      prettyDate: getPrettyDate(date)});

  }

  setColor = (color,log) => {
    log.color = color;
    this.props.saveData();
  }

  render() {
    // let logs = null;
    if(this.props.logBook.logs != null){
        logs = <View >
        {this.props.logBook.logs.map((log,index) => {
              return <LogItem
                setColor={(color) => this.setColor(color,log)}
                setDate={(date)=>{this.returnDate(date)}}
                date={this.state.date}
                prettyDate={this.state.prettyDate}
                saveLogData={(date,value,note,log) => {this.saveLogData(date,value,note,log)}}
                deleteLog={(logIndex) => this.props.deleteLog(logIndex)}
                key={index}
                log={log}
                index={index}/>
        })}
        </View>
    }

    let deleteButton = <AButton
      onPress={() => this.props.deleteBook()} 
      icon={faWindowClose}
      />

    let addButton = <AButton
      onPress={() => this.setState({newLog: true})} 
      icon={faPlus}
      />

      let dateButton = <DatePicker
        returnDate={this.returnDate}/>

    let viewGraphButton = <AButton
      onPress={() => this.setState({showGraph: true})}
      icon={faChartBar}/>

    if(this.state.showGraph){
      viewGraphButton = null;

      logs = <SampleLine
        goBack={()=>this.setState({showGraph:false})}
        logBook={this.props.logBook}/>
      // <GraphData
      //   goBack={()=>this.setState({showGraph: false})}
      //   logBook={this.props.logBook}/>;

    }


    let newLogModal =
    <DialogInput isDialogVisible={this.state.newLog}
      title={"New Log"}
      message={"Log:"}
      hintInput ={"Your Log"}
      submitInput={ (inputText) => {this.addLog(inputText)} }
      closeDialog={ () => {this.setState({newLog: false})}}>
    </DialogInput>;

   


    let logBookMenu =
      <View
        style={{flexDirection:'row',flex:1, justifyContent:'space-between'}}>
        
        <View style={{flexDirection:'row'}}>
          {addButton}

          {newLogModal}

          {dateButton}
        </View>

        {viewGraphButton}
      
      </View>;

    if(this.props.logBook.logs.length < 1){
      logBookMenu =
            <View
        style={{flexDirection:'row',flex:1}}>
        
        {addButton}

        {newLogModal}
      
      </View>;
    }

    return (
      <ScrollView>
        <View style={{flexDirection:'row'}}>
          <AButton
            icon={faAngleLeft}
            onPress={this.props.goBack}/>

          <Text style={{fontSize: 32, flex:1, marginLeft: 5}} >{this.props.logBook.name}</Text>
          {deleteButton}
        </View>
        
        {logBookMenu}


        {logs}
      
      </ScrollView>
    );

  }
}