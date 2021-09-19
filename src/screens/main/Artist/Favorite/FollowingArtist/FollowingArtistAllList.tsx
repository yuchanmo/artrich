import { RouteProp } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React,{memo,useState,useEffect, useLayoutEffect} from 'react';
import { Text, View,StyleSheet, FlatList, Touchable, Alert,TouchableOpacity } from 'react-native';

import { Avatar, Card, Divider, Title } from 'react-native-paper';
import { getRandomInt } from '~/utils/random';

const styles = StyleSheet.create(
    ({
        cotainer:{
            flex:1
        },       
        collectionItemContainer:{
            flexDirection:'row',
            height:100,
            margin:5
        },
        avartarStyle :{
            alignContent:'center',
            justifyContent:'center',
            margin:5
        },
        nameTitle:{
            position:'absolute',
            right:10,
            color:'black'
        }
    })
);

type Props = {
    route : RouteProp<ArtistStackParamList,"ArtistTabRoot">
    navigation:NativeStackScreenProps<ArtistStackParamList,"ArtistTabRoot">;    
};

const CollectionItem = ({navigation,route,img}:Props)=>{
    return (
        <>
        <View >
            <TouchableOpacity onPress={()=>navigation.navigate('ArtistDetail')}>
                <Card style={styles.collectionItemContainer}>
                    <Avatar.Image style={styles.avartarStyle} size={80} source={{uri:img}} />
                </Card>
                <Title style={styles.nameTitle}>작가이름</Title>
            </TouchableOpacity>
        </View>
        </>
    )
};




const FollowingArtistAllList = ({route,navigation}:Props) =>{
    let generateSample = (nums)=>{
        return nums.map((v,i)=>`https://picsum.photos/${getRandomInt(400,600).toString()}`); 
    };

    let data = [1,2,3,4,5,6];
    let tmp = generateSample(data); 
    const [samples,setSamples] = useState<string[]>(tmp);
    const [isFetching, setIsFetching] = useState(false);

        
    let showMore = ()=>{
        setIsFetching(true);
        let s = generateSample([1,2,3]);
        setSamples((old)=>[...old,...s]);
        setIsFetching(false);

    };
    return (
        <>
        <View>
            <FlatList
                        refreshing={isFetching}
                        onRefresh={showMore}
                        data={samples}
                        progressViewOffset={100}
                        renderItem={({index,item})=><><CollectionItem img={item} navigation={navigation} route={route}></CollectionItem></>}
                        keyExtractor={(item,i) =>  i.toString()}
                    />
            <Divider color='black' orientation="horizontal"></Divider>
        </View>
        </>
        
    );
}


export default memo(FollowingArtistAllList);