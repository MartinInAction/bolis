
// @flow
import React, {PureComponent} from 'react'
import {TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
import commonStyles from '../libs/CommonStyles'

type Props = {
    type?: 'opacity' | 'highlight' | 'withoutFeedback',
    analyticsKey?: string,
    children?: *,
    activeOpacity?: number,
    clickSound?: *,
    enableDoubleClick?: boolean,
    onPress: Function,
    onPressIn?: Function,
    onPressOut?: Function,
    vibrate?: boolean,
    useHitSlop?: boolean
}

type State = {
    isClicked: boolean,
    timeout?: *
}
let mounted
export default class ButtonWrapper extends PureComponent<Props, State> {
    state = {isClicked: false, timeout: undefined}

    componentDidMount () {
      mounted = true
    }

    componentWillUnmount () {
      let {timeout} = this.state
      clearTimeout(timeout)
      this.setState({isClicked: false})
    }

    render (): React$Element<*> {
      var ButtonType = this.getButtonType()
      var {onPressIn, useHitSlop, activeOpacity} = this.props
      var fixedProps = this.props
      if (onPressIn) fixedProps = {...this.props, onPressIn: (event) => this.preventDoubleClick(event)}
      else fixedProps = {...this.props, onPress: (event) => this.preventDoubleClick(event)}
      if (useHitSlop) fixedProps = {...this.props, hitSlop: commonStyles.hitSlop, onPress: (event) => this.preventDoubleClick(event)}
      return <ButtonType {...fixedProps} activeOpacity={activeOpacity || 0.8}>
        {this.props.children}
      </ButtonType>
    }

    preventDoubleClick (event: Object) {
      var {onPress, enableDoubleClick, onPressIn} = this.props
      let {isClicked} = this.state
      if (isClicked) return
      // if (vibrate) VibrationHelper.vibrate()
      if (onPress) onPress(event)
      if (onPressIn) onPressIn(event)
      if (enableDoubleClick) return
      this.setState({isClicked: mounted})
      var timeout = setTimeout(() => {
        if (mounted === undefined) return
        this.setState({isClicked: false})
      }, 500)
      this.setState({timeout: timeout})
    }

    getButtonType (): * {
      var {type} = this.props
      switch (type) {
        case 'opacity':
          return TouchableOpacity
        case 'highlight':
          return TouchableHighlight
        case 'withoutFeedback':
          return TouchableWithoutFeedback
        default:
          return TouchableOpacity
      }
    }
}
