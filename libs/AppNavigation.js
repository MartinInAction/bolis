// @flow
import {Navigation} from 'react-native-navigation'
import {getTopBarOptions} from './NavigationHelper'
import StartContainer from '../components/StartContainer'
import ContactsContainer from '../components/ContactsContainer'
let componentId

export let login = (user: Object) => {
  return goToDefaultRoute(user)
}
export let goToDefaultRoute = (user: Object) => {
  if (!user) return Navigation.setStackRoot(componentId, [{
    component: {
      name: StartContainer.routeName,
      passProps: {},
      options: {
        topBar: StartContainer.topBar,
        animations: {
          setStackRoot: {
            enabled: false
          }
        }
      }
    }
  }
  ])
  return Navigation.setStackRoot(componentId, [{
    component: {
      name: ContactsContainer.routeName,
      passProps: {},
      options: {
        topBar: StartContainer.topBar,
        animations: {
          setStackRoot: {
            enabled: false
          }
        }
      }
    }
  }
  ])
}

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
