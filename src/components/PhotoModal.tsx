import React, { useState } from "react";
import { Alert, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import ImagePicker,{launchCamera,launchImageLibrary} from 'react-native-image-picker';

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

  const styles = StyleSheet.create({
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
      },
      buttonStyle:{
        width:180
    },
  });

interface Props{
    modalVisible:boolean;
    setModalVisible:React.Dispatch<React.SetStateAction<boolean>>;
    onButtonPress:(type,options)=>{};
}

const PhotoModal = ({modalVisible,setModalVisible, onButtonPress}:Props) => {  
    //const [modalVisible, setModalVisible] = useState(false);
    return (
      
      <Modal
        style={{justifyContent:'center',alignItems:'center',alignContent:'center'}}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            {actions.map(({title, type, options}) => {
            return (
              <TouchableOpacity
              style={{...styles.buttonStyle,backgroundColor:'gray'}}                                                      
              onPress={() => onButtonPress(type, options)}>
                {/* <Text>{title}</Text> */}
                <ListItem bottomDivider>
                <Icon name={ 'av-timer'} />
                <ListItem.Content>
                  <ListItem.Title>{title}</ListItem.Title>                  
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
        
              </TouchableOpacity>
            );
          })}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>        
      
    );
  };

  export default PhotoModal;