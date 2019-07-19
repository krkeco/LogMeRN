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

 
import {getPrettyDate} from './Utils.js';

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

  selectLog = (log) => {
    alert(log.name);
  }

  addLog = (title) => {
    this.props.logBook.logs.push(this.newLog(title));
    
    this.setState({newLog: false},this.props.saveData);
  }

  // addLog = (logbook,title) => {
  //   logbook.logs.push(this.newLog(title));
  // }
  newLog = (title) =>{
    let r = 125+ Math.floor(Math.random()*130);
      let g = 125+ Math.floor(Math.random()*130);
      let b = 125+ Math.floor(Math.random()*130);
      let o = 1;
      let colour = `rgba(${r}, ${g}, ${b}, ${o})`;

    let newLog = {
      "color":colour,
      "name":title,
      "data":[]
    }
    return newLog;
  }

  logData = () => {
    alert('going to do something!')
  }

  saveLogData = (date,value,log) => {
    let repeatedLog = false;
    if(log.data != null && log.data != undefined){
        log.data.map((data,index) =>{
          if(data.date == date){
            repeatedLog = true;
            data.value = value;
          }
        })
    }
    if(!repeatedLog){
      log.data.push(this.newLogData(value,date));
      log.data.sort((a,b) => a.date > b.date)
    }
    
    this.props.saveData();
  }
  newLogData =  (value,date) => {
    let newData = {
      "date": date,
      "value": value,
    }
    return newData;
  }

  returnDate = (date) => {
    this.setState({
      date: date,
      prettyDate: getPrettyDate(date)});

  }


  render() {
    let logs = null;
    if(this.props.logBook.logs != null){
        logs = <View >
        {this.props.logBook.logs.map((log,index) => {
              return <LogItem
                date={this.state.date}
                prettyDate={this.state.prettyDate}
                saveLogData={(date,value,log) => {this.saveLogData(date,value,log)}}
                deleteLog={(logIndex) => this.props.deleteLog(logIndex)}
                key={index}
                selectLog={() => this.selectLog}
                log={log}
                index={index}/>
        })}
        </View>
    }

    if(this.state.showGraph){
      logs = <GraphData
        logBook={this.props.logBook}/>
    }


    let deleteButton = <AButton
      onPress={() => this.props.deleteBook()} 
      text="Delete logBook"
      />

    let addButton = <AButton
      onPress={() => this.setState({newLog: true})} 
      text="New Log"
      />

      let dateButton = <DatePicker
        returnDate={this.returnDate}/>

    // let logButton = <AButton
    //   onPress={() => this.logData()}
    //   text="Log data"/>

    let viewGraphButton = <AButton
      onPress={() => this.setState({showGraph: true})}
      text="View Graph"/>

    if(this.state.showGraph){
      viewGraphButton = <AButton
        onPress={() => this.setState({showGraph: false})}
        text="Hide Graph"/>

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
        style={{flexDirection:'row',flex:1}}>
        {deleteButton}

        {addButton}

        {newLogModal}

        {dateButton}

        {viewGraphButton}
      
      </View>;

    if(this.state.showGraph){
      logBookMenu =
      <View
        style={{flexDirection:'row',flex:1}}>

        {viewGraphButton}
      
      </View>;
    }


    return (
      <ScrollView>
        <Text>{this.props.logBook.name} logs:</Text>
        
        {logBookMenu}

        {logs}
      
      </ScrollView>
    );

  }
}