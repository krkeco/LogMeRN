import React, { Component } from 'react';


  export const deleteBook = (books, removeIndex) => {
    let updatedBooks = [];
    books.map((logbook, index) => {
      if (index != removeIndex) {
        updatedBooks.push(logbook);
      }

    });
      return updatedBooks;
  };


  export const newBook = (title) => {
    let newBook = {
      name: title,
      logs: [],
    };
    return newBook;
  };