// @flow
import React, {PureComponent} from 'react'
import {AppRegistry, StyleSheet, View} from 'react-native'
import ApolloClient from 'apollo-boost'
import {Navigation} from 'react-native-navigation'
import StartContainer from './StartContainer'
const getRoutes = require('../libs/RouteRepo').default

const client = new ApolloClient()
let routes = getRoutes()
// Object.keys(routes).map((key) => Navigation.registerComponent(key, () => routes[key]))
Navigation.registerComponent('StartContainer', () => StartContainer)
