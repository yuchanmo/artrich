export interface AuctionArtInfo{
    lot_no : number;
    make_year : string;
    title_eng : string;
    title_kor : string;
    medium_kor : string;
    medium_eng : string;
    unit_cd : string;
    size_length : string;
    size_width : string;
    canvas : string;
    description : string;
    edition : string;
    currency : string;
    estimate_high : number;
    estimate_low : number;
    money : number;
    auction_place : string;
    auction_cate : string;
    auction_date : Date;
    auction_site : string;
    image_url:string;
    artwork_type:string;
}

export interface AuctionArtHistory{
    money:number;
    auction_date:Date;
}

export interface AuctionArt{
    auction_art_info:AuctionArtInfo;
    auction_art_history :AuctionArtHistory[]
}
