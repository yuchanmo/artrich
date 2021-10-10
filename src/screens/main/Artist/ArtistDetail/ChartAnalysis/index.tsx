import React,{useState,useEffect, useLayoutEffect,memo} from 'react';
import { Text, View,StyleSheet, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';
import AnalysisTable from './AnalysisTable';
import ConditionChart from './ConditionChart';
import DetailChart from './ConditionChart';
import RankChart from './RankChart';
import { commonStyle } from '~/GlobalStyle';
import TradeRatioChart from './TradeRatioChart';

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
            <RankChart></RankChart>
            <Divider></Divider>
            <Text style={styles.titleText}>디테일차트분석</Text>
            <ConditionChart></ConditionChart>
            <TradeRatioChart></TradeRatioChart>
        </ScrollView>
        </>
        
    );
}


export default memo(ChartAnalysis);