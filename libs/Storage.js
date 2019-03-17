// @flow
import {AsyncStorage} from 'react-native'
import Store from './Store'

export const KEY = 'key'

export let load = () => {
  return AsyncStorage.getItem(KEY)
    .then(jsonState => {
      if (!jsonState) return Promise.resolve()
      jsonState = JSON.parse(jsonState)
      return jsonState
    })
}

export let save = (state?: Object) => {
  return AsyncStorage.setItem(KEY, JSON.stringify(state || ''))
}
