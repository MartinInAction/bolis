// @flow
import React, {PureComponent} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import colors from '../libs/Colors'
import Button from './Button'
import {logout} from '../libs/AppNavigation'
import ButtonWrapper from './ButtonWrapper'
// import gql from 'graphql-tag'
// import {graphql} from 'react-apollo'
type Props = {}
type State = {
    remindState: boolean
}
export default class HomeContainer extends PureComponent<Props, State> {
    state = {remindState: false}
    static routeName = 'HomeContainer'
    static topBar = {
      visible: true
    }
    render (): * {
      let {remindState} = this.state
      return <View style={styles.container}>
        <View style={styles.wrapper}>
          <ButtonWrapper onPress={this.startRemindingMe}>
            <View style={styles.remindButton}>
              <Text>REMIND ME TO GO TO BOLIS</Text>
            </View>
          </ButtonWrapper>
        </View>
        <Button onPress={logout} text='logout' />
      </View>
    }

    startRemindingMe = () => {}

    doSomething = () => { }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.imperial
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  remindButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    borderRadius: 300 / 2,
    backgroundColor: colors.peach
  }
})
