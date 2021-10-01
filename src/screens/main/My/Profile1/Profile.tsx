import React, { Component } from 'react'
import { Card, Icon } from 'react-native-elements'
import {
  FlatList,
  Image,
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'

import Email from './Email'
import Separator from './Separator'
import Tel from './Tel'

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: '#FFF',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
})

interface Props{
  name:string;
  username:string;
  address:
  {
    streetA:string
    ,streetB:string
    ,streetC:string
    ,streetD:string
    ,city:string
    ,state:string
    ,country:string
    ,zipcode:string
    ,geo : {
      lat:number
      ,lng:number
    }  
  }
  ,website:string
  ,bio:string
  ,company :{
    name:string
    ,catchPhrase:string
    ,bs:string
  }
  ,avatar:string
  ,avatarBackground:string
  ,tels:{
    id:number
    ,name:string
    ,number:string
  }[]
  ,emails:{
    id:number
    ,name:string
    ,email:string
  }[]
  ,post:{
    id:number
    ,words:string
    ,sentence:string
    ,sentences:string
    ,paragraph:string
    ,image:string
    ,createDate:Date
    ,user : {
      name:string
      ,username:string
      ,avatar:string
      ,email:string
    }
  }[]
};


const Profile1 = (data:Props) =>{
  const onPressPlace = () => {
    console.log('place')
  };

  const onPressTel = (number) => {
    Linking.openURL(`tel://${number}`).catch(err => console.log('Error:', err))
  };

  const onPressSms = () => {
    console.log('sms')
  };

  const onPressEmail = email => {
    Linking.openURL(`mailto://${email}?subject=subject&body=body`).catch(err =>
      console.log('Error:', err)
    )
  };

  const renderHeader = () => {
    const {
      avatar,
      avatarBackground,
      name,
      address: { city, country },
    } = data;

    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{uri: avatarBackground}}
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{uri: avatar}}
            />
            <Text style={styles.userNameText}>{name}</Text>
            <View style={styles.userAddressRow}>
              <View>
                <Icon
                  name="place"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                  onPress={onPressPlace}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {city}, {country}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  };

  const renderTel = () => (
    <FlatList
      contentContainerStyle={styles.telContainer}
      data={data.tels}
      renderItem={(list) => {
        const { id, name, number } = list.item

        return (
          <Tel
            key={`tel-${id}`}
            index={list.index}
            name={name}
            number={number}
            onPressSms={onPressSms}
            onPressTel={onPressTel}
          />
        )
      }}
    />
  );

  const renderEmail = () => (
    <FlatList
      contentContainerStyle={styles.emailContainer}
      data={data.emails}
      renderItem={(list) => {
        const { email, id, name } = list.item

        return (
          <Email
            key={`email-${id}`}
            index={list.index}
            name={name}
            email={email}
            onPressEmail={onPressEmail}
          />
        )
      }}
    />
  );

  return (
    <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <Card containerStyle={styles.cardContainer}>
              {renderHeader()}
              {renderTel()}
              {Separator()}
              {renderEmail()}
            </Card>
          </View>
        </ScrollView>
  )
};



export default Profile1;
