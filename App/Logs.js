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

import { faAngleLeft, faBars, faChartBar, faCalendar, faSave, faWindowClose, faPlus } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'


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

  selectLog = (log) => {
    alert(log.name);
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
          // alert(data.date + ' vs ' + date)
          if(data.date == date){
            alert('already had this date')
            repeatedLog = true;
            data.value = value;
          }
        })
    }
    if(repeatedLog == false){
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
    // let logs = null;
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

      // <View style={{  visibility: graphVisibility}}>
      // <GraphData

      // sampleLabels={[4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,]}
      // sampleLogBook={[
      // {
      //   data: [ 20, 45, 28, 80, 99, 43 ,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,],
      //   name: 'name',
      //   color: (opacity = 1) => `rgba(50, 250, 50, ${opacity})` // optional
      // },
      // {
      //   data: [ 20, 45, 28, 80, 99, 43 ,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,],
      //   name: 'name',
      //   color: (opacity = 1) => `rgba(50, 250, 50, ${opacity})` // optional
      // },
      // ]}
      //   logBook={this.props.logBook}/>
      //   </View>
    


    let deleteButton = <AButton
      onPress={() => this.props.deleteBook()} 
      icon={faWindowClose}
      />

    let addButton = <AButton
      onPress={() => this.setState({newLog: true})} 
      text="Log"
      icon={faPlus}
      />

      let dateButton = <DatePicker
        returnDate={this.returnDate}/>

    let viewGraphButton = <AButton
      onPress={() => this.setState({showGraph: true})}
      text="Show"
      icon={faChartBar}/>

    if(this.state.showGraph){
      viewGraphButton = null;

      logs = <GraphData
        goBack={()=>this.setState({showGraph: false})}
        logBook={this.props.logBook}/>;

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
        

        {addButton}

        {newLogModal}

        {dateButton}

        {viewGraphButton}
      
      </View>;

    if(this.props.logBook.logs.length < 1){
      logBookMenu =
            <View
        style={{flexDirection:'row',flex:1}}>
        {deleteButton}

        {addButton}

        {newLogModal}
      
      </View>;
    }

    if(this.state.showGraph){
      logBookMenu =
      <View
        style={{flexDirection:'row',flex:1}}>

        {viewGraphButton}
      
      </View>;
    }


    return (
      <ScrollView>
        <View style={{flexDirection:'row'}}>
          <AButton
            icon={faAngleLeft}
            onPress={this.props.goBack}/>

          <Text style={{fontSize: 32, flex:1}} >{this.props.logBook.name}</Text>
          {deleteButton}
        </View>
        
        {logBookMenu}


        {logs}
      
      </ScrollView>
    );

  }
}