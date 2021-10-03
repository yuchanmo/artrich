import { ArtistListResult } from "./ArtistList";

type LoginStackParamList = {
    LoginScreen:undefined;
    RegisterScreen:undefined;
    ForgotPasswordScreen:undefined;
    HomeScreen:undefined;
    StartPage:undefined;
};

type MainTabParamList = {
    Artist:undefined;
    Release:undefined;
    Community:undefined;
    Shop : undefined;
    My : undefined;
};

type ArtistTabRootParamList = {
    Favorite : undefined;
    Analysis : undefined;
}

type ArtistStackParamList = {
    ArtistTabRoot : undefined;
    FollowingArtist:undefined;
    FollowingArtistAllList:{user_id:number|undefined,artist_name:string|number}
    FollowingArtistSampleList:undefined;
    ArtistList:{artist_name:string|number};
    AllList:undefined;    
    //CollectionList:undefined;
    SellList :undefined;
    CollectionAllList:undefined;
    CollectionSampleList:undefined;
    CollectionDetail:undefined;
    ArtistDetail:{item:ArtistListResult|undefined};
    ArtList:{artist_id:number|undefined};
    ArtDetail:{art_info_id:number|undefined};
    Favorite:undefined;
    Analysis:undefined;
    EasyPick:undefined;
};

type ReleaseStackParamList = {
    TabRoot: undefined;
    ReleaseDetail: undefined;
    ReleaseList: undefined;
  };


type ShopStackParamList = {
    ShopTabRoot:undefined;
    Register:undefined;
    SellList:undefined;
    NewArtistList:undefined;
    SellDetail:undefined;
}

type MyStackParamList = {
    MyCollection:undefined;
    
}