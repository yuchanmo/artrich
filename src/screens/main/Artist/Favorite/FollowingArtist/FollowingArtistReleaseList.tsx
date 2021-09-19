import { RouteProp } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React,{memo,useState,useEffect, useLayoutEffect} from 'react';
import { Text, View,StyleSheet, FlatList, Touchable, Alert,TouchableOpacity, ImageBackground } from 'react-native';
import { Avatar, Button, Card, Divider, Paragraph, Title } from 'react-native-paper';
import {CardFlatListStyles,SampleFlatListStyles,SampleImageBackGoundListStyles} from '~/GlobalStyle';
import { getRandomInt } from '~/utils/random';

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

const CollectionItem = ({navigation,route,img}:Props)=>{
    return (
        <>
        
            <TouchableOpacity style={styles.cardContainer} onPress={()=>Alert.alert('info','info')}>
            <ImageBackground
                source={{uri : img}}
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




const FollowingArtistReleaseList = ({route,navigation}:Props) =>{
    let generateSample = (nums)=>{
        return nums.map((v,i)=>`https://picsum.photos/${getRandomInt(400,600).toString()}`); 
    };

    let data = [1,2,3];
    let tmp = generateSample(data); 
    const [samples,setSamples] = useState<string[]>(tmp);
    
        
    let showMore = ()=>{
        let s = generateSample([1,2,3]);
        setSamples((old)=>[...old,...s]);

    };
    return (
        <>
        <View style={styles.sampleFlatListContainer}>
            <View style={styles.sampleFlatListTitleContainer}>
                <Text style={styles.sampleFlatListTitleText}>RELEASE</Text>
                {/* <Button style={styles.sampleFlatListMoreButtonText} onPress={()=>navigation.navigate('FollowingArtistAllList')}>전체보기</Button> */}
            </View>
            <FlatList                    
                data={samples}
                renderItem={({index,item})=><><CollectionItem img={item} navigation={navigation} route={route}></CollectionItem></>}
                keyExtractor={(item,i) =>  i.toString()}
            />
            <Button onPress={()=>showMore()}>MORE</Button>
            <Divider color='black' orientation="horizontal"></Divider>
        </View>       
        </>
        
    );
}


export default memo(FollowingArtistReleaseList);