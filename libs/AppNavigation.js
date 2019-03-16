// @flow
import {Navigation} from 'react-native-navigation'
import {getTopBarOptions} from './NavigationHelper'

let componentId

export let setComponentId = (id: string) => componentId = id
export let goTo = (route: Object, params?: Object): Promise<Object> => {
  Navigation.push(componentId, {
    component: {
      name: route.routeName,
      passProps: params,
      options: {
        topBar: {
          ...getTopBarOptions(),
          ...route.topBar
        },
        statusBar: route.statusBar || {
          hideWithTopBar: false,
          blur: true,
          style: 'light'
        }
      }
    }
  })
  return Promise.resolve()
}
