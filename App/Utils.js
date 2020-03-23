import React, { Component } from 'react';

export const getPrettyDate = (dateMils) => {
  let date = new Date(dateMils);

  let parsedDate = '' + date.getFullYear();

  parsedDate += '-';
  parsedDate +=
    date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  parsedDate += '-';
  parsedDate += date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  return parsedDate;
};
