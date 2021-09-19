import React,{useState,useEffect, useLayoutEffect} from 'react';
import { Text, View,StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ReleaseList from '~/screens/main/Release/ReleaseList';
import ReleaseDetail from '~/screens/main/Release/ReleaseDetail';



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


const Stack = createNativeStackNavigator<ReleaseStackParamList>();
const Tab = createMaterialTopTabNavigator<ReleaseStackParamList>();


const ReleaseBanner = ()=>{
    return (
        <>
        <View style={styles.bannerContainer}>
              <View style={styles.overlay}>
                    <View style={styles.artInfo}>
                      <Text style={styles.artTitle}>BANNER</Text>          
                    </View>
              </View>
          </View>
        </>
    )
}

const TabRoot = ()=>{
    let [serachingName,setSearchingName] = useState<string>('');
    return (
        <>
        <View style={styles.container}> 
            <View style={styles.bannerContainer}>
                <ReleaseBanner></ReleaseBanner>
            </View>
            <View style={styles.tabScreenContainer}>
            <Tab.Navigator>
                <Tab.Screen name="Upcoming" component={ReleaseList} options={{swipeEnabled:false}}/>
                <Tab.Screen name="Past" component={ReleaseList} options={{swipeEnabled:false}}/>                
            </Tab.Navigator>
            </View>
        </View>
        </>
    );
};



const Artist = ({}) =>{
    
    return (
        <Stack.Navigator>
            <Stack.Screen name="TabRoot" component={TabRoot} options={{headerShown:false}}/>
            <Stack.Screen name="ReleaseDetail" component={ReleaseDetail} />         
        </Stack.Navigator> 
        
    );
}


export default Artist;