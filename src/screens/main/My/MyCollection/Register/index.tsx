import React,{useState,useEffect, useLayoutEffect,useReducer, useContext} from 'react';
import { Text, View,StyleSheet, Alert, FlatList, ImageBackground, ScrollView, Image, Modal, Pressable, TouchableOpacity, TouchableOpacityBase, Touchable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Input, ListItem } from 'react-native-elements';
import ImagePicker,{launchCamera,launchImageLibrary} from 'react-native-image-picker';

import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RNFetchBlob from 'rn-fetch-blob';
import ApiUrl from '~/GlobalConstant';
import { SignContext } from '~/context/SignContext';
import PhotoModal from '~/components/PhotoModal';

const styles = StyleSheet.create(
    ({
        container:{
            flex:1
            ,margin:15
        },
        buttonContainer:{
            flex:1,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-around'
        },
        collectionImage:{

        },
        buttonStyle:{
            width:180
        },
        inputContainer:{
            flex:8
        },
        imageAddContainer:{
          flexDirection:'row',
          justifyContent:'center',
          alignItems:'center'
        },
        artistImage:{
            width:160,
            height:160,
            margin:20
        },
        buttonContainer2: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginVertical: 8,
          },
        
          image: {
            marginVertical: 24,
            alignItems: 'center',
          },
          centeredView: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
            
          },
          modalView: {             
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width:300,
            height:300,  
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,            
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
          },
          button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2
          },
          buttonOpen: {
            backgroundColor: "#F194FF",
          },
          buttonClose: {
            backgroundColor: "#2196F3",
          },
          textStyle: {
            color: "white",
            fontWeight: "bold",
            textAlign: "center"
          },
          modalText: {
            marginBottom: 15,
            textAlign: "center"
          },
          modalShowButton:{
            width:150,height:150,alignItems:'center',justifyContent:'center'
          }
    })
);



const registerInfoReducer = (state,action)=>{
    //Alert.alert('info',`${action.type} - ${action.value}`);
    Alert.alert('info',`${action.type.toString()}-${action.value.toString()}`)
    switch(action.type)
    {        
        default:
            return {
                ...state,
                [action.type]:action.value
            };
    }    
};


interface Action {
    title: string;
    type: 'capture' | 'library';
    options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
  }
  
  const actions: Action[] = [
    {
      title: 'CAMERA',
      type: 'capture',
      options: {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: false,
      },
    },
    {
      title: 'GALLERY',
      type: 'library',
      options: {
        maxHeight: 200,
        maxWidth: 200,
        selectionLimit: 0,
        mediaType: 'photo',
        includeBase64: false,
      },
    },   
  ];

  interface Props{
    route : RouteProp<MyStackParamList,"MyCollection">
    navigation:NativeStackScreenProps<MyStackParamList,"MyCollection">;    
}




const MyCollection = ({navigation,route}:Props) =>{   
    const {userId} = useContext<ISignContext>(SignContext);
    const [state,dispatch] = useReducer(registerInfoReducer,
      {
        user_id :userId
      ,artist_name:''
      ,artist_id:0 
      ,title_kor:''
      ,title_eng:''
      ,unit_cd:''
      ,size_length:''
      ,size_height:''
      ,canvas:''
      ,edition:''
      ,image_name:''
      ,buy_date:Date.now()
      ,price:0
      ,create_time:Date.now()
    });    
    const [response, setResponse] = React.useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState(false);


    const onButtonPress = React.useCallback((type, options) => {
      if (type === 'capture') {            
          launchCamera(options,(res)=>{
              Alert.alert('info',JSON.stringify(res));
              setResponse(o=>[...o,res]);                
          });
      } else {
          launchImageLibrary(options, (res)=>{
              setResponse(o=>[...o,res]);                
          });
      }
      setModalVisible(false)
    }, []);
 
    const searchArtistIfExist = ()=>{

    };

    //신규데이터 추가
    const postData = async ()=>{
      try {        
        let saved_image:any[] = [];
        if(response.length>0){
          saved_image = response.map((v,i)=>{
            let s = v['assets'][0];
            return {
              name : 'images',
              filename : s['fileName'],
              type : s['type'],
              data : RNFetchBlob.wrap(s['uri'])
            }
          })
        }
        Alert.alert('info',JSON.stringify(state));

        let res = await RNFetchBlob.fetch('POST', ApiUrl["mycollection"], {        
        'Content-Type' : 'multipart/form-data'},
        [
          {
            name : 'info'          
            ,data : JSON.stringify(state)
          },
          ...saved_image
        ]);
        
        if(res.text()=='OK'){
          navigation.goBack();
        }
        else{
          Alert.alert('info','대실패');
        }                
      } catch (error) {
        Alert.alert('info',error.toString());        
      }
    };
    

   
    return (
        <>
        <View style={styles.container}>            
        
        <View style={styles.buttonContainer} >
            <Button
            buttonStyle={{...styles.buttonStyle,backgroundColor:'lightblue'}}
                title="SUBMIT"
                type="outline"
                onPress={()=>postData()}
                />

            <Button        
            buttonStyle={{...styles.buttonStyle,backgroundColor:'gray'}}
            titleStyle={{color:'white'}}
            title="CANCLE"
            type="outline"
            onPress={()=>navigation.goBack()}
            />

        </View>    
        <View style={styles.inputContainer}>
          <ScrollView >              
          <View style={styles.imageAddContainer}>
              <TouchableOpacity  style={styles.modalShowButton} onPress={()=>setModalVisible(true)}>
                <Image 
                  source={require('~/assets/images/addimage.png')} 
                  style={{width:100,height:100}}
                ></Image>
              </TouchableOpacity>
        
              <FlatList
                      horizontal={true}
                      data={response}
                      renderItem={({index,item})=><>{item?.assets.map(({uri}) => (
                          <View key={uri} style={{...styles.image,margin:5}}>
                            <Image
                              resizeMode="cover"
                              resizeMethod="scale"
                              style={{width: 150, height: 150}}
                              source={{uri: uri}}
                            />
                          </View>))}</>}
                      keyExtractor={(item,i) => item.title_eng + i.toString()}
                /> 
        
            </View> 
                
              <Input
              placeholder="작가이름"                
              onChangeText={value => dispatch({type:'artist_name',value:value}) }
              />

              <Input
              placeholder="작품명(한글)"               
              onChangeText={value => dispatch({type:'title_kor',value:value}) }
              />
               <Input
              placeholder="작품명(영어)"               
              onChangeText={value => dispatch({type:'title_eng',value:value}) }
              />
              
              <Input
              placeholder="단위"               
              onChangeText={value => dispatch({type:'unit_cd',value:value}) }
              />  

              <Input
              placeholder="세로크기" 
              onChangeText={value => dispatch({type:'size_height',value:value}) }
              />  

              <Input
              placeholder="가로크기"
              errorStyle={{ color: 'red' }}
              onChangeText={value => dispatch({type:'size_length',value:value}) }
              />  

             
              <Input
              placeholder="가로크기"
              errorStyle={{ color: 'red' }}
              onChangeText={value => dispatch({type:'size_length',value:value}) }
              />  


              <Input
              placeholder="소장금액"
              errorStyle={{ color: 'red' }}
              onChangeText={value => dispatch({type:'price',value:value}) }
              />  

              <Input
              placeholder="소장일자"
              errorStyle={{ color: 'red' }}
              onChangeText={value => dispatch({type:'buy_date',value:value}) }
              />  


          


          </ScrollView>
        </View>
        <View style={{height:0}}>
        <PhotoModal modalVisible={modalVisible} setModalVisible={setModalVisible} onButtonPress={onButtonPress}></PhotoModal>
        </View>
        </View>
        </>
        
    );
}


export default MyCollection;