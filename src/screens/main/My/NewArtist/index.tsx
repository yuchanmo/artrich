import React,{useState,useEffect, useLayoutEffect,useReducer} from 'react';
import { Text, View,StyleSheet, Alert, FlatList, ImageBackground, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Input } from 'react-native-elements';
import ImagePicker,{launchCamera,launchImageLibrary} from 'react-native-image-picker';
import { DemoButton } from './DemoButton';
import { DemoResponse } from './DemoResponse';
import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
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
        buttonStyle:{
            width:180
        },
        inputContainer:{
            flex:8
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
    })
);



const registerInfoReducer = (state,action)=>{
    //Alert.alert('info',`${action.type} - ${action.value}`);
    switch(action.type)
    {
        case 'images':
            {
                let tmp:string[] = state['images'];
                tmp.push(action.value);
                return {
                    ...state,
                    images:tmp
                };
            }
        default:
            return {
                ...state,
                [action.name]:action.value
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
    route : RouteProp<MyStackParamList,"NewArtist">
    navigation:NativeStackScreenProps<MyStackParamList,"NewArtist">;    
}


const NewArtist = ({navigation,route}:Props) =>{   
    
    const [state,dispatch] = useReducer(registerInfoReducer,{name:'',birth:'',description:'',tel:'',email:'',images:[1,2,3,4]});    
    const [response, setResponse] = React.useState<any>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const onButtonPress = React.useCallback((type, options) => {
        if (type === 'capture') {
            launchCamera(options, setResponse);
        } else {
            launchImageLibrary(options, setResponse);
        }
        setModalVisible(false);
      }, []);

    const onChangeValue = (e)=>{
        Alert.alert('info',e.target);
        //dispatch(e.target);
    };
    return (
        <>
        <View style={styles.container}>            
        <View style={styles.buttonContainer} >
        <Button
        buttonStyle={{...styles.buttonStyle,backgroundColor:'lightblue'}}
            title="SUBMIT"
            type="outline"
            onPress={()=>navigation.goBack()}
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
            <Input
            placeholder="name"                
            onChangeText={value => dispatch({type:'name',value:value}) }
            />

            <Input
            placeholder="birth"               
            onChangeText={value => dispatch({type:'birth',value:value}) }
            />  

            <Input
            placeholder="description" 
            onChangeText={value => dispatch({type:'birth',value:value}) }
            />  

            <Input
            placeholder="tel"
            errorStyle={{ color: 'red' }}
            onChangeText={value => dispatch({type:'tel',value:value}) }
            />  

            <Input
            placeholder="email"
            errorStyle={{ color: 'red' }}
            onChangeText={value => dispatch({type:'email',value:value}) }
            />  

        <View style={styles.buttonContainer2} >
            {actions.map(({title, type, options}) => {
            return (
              <DemoButton
                key={title}
                onPress={() => onButtonPress(type, options)}>
                {title}
              </DemoButton>
            );
          })}
        </View>  
        {/* <DemoResponse>{response}</DemoResponse> */}
        {response?.assets &&
          response?.assets.map(({uri}) => (
            <View key={uri} style={styles.image}>
              <Image
                resizeMode="cover"
                resizeMethod="scale"
                style={{width: 150, height: 150, padding:10}}
                source={{uri: uri}}
              />
            </View>
          ))}
                {/* <FlatList
                    numColumns={2}
                    data={state['images']}
                    renderItem={({index,item})=><><ImageBackground style={styles.artistImage} source={require('./mun.png')}></ImageBackground></>}
                    keyExtractor={(item,i) => item.title_eng + i.toString()}
                /> */}
            


        </ScrollView>
        <PhotoModal modalVisible={modalVisible} setModalVisible={setModalVisible} onButtonPress={onButtonPress}></PhotoModal>
        </View>
        </View>
        </>
        
    );
}


export default NewArtist;