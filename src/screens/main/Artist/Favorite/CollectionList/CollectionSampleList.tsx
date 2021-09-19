import { NavigationHelpersContext, RouteProp } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React,{memo,useState,useEffect, useLayoutEffect} from 'react';
import { Text, View,StyleSheet, FlatList,Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Button, Divider, Paragraph, Title } from 'react-native-paper';
import {SampleFlatListStyles} from '~/GlobalStyle';
import { getRandomInt } from '~/utils/random';

const styles = StyleSheet.create(
    ({
        ...SampleFlatListStyles,
        cotainer:{
            flex:1
        },        
      
    })
);

type Props = {
    route : RouteProp<ArtistStackParamList,"CollectionSampleList">
    navigation:NativeStackScreenProps<ArtistStackParamList,"CollectionSampleList">;    
};

const CollectionItem = ({navigation,route,img}:Props)=>{
    return (
        <View style={styles.sampleFlatListItemCotainer}>
        <TouchableOpacity style={styles.sampleFlatListItemButton} onPress={()=>navigation.navigate('CollectionDetail')}>
              {/* <ImageBackground
                source={ArtInfo.ImageUrl}
                resizeMode="cover"
                style={styles.image}
                imageStyle={styles.image_imageStyle}
              > */}
              <ImageBackground
                source={{uri:img}}
                resizeMode="cover"
                style={styles.sampleFlatListItemImage}
                imageStyle={styles.sampleFlatListItemImageStyle}
              >               
                
              </ImageBackground>
              <View style={styles.sampleFlatListItemDescriptionContainer}>
                   <Text style={styles.sampleFlatListItemDescription}>작가</Text>
                  <Text style={styles.sampleFlatListItemDescription}>작품이름</Text>
                  <Text style={styles.sampleFlatListItemDescription}>소장일</Text>                  
                  <Text style={styles.sampleFlatListItemDescription}>구입가</Text>                  
                  <Text style={styles.sampleFlatListItemDescription}>증감률</Text>                  
                </View>
            </TouchableOpacity>
        </View>
    )
};




const CollectionSampleList = ({route,navigation}:Props) =>{

    let data = [1,2,3,4,5,6];
    let samples = data.map((v,i)=>`https://picsum.photos/${getRandomInt(700,800).toString()}`); 
    console.log(samples);
    return (
        <>
        <View style={styles.sampleFlatListContainer}>
            <View style={styles.sampleFlatListTitleContainer}>
                <Text style={styles.sampleFlatListTitleText}>MY COLLECTION</Text>
                <Button style={styles.sampleFlatListMoreButtonText} onPress={()=>navigation.navigate('CollectionAllList')}>전체보기</Button>
            </View>
            <FlatList
                        horizontal={true}
                        data={samples}
                        renderItem={({index,item})=><><CollectionItem img={item}  navigation={navigation} route={route}></CollectionItem></>}
                        keyExtractor={(item,i) =>  i.toString()}
                    />
            <Divider color='black' orientation="horizontal"></Divider>
        </View>
        </>
        
    );
}


export default memo(CollectionSampleList);