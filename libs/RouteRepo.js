// @flow
import StartContainer from '../components/StartContainer'
import ContactsContainer from '../components/ContactsContainer'
import AppManager from '../components/AppManager'
import HomeContainer from '../components/HomeContainer'

export default () => ({
  [StartContainer.routeName]: StartContainer,
  [ContactsContainer.routeName]: ContactsContainer,
  [AppManager.routeName]: AppManager,
  [HomeContainer.routeName]: HomeContainer
})
