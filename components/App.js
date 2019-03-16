// @flow
import React, {PureComponent} from 'react'
import {AppRegistry, StyleSheet, View} from 'react-native'
import ApolloClient from 'apollo-boost'

const client = new ApolloClient()
type Props = {}
export default class App extends PureComponent<Props> {
  render (): * {
    return <View style={styles.container} />
  }
}

AppRegistry.registerComponent('bolis', () => App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  }
})
