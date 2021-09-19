import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React,{useState,useEffect, useLayoutEffect,memo} from 'react';
import { Text, View,StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Title, Paragraph, DataTable } from 'react-native-paper';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart';
import { commonStyle } from '~/GlobalStyle';
const styles = StyleSheet.create(
    ({
        ...commonStyle,
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

let xaxis = [...Array(30).keys()];

let sampleGenerator = ()=>{
    return xaxis.map((v,i)=>{
        return {
            x:v,
            y:Math.random()*10
        }
    })
};

let datas = {
    Medium:sampleGenerator(),
    Size:sampleGenerator(),
    Price:sampleGenerator(),
    
};

let samples = [
    {
        date :'2021.8'
        ,price:'23325'
        ,num :'24'
        ,ratio :'-40%'

    },
    {
        date :'2021.8'
        ,price:'23325'
        ,num :'24'
        ,ratio :'-40%'

    },
]

const ConditionTable = ()=>{
    return (
        <View>
        <DataTable>
        <DataTable.Header>
          <DataTable.Title>날짜</DataTable.Title>
          <DataTable.Title>가격</DataTable.Title>          
          <DataTable.Title>건수</DataTable.Title>          
          <DataTable.Title>증감율</DataTable.Title>
        </DataTable.Header>

        {samples.map((v,i)=>(
          <DataTable.Row key={i.toString()} onPress={()=>navigation.navigate('ArtistDetail',{name:v.artist_name_kor})}>
            <DataTable.Cell>{v.date}</DataTable.Cell>
            <DataTable.Cell>{v.price}</DataTable.Cell>          
            <DataTable.Cell>{v.num}</DataTable.Cell>          
            <DataTable.Cell>{v.ratio}</DataTable.Cell>          
            
          </DataTable.Row>
        ))}        

        {/* <DataTable.Pagination
          page={page}
          numberOfPages={3}
          onPageChange={(page) => setPage(page)}
          label="1-2 of 6"
          optionsPerPage={optionsPerPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          showFastPagination
          optionsLabel={'Rows per page'}
        /> */}
      </DataTable>
      </View>
    );
};


const ConditionChart = ()=>{
    let chart_keys = Object.keys(datas);
    const [chartKey,setChartKey] = useState<string>(chart_keys[0]);
    const [chartData,setChartData] = useState(datas[chart_keys[0]]);

    let changeData = (k:string)=>{
        setChartData(datas[k]);
    };

    return (
        <View>
            <Text style={styles.titleText}>CONDITION</Text>
            <View style={{flexDirection:'row'}}>
            {chart_keys.map((v,i)=>{
                return <Button mode={'outlined'} onPress={()=>changeData(v)}>{v}</Button>
            })}
            </View>
            <Chart
            style={{ height: 200, width: 400 }}
            data={chartData}
            padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
            xDomain={{ min: 0, max: 20 }}
            yDomain={{ min: 0, max: 20 }}
            >
            <VerticalAxis tickCount={11} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
            <HorizontalAxis tickCount={5} />
            <Area theme={{ gradient: { from: { color: '#ffa502' }, to: { color: '#ffa502', opacity: 0.4 } }}} />
            <Line theme={{ stroke: { color: '#ffa502', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
            </Chart>
            <ConditionTable></ConditionTable>
        </View>
    )
};


export default memo(ConditionChart);