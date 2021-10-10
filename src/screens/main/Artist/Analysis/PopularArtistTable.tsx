import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { memo } from 'react';
import { Alert, FlatList, StyleSheet, Text, View,Dimensions } from 'react-native';
import { Button, DataTable, Divider } from 'react-native-paper';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart';
import RNFetchBlob from 'rn-fetch-blob';
import ApiUrl from '~/GlobalConstant';
import { commonStyle } from '~/GlobalStyle';
import { ArtistStackParamList } from '~/models/NavigationParam';
import {AristRanking} from '~/models/ArtistRanking';
import { ScrollView } from 'react-native-gesture-handler';


const optionsPerPage = [2, 3, 4];
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create(({
    ...commonStyle,
  container:{
      margin:7,
  },
  filterBtn:{
    width:windowWidth/3.3,
    margin:1
  },
  selectedBtn:{
    backgroundColor:'blue',
  },
  filterBtnContainer:{
    alignContent:'space-between',
    justifyContent:'space-between',
    alignItems:'center'
    
  }
//   titleText: {
//       color: "black",
//       fontSize: 20,        
//     }
}));

interface Props{
    route : RouteProp<ArtistStackParamList,"ArtistTabRoot">
  navigation:NativeStackScreenProps<ArtistStackParamList,"ArtistTabRoot">;    
}

interface ResultTableProps{
  navigation:NativeStackScreenProps<ArtistStackParamList,"ArtistTabRoot">;    
  data : any[];
  rankType:string;
}

const ResultTable = ({data,rankType,navigation}:ResultTableProps)=>{
  const [page, setPage] = React.useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

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
              <DataTable.Row key={i.toString()} onPress={()=>navigation.navigate('ArtistDetail',{artist_id:v.artist_id})}>
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
              {/* <DataTable.Title>평균랭킹</DataTable.Title> 
              <DataTable.Title>호당랭킹</DataTable.Title> 
              <DataTable.Title>최고랭킹</DataTable.Title> 
              <DataTable.Title>합랭킹</DataTable.Title> 
              <DataTable.Title>갯수랭킹</DataTable.Title>  */}
              <DataTable.Title>총합</DataTable.Title>          
              <DataTable.Title>총랭킹</DataTable.Title>          
                            
            </DataTable.Header>
    
            {(data !==undefined && data !==null) && data.map((v,i)=>(
              <DataTable.Row key={i.toString()} onPress={()=>navigation.navigate('ArtistDetail',{artist_id:v.artist_id})}>
                <DataTable.Cell>{v.artist_name_kor_born}</DataTable.Cell>
                <DataTable.Cell>{v.increased_rate}</DataTable.Cell>          
                {/* <DataTable.Cell>{v.avg_rank}</DataTable.Cell>          
                <DataTable.Cell>{v.canvas_avg_rank}</DataTable.Cell>        
                <DataTable.Cell>{v.max_rank}</DataTable.Cell>        
                <DataTable.Cell>{v.sum_rank}</DataTable.Cell>       
                <DataTable.Cell>{v.count_rank}</DataTable.Cell>   */}
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
                <DataTable.Title style={{flex:3}}>작가</DataTable.Title>
                <DataTable.Title style={{flex:3}}>금액</DataTable.Title>          
                <DataTable.Title style={{flex:1}}>랭킹</DataTable.Title>          
                <DataTable.Title style={{flex:2}}>상승률</DataTable.Title>               
              </DataTable.Header>
      
              {(data !==undefined && data !==null) && data.map((v,i)=>(
                <DataTable.Row key={i.toString()} onPress={()=>navigation.navigate('ArtistDetail',{artist_id:v.artist_id})}>
                  <DataTable.Cell style={{flex:3}}>{v.artist_name_kor_born}</DataTable.Cell>
                  <DataTable.Cell style={{flex:3}}>{v.money}</DataTable.Cell>          
                  <DataTable.Cell style={{flex:1}}>{v.rank}</DataTable.Cell>          
                  <DataTable.Cell style={{flex:2}}>{v.increased_rate}</DataTable.Cell>        
                </DataTable.Row>
              ))}    
              <DataTable.Pagination
                page={page}
                numberOfPages={3}
                onPageChange={(page) => setPage(page)}
                label="1-2 of 6"
                optionsPerPage={optionsPerPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                showFastPagination
                optionsLabel={'Rows per page'}
              />
            </DataTable>          
      
        );
  }

};



const PopularArtistTable = ({route,navigation}:Props)  => {
  const [data,setData] =React.useState<AristRanking>({avg:[],canvas:[],count:[],max:[],recent:[],sum:[],total:[]});
  const initData = async () =>{
    try {
        let res = await RNFetchBlob.fetch('GET', ApiUrl['artistranking']);      
        let tmp = res.json();
        setData(tmp);            
        setTableData(tmp['avg'])    
    } catch (error) {
        // Alert.alert('info',error.message);
        // Alert.alert('info',error.stack);
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
      <View style={styles.filterBtnContainer}>
        <FlatList                  
                  numColumns={3}             
                  data={Object.keys(filterButton)}
                  renderItem={({index,item})=><Button style={styles.filterBtn} mode={'outlined'} onPress={()=>{
                    setTableData(data[filterButton[item]]);
                    setFilterKey(filterButton[item]);
                  }}>{item}</Button>}
                  keyExtractor={(i) =>  i.toString()}
              >
              </FlatList>
      </View>
      <ResultTable data={tableData} rankType={filterKey} navigation={navigation}></ResultTable>
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