import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
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
 
import LogBooks from './LogBooks.js';
import Logs from './Logs.js';
import Menu from './Menu.js';

const cup = {
  "material": 'glass',
  "volume": 750, //ml
  "design": "australian aboriginiieeeeeeee"
}

const logs =  ['anger','happiness','patience']
const logs2 =  ['joy','peace','fatigue']
const books =  [{'name': 'Logbook1', 'logs': logs},{'name': 'Logbook2', 'logs': logs2}]

export default class Navigator extends Component<Props> {
 constructor(props) {
    super(props);
    this.state = {
      showLogBook: false,
      selectedBook: 0,
    }
  }



  selectBook = (bookIndex) =>{
    this.setState({
      showLogBook: true,
      selectedBook: bookIndex})
  }

  goBack = () => {
    this.setState({showLogBook: false});
  }

  render() {
    let booksView = 
    <LogBooks
      books={books}
      selectBook={this.selectBook}/>

    if(this.state.showLogBook){
      booksView = <Logs
        logBook = {books[this.state.selectedBook]}/>
      
    }

    return (
      <View >
        <Menu
          goBack={this.goBack}/>
        <View style={{marginTop: 30}}>

          {booksView}

        </View>
      </View>
    );

  }
}