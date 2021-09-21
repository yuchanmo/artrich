import { RouteProp } from '@react-navigation/core';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React,{useState,useEffect, useLayoutEffect,memo} from 'react';
import { Text, View,StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Title } from 'react-native-paper';
import ArtList from '~/screens/main/Artist/ArtistDetail/ArtList';
import ChartAnalysis from '~/screens/main/Artist/ArtistDetail/ChartAnalysis';
import CompareArtists from '~/screens/main/Artist/ArtistDetail/CompareArtists';


const styles = StyleSheet.create(
    ({
        cotainer:{
            flex:1
        },
        artistTitleContainer:{
            height:30,
            flexDirection:'row'
        },
        artistInfoContainer:{
            flex:1
        },
        artistFollowingText:{
            alignSelf:'center',
            alignItems:'center',
        }

    })
);



const Tab = createMaterialTopTabNavigator<ArtistStackParamList>();

const ArtistDetailTabRoot = ()=>{
    
    return (                 
        <Tab.Navigator>
            <Tab.Screen name="ChartAnalysis" component={ChartAnalysis} options={{swipeEnabled:false}} />
            <Tab.Screen name="ArtList" component={ArtList} options={{swipeEnabled:false}}/>
            <Tab.Screen name="CompareArtists" component={CompareArtists} options={{swipeEnabled:false}}/>                                
        </Tab.Navigator>
       
    );
};

const ArtistDetail = ({}) =>{
    const [isClick, setClick] = useState<boolean>(false);
    return (
        <>
        <View style={styles.cotainer}>
            <View style={styles.artistTitleContainer}>
                <Title>작가이름</Title>
                
                <Text style={styles.artistFollowingText}>Following</Text>
            </View>
            <View style={styles.artistInfoContainer}>
                <ArtistDetailTabRoot></ArtistDetailTabRoot>
            </View>
        </View>
        </>
        
    );
}


export default memo(ArtistDetail);