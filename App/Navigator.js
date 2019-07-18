import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  Alert,
} from 'react-native';


import LogBooks from './LogBooks.js';
import Logs from './Logs.js';
import Menu from './Menu.js';



//logbook
//log
//data

let data = [{"date":20190707,"value":2},{"date":20190708,"value":4}]

let log = {"name":"patience","data":data}

// let ledger = {
//   "name":"birthdays",
//   logs: [
//     log
//   ]
// }


export default class Navigator extends Component<Props> {
 constructor(props) {
    super(props);
    this.state = {
      showLogBook: false,
      selectedBook: 0,
      books: [],
    }
  }

  deleteLogAlert = (logIndex) => {
    
    Alert.alert(
      'Delete Log',
      'Deleting this log means you will lose all the data you stored for it, are you sure you want to do this (this is irreversible).',
      [
        {
          text: 'Oh Snap!',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
       
        {text: 'Confirmed!', onPress: () => this.deleteLog(logIndex)}
      ],
        {cancelable: false},
    );

  }
  deleteBook = () => {
    this.goBack();
    // alert('deleting'+this.state.selectedBook)
    let newBook = []
    this.state.books.map((logbook, index) => {
      if(index != this.state.selectedBook){
        newBook.push(logbook);
      }
    this.setState({books: newBook});
    });
  }

  deleteLog = (logIndex) => {
    // let newBooks = this.state.books[this.state.selectedBook].logs.splice(logIndex,1);
    // this.setState({books: newBooks})
    let newBook = []
    let newLogBook = []
    // let newLogs = []

    this.state.books.map((logbook, index) => {
      if(index != this.state.selectedBook){
        newBook.push(logbook);
      }else{
        newLogBook = this.newBook(logbook.name);
        logbook.logs.map((log,i) =>{
          if(i != logIndex){
            newLogBook.logs.push(log);
          }
        });
        newBook.push(newLogBook);
      }
    });
    this.setState({books: newBook});
  }

  newBook = (title) => {
    let newBook = {
      "name":title,
      logs: []
    }
    return newBook;
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
    newBook={this.newBook}
      books={this.state.books}
      addBook={this.addBook}
      selectBook={this.selectBook}/>

    if(this.state.showLogBook){
      booksView = <Logs
        deleteLog={(index)=> this.deleteLogAlert(index)}
        deleteBook={() => this.deleteBook()}
        logBook = {this.state.books[this.state.selectedBook]}/>
      
    }



          // {ledgers.map((ledger, index) =>{
          //   return <View>
          //     <Text>{ledger.name}</Text>
          //       {ledger.logs.map((log,lIndex) => {
          //         return <View>
          //         <Text>{log.name}</Text>
          //         {log.data.map((data,dIndex) =>
          //           {
          //             return <Text>{data.date} {data.value}</Text>
          //           })}
          //         </View>
          //       })}
          //     </View>
          // })}

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