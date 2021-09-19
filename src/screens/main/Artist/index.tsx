import React,{useState,useEffect, useLayoutEffect} from 'react';
import { Text, View,StyleSheet, TouchableOpacity, Alert } from 'react-native';

import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import Favorite from './Favorite';
import Analysis from './Analysis';

import { Searchbar  } from 'react-native-paper';
import AuctionPlan from './Favorite/FollowingArtist';
import CollectionList, { CollectionAllList } from './Favorite/CollectionList';
import SellList from './Favorite/SellList';
import CollectionDetail from './Favorite/CollectionDetail';
import ArtistDetail from './ArtistDetail';
import FollowingArtistAllList from './Favorite/FollowingArtist/FollowingArtistAllList';
import EasyPick from './EasyPick';


const styles = StyleSheet.create(
    ({
        searchbox:{
            flex:1

          },
        contentsbox:{
            flex:8
          },

    })
);


// const Stack = createNativeStackNavigator();
{/* <Stack.Navigator 
        screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Favorite" component={Favorite} />
            <Stack.Screen name="ArtistDetail" component={ArtistDetail} />
            <Stack.Screen name="ArtistList" component={ArtistList} />
            <Stack.Screen name="ArtistDetail" component={ArtistDetail} /> 
</Stack.Navigator> */}

type Props = {
    route : RouteProp<ArtistStackParamList,"ArtistTabRoot">
    navigation:NativeStackScreenProps<ArtistStackParamList,"ArtistTabRoot">;    
};

const Stack = createNativeStackNavigator<ArtistStackParamList>();
const Tab = createMaterialTopTabNavigator<ArtistStackParamList>();

const ArtistTabRoot = ({route,navigation}:Props)=>{
    let [serachingName,setSearchingName] = useState<string>('');
    return (
        <>
        <View style={styles.searchbox}>
            <View>
                <Searchbar  
                    placeholder="작가이름" 
                    value={serachingName} 
                    onChangeText={(v)=>setSearchingName(v)} 
                    onIconPress={()=>{
                        if(serachingName.length>0){
                            navigation.navigate('ArtistDetail',{name:serachingName})
                        }
                        else{
                            Alert.alert('Notice','검색할 작가 이름을 입력하세요')
                        }
                    }}          
                ></Searchbar>
                
            </View>
            <Tab.Navigator>
                <Tab.Screen name="Favorite" component={Favorite} options={{swipeEnabled:false}} />
                <Tab.Screen name="Analysis" component={Analysis} options={{swipeEnabled:false}}/>
                <Tab.Screen name="EasyPick" component={EasyPick} options={{swipeEnabled:false}}/>
                {/* <Tab.Screen name="EasyPick" component={EasyPick} options={{swipeEnabled:false}}/> */}
            </Tab.Navigator>
        </View>
        </>
    );
};

const Artist = ({}) =>{
    
    return (
        <Stack.Navigator>
            <Stack.Screen name="ArtistTabRoot" component={ArtistTabRoot} options={{headerShown:false}}/>
            <Stack.Screen name="FollowingArtistAllList" component={FollowingArtistAllList} />
            <Stack.Screen name="CollectionAllList" component={CollectionAllList} />
            <Stack.Screen name="SellList" component={SellList} />
            <Stack.Screen name="CollectionDetail" component={CollectionDetail} />
            <Stack.Screen name="ArtistDetail" component={ArtistDetail} />

            {/* <Stack.Screen name="ArtistList" component={ArtistList} />
            <Stack.Screen name="ArtistDetail" component={ArtistDetail} />  */}
        </Stack.Navigator> 
        
    );
}


export default Artist;