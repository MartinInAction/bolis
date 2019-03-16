// @flow
import React, {PureComponent} from 'react'
import {StyleSheet, View} from 'react-native'
type Props = {}
export default class StartContainer extends PureComponent<Props> {
    static routeName = 'StartContainer'
    render (): * {
      return <View style={styles.container} />
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue'
  }
})
