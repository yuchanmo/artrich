import React,{useState,useEffect, useLayoutEffect} from 'react';
import { Text, View,StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MyCollection from './MyCollection/Register';
import NewArtist from './NewArtist';
import Profile from '~/screens/main/My/Settings/index';
import Test from './Test';
//import Profile1 from '~/screens/My/Profile1/index';




const styles = StyleSheet.create(
    ({
        container:{
            flex:1

        },
        tabWrapContainer:{
            flex:1
        },
        bannerContainer:{
            flex:1
        },
        overlay: {
            backgroundColor: "rgba(30,26,26,0.4)",
            flex: 1
  
        },
        tabScreenContainer:{
            flex:7
        },
        artInfo:{
            margin:20
          },
        artTitle: {
            color: "rgba(255,255,255,1)",
            fontSize: 24,            
            alignSelf: "center"
          }, 
          artDescription: {
            color: "rgba(255,255,255,1)",
            fontSize: 16,
          
            alignSelf: "center"
          },
        contentsbox:{
        flex:8
        },
    })
);


const Stack = createNativeStackNavigator<MyStackParamList>();
const Tab = createMaterialTopTabNavigator<MyStackParamList>();

// const ProfileScreen = () => <Profile1 {...contactData} />



const My = ({}) =>{
    
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="MyCollection" component={MyCollection} />         
            <Stack.Screen name="NewArtist" component={NewArtist} />         
            <Stack.Screen name="Test" component={Test} />         
                   
        </Stack.Navigator> 
        
    );
}


export default My;
