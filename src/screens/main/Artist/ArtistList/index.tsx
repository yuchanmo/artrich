import { RouteProp } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React,{memo,useState,useEffect, useLayoutEffect} from 'react';
import { Text, View,StyleSheet, FlatList, Touchable, Alert,TouchableOpacity, ActivityIndicator } from 'react-native';

import { Avatar, Card, Divider, Paragraph, Title } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFetchBlob from 'rn-fetch-blob';
import { SignContext } from '~/context/SignContext';
import ApiUrl from '~/GlobalConstant';
import { ArtistListResult } from '~/models/ArtistList';
import { ArtistStackParamList } from '~/models/NavigationParam';
import { getRandomInt } from '~/utils/random';

const styles = StyleSheet.create(
    ({
        cotainer:{
            flex:1
        },       
        collectionItemContainer:{
            flexDirection:'column',
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
            left:100,
            top : 20,
            color:'black'
        },
        heartStyle:{
            position:'absolute',
            right:30,
            top : 30,
        }
        
    })
);

type Props = {
    route : RouteProp<ArtistStackParamList,"ArtistList">
    navigation:NativeStackScreenProps<ArtistStackParamList,"ArtistList">;   
    item : ArtistListResult; 
    userId:number;
};

const CollectionItem = ({navigation,route,item,userId}:Props)=>{
    const [turnOn,setTurnOn] = useState<boolean>(item.turn_on);

    const updateFollowingStatus = async () =>{
        let res = await RNFetchBlob.fetch('POST', ApiUrl["followingartists"],
        { 'Content-Type': 'application/json'},
        JSON.stringify({userid: userId,artistid:item.artist_id,turnon:turnOn})
         );
         Alert.alert('result', res.json()['turn_on'].toString());
    };

    const toggleHeart = async ()=>{
        updateFollowingStatus();
        setTurnOn(!turnOn);
    };

    return (
        <>
        <View >
            <TouchableOpacity onPress={()=>navigation.navigate('ArtistDetail',{artist_id:item.artist_id})}>
                <Card style={styles.collectionItemContainer}>
                    <Avatar.Image style={styles.avartarStyle} size={80} source={{uri:item.image_url}} />
                    <View style={styles.nameTitle}>
                    
                        <Title >{item.artist_name_kor}</Title>
                        <Paragraph >{item.artist_name_eng}</Paragraph>
                    
                    </View>
                    <View style={styles.heartStyle}>
                    <TouchableOpacity onPress={toggleHeart}>
                        {
                            turnOn == true 
                            ? <Ionicons name={'heart'} size={30} color={'red'} />
                            : <Ionicons name={'heart'} size={30} color={'gray'} />
                        }
                    </TouchableOpacity>
                   </View>
                </Card>
                
            </TouchableOpacity>
        </View>
        </>
    )
};




const ArtistList = ({route,navigation}:Props) =>{
    const {userId} = React.useContext<ISignContext>(SignContext);
    let {artist_name} = route.params;
    const [artist,setArtist] = useState<ArtistListResult[]>()
    const [isFetching, setIsFetching] = useState(false);
    const [isLoading,setIsLoading] = useState<boolean>(false);

    const getArtist = async ()=>{
        try {            
            setIsLoading(true);
            let url = artist_name==='following' ? `${ApiUrl['followingartists']}?userid=${userId}&sample=False`:  `${ApiUrl['artist']}?artistname=${artist_name}&userid=${userId}`;            
            //Alert.alert('info',url);
            let res = await RNFetchBlob.fetch('GET', url);            
            setArtist(res.json());
            setIsLoading(false);
            //Alert.alert('info',res[0].artist_id.toString());
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
        getArtist();
    },[]);

    useEffect(()=>{
        getArtist();
    },[artist_name]);

    useLayoutEffect(()=>{
        navigation.setOptions({
          headerTitle:"작가 검색 결과"
        });
      }, [navigation]);

        
    let showMore = ()=>{
        // setIsFetching(true);
        // let s = generateSample([1,2,3]);
        // setSamples((old)=>[...old,...s]);
        // setIsFetching(false);

    };
    return (
        <>
        <View>
        {isLoading &&<ActivityIndicator size="large" color="#00ff00" />}
            <FlatList
                        refreshing={isFetching}
                        onEndReached={showMore}
                        data={artist}
                        progressViewOffset={100}
                        renderItem={({index,item})=><><CollectionItem userId={userId} item={item} navigation={navigation} route={route}></CollectionItem></>}
                        keyExtractor={(item,i) =>  i.toString()}
                    />
            <Divider color='black' orientation="horizontal"></Divider>
        </View>
        </>
        
    );
}


export default memo(ArtistList);