import {StyleSheet} from 'react-native';

export const CardFlatListStyles = StyleSheet.create({
    cardContainer:{
        height:210,
        width:'100%',
        marginBottom:1
    },
    cardImageStyle:{
        width:'100%',
        height:150,
    }
});

export const SampleImageBackGoundListStyles = StyleSheet.create({
    imageBackGround:{
        flex: 1,
        height:200,
        width:'100%',
        padding:5,
        borderRadius:20,
        justifyContent:'flex-end',
        
    },
    BackgroundImageStyle:{
        borderRadius:10,
    },
    bottomRectFiller:{
        flex: 1
    },
    bottomRect:{
        height:80
        //height: 27,
        // backgroundColor: "rgba(21,19,19,0.5)",
        //justifyContent: "flex-end",
        // alignItems:'flex-end',
        // alignContent:'flex-end'
    },
    bottomText:{
        color: "black",
        fontSize: 14,
        marginLeft : 20
    }
});

export const commonStyle = StyleSheet.create({
    titleText:{
        alignSelf :'flex-start',
        fontSize:20,
        marginLeft:20
    }
})


export const SampleFlatListStyles = StyleSheet.create({
        sampleFlatListContainer:{
            marginTop:20
        },
        sampleFlatListTitleContainer:{
            height:40,
            flexDirection:'row'
        },
        sampleFlatListTitleText:{
            alignSelf :'flex-start',
            fontSize:20,
            marginLeft:20
            
        },
        sampleFlatListMoreButtonText:{
            position:'absolute',
            right:10,
            height:50,
            fontSize:5
             
        },
        sampleFlatListItemCotainer:{            
            margin:3,
           
        },        
        sampleFlatListItemButton: {
            width: 150,
            height: 270,
            borderRadius: 5,
            overflow: "hidden"
          },
        sampleFlatListItemImage:{
            flex:1,
            width:150,
            height:150,
        },
        sampleFlatListItemImageStyle:{
            borderRadius:10
        },
        sampleFlatListItemDescriptionContainer:{           
            height: 100,
            
            justifyContent: "center"            
        },
        sampleFlatListItemDescription: {
            color: "black",
            fontSize: 14,
            alignSelf: "center"
        },
        collectionItemContainer:{
            height:100,

        }
    });


