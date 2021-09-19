import React,{useState,useEffect, useLayoutEffect,memo} from 'react';
import { Text, View,StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart';
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



const ReleaseDetail = ({}) =>{
    
    let imgs = [700,701,702,703,704,705].map((v,i)=>`https://picsum.photos/${v.toString()}`);
    let [image,setImage] = useState<string>(imgs[0]);
    let data = [1,2,3,4,5,6];
    console.log(imgs);
    console.log(image);
    return (
        <>
        <ScrollView>
        <Card>           
            
            <Card.Cover source={{ uri: image }} />
            <Card.Content>
                <FlatList       
                style={styles.collectionFlatListContainer}
                    numColumns={3}             
                    data={imgs}
                    renderItem={({index,item})=><><CollectionImage idx={index} img={item} onPress={()=>setImage(imgs[index])}></CollectionImage></>}
                    keyExtractor={(item,i) =>  i.toString()}
                />
                <Title>Card title</Title>
                <Paragraph>Card content</Paragraph>
            </Card.Content>
            <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
            </Card.Actions>
        </Card>
        <CollectionChartTrend></CollectionChartTrend>
        </ScrollView>
        </>
        
    );
}


export default memo(ReleaseDetail);