import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React,{useState,useEffect, useLayoutEffect} from 'react';
import { Text, View,StyleSheet, FlatList, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import CountDown from 'react-native-countdown-component';
import RNFetchBlob from 'rn-fetch-blob';
import { getRandomInt } from '~/utils/random';


const styles = StyleSheet.create(({
    releaseContainer:{
        flex:1
    },
    titleText: {
        color: "black",
        fontSize: 20,        
      },
      container:{
        flex:1,
        width:'100%',    
        height:200,
        margin: 3,
        marginBottom:50
      },
      releaseInfoContainer:{
        height:40,
        flexDirection:'row'
      },
      releaseTitle:{
    
      },
      button2: {
        width:'100%',
        height:'100%',
        backgroundColor: "rgba(230, 230, 230,1)",
        elevation: 18,
        borderRadius: 5,
        overflow: "hidden"
      },
      image: {
        flex: 1
      },
      image_imageStyle: {},
        rect8Filler: {
          flex: 1
        },
        rect8: {
          height: 27,
          backgroundColor: "rgba(21,19,19,0.5)",
          justifyContent: "center"
        },
      
        text22: {
          color: "rgba(247,252,253,1)",
          fontSize: 14,
          alignSelf: "center"
        },
        countDown: {                 
          width: 100,
          height: 80,      
          position:'absolute',
         bottom:0,
         right:70
        },       
        dateText:{
         position:'absolute',
         right:10
        }
}));

interface Props{
    route : RouteProp<ReleaseStackParamList,"ReleaseList">
    navigation:NativeStackScreenProps<ReleaseStackParamList,"ReleaseList">;    
}


const ReleaseThumnail = ({route,navigation,img,t}:Props) =>{
    let timeNumber:number = getRandomInt(400,1000)*1000;
    
      useEffect(()=>{
        timeNumber =  getRandomInt(400,1000)*1000;
    
      },[]);
    
    return (
        <>
        <View style={styles.container}>
        <View style={styles.releaseInfoContainer}>
            <Text style={styles.titleText}>아티스트</Text>
            <Text style={styles.dateText}>옥션날짜</Text>
        </View>
        <TouchableOpacity style={styles.button2} onPress={()=>navigation.navigate('ReleaseDetail')}>       
            
            <ImageBackground
                source={{uri:img}}
                resizeMode="cover"
                style={styles.image}
                imageStyle={styles.image_imageStyle}
            >          
            </ImageBackground>
            <View>
                <CountDown style={styles.countDown}
                    until={timeNumber}
                    
                    size={20}
                />
                </View>
            
            </TouchableOpacity>
        </View>
        </>          
    );
};

  


const ReleaseList = ({route,navigation}:Props) =>{
    //const [data,setData] = useState<Array<ArtDisplayInfo>>([]);
    let generateSample = (nums)=>{
      return nums.map((v,i)=>`https://picsum.photos/${getRandomInt(0,600).toString()}`); 
    };

    let data = [1,2,3];
    let tmp = generateSample(data); 
    const [samples,setSamples] = useState<string[]>(tmp);
  
    const initData = async () =>{
        // try {
        //     let res = await RNFetchBlob.fetch('GET', 'http://20.85.245.228:9999/collection');
        //     let status = res.info().status;
        //     //Alert.alert('info',status)
        //     if(status == 200){                              
               
        //         setData(res.json());
        //     }
            
        // } catch (error) {
        //     Alert.alert('info',error.message);
        //     Alert.alert('info',error.stack);
        // }       
        

    };

    useEffect(()=>{
        initData();

    },[]);

    let showMore = ()=>{
      let s = generateSample([1,2,3]);
      setSamples((old)=>[...old,...s]);

  };
    return (
    <>    
      <View style={styles.releaseContainer}>
           
            <FlatList                   
                    data={samples}
                    renderItem={({index,item})=><><ReleaseThumnail t={index*100} img={item} route={route} navigation={navigation}></ReleaseThumnail></>}
                    keyExtractor={(item,i) => i.toString()}
                />
             {/* <FlatList                   
                    data={data}
                    renderItem={({index,item})=><><Text>SSFSDG</Text></>}
                    keyExtractor={(item,i) => item.title_eng + i.toString()}
                /> */}
              <Button onPress={showMore}>MORE</Button>
            <Divider color='red' orientation="horizontal"></Divider>
        </View>
    </>
    );
}


export default ReleaseList;