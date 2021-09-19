import { RouteProp } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React,{useState,useEffect, useLayoutEffect} from 'react';
import { Text, View,StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CollectionAllList, CollectionSampleList } from './CollectionList';
import { FollowingArtistReleaseList, FollowingArtistSampleList, FollowingArtistTradeList } from './FollowingArtist';
import {FollowingArtistAuctionList} from './FollowingArtist';

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
        <ScrollView>
            <CollectionSampleList route={route} navigation={navigation}></CollectionSampleList>
            <FollowingArtistSampleList route={route} navigation={navigation}></FollowingArtistSampleList>
            <FollowingArtistAuctionList route={route} navigation={navigation}></FollowingArtistAuctionList>
            <FollowingArtistReleaseList route={route} navigation={navigation}></FollowingArtistReleaseList>
            <FollowingArtistTradeList route={route} navigation={navigation}></FollowingArtistTradeList>
        </ScrollView>
        </>
        
    );
}


export default Community;