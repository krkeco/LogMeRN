import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  View, processColor
} from 'react-native';
import update from 'immutability-helper';

import {LineChart} from 'react-native-charts-wrapper';
import {getPrettyDate} from './Utils.js';
import AButton from './AButton.js';
import DatePicker from './DatePicker.js';
import { faChartBar } from '@fortawesome/free-solid-svg-icons'


export default class LineChartScreen extends React.Component {

  constructor() {
    super();

    this.state = {
      data: {},
      masterLogBook: {},
      startLabel: "2019-07-01",
      endLabel: "2019-07-31",

      marker: {
        enabled: true,
        digits: 2,
        backgroundTint: processColor('teal'),
        markerColor: processColor('#F0C0FF8C'),
        textColor: processColor('white'),
      },
      xAxis: {
        granularityEnabled: true,
        granularity: 1,
      },
      // visibleRange: {x: {min: 1, max: 2}}
    };
  }

  componentDidMount() {

    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: this.setGraphData(),
          }
        }
      })
    );

    //default data example:
    // this.setState(
    //   update(this.state, {
    //     data: {
    //       $set: {
            // dataSets: [{
            //   values: [{x: 4, y: 135, label: 'hello label'}, {label: 'hello label',x: 5, y: 0.88}, {x: 6, y: 0.77}, {x: 7, y: 105}], label: 'A',
            // }, {
            //   values: [{x: 4, y: 105, label: 'hello label'}, {label: 'hello label',x: 5, y: 90}, {x: 6, y: 130}, {x: 7, y: 100}], label: 'B',
            // }, {
            //   values: [{x: 4, y: 110, label: 'hello label'}, {label: 'hello label',x: 5, y: 110}, {x: 6, y: 105}, {x: 7, y: 115}], label: 'C',
            // }],
    //       }
    //     }
    //   })
    // );

  }

  updateGraphData = () => {
    // this.refs.chart.setDataAndLockIndex({
    //   datasSets: this.setGraphData()
    // });


    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: this.setGraphData(),
          }
        }
      })
    );
  }


  setGraphData = () => {
    let startMill = new Date(this.state.startLabel);
    let endMill = new Date(this.state.endLabel);

    let totalLabels = Math.abs(endMill.getUTCDate() - startMill.getUTCDate() +1);
    
    let dataSets = [];

    this.props.logBook.logs.map((log, index) => {

    let graphLogValues = [];
    let currentLabel = this.state.startLabel;

    let floatTime = this.state.startLabel;
        
    for(let x = 1; x <= totalLabels; x++){
      let mLabel = getPrettyDate(floatTime);
      
      let yValue = 0;
      let note = 'no notes'

      if(log.values[mLabel] != undefined){
        yValue = parseInt(log.values[mLabel].value)
        note = log.values[mLabel].note
      }

      let graphObject = {x: x, y: yValue, label: mLabel, note: note}

      graphLogValues.push(graphObject)

      floatTime = startMill.getTime() + (x)*1000*60*60*24;
        
    }

      dataSets.push({values: graphLogValues, label: log.label})

    });

    return dataSets

  }

  // onPressLearnMore() {

  //   this.refs.chart.setDataAndLockIndex({
  //     dataSets: [{
  //       values: [
  //         {x: 1, y: 0.88},
  //         {x: 2, y: 0.77},
  //         {x: 3, y: 105},
  //         {x: 4, y: 135},
  //         {x: 5, y: 0.88},
  //         {x: 6, y: 0.77},
  //         {x: 7, y: 105},
  //         {x: 8, y: 135}
  //       ],
  //       label: 'A',
  //     }, {
  //       values: [
  //         {x: 1, y: 90},
  //         {x: 2, y: 130},
  //         {x: 3, y: 100},
  //         {x: 4, y: 105},
  //         {x: 5, y: 90},
  //         {x: 6, y: 130},
  //         {x: 7, y: 100},
  //         {x: 8, y: 105}
  //       ],
  //       label: 'B',
  //     }, {
  //       values: [
  //         {x: 1, y: 110},
  //         {x: 2, y: 105},
  //         {x: 3, y: 115},
  //         {x: 4, y: 110},
  //         {x: 5, y: 110},
  //         {x: 6, y: 105},
  //         {x: 7, y: 115},
  //         {x: 8, y: 110}],
  //       label: 'C',
  //     }],
  //   })
  // }

  setStartDate = (date) => {
    let d = new Date(date)
    let ed = new Date(this.state.endLabel)
    let newDate = getPrettyDate(date);

    if(d.getDate() +7 > ed.getDate()){
      let endD = d.getTime() + 7*24*60*60*1000;
      this.setState({endLabel: getPrettyDate(endD),startLabel: getPrettyDate(date)},this.setLabelData);  
    }else{
      this.setState({startLabel: getPrettyDate(date)},()=>{this.updateGraphData()});
    }
  }
  setEndDate = (date) => {
    let d = new Date(date)
    let sd = new Date(this.state.startLabel)
    let newDate = getPrettyDate(date);

    if(d.getDate() -7 < sd.getDate()){
      let startD = d.getTime() - 7*24*60*60*1000;
      this.setState({endLabel: getPrettyDate(date),startLabel: getPrettyDate(startD)},this.setLabelData);  
    }else{
      this.setState({endLabel: getPrettyDate(date)},()=>{this.updateGraphData()});
    }
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: entry.data.label +': '+ entry.data.note})
    }

    console.log(event.nativeEvent)
  }

  render() {


    let startDateButton = <DatePicker text="Select Start Date" returnDate={this.setStartDate}/>
    let endDateButton = <DatePicker text="Select End Date" returnDate={this.setEndDate}/>



    // let logRadios = <View style={{flexDirection:'row'}} >
    // {this.state.masterLogBook.map((log,index) => {
      
    //   return <AButton 
    //     onPress={()=> this.filter(index)}
    //     key={index}
    //     color={log.colorCode}
    //     text={log.name}
    //     />
    // })}
    // </View>

    return (
      <ScrollView>
        <View style={{flexDirection: 'row'}}>
          {startDateButton}
          {endDateButton}
          <AButton
            onPress={() => this.props.goBack()}
            text="Hide"
            icon={faChartBar}/>
        </View>
        <Text>Graphing from: {this.state.startLabel} to {this.state.endLabel}</Text>
          <Text> {this.state.selectedEntry}</Text>
  
      <View style={{flex: 1}}>

        <View style={styles.container}>
          <LineChart
            style={styles.chart}
            data={this.state.data}
            chartDescription={{text: ''}}
            legend={this.state.legend}
            marker={this.state.marker}
            xAxis={this.state.xAxis}            
            drawGridBackground={false}
            borderColor={processColor('teal')}
            borderWidth={1}
            drawBorders={true}
            autoScaleMinMaxEnabled={false}
            touchEnabled={true}
            dragEnabled={true}
            scaleEnabled={true}
            scaleXEnabled={true}
            scaleYEnabled={false}
            pinchZoom={true}
            doubleTapToZoomEnabled={false}
            highlightPerTapEnabled={true}
            highlightPerDragEnabled={false}
            // visibleRange={this.state.visibleRange}
            dragDecelerationEnabled={true}
            dragDecelerationFrictionCoef={0.99}
            ref="chart"
            keepPositionOnRotation={true}
            onSelect={this.handleSelect.bind(this)}
            onChange={(event) => console.log(event.nativeEvent)}
          />
        </View>

      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    height: 500,
  },
  chart: {
    flex: 1
  }
});
