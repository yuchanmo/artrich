import React from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView } from 'react-native'

import contactData from '../contact.json'

import  Nav  from './Nav'
import Setting from './Setting'
import { RouteProp } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

interface Props{
  route : RouteProp<MyStackParamList,"Profile">
  navigation:NativeStackScreenProps<MyStackParamList,"Profile">;    
}

const SettingScreen = (props:Props) => {
  props.navigation.setOptions({
    header: ({navigation}) => (
      <SafeAreaView>
        <Nav
          title="My Profile"
          navigation={navigation}
          leftIcon={{
            type: 'ionicon',
            name: 'md-list',
            size: 26,
          }}
        />
      </SafeAreaView>
    ),
  })

  return <Setting {...contactData} {...props} />
}

SettingScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default SettingScreen
