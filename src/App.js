/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
import * as webservices from 'marvelApp/src/webservices/webservices'

//import { Colors } from 'marvelApp/src/commons'

/********************** COMPONENTS **********************/
import CharactersList from 'marvelApp/src/sections/characters/CharactersList'

/********************** REDUX **********************/
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from 'marvelApp/src/redux/reducers' // Reducers
const reducer = combineReducers(reducers) // Combinacion de los reducers
const store = createStore( // store a partir de reducers y redux-thunk
  reducer, 
  applyMiddleware(thunk) 
)



export default class App extends Component {

  componentWillMount() {
    webservices.configure()
    StatusBar.setBarStyle('light-content')
  }

  
  render() {

    
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root">

            <Scene
              key={'CharactersList'}
              component={CharactersList}
              hideNavBar
            />
          </Scene>
        </Router>
      </Provider>
    );
  }

}

const styles = StyleSheet.create({
  container: {
      flex: 1
  }
});
