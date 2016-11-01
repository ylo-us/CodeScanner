import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 200
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  textInput: {
    height: 40, 
    alignItems: 'center',
    flex: 1,
    margin: 50 
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonBar: {
    flex: 2,
    flexDirection: "row",
    position: "absolute",
    bottom: 25,
    right: 0,
    left: 0,
    justifyContent: "center"
  },
  button: {
    padding: 10,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    backgroundColor: '#45990D',
    margin: 5
  },
});
