// @flow
import React, {PureComponent} from 'react'
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native'
import ButtonWrapper from './ButtonWrapper'
import colors from '../libs/Colors'
import {IPHONE_X_TAB_BAR_BELLOW_SAFE_MARGIN} from '../libs/Consts'
import commonStyles from '../libs/CommonStyles'

type Props = {
    onPress: Function,
    text?: string,
    langKey?: string,
    disabled?: boolean,
    showSpinner?: boolean,
    small?: boolean,
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

export default class MoonshineButton extends PureComponent<Props, State> {
    state = {}

    render (): * {
      var {testID, disabled, small, style, showSpinner} = this.props
      return <ButtonWrapper {...this.props} testID={testID} onPress={this.onPress} style={[styles.button, small ? styles.smallButton : undefined, disabled ? styles.disabledButton : undefined, style]} disabled={showSpinner}>
        {this.renderButtonContent()}
      </ButtonWrapper>
    }

    renderButtonContent = () => {
      var {showSpinner, text, textStyle, spinnerColor} = this.props
      if (showSpinner) return <ActivityIndicator color={spinnerColor || colors.imperial} />
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
  button: {
    backgroundColor: colors.white,
    width: '100%',
    height: commonStyles.buttonHeight,
    alignSelf: 'center',
    padding: commonStyles.space,
    justifyContent: 'center',
    alignItems: 'center'
  },
  smallButton: {
    flex: 0.5,
    height: commonStyles.buttonHeight * 0.7,
    minHeight: commonStyles.buttonHeight * 0.7,
    margin: commonStyles.smallSpace,
    padding: commonStyles.smallSpace
  },
  disabledButton: {
    backgroundColor: colors.gray
  },
  buttonText: {
    color: colors.imperial,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: colors.transparent
  }
})
