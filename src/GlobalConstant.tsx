//const BaseUrl = 'http://localhost:5000';
//const BaseUrl = 'http://10.0.2.2:5000';
const BaseUrl = 'http://58.143.59.33:5555';
//


const ApiUrl ={
    collection : `${BaseUrl}/collection`,
    followingartists :  `${BaseUrl}/followingartists`,
    artist: `${BaseUrl}/artists`,
    selling: `${BaseUrl}/selling`,
    releases: `${BaseUrl}/releases`,
    searchrank: `${BaseUrl}/searchrank`,
    favoriterank: `${BaseUrl}/favoriterank`,
    artistinfo: `${BaseUrl}/artistinfo`,
    arts:`${BaseUrl}/arts`,
    mycollection: `${BaseUrl}/mycollection`,
    artistarts : `${BaseUrl}/artistarts`,
    auctionart : `${BaseUrl}/auctionart`,
    artistranking:`${BaseUrl}/artistranking`,
    artistdetailranking:`${BaseUrl}/artistdetailranking`,
    artistdetailmoney:`${BaseUrl}/artistdetailmoney`,
    recentartistranking:`${BaseUrl}/recentartistranking`,
    recentpopularartistranking:`${BaseUrl}/recentpopularartistranking`,
    followingartistsauctionplan:`${BaseUrl}/followingartistsauctionplan`,
};

export default ApiUrl;
