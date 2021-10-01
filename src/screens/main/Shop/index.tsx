import React,{useState,useEffect, useLayoutEffect} from 'react';
import { Text, View,StyleSheet, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Searchbar, Surface } from 'react-native-paper';

import Icon from "react-native-vector-icons/Ionicons";
import { RouteProp } from '@react-navigation/core';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NewArtistList from './NewArtistList';
import SellRegister from './SellRegister';
import SellDetail from './SellDetail';
import SellList from './SellList';


const styles = StyleSheet.create(
    ({
        cotainer:{
            flex:1
        },
        floatingRegisterButtonStyle: {
            alignSelf: 'flex-end',
            position: 'absolute',
            bottom: 40,
            right:20,
            backgroundColor:'#EE80BA',
            borderRadius:60,
            height:60,
            width:50,
            alignItems:'center',
            justifyContent:'center',

        },
        surface: {
            padding: 8,
            height: 80,
            width: 80,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 4,
          },
        

    })
);


type Props = {
    route : RouteProp<ShopStackParamList,"ShopTabRoot">
    navigation:NativeStackScreenProps<ShopStackParamList,"ShopTabRoot">;    
};

const Stack = createNativeStackNavigator<ShopStackParamList>();
const Tab = createMaterialTopTabNavigator<ShopStackParamList>();

const ShopTabRoot = ({route,navigation}:Props)=>{
  

    return (
        <>        
        <Tab.Navigator>
            <Tab.Screen name="Sell" component={SellList} options={{swipeEnabled:false,title:'판매'}} />
            <Tab.Screen name="NewArtist" component={NewArtistList} options={{swipeEnabled:false,title:'신인작가'}}/>            
        </Tab.Navigator>       
        </>
    );
}



const Shop = ({}) =>{
    
    return (
        <Stack.Navigator>
            <Stack.Screen name="SellTabRoot" component={ShopTabRoot} options={{headerShown:false}}/>
            <Stack.Screen name="SellRegister" component={SellRegister} />
            <Stack.Screen name="SellDetail" component={SellDetail} />

        </Stack.Navigator> 
        
    );
}





export default Shop;