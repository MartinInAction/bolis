// @flow
import React, {PureComponent} from 'react'
import {getTopBarOptions} from '../libs/NavigationHelper'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import {Navigation} from 'react-native-navigation'
import {setComponentId} from '../libs/AppNavigation'
const getRoutes = require('../libs/RouteRepo').default

const localClient = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/cjdh9xuiv072l0162cymilo5d'
})

// Simple API: https://api.graph.cool/simple/v1/cjtbmke0i2o7p0199g3gymsej
// Relay API: https://api.graph.cool/relay/v1/cjtbmke0i2o7p0199g3gymsej
// Subscriptions API: wss://subscriptions.graph.cool/v1/cjtbmke0i2o7p0199g3gymsej

Navigation.events().registerComponentDidAppearListener(({componentId, componentName}) => setComponentId(componentId))
const withProvider = (Component, client = localClient) => {
  return class extends PureComponent<{}, {}> {
    render (): * {
      return <ApolloProvider client={client}>
        <Component {...this.props} />
      </ApolloProvider>
    }
  }
}
let routes = getRoutes()
Object.keys(routes).map((key) => Navigation.registerComponent(key, () => withProvider(routes[key])))
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
              name: 'AppManager'
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
