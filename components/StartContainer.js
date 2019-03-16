// @flow
import React, {PureComponent} from 'react'
import {StyleSheet, View} from 'react-native'
import colors from '../libs/Colors'
import Button from './Button'
import {goTo} from '../libs/AppNavigation'
import ContactsContainer from './ContactsContainer'
type Props = {}
export default class StartContainer extends PureComponent<Props> {
    static routeName = 'StartContainer'
    render (): * {
      return <View style={styles.container}>
        <View style={styles.wrapper} />
        <Button onPress={this.goToContacts} text='HEJ' />
      </View>
    }

    goToContacts = () => goTo(ContactsContainer, {})
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black
  },
  wrapper: {
    flex: 1
  },
  buttonText: {
    fontSize: 20,
    color: colors.white
  }
})
