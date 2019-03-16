// @flow
import React, {PureComponent} from 'react'
import {StyleSheet, View} from 'react-native'
import colors from '../libs/Colors'
import Button from './Button'
type Props = {}
export default class ContactsContainer extends PureComponent<Props> {
    static routeName = 'ContactsContainer'
    static topBar = {
      visible: true
    }
    render (): * {
      return <View style={styles.container}>
        <View style={styles.wrapper} />
        <Button onPress={this.doSomething} text='HEJ' />
      </View>
    }

    doSomething = () => { }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.imperial
  },
  wrapper: {
    flex: 1
  }
})
