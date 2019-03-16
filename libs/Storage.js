// @flow
import {AsyncStorage} from 'react-native'
import Store from './Store'

export const KEY = 'key'

export let load = () => {
  return AsyncStorage.getItem(KEY)
    .then(jsonState => {
      debugger
      if (!jsonState) return Promise.resolve()
      jsonState = JSON.parse(jsonState)
      return jsonState
    })
}

export let save = (state?: Object) => {
  debugger
  return AsyncStorage.setItem(KEY, JSON.stringify(state || Store.getState()))
}
