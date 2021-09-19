import { NavigationHelpersContext, RouteProp } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React,{memo,useState,useEffect, useLayoutEffect} from 'react';
import { Text, View,StyleSheet, FlatList,Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Avatar, Button, Divider, Paragraph, Title } from 'react-native-paper';
import {SampleFlatListStyles} from '~/GlobalStyle';

const styles = StyleSheet.create(
    ({
        ...SampleFlatListStyles,
       followingArtistContainer:{
           height:100,
           width:100,
       }       
    })
);

type Props = {
    route : RouteProp<ArtistStackParamList,"CollectionSampleList">
    navigation:NativeStackScreenProps<ArtistStackParamList,"CollectionSampleList">;    
};

const CollectionItem = ({navigation,route}:Props)=>{
    return (
        <View style={styles.followingArtistContainer}>
        <TouchableOpacity style={styles.sampleFlatListItemButton} onPress={()=>navigation.navigate('ArtistDetail')}>
              {/* <ImageBackground
                source={ArtInfo.ImageUrl}
                resizeMode="cover"
                style={styles.image}
                imageStyle={styles.image_imageStyle}
              > */}
              <View style={{flexDirection:'column'}}>
                 <Avatar.Image size={60} source={require('./mun.png')} />
                 <Text style={styles.sampleFlatListItemDescription}>작가작가작가</Text>
             </View>             
            </TouchableOpacity>
        </View>
    )
};




const FollowingArtistSampleList = ({route,navigation}:Props) =>{
    let data = [1,2,3,4,5,6];
    return (
        <>
        <View style={styles.sampleFlatListContainer}>
            <View style={styles.sampleFlatListTitleContainer}>
                <Text style={styles.sampleFlatListTitleText}>FOLLOWING ARTIST</Text>
                <Button style={styles.sampleFlatListMoreButtonText} onPress={()=>navigation.navigate('FollowingArtistAllList')}>전체보기</Button>
            </View>
            <FlatList
                        horizontal={true}
                        data={data}
                        renderItem={({index,item})=><><CollectionItem  navigation={navigation} route={route}></CollectionItem></>}
                        keyExtractor={(item,i) =>  i.toString()}
                    />
            <Divider color='black' orientation="horizontal"></Divider>
        </View>
        </>
        
    );
}


export default memo(FollowingArtistSampleList);