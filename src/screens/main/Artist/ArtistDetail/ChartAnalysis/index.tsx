import React,{useState,useEffect, useLayoutEffect,memo} from 'react';
import { Text, View,StyleSheet, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';
import AnalysisTable from './AnalysisTable';
import ConditionChart from './MoneyChart';
import DetailChart from './MoneyChart';
import RankChart from './RankChart';
import { commonStyle } from '~/GlobalStyle';
import TradeRatioChart from './TradeRatioChart';
import MoneyChart from './MoneyChart';

const styles = StyleSheet.create(
    ({
        ...commonStyle,
        cotainer :{
            flex:1
        },
        

    })
);

interface Props{
    artist_id:number;
}



const ChartAnalysis = ({artist_id}:Props) =>{

    // let a = artist_id?.toString()??"";
    // Alert.alert('chart analysis',a.toString())
    return (
        <>
        <ScrollView>
            <AnalysisTable artist_id={artist_id}></AnalysisTable>
            <Divider></Divider>
            <RankChart artist_id={artist_id}></RankChart>
            <Divider></Divider>
            {/* <Text style={styles.titleText}>디테일차트분석</Text> */}
            <MoneyChart  artist_id={artist_id}></MoneyChart>
            {/* <TradeRatioChart></TradeRatioChart> */}
        </ScrollView>
        </>
        
    );
}


export default memo(ChartAnalysis);