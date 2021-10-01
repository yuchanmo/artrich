import { RouteProp } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React,{memo,useState,useEffect, useLayoutEffect} from 'react';
import { Text, View,StyleSheet, FlatList, Touchable, Alert,TouchableOpacity } from 'react-native';

import { Avatar, Card, Divider, Paragraph, Title } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFetchBlob from 'rn-fetch-blob';
import { SignContext } from '~/context/SignContext';
import ApiUrl from '~/GlobalConstant';
import { ArtistListResult } from '~/models/ArtistList';
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
            top : 20,
            color:'black'
        },
        
    })
);

type Props = {
    route : RouteProp<ArtistStackParamList,"ArtistList">
    navigation:NativeStackScreenProps<ArtistStackParamList,"ArtistList">;   
    item : ArtistListResult; 
};

const CollectionItem = ({navigation,route,item}:Props)=>{
    return (
        <>
        <View >
            <TouchableOpacity onPress={()=>navigation.navigate('ArtistDetail')}>
                <Card style={styles.collectionItemContainer}>
                    <Avatar.Image style={styles.avartarStyle} size={80} source={{uri:item.image_url}} />
                    <Card.Content style={styles.nameTitle}>
                    <Title >{item.artist_name_kor}</Title>
                    <Paragraph >{item.artist_name_eng}</Paragraph>
                    <Ionicons name={'heart'} size={20} color={'red'} />
                    </Card.Content>
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

    
    const getArtist = async ()=>{
        try {
            let url = artist_name==='following' ? `${ApiUrl['followingartists']}?userid=${userId}&sample=False`:  `${ApiUrl['artist']}?artistname=${artist_name}`;
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
        getArtist();
    },[]);



        
    let showMore = ()=>{
        // setIsFetching(true);
        // let s = generateSample([1,2,3]);
        // setSamples((old)=>[...old,...s]);
        // setIsFetching(false);

    };
    return (
        <>
        <View>
            <FlatList
                        refreshing={isFetching}
                        onEndReached={showMore}
                        data={artist}
                        progressViewOffset={100}
                        renderItem={({index,item})=><><CollectionItem item={item} navigation={navigation} route={route}></CollectionItem></>}
                        keyExtractor={(item,i) =>  i.toString()}
                    />
            <Divider color='black' orientation="horizontal"></Divider>
        </View>
        </>
        
    );
}


export default memo(ArtistList);