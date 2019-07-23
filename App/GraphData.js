import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Button,
  TextInput,
  Dimensions,
  StatusBar,
} from 'react-native';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'

import AButton from './AButton.js';
import {getPrettyDate} from './Utils.js';

import DatePicker from './DatePicker.js';
import { faChartBar } from '@fortawesome/free-solid-svg-icons'

export default class GraphData extends Component<Props> {
 constructor(props) {
    super(props);
    this.state = {
      loading: true,
      prettyStart: "2019-07-01",
      prettyEnd: "2019-07-07",
      startLabel: "2019-07-01",
      endLabel: "2019-07-07",
      totalLabels:7,


      width: 3100,

      logSets: [{name:"set1",data:[],color:"#000"}],
      
      masterLogBook: [],
      filters: [],

      labels: [1],
      logBook: [//15s x6  10sx2
      {
        data: [1],
        name: 'name',
        color: (opacity = 1) => `rgba(50, 250, 50, ${opacity})` // optional
      },
      ],

    }
  }

  componentDidMount(){
    // this.setState({labels: this.props.sampleLabels,
    //   logBook: this.props.sampleLogBook});
    
    this.setLabelData();
    // this.compileGraphData();
   //8s
   // this.setSampleData();
  }

  setSampleData = () => {//31sx6 15x2+1
    let data1= [ 20, 45, 28, 80, 99, 43 ,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,];
    let data2= [ 20, 45, 28, 80, 99, 43 ,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,];
    // let data3= [ 20, 45, 28, 80, 99, 43 ,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,];
    // let data4= [ 20, 45, 28, 80, 99, 43 ,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,];
    // let data5= [ 20, 45, 28, 80, 99, 43 ,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,];
    // let data6= [ 20, 45, 28, 80, 99, 43 ,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,];
    let labels = [ 20, 45, 28, 80, 99, 43 ,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,4,3,2,5,1,];
        
    // let data2 = [];
    // let data3 = [];
    // let data4 = [];
    // let data5 = [];
    // let data6 = [];
    // let labels = [];
    // for(let x = 0; x < 50; x++){
    //   data1.push(Math.random()*10)
    //   data2.push(Math.random()*100)
    //   data3.push(Math.random()*10)
    //   data4.push(Math.random()*100)
    //   data5.push(Math.random()*10)
    //   data6.push(Math.random()*100)
    //   labels.push(Math.random()*5)
    // }
    let logBook = []
    logBook.push({data: data1})
    logBook.push({data: data2})
    // logBook.push({data: data3})
    // logBook.push({data: data4})
    // logBook.push({data: data5})
    // logBook.push({data: data6})
    this.setState({
      logBook: logBook,
      labels: labels
    })
  }

  setLabelData = () => {
    let startMill = new Date(this.state.startLabel);
    let endMill = new Date(this.state.endLabel);

    let totalLabels = Math.abs(endMill.getUTCDate() - startMill.getUTCDate() +1);
    // alert(startMill +" "+endMill + " " +totalLabels);
    
    
    let newW = totalLabels*100;
    let paramLabels = [];
    let currentLabel = this.state.startLabel;

    let floatTime = new Date(this.state.startLabel)
    for(let x = 1; x <= totalLabels; x++){
      let mLabel = "";
      if(x == 1 || x % 365 == 0){
        mLabel += floatTime.getUTCFullYear();
        mLabel += "-";
      }
      mLabel += (floatTime.getUTCMonth() +1);
      mLabel += "-";
      mLabel += floatTime.getUTCDate();

      paramLabels.push(mLabel)

      floatTime = new Date(startMill.getTime() + (x)*1000*60*60*24);
      
    }
    this.setState({
      labels: paramLabels,
      width: newW,
      totalLabels: totalLabels
    },()=>this.compileGraphData());
  }

  compileGraphData = () => {
    let graphData = [];

    if(this.props.logBook.logs != undefined){
      this.props.logBook.logs.map((log,index) =>{
        
          let dataInRange = []
          let startMills = new Date(this.state.startLabel).getTime();
          // alert(startMills)
          let endMills = new Date(this.state.endLabel).getTime();
          log.data.map((data,i)=>{
            if(data.date >= startMills && data.date <= endMills){
              // alert("add time")
              dataInRange.push(data);
            }
          })

          let logDataArray = []

          this.state.labels.map((label,index) => {

            floatTime = new Date(startMills + (index)*1000*60*60*24);
            
            let labelData = 0;
            // let milLabel = new Date(label)
            dataInRange.map((logData, dI) => {
              // alert(logData.date + " vs "+ floatTime)
              let logDate = new Date(logData.date);

              if(logDate.getFullYear() == floatTime.getFullYear()
                && logDate.getMonth() == floatTime.getMonth()
                && logDate.getDate() == floatTime.getDate()){

                labelData = logData.value;
              }
            })

            logDataArray.push(labelData);

          })

          if(logDataArray.length > 0){
          
            let dataObject = {
              name: log.name,
              data: logDataArray, 
              colorCode: log.color,
              color: ()=> log.color
            }
            graphData.push(dataObject)
          }
          
      }) 
      this.setState({
        logBook: graphData,
        masterLogBook: graphData});
        // alert(JSON.stringify(graphData));
    }
  }

  onLayout(e) {
    // this.setState({width: Dimensions.get('window').width})
    // console.log(width, height)
  }

  filter = (index) => {
    let newFilters = [];
    this.state.filters.map((filter,index) => {
      newFilters.push(filter)
    })

    if(newFilters.indexOf(index) > -1){
      newFilters.splice(this.state.filters.indexOf(index),1);
    }else{
      newFilters.push(index);
    }

    this.setState({filters: newFilters});

    let floatArray = [];
    this.state.masterLogBook.map((log,index) => {
      if(newFilters.indexOf(index) == -1){
        floatArray.push(log);
      }
    })

    if(floatArray.length != 0){
      this.setState({logBook: floatArray});
    }else{
      alert('You must have at least 1 log to graph!')
    }
  }

  setStartDate = (date) => {
    let d = new Date(date)
    let ed = new Date(this.state.endLabel)
    let newDate = getPrettyDate(date);

    if(d.getDate() +7 > ed.getDate()){
      let endD = d.getTime() + 7*24*60*60*1000;
      this.setState({endLabel: getPrettyDate(endD),startLabel: getPrettyDate(date)},this.setLabelData);  
    }else{
      this.setState({startLabel: getPrettyDate(date)},this.setLabelData);
    }
  }
  setEndDate = (date) => {
    this.setState({endLabel: getPrettyDate(date)},this.setLabelData);
  }



  render() {

    let startDateButton = <DatePicker text="Select Start Date" returnDate={this.setStartDate}/>
    let endDateButton = <DatePicker text="Select End Date" returnDate={this.setEndDate}/>



    let logRadios = <View style={{flexDirection:'row'}} >
    {this.state.masterLogBook.map((log,index) => {
      
      return <AButton 
        onPress={()=> this.filter(index)}
        key={index}
        color={log.colorCode}
        text={log.name}
        />
    })}
    </View>
        
        let view = <ScrollView>
        <View style={{flexDirection: 'row'}}>
        {startDateButton}
        {endDateButton}
        <AButton
        onPress={() => this.props.goBack()}
        text="Hide"
        icon={faChartBar}/>
        </View>
        <Text>Graphing from: {this.state.startLabel} to {this.state.endLabel}</Text>

        <ScrollView
          horizontal={true}
          onLayout={this.onLayout.bind(this)}>
          
          {logRadios}
        </ScrollView>
        <ScrollView
          horizontal={true}
          onLayout={this.onLayout.bind(this)}>
          
          <LineChart
            data={{
              labels: this.state.labels,
              datasets: this.state.logBook
            }}
            width={this.state.width} 
            height={500}
            yAxisLabel={''}
            chartConfig={{
              backgroundColor: '#ddd',
              backgroundGradientFrom: '#ccc',
              backgroundGradientTo: '#eee',
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(15, 15, 15, ${opacity})`,
              style: {
                borderRadius: 8
              }
            }}
            
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </ScrollView>
        
      </ScrollView>

    return(
      <View>
      {view}
      </View>
    );

  }
}