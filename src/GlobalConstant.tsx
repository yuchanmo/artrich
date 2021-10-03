//const BaseUrl = 'http://localhost:5000';
const BaseUrl = 'http://10.0.2.2:5000';
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
};

export default ApiUrl;