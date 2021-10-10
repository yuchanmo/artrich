import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { memo } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { DataTable, Divider } from 'react-native-paper';
import RNFetchBlob from 'rn-fetch-blob';
import ApiUrl from '~/GlobalConstant';
import { commonStyle } from '~/GlobalStyle';
import { TotalRanking } from '~/models/ArtistRanking';
import { ArtistStackParamList } from '~/models/NavigationParam';
const optionsPerPage = [2, 3, 4];

const styles = StyleSheet.create(({
    ...commonStyle,
  container:{
      margin:7,
  },
//   titleText: {
//       color: "black",
//       fontSize: 20,        
//     }
}));

interface Props{
  artist_id:number;
  // Month:string;
  // route : RouteProp<ArtistStackParamList,"Analysis">
  // navigation:NativeStackScreenProps<ArtistStackParamList,"Analysis">;
}

const samples = [
    {
        name:'모유찬',
        ratio:'35%',
        avgprice:'1000',
        perprice:'1200',
        totalprice:'30000',
        numofout:'35',
        successratio:'77%'
    },
    {
        name:'모유찬',
        ratio:'35%',
        avgprice:'1000',
        perprice:'1200',
        totalprice:'30000',
        numofout:'35',
        successratio:'77%'
    },
]

interface Props{
  artist_id:number;
}

const AnalysisTable = ({artist_id}:Props) => {
  const [page, setPage] = React.useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  const [data,setData] = React.useState<Array<TotalRanking>>([]);
  //Alert.alert('analysistable',artist_id.toString())

  const initData = async () =>{
    
    try {
        let res = await RNFetchBlob.fetch('GET', `${ApiUrl['recentartistranking']}?artistid=${artist_id}`);
                    
            //let tmp:Array<ArtDisplayInfo> = [...data, res.data];
          setData(res.json());
        
    } catch (error) {
        Alert.alert('info',error.message);
        Alert.alert('info',error.stack);
    }      
    

};
  React.useEffect(() => {
    // let a = artist_id?.toString()??"";
    // Alert.alert('analysistable',a.toString())
    setPage(0);
    initData();
  }, [artist_id]);
 

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>최근 1년 순위</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>작가</DataTable.Title>
          <DataTable.Title>상승율</DataTable.Title>          
          <DataTable.Title>TOTAL_RANK</DataTable.Title>          
          <DataTable.Title>평균낙찰가</DataTable.Title>
          <DataTable.Title>호당낙찰가</DataTable.Title>          
          <DataTable.Title>최고낙찰가</DataTable.Title>          
          <DataTable.Title>총판매가</DataTable.Title>
          <DataTable.Title>출품수</DataTable.Title>
         

        </DataTable.Header>

        {data.map((v,i)=>(
          <DataTable.Row key={i.toString()}>
            <DataTable.Cell>{v.artist_name_kor_born}</DataTable.Cell>
            <DataTable.Cell>{v.increased_rate}</DataTable.Cell>          
            <DataTable.Cell>{v.total_rank}</DataTable.Cell>          
            <DataTable.Cell>{v.avg_rank}</DataTable.Cell>          
            <DataTable.Cell>{v.canvas_avg_rank}</DataTable.Cell>          
            <DataTable.Cell>{v.max_rank}</DataTable.Cell>          
            <DataTable.Cell>{v.total_sum}</DataTable.Cell>          
            <DataTable.Cell>{v.count_rank}</DataTable.Cell>  
          </DataTable.Row>
        ))}        

        
      </DataTable>
      <Divider></Divider>
    </View>
  );
}

export default memo(AnalysisTable);