
// @flow
import {ActivityIndicator, TouchableOpacity, TextInput, Image, StyleSheet, View, ScrollView, Text, KeyboardAvoidingView} from 'react-native'
import React, {PureComponent} from 'react'
import commonStyles from '../libs/CommonStyles'
import Swiper from 'react-native-swiper'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import colors from '../libs/Colors'
import * as Redux from 'redux'
import {login} from '../libs/AppNavigation'
import {save} from '../libs/Storage'

type Props = {
    createUserMutation: Function,
    signinUserMutation: Function
}
type State = {
    email: string,
    password: string,
    name: string,
    isSending: boolean
}
export class StartContainer extends PureComponent<Props, State> {
    state = {email: '', password: '', name: '', isSending: false}
    static routeName = 'StartContainer'

    render (): * {
      var {isSending} = this.state
      return <View style={styles.container}>
        <Image source={require('../assets/images/mt.jpg')} style={styles.background} />
        <Swiper loop={false} showsPagination={false} showsButtons={false}>
          <View style={styles.slide}>
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={0} style={styles.container} contentContainerStyle={styles.scrollContainer}>
              <ScrollView style={{flexGrow: 1}} contentContainerStyle={styles.scrollContainer} scrollEnabled={false}>
                <View style={styles.formWrapper}>
                  <TextInput autoCapitalize='none' keyboardType='email-address' spellCheck={false} onChangeText={(email) => this.setState({email})} style={styles.input} placeholder='email' placeholderTextColor={'white'} />
                  <TextInput autoCapitalize='none' secureTextEntry spellCheck={false} onChangeText={(password) => this.setState({password})} style={styles.input} placeholder='password' placeholderTextColor={'white'} />
                </View>
              </ScrollView>
              <Text style={styles.helpText}>LOGIN</Text>
              <TouchableOpacity activeOpacity={0.9} onPress={() => this.signIn()} style={styles.button}>
                {isSending ? <ActivityIndicator color='white' size='small' /> : <Text style={styles.buttonText}>LOGGA IN</Text>}
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
          <View style={styles.slide}>
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={0} style={styles.container} contentContainerStyle={styles.scrollContainer}>
              <ScrollView style={{flexGrow: 1}} contentContainerStyle={styles.scrollContainer} scrollEnabled={false}>
                <View style={styles.formWrapper}>
                  <TextInput autoCapitalize='none' spellCheck={false} onChangeText={(name) => this.setState({name})} style={styles.input} placeholder='name' placeholderTextColor={'white'} />
                  <TextInput autoCapitalize='none' keyboardType='email-address' spellCheck={false} onChangeText={(email) => this.setState({email})} style={styles.input} placeholder='email' placeholderTextColor={'white'} />
                  <TextInput autoCapitalize='none' secureTextEntry spellCheck={false} onChangeText={(password) => this.setState({password})} style={styles.input} placeholder='password' placeholderTextColor={'white'} />
                </View>
              </ScrollView>
              <Text style={styles.helpText}>REGISTGER</Text>
              <TouchableOpacity activeOpacity={0.9} onPress={() => this.signUp()} style={styles.button}>
                {isSending ? <ActivityIndicator color='white' size='small' /> : <Text style={styles.buttonText}>SKAPA KONTO</Text>}
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </Swiper>
      </View>
    }

    signIn () {
      var {signinUserMutation} = this.props
      var {email, password} = this.state
      // TODO VALIDATE
      this.setState({isSending: true})
      signinUserMutation({variables: {email, password}})
        .then((res, des) => {
          var user = {}
          user.token = res.data.signinUser.token
          user.id = res.data.signinUser.user.id
          this.setState({isSending: false})
          login(user)
          save()
        })
        .catch((err) => {
          this.setState({isSending: false})
          // eslint-disable-next-line
                console.log(err)
        })
    }

    signUp () {
      var {createUserMutation} = this.props
      var {email, password, name} = this.state
      // TODO VALIDATE
      this.setState({isSending: true})
      createUserMutation({variables: {name, email, password}})
        .then((user) => {
          this.setState({isSending: false})
          login(user)
          save()
        })
        .catch((err) => {
          this.setState({isSending: false})
          // eslint-disable-next-line
                console.log(err)
        })
    }
}

const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    signinUser(email: {
      email: $email,
      password: $password
    }) {
      token
      user {
        id
      }
    }
  }
`

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($name: String!, $email: String!, $password: String!) {
    createUser(
      name: $name,
      authProvider: {
        email: {
          email: $email,
          password: $password
        }
      }
    ) {id}
    signinUser(email: {
      email: $email,
      password: $password
    }) {token user {id}
    }
  }
`

export default Redux.compose(
  graphql(CREATE_USER_MUTATION, {name: 'createUserMutation'}),
  graphql(SIGNIN_USER_MUTATION, {name: 'signinUserMutation'}))(StartContainer)

var styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-around'
  },
  slide: {
    flex: 1,
    backgroundColor: colors.transparent
  },
  helpText: {
    position: 'absolute',
    bottom: commonStyles.buttonHeight * 2,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: colors.black,
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    borderRadius: 2
  },
  scrollContainer: {
    flex: 1,
    justifyContent: 'space-around'
  },
  formWrapper: {
    flex: 0.5
  },
  input: {
    backgroundColor: colors.black,
    alignSelf: 'center',
    width: '80%',
    marginBottom: 20,
    height: 40,
    fontSize: 20,
    color: colors.white,
    paddingLeft: 10,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 2
  },
  button: {
    height: commonStyles.buttonHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.imperial
  },
  buttonText: {
    fontSize: 20,
    color: colors.white
  },
  background: {
    height: '100%',
    width: '100%',
    position: 'absolute'
  }
})
