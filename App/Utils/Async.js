import React, { Component } from 'react';

import AsyncStorage from '@react-native-community/async-storage';

const BOOKS_KEY = 'books';

  export const storeData = async (books) => {
    try {
      await AsyncStorage.setItem(BOOKS_KEY, JSON.stringify(books));
      
    } catch (e) {
      console.log('error saving log data:'+e)
    }
  };

  export const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(BOOKS_KEY);
      if (value != null) {
        return value
      } else {

        console.log('getData !value')
        return []
      }
    } catch (e) {
      console.log('error getting log data:'+e)
      return []
    }
  };