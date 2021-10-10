import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React,{useState,useEffect, useLayoutEffect} from 'react';
import { Text, View,StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ArtistStackParamList } from '~/models/NavigationParam';
import PopularArtistTable from './PopularArtistTable';
import SearchRankTable from './SearchRankTable';

const styles = StyleSheet.create(
    ({
        cotainer:{
            flex:1
        },
        searchContainer:{
            flex:1,
            marginBottom:20
        },
        popularContainer:{
            flex:1
        }
        

    })
);

type Props = {
    route : RouteProp<ArtistStackParamList,"ArtistTabRoot">
    navigation:NativeStackScreenProps<ArtistStackParamList,"ArtistTabRoot">;    
};


const Analysis = ({route,navigation}:Props) =>{
    return (
        <>
        <ScrollView style={styles.cotainer}>
            <View style={styles.searchContainer}>
                <SearchRankTable route={route} navigation={navigation}></SearchRankTable>
            </View>
            <View style={styles.popularContainer}>
                <PopularArtistTable route={route} navigation={navigation}></PopularArtistTable>
            </View>
           
        </ScrollView>
        </>
        
    );
}


export default Analysis ;