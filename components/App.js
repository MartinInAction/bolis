// @flow
import React, {PureComponent} from 'react'
import {getTopBarOptions} from '../libs/NavigationHelper'
import ApolloClient from 'apollo-boost'
import {Navigation} from 'react-native-navigation'
import {setComponentId} from '../libs/AppNavigation'
import colors from '../libs/Colors'
const getRoutes = require('../libs/RouteRepo').default

const client = new ApolloClient()
let routes = getRoutes()
Navigation.events().registerComponentDidAppearListener(({componentId, componentName}) => setComponentId(componentId))
Object.keys(routes).map((key) => Navigation.registerComponent(key, () => routes[key]))
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    animations: {
      setRoot: {
        enabled: false
      }
    }
  })
  Navigation.setRoot({
    root: {
      stack: {
        id: 'defaultStack',
        children: [
          {
            component: {
              name: 'StartContainer'
            }
          }
        ],
        options: {
          topBar: {
            ...getTopBarOptions(),
            visible: false
          },
          statusBar: {
            hideWithTopBar: false,
            blur: true,
            style: 'light'
          }
        }
      }
    }
  })
})
