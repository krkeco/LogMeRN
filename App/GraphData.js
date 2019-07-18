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


export default class GraphData extends Component<Props> {
 constructor(props) {
    super(props);
    this.state = {
      width: 0,
      logBook: [
      {
        data: [
          4,3,2,5,1
        ]
      },
      {
        data: [
          1,2,3,4,5
        ]
      }
      ],

    }
  }

  
  onLayout(e) {
    this.setState({width: Dimensions.get('window').width})
    // console.log(width, height)
  }


  onComponentWillMount(){
    // this.props.logBook.logs.map((log, index) => {
      
    // })
  }

  render() {

    return(
      <View
        onLayout={this.onLayout.bind(this)}>
        <Text>
          Bezier Line Chart {this.state.width}
        </Text>
        <LineChart
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: this.state.logBook
          }}
          width={this.state.width} // from react-native
          height={220}
          yAxisLabel={''}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
    );

  }
}