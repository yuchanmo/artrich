import React, { Component, useState } from 'react'
import { ScrollView, Switch, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Avatar, Icon, ListItem } from 'react-native-elements'
import PropTypes from 'prop-types'

import BaseIcon from './Icon'
import Chevron from './Chevron'
import InfoText from './InfoText'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { NavigationHelpersContext } from '@react-navigation/core'

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
  },
  userImage: {
    marginRight: 12,
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: '#ECECEC',
  },
});

interface Props{
    avatar: string,
    name: string,
    navigation: NativeStackScreenProps<MyStackParamList,"Profile">;    
    emails: {
        email: string
      }[]
    
}

const SettingsScreen = (data:Props)=>{
  let [pushNotification,setPushNotification] = useState<boolean>(true);
  const { avatar, name, emails: [firstEmail] } = data;
  const onPressSetting = () => {
    data.navigation.navigate('Options');
  };

  const onChangePushNotifications = () => {
    setPushNotification(!pushNotification);
  };

  return (
    <ScrollView style={styles.scroll}>
        <View style={styles.userRow}>
          <View style={styles.userImage}>
            <Avatar
              rounded
              size="large"
              source={{uri: avatar}}
            />
          </View>
          <View>
            <Text style={{ fontSize: 16 }}>{name}</Text>
            <Text
              style={{
                color: 'gray',
                fontSize: 16,
              }}
            >
              {firstEmail.email}
            </Text>
          </View>
        </View>
        <InfoText text="Register" />
        <View>
          <TouchableOpacity onPress={()=>{data.navigation.navigate('MyCollection')}}>
          <ListItem bottomDivider>
            <Icon name={ 'av-timer'} />
            <ListItem.Content>
              <ListItem.Title>MyCollection</ListItem.Title>
              <ListItem.Subtitle>(내 소장품)</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{data.navigation.navigate('NewArtist')}}>
          <ListItem bottomDivider>
            <Icon name={ 'av-timer'} />
            <ListItem.Content>
              <ListItem.Title>NEW ARTIST</ListItem.Title>
              <ListItem.Subtitle>(신인작가)</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{data.navigation.navigate('Test')}}>
          <ListItem bottomDivider>
            <Icon name={ 'av-timer'} />
            <ListItem.Content>
              <ListItem.Title>TEST</ListItem.Title>
              <ListItem.Subtitle>(신인작가)</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          </TouchableOpacity>
          {/* <ListItem
            hideChevron
            title="Push Notifications"
            containerStyle={styles.listItemContainer}
            rightElement={
              <Switch
                onValueChange={onChangePushNotifications}
                value={pushNotification}
              />
            }
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#FFADF2',
                }}
                icon={{
                  type: 'material',
                  name: 'notifications',
                }}
              />
            }
          />
          <ListItem
            // chevron
            title="Currency"
            rightTitle="USD"
            rightTitleStyle={{ fontSize: 15 }}
            onPress={() => onPressSetting()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#FAD291' }}
                icon={{
                  type: 'font-awesome',
                  name: 'money',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Location"
            rightTitle="New York"
            rightTitleStyle={{ fontSize: 15 }}
            onPress={() => onPressSetting()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#57DCE7' }}
                icon={{
                  type: 'material',
                  name: 'place',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Language"
            rightTitle="English"
            rightTitleStyle={{ fontSize: 15 }}
            onPress={() => onPressSetting()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#FEA8A1' }}
                icon={{
                  type: 'material',
                  name: 'language',
                }}
              />
            }
            rightIcon={<Chevron />}
          /> */}
        </View>
        <InfoText text="My History" />
        <View>
          <ListItem
            title="About US"
            onPress={() => onPressSetting()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#A4C8F0' }}
                icon={{
                  type: 'ionicon',
                  name: 'md-information-circle',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Terms and Policies"
            onPress={() => onPressSetting()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#C6C7C6' }}
                icon={{
                  type: 'entypo',
                  name: 'light-bulb',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Share our App"
            onPress={() => onPressSetting()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#C47EFF',
                }}
                icon={{
                  type: 'entypo',
                  name: 'share',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Rate Us"
            onPress={() => onPressSetting()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#FECE44',
                }}
                icon={{
                  type: 'entypo',
                  name: 'star',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Send FeedBack"
            onPress={() => onPressSetting()}
            containerStyle={styles.listItemContainer}
            badge={{
              value: 999,
              textStyle: { fontSize: 14, color: 'white' },
            }}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#00C001',
                }}
                icon={{
                  type: 'materialicon',
                  name: 'feedback',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
        </View>
      </ScrollView>
  );
};

export default SettingsScreen
