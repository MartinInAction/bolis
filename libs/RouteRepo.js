// @flow
import StartContainer from '../components/StartContainer'
import ContactsContainer from '../components/ContactsContainer'
export default () => ({
  [StartContainer.routeName]: StartContainer,
  [ContactsContainer.routeName]: ContactsContainer
})
