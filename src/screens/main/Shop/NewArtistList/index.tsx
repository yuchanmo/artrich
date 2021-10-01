import { RouteProp } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React,{memo,useState,useEffect, useLayoutEffect} from 'react';
import { Text, View,StyleSheet, FlatList, Touchable, Alert,TouchableOpacity, Platform } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

import { Avatar, Button, Card, Divider, Paragraph, Title } from 'react-native-paper';
import { getRandomInt } from '~/utils/random';

const styles = StyleSheet.create(
    ({
        cotainer:{
            flex:1
        },       
        collectionItemContainer:{
            flexDirection:'row',
            height:150,
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
        },
        floatingRegisterButtonStyle: {
            alignSelf: 'flex-end',
            position: 'absolute',
            bottom: 40,
            right:20,
            backgroundColor:'#EE80BA',
            borderRadius:60,
            height:60,
            width:50,
            alignItems:'center',
            justifyContent:'center',

        },
        surface: {
            padding: 8,
            height: 80,
            width: 80,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 4,
          },
    })
);

type Props = {
    route : RouteProp<ShopStackParamList,"ShopTabRoot">
    navigation:NativeStackScreenProps<ShopStackParamList,"ShopTabRoot">;    
};

const CollectionItem = ({navigation,route,img}:Props)=>{
    return (
        <>
        <View >
            <TouchableOpacity onPress={()=>navigation.navigate('SellDetail')}>
                <Card style={styles.collectionItemContainer}>
                    <Avatar.Image style={styles.avartarStyle} size={80} source={{uri:img}} />
                    <Card.Content style={styles.nameTitle}>
                    <Title >제목 : 문형태 싸게 팝니다</Title>
                    <Paragraph>작가 : 문형태</Paragraph>
                    <Paragraph>작품명 : 스노우볼</Paragraph>
                    <Paragraph>업로드날짜 : 2021년 8월19일</Paragraph>
                    <Paragraph>가격 : 133,242,324</Paragraph>

                    </Card.Content>
                </Card>
                
            </TouchableOpacity>
        </View>
        </>
    )
};




const NewArtistList = ({route,navigation}:Props) =>{
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
                        onEndReached={showMore}
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


export default memo(NewArtistList);