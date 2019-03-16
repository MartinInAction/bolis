// @flow
import StartContainer from '../components/StartContainer'
import ContactsContainer from '../components/ContactsContainer'
import SignedInManager from '../components/SignedInManager'
export default () => ({
  [StartContainer.routeName]: StartContainer,
  [ContactsContainer.routeName]: ContactsContainer,
  [SignedInManager.routeName]: SignedInManager
})
