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

import DialogInput from 'react-native-dialog-input';
import AButton from './AButton.js';
import LogItem from './LogItem.js';
import GraphData from './GraphData.js';

 
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
    let newLog = {
      "name":title,
      "data":[]
    }
    return newLog;
  }

  logData = () => {
    alert('going to do something!')
  }

  saveLogData = (date,value,log) => {
    log.data.push(this.newLogData(value,date));
    
  }
  newLogData =  (value,date) => {
    let newData = {
      "date": date,
      "value": value,
    }
    return newData;
  }


  render() {
    let logs = null;
    if(this.props.logBook.logs != null){
        logs = <View >
        {this.props.logBook.logs.map((log,index) => {
              return <LogItem
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

    let logButton = <AButton
      onPress={() => this.logData()}
      text="Log data"/>

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
    </DialogInput>

    return (
      <ScrollView>
        <Text>{this.props.logBook.name} logs:</Text>
        
        <View
          style={{flexDirection:'row',flex:1}}>
          {deleteButton}

          {addButton}

          {newLogModal}

          {logButton}

          {viewGraphButton}
        
        </View>

        {logs}
      
      </ScrollView>
    );

  }
}