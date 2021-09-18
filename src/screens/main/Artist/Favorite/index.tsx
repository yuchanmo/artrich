import { RouteProp } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React,{useState,useEffect, useLayoutEffect} from 'react';
import { Text, View,StyleSheet } from 'react-native';
import { CollectionAllList, CollectionSampleList } from './CollectionList';

const styles = StyleSheet.create(
    ({
        cotainer:{
            flex:1
        },
        

    })
);

type Props = {
    route : RouteProp<ArtistStackParamList,"ArtistTabRoot">
    navigation:NativeStackScreenProps<ArtistStackParamList,"ArtistTabRoot">;    
};


const Community = ({route,navigation}:Props) =>{
    return (
        <>
        <View>
            <CollectionSampleList route={route} navigation={navigation}></CollectionSampleList>
        </View>
        </>
        
    );
}


export default Community;