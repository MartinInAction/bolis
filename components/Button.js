// @flow
import React, {PureComponent} from 'react'
import {ActivityIndicator, View, Text, StyleSheet} from 'react-native'
import ButtonWrapper from './ButtonWrapper'
import colors from '../libs/Colors'
import commonStyles from '../libs/CommonStyles'
import {hasNotch} from '../libs/Common'

type Props = {
    onPress: Function,
    text?: string,
    langKey?: string,
    disabled?: boolean,
    showSpinner?: boolean,
    style?: Object,
    uppercase?: boolean,
    textStyle?: Object,
    spinnerColor?: string,
    removeNotchPadding?: boolean,
    icon?: string,
    testID?: string,
    containerStyle?: Object
}
type State = {}

export default class Button extends PureComponent<Props, State> {
    state = {}

    render (): * {
      var {testID, disabled, style, showSpinner, removeNotchPadding} = this.props
      return <View style={[styles.container, hasNotch() ? styles.notch : undefined, disabled ? styles.disabledContainer : undefined, removeNotchPadding ? styles.noBottomPadding : undefined]}>
        <ButtonWrapper {...this.props} testID={testID} onPress={this.onPress} style={[styles.button, disabled ? styles.disabledButton : undefined, hasNotch() ? styles.notch : undefined, style]} disabled={showSpinner}>
          {this.renderButtonContent()}
        </ButtonWrapper>
      </View>
    }

    renderButtonContent = () => {
      var {showSpinner, text, textStyle, spinnerColor} = this.props
      if (showSpinner) return <ActivityIndicator color={spinnerColor || colors.white} />
      return <Text style={[styles.buttonText, textStyle]}>
        {text}
      </Text>
    }

    onPress = () => {
      var {onPress, disabled} = this.props
      switch (true) {
        case disabled: return Promise.resolve()
        default: return onPress ? onPress() : Promise.resolve()
      }
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.imperial
  },
  button: {
    width: '100%',
    backgroundColor: colors.imperial,
    height: commonStyles.buttonHeight,
    alignSelf: 'center',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  disabledButton: {
    backgroundColor: colors.gray
  },
  disabledContainer: {
    backgroundColor: colors.gray
  },
  noBottomPadding: {
    paddingBottom: 0
  },
  notch: {
    height: commonStyles.buttonHeight * 1.3
  },
  buttonText: {
    zIndex: 2000,
    color: colors.white,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20
  }
})
