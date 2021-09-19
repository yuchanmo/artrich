import { RouteProp } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React,{memo,useState,useEffect, useLayoutEffect} from 'react';
import { Text, View,StyleSheet, FlatList, Touchable, Alert,TouchableOpacity } from 'react-native';

import { Avatar, Card, Divider } from 'react-native-paper';

const styles = StyleSheet.create(
    ({
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
        <View >
            <TouchableOpacity onPress={()=>navigation.navigate('ArtistDetail')}>
                <Card style={styles.collectionItemContainer}>
                    <Avatar.Image style={styles.avartarStyle} size={80} source={require('./mun.png')} />
                </Card>
            </TouchableOpacity>
        </View>
        </>
    )
};




const FollowingArtistAllList = ({route,navigation}:Props) =>{
    let data = [1,2,3,4,5,6];
    return (
        <>
        <View>
            <FlatList
                    
                        data={data}
                        renderItem={({index,item})=><><CollectionItem  navigation={navigation} route={route}></CollectionItem></>}
                        keyExtractor={(item,i) =>  i.toString()}
                    />
            <Divider color='black' orientation="horizontal"></Divider>
        </View>
        </>
        
    );
}


export default memo(FollowingArtistAllList);