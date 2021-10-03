// export interface AristRanking{
//     artist_name_kor_born : string;
//     money : number;
//     avg_rank : number;
//     increased_rate : string;}

export interface AristRanking{

    avg : {
        artist_name_kor_born : string;
        money : number;
        rank : number;
        increased_rate : string;
    }[],
    canvas : {
        artist_name_kor_born : string;
        money : number;
        rank : number;
        increased_rate : string;
    }[],
    max : {
        artist_name_kor_born : string;
        money : number;
        rank : number;
        increased_rate : string;
    }[],
    sum : {
        artist_name_kor_born : string;
        money : number;
        rank : number;
        increased_rate : string;
    }[],
    count : {
        artist_name_kor_born : string;
        count : number;
        rank : number;
        increased_rate : string;
    }[],
    recent : {
        artist_name_kor_born : string;
        increased_rate : string;

    }[],
    total : {
        artist_name_kor_born : string;
        increased_rate : string;
        avg_rank:number;
        canvas_avg_rank:number;
        max_rank:number;
        sum_rank:number;
        count_rank : number;
        total_sum:number;
        total_rank:number;    
    }[],
};