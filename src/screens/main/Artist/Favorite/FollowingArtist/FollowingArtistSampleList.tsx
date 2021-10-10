import { NavigationHelpersContext, RouteProp } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React,{memo,useState,useEffect, useLayoutEffect} from 'react';
import { Text, View,StyleSheet, FlatList,Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Avatar, Button, Divider, Paragraph, Title } from 'react-native-paper';
import RNFetchBlob from 'rn-fetch-blob';
import { SignContext } from '~/context/SignContext';
import ApiUrl from '~/GlobalConstant';
import {SampleFlatListStyles} from '~/GlobalStyle';
import { ArtistListResult } from '~/models/ArtistList';
import { ArtistStackParamList } from '~/models/NavigationParam';
import { getRandomInt } from '~/utils/random';

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
    item : ArtistListResult;
};

const CollectionItem = ({navigation,route,item}:Props)=>{
    return (
        <View style={styles.followingArtistContainer}>
        <TouchableOpacity style={styles.sampleFlatListItemButton} onPress={()=>navigation.navigate('ArtistDetail',{artist_id:item.artist_id})}>
              {/* <ImageBackground
                source={ArtInfo.ImageUrl}
                resizeMode="cover"
                style={styles.image}
                imageStyle={styles.image_imageStyle}
              > */}
              <View style={{flexDirection:'column'}}>
                 <Avatar.Image size={60} source={{uri:item.image_url}} />
                 {/* <Text style={styles.sampleFlatListItemDescription}>{(item!==undefined && item!==null) && item.artist_name_kor.length>0 ? item.artist_name_kor : item.artist_name_eng}</Text> */}
                 <Text style={styles.sampleFlatListItemDescription}> {item.artist_name_kor}</Text>
             </View>             
            </TouchableOpacity>
        </View>
    )
};




const FollowingArtistSampleList = ({route,navigation}:Props) =>{
    const {userId} = React.useContext<ISignContext>(SignContext);
    let data = [1,2,3,4,5,6];
    let samples = data.map((v,i)=>`https://picsum.photos/${getRandomInt(400,600).toString()}`); 

    const [artist,setArtist] = useState<ArtistListResult[]>()
    // let generateSample = (nums)=>{
    //     return nums.map((v,i)=>`https://picsum.photos/${getRandomInt(400,600).toString()}`); 
    // };
    
    const getFollowingArtist = async ()=>{
        try {
            let url = `${ApiUrl['followingartists']}?userid=${userId}&sample=True`;
            let res = await RNFetchBlob.fetch('GET', url);
            setArtist(res.json());
            // console.log(res);
            //     let status = res.info().status;
            //     Alert.alert('res',status.toString());
            //     if(status == 200){                              
            //         //let tmp:Array<ArtDisplayInfo> = [...data, res.data];
            //         setArtist(res.json());
            //     }  
        } catch (error) {
            //Alert.alert('error',error.toString());
        }
        
      };

    useEffect(()=>{
        getFollowingArtist();
    },[]);


    return (
        <>
        <View style={styles.sampleFlatListContainer}>
            <View style={styles.sampleFlatListTitleContainer}>
                <Text style={styles.sampleFlatListTitleText}>FOLLOWING ARTIST</Text>
                <Button style={styles.sampleFlatListMoreButtonText} onPress={()=>navigation.navigate('ArtistList',{artist_name:'following'})}>전체보기</Button>
            </View>
            <FlatList
                        horizontal={true}
                        data={artist}
                        renderItem={({index,item})=><><CollectionItem item={item} navigation={navigation} route={route}></CollectionItem></>}
                        keyExtractor={(item,i) =>  i.toString()}
                    />
            <Divider color='black' orientation="horizontal"></Divider>
        </View>
        </>
        
    );
}


export default memo(FollowingArtistSampleList);