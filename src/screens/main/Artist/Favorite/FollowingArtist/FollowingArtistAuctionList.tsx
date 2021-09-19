import { RouteProp } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React,{memo,useState,useEffect, useLayoutEffect} from 'react';
import { Text, View,StyleSheet, FlatList, Touchable, Alert,TouchableOpacity, ImageBackground } from 'react-native';
import { Avatar, Button, Card, Divider, Paragraph, Title } from 'react-native-paper';
import {CardFlatListStyles,SampleFlatListStyles,SampleImageBackGoundListStyles} from '~/GlobalStyle';

const styles = StyleSheet.create(
    ({
        ...CardFlatListStyles,
        ...SampleFlatListStyles,
        ...SampleImageBackGoundListStyles,
        cotainer:{
            flex:1
        },       
        collectionItemContainer:{
            flexDirection:'row',
            height:140,
            margin:5
        },
        avartarStyle :{
            alignContent:'center',
            justifyContent:'center',
            margin:5
        }
    })
);

type Props = {
    route : RouteProp<ArtistStackParamList,"ArtistTabRoot">
    navigation:NativeStackScreenProps<ArtistStackParamList,"ArtistTabRoot">;    
};

const CollectionItem = ({navigation,route}:Props)=>{
    return (
        <>
        
            <TouchableOpacity style={styles.cardContainer} onPress={()=>Alert.alert('info','info')}>
            <ImageBackground
                source={require('./mun.png')}
                resizeMode="cover"
                style={styles.imageBackGround}
                imageStyle={styles.BackgroundImageStyle}
              >
                
                <View style={styles.bottomRect}>
                   <Text style={styles.bottomText}>일정</Text>
                  <Text style={styles.bottomText}>작가</Text>
                  <Text style={styles.bottomText}>가격</Text>                  
                </View>
              </ImageBackground>
            </TouchableOpacity>
        
        </>
    )
};




const FollowingArtistAuctionList = ({route,navigation}:Props) =>{
    let data = [1,2,3];
    return (
        <>
        <View style={styles.sampleFlatListContainer}>
            <View style={styles.sampleFlatListTitleContainer}>
                <Text style={styles.sampleFlatListTitleText}>AUCTION PLAN</Text>
                {/* <Button style={styles.sampleFlatListMoreButtonText} onPress={()=>navigation.navigate('FollowingArtistAllList')}>전체보기</Button> */}
            </View>
            <FlatList                    
                data={data}
                renderItem={({index,item})=><><CollectionItem  navigation={navigation} route={route}></CollectionItem></>}
                keyExtractor={(item,i) =>  i.toString()}
            />
            <Button onPress={()=>Alert.alert('info','more')}>MORE</Button>
            <Divider color='black' orientation="horizontal"></Divider>
        </View>       
        </>
        
    );
}


export default memo(FollowingArtistAuctionList);