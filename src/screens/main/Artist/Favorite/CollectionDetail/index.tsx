import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React,{useState,useEffect, useLayoutEffect,memo} from 'react';
import { Text, View,StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart';
import { MyCollection } from '~/models/MyCollection';
import { ArtistStackParamList } from '~/models/NavigationParam';
const styles = StyleSheet.create(
    ({
        cotainer:{
            flex:1
        },
        collectionFlatListContainer:{
            alignSelf:'center',
        },
        collectionImageContainer:{
            margin:3
        },
        collectionImage:{
            height:60,
            width:60,
            borderRadius:10,
        }

    })
);


const Tab = createMaterialTopTabNavigator<ArtistStackParamList>();

const ArtistTabRoot = ({route,navigation}:Props)=>{
    let [serachingName,setSearchingName] = useState<string>('');
    return (
        <>
        <View style={{flex:1}}>           
            <Tab.Navigator>
                <Tab.Screen name="Favorite" component={Favorite} options={{swipeEnabled:false}} />
                <Tab.Screen name="Analysis" component={Analysis} options={{swipeEnabled:false}}/>
                <Tab.Screen name="EasyPick" component={EasyPick} options={{swipeEnabled:false}}/>
                {/* <Tab.Screen name="EasyPick" component={EasyPick} options={{swipeEnabled:false}}/> */}
            </Tab.Navigator>
        </View>
        </>
    );
};

const CollectionChartTrend = ()=>{
    return (
        <Chart
        style={{ height: 200, width: 400 }}
        data={[
            { x: -2, y: 15 },
            { x: -1, y: 10 },
            { x: 0, y: 12 },
            { x: 1, y: 7 },
            { x: 2, y: 6 },
            { x: 3, y: 8 },
            { x: 4, y: 10 },
            { x: 5, y: 8 },
            { x: 6, y: 12 },
            { x: 7, y: 14 },
            { x: 8, y: 12 },
            { x: 9, y: 13.5 },
            { x: 10, y: 18 },
        ]}
        padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
        xDomain={{ min: -2, max: 10 }}
        yDomain={{ min: 0, max: 20 }}
        >
        <VerticalAxis tickCount={11} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
        <HorizontalAxis tickCount={5} />
        <Area theme={{ gradient: { from: { color: '#ffa502' }, to: { color: '#ffa502', opacity: 0.4 } }}} />
        <Line theme={{ stroke: { color: '#ffa502', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
        </Chart>
    )
};

const CollectionImage = ({img,idx,onPress})=>{
    return (
        <View style={styles.collectionImageContainer}>
            <TouchableOpacity onPress={onPress}>        
                <Image source={{uri : img}} style={styles.collectionImage}></Image>        
            </TouchableOpacity>
        </View>
    );
};

interface Props{
    route : RouteProp<ArtistStackParamList,"CollectionDetail">
    navigation:NativeStackScreenProps<ArtistStackParamList,"CollectionDetail">;    
};


const CollectionDetail = ({route,navigation}:Props) =>{
    useLayoutEffect(()=>{
        navigation.setOptions({
          headerTitle:"컬렉션 상세 설명"
        });
      }, [navigation]);

    const {collection} = route.params;
    let [image,setImage] = useState<string>(collection?.img_list.length>0?collection.img_list[0]:""??"");
    return (
        <>
        <ScrollView>
        <Card>           
            
            <Card.Cover source={{ uri: image }} />
            <Card.Content>
                <FlatList       
                style={styles.collectionFlatListContainer}
                    numColumns={3}             
                    data={collection.img_list}
                    renderItem={({index,item})=><><CollectionImage idx={index} img={item} onPress={()=>setImage(collection.img_list[index])}></CollectionImage></>}
                    keyExtractor={(item,i) =>  i.toString()}
                />
                <Title>{collection.title_kor}</Title>
                <Title>({collection.title_eng})</Title>
                <Paragraph>{collection.artist_name_kor}</Paragraph>
                <Paragraph>{collection.size_height} x {collection.size_length}</Paragraph>
                <Paragraph>ED{collection.edition}</Paragraph>
                <Paragraph>{collection.buy_date}</Paragraph>
                <Paragraph>{collection.price}</Paragraph>

            </Card.Content>
      
        </Card>
        <CollectionChartTrend></CollectionChartTrend>
        </ScrollView>
        </>
        
    );
}


export default memo(CollectionDetail);