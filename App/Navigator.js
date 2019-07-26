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

import AsyncStorage from '@react-native-community/async-storage';

import LogBooks from './LogBooks.js';
import Logs from './Logs.js';
import Menu from './Menu.js';

const BOOKS_KEY = "books";

export default class Navigator extends Component<Props> {
 constructor(props) {
    super(props);
    this.state = {
      showLogBook: false,
      selectedBook: 0,
      books: [],
    }
  }

  componentDidMount(){
    this.getLogData();
  }

  storeData = async () => {
    try {
      await AsyncStorage.setItem(BOOKS_KEY, JSON.stringify(this.state.books))
      // alert('set'+JSON.stringify(this.state.books))
    } catch (e) {
      // saving error
    }
  }
  getLogData = async () => {
    try {
      const value = await AsyncStorage.getItem(BOOKS_KEY)
      if(value !== null) {
        this.setState({books: JSON.parse(value)});
      }else{
       
      }
    } catch(e) {
      // error reading value
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

  deleteLogBookAlert = () => {
    
    Alert.alert(
      'Delete LogBook',
      'Deleting this logbook means you will lose all the data you stored for it, are you sure you want to do this (this is irreversible and super cereal).',
      [
        {
          text: 'Oh Snap!',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
       
        {text: 'Confirmed!', onPress: () => this.deleteBook()}
      ],
        {cancelable: true},
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
    this.setState({books: newBook},this.storeData);
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
    this.setState({books: newBook},this.storeData);
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
      saveData={this.storeData}
      books={this.state.books}
      addBook={this.addBook}
      selectBook={this.selectBook}/>

    if(this.state.showLogBook){
      booksView = <Logs
        goBack={this.goBack}
        saveData={this.storeData}
        deleteLog={(index)=> this.deleteLogAlert(index)}
        deleteBook={() => this.deleteLogBookAlert()}
        logBook = {this.state.books[this.state.selectedBook]}/>
      
    }

        // <Menu
        //   goBack={this.goBack}/>
    return (
      <View >
          {booksView}
      </View>
    );

  }
}