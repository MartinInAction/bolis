// @flow
import React, {PureComponent} from 'react'
import {StyleSheet, View} from 'react-native'
import colors from '../libs/Colors'
import {load} from '../libs/Storage'
import {goToDefaultRoute} from '../libs/AppNavigation'
type Props = {}
export default class SignedInManager extends PureComponent<Props> {
    static routeName = 'SignedInManager'
    static topBar = {
      visible: true
    }

    componentDidMount () {
      load().then((state) => goToDefaultRoute(state))
    }
    render (): * {
      // TODO LOADING
      return <View />
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
