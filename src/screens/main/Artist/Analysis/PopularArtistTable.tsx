import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { memo } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { Button, DataTable, Divider } from 'react-native-paper';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart';
import RNFetchBlob from 'rn-fetch-blob';
import ApiUrl from '~/GlobalConstant';
import { commonStyle } from '~/GlobalStyle';
import { ArtistStackParamList } from '~/models/NavigationParam';
import {AristRanking} from '~/models/ArtistRanking';
import { ScrollView } from 'react-native-gesture-handler';
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
  Month:string;
  route : RouteProp<ArtistStackParamList,"ArtistTabRoot">
  navigation:NativeStackScreenProps<ArtistStackParamList,"ArtistTabRoot">;    
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

const ResultTable = ({data,rankType})=>{
  switch(rankType){
    case 'count':
      return (   
        <DataTable>
            <DataTable.Header>
              <DataTable.Title>작가</DataTable.Title>
              <DataTable.Title>카운트</DataTable.Title>          
              <DataTable.Title>랭킹</DataTable.Title>          
              <DataTable.Title>상승률</DataTable.Title>               
            </DataTable.Header>
    
            {(data !==undefined && data !==null) && data.map((v,i)=>(
              <DataTable.Row key={i.toString()} onPress={()=>navigation.navigate('ArtistDetail')}>
                <DataTable.Cell>{v.artist_name_kor_born}</DataTable.Cell>
                <DataTable.Cell>{v.count}</DataTable.Cell>          
                <DataTable.Cell>{v.rank}</DataTable.Cell>          
                <DataTable.Cell>{v.increased_rate}</DataTable.Cell>        
              </DataTable.Row>
            ))}                
          </DataTable>    
      );
    case 'total':
      return (
   
        <DataTable>
            <DataTable.Header>
              <DataTable.Title>작가</DataTable.Title>
              <DataTable.Title>상승률</DataTable.Title> 
              <DataTable.Title>평균랭킹</DataTable.Title> 
              <DataTable.Title>호당랭킹</DataTable.Title> 
              <DataTable.Title>최고랭킹</DataTable.Title> 
              <DataTable.Title>합랭킹</DataTable.Title> 
              <DataTable.Title>갯수랭킹</DataTable.Title> 
              <DataTable.Title>총합</DataTable.Title>          
              <DataTable.Title>총랭킹</DataTable.Title>          
                            
            </DataTable.Header>
    
            {(data !==undefined && data !==null) && data.map((v,i)=>(
              <DataTable.Row key={i.toString()} onPress={()=>navigation.navigate('ArtistDetail')}>
                <DataTable.Cell>{v.artist_name_kor_born}</DataTable.Cell>
                <DataTable.Cell>{v.increased_rate}</DataTable.Cell>          
                <DataTable.Cell>{v.avg_rank}</DataTable.Cell>          
                <DataTable.Cell>{v.canvas_avg_rank}</DataTable.Cell>        
                <DataTable.Cell>{v.max_rank}</DataTable.Cell>        
                <DataTable.Cell>{v.sum_rank}</DataTable.Cell>       
                <DataTable.Cell>{v.count_rank}</DataTable.Cell>  
                <DataTable.Cell>{v.total_sum}</DataTable.Cell>  
                <DataTable.Cell>{v.total_rank}</DataTable.Cell>  
              </DataTable.Row>
            ))}                
          </DataTable>
    
      );
      default:
        return (
   
          <DataTable>
              <DataTable.Header>
                <DataTable.Title>작가</DataTable.Title>
                <DataTable.Title>금액</DataTable.Title>          
                <DataTable.Title>랭킹</DataTable.Title>          
                <DataTable.Title>상승률</DataTable.Title>               
              </DataTable.Header>
      
              {(data !==undefined && data !==null) && data.map((v,i)=>(
                <DataTable.Row key={i.toString()} onPress={()=>navigation.navigate('ArtistDetail')}>
                  <DataTable.Cell>{v.artist_name_kor_born}</DataTable.Cell>
                  <DataTable.Cell>{v.money}</DataTable.Cell>          
                  <DataTable.Cell>{v.rank}</DataTable.Cell>          
                  <DataTable.Cell>{v.increased_rate}</DataTable.Cell>        
                </DataTable.Row>
              ))}                
            </DataTable>
      
        );
  }

};



const PopularArtistTable = ({route,navigation}:Props)  => {
  // const [page, setPage] = React.useState<number>(0);
  // const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  //const [data,setData] = React.useState<Array<FavoriteRank>>([]);
  const [data,setData] =React.useState<AristRanking>({avg:[],canvas:[],count:[],max:[],recent:[],sum:[],total:[]});
  const initData = async () =>{
    try {
        let res = await RNFetchBlob.fetch('GET', ApiUrl['artistranking']);      
        //Alert.alert('info', JSON.stringify(res.json()))  
        let tmp = res.json();
        setData(tmp);            
        setTableData(tmp['avg'])    
    } catch (error) {
        Alert.alert('info',error.message);
        Alert.alert('info',error.stack);
    }      
    

};
  React.useEffect(() => {    
    initData();
  }, []);

  let filterButton = {'평균낙찰가':'avg','TOTAL RANK':'total','호당낙찰가':'canvas','최고낙찰가':'max','총낙찰가':'sum','출품수':'count'};
  let [filterKey,setFilterKey] = React.useState<string>('avg');
  let [tableData,setTableData] = React.useState<any[]>();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleText}>작가랭킹</Text>
      <View>
        <FlatList
                  numColumns={3}             
                  data={Object.keys(filterButton)}
                  renderItem={({index,item})=><Button mode={'outlined'} onPress={()=>{
                    setTableData(data[filterButton[item]]);
                    setFilterKey(filterButton[item]);
                  }}>{item}</Button>}
                  keyExtractor={(i) =>  i.toString()}
              >
              </FlatList>
      </View>
      <ResultTable data={tableData} rankType={filterKey}></ResultTable>
      {/* <DataTable>
        <DataTable.Header>
          <DataTable.Title>작가</DataTable.Title>
          <DataTable.Title>금액</DataTable.Title>          
          <DataTable.Title>랭킹</DataTable.Title>          
          <DataTable.Title>상승률</DataTable.Title>               
        </DataTable.Header>

        {(data !==undefined && data !==null) && data['avg'].map((v,i)=>(
          <DataTable.Row key={i.toString()} onPress={()=>navigation.navigate('ArtistDetail')}>
            <DataTable.Cell>{v.artist_name_kor_born}</DataTable.Cell>
            <DataTable.Cell>{v.money}</DataTable.Cell>          
            <DataTable.Cell>{v.avg_rank}</DataTable.Cell>          
            <DataTable.Cell>{v.increased_rate}</DataTable.Cell>        
          </DataTable.Row>
        ))}                
      </DataTable> */}
      <Divider></Divider>
    </ScrollView>
  );
}

export default memo(PopularArtistTable);