import {
    Image,
    SafeAreaView,
    StatusBar,
    Text,
    View,
    useColorScheme,
    Touchable,
    Alert,
    TouchableOpacity
  } from 'react-native';
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  import React, {FC, ReactElement, useEffect, useMemo, useState} from 'react';
  
  //import {Colors} from 'react-native/Libraries/NewAppScreen';
  import MasonryList from '@react-native-seoul/masonry-list';

import { RouteProp } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getRandomInt } from '~/utils/random';
import ApiUrl from '~/GlobalConstant';
import { ArtistArts } from '~/models/ArtistArts';
import RNFetchBlob from 'rn-fetch-blob';
import { ArtistStackParamList } from '~/models/NavigationParam';
import { ArtistListResult } from '~/models/ArtistList';
  

type Props = {
    route : RouteProp<ArtistStackParamList,"ArtistDetail">
    navigation:NativeStackScreenProps<ArtistStackParamList,"ArtistDetail">;    
    item:ArtistListResult;
};

type ThumnailProps = {
  route : RouteProp<ArtistStackParamList,"ArtistDetail">
  navigation:NativeStackScreenProps<ArtistStackParamList,"ArtistDetail">;    
  item:ArtistArts;
};
  
  const ArtThumnail = ({item,navigation,route}:ThumnailProps) => {
    const randomBool = useMemo(() => Math.random() < 0.5, []);
  
    return (
      <TouchableOpacity onPress={()=>navigation.navigate('ArtDetail',{art_info_id : item.art_info_id})} style={{marginTop: 1, flex: 1}}>   
       <View key={item.art_info_id} >    
          <Image
            source={{uri:item.image_url}}
            style={{
              height: randomBool ? 150 : 280,
              alignSelf: 'stretch',
              borderRadius:10,
              padding:5,
              margin:3
            }}
            resizeMode="cover"
          />
          <Text> {item.title_kor} </Text>
          <Text> {item.title_eng} </Text>
          <Text> {item.auction_site} </Text>
          <Text> {item.auction_cate} </Text>

          <Text
            style={{
              marginTop: 8,
            }}>
            가격
          </Text>
       
      </View>
      </TouchableOpacity>
    );
  };
  
  const ArtList = ({navigation,route,item}:Props) => {
    const {artist_id} = item;
    const isDarkMode = useColorScheme() === 'dark';
   
    const [isFetching, setIsFetching] = useState(false);

    const [arts,setArts] = useState<ArtistArts[]>([])
    const getArts = async ()=>{
        try {
            let url = `${ApiUrl['artistarts']}?artistid=${artist_id}`;
            let res = await RNFetchBlob.fetch('GET', url);
            setArts(res.json());
            console.log(res.json());
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
      getArts();
    },[]);
    let showMore = ()=>{
        setIsFetching(true);
        // let s = generateSample([1,2,3]);
        // setSamples((old)=>[...old,...s]);
        setIsFetching(false);

    };
    const backgroundStyle = {
      //backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      flex: 1,
    };
  
    // const renderItem = ({item}) => {
    //       return (
    //         <ArtThumnail item={item} />
    //       )
    // };
  
    return (
      <View style={backgroundStyle}>                
        <MasonryList
          contentContainerStyle={{
            paddingHorizontal: 10,
            alignSelf: 'stretch',
          }}          
          numColumns={2}
          data={arts}
          renderItem={({item})=> <><ArtThumnail route={route} item={item} navigation={navigation}></ArtThumnail></>}
        />     
      </View>
    );
  };
  
  export default ArtList;