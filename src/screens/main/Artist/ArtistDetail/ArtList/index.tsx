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
  import React, {FC, ReactElement, useMemo, useState} from 'react';
  
  //import {Colors} from 'react-native/Libraries/NewAppScreen';
  import MasonryList from '@react-native-seoul/masonry-list';

import { RouteProp } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getRandomInt } from '~/utils/random';
  

type Props = {
    route : RouteProp<ArtistStackParamList,"ArtistTabRoot">
    navigation:NativeStackScreenProps<ArtistStackParamList,"ArtistTabRoot">;    
};

  
  const ArtThumnail = ({item,navigation}) => {
    const randomBool = useMemo(() => Math.random() < 0.5, []);
  
    return (
      <TouchableOpacity onPress={()=>navigation.navigate('ArtDetail')} style={{marginTop: 1, flex: 1}}>   
       <View key={item.id} >     
       
          <Image
            source={{uri:item.imgURL}}
            style={{
              height: randomBool ? 150 : 280,
              alignSelf: 'stretch',
              borderRadius:10,
              padding:5,
              margin:3
            }}
            resizeMode="cover"
          />
          <Text> 추정가 </Text>
          <Text> 가격 </Text>
          <Text> 장소 </Text>
          <Text> 정보 </Text>

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
  
  const ArtList: FC = ({navigation,route}:Props) => {
    const isDarkMode = useColorScheme() === 'dark';
    let generateSample = (nums)=>{
        return nums.map((v,i)=>{
          return {
          id : i,
          imgURL : `https://picsum.photos/${getRandomInt(400,600).toString()}`,
          text : 'HELLO'

        };
      }); 
    };

    let data = [...Array(50).keys()];
    let tmp = generateSample(data); 
    const [samples,setSamples] = useState<any[]>(tmp);
    const [isFetching, setIsFetching] = useState(false);

    console.log(samples);
    let showMore = ()=>{
        setIsFetching(true);
        let s = generateSample([1,2,3]);
        setSamples((old)=>[...old,...s]);
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
        {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
        <MasonryList
          contentContainerStyle={{
            paddingHorizontal: 10,
            alignSelf: 'stretch',
          }}          
          numColumns={2}
          data={samples}
          renderItem={({item})=> <><ArtThumnail item={item} navigation={navigation}></ArtThumnail></>}
        />
      </View>
    );
  };
  
  export default ArtList;