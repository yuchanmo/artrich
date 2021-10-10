// export interface AristRanking{
//     artist_name_kor_born : string;
//     money : number;
//     avg_rank : number;
//     increased_rate : string;}

export interface TotalRanking{
    artist_name_kor_born : string;
        artist_id:number;
        increased_rate : string;
        avg_rank:number;
        canvas_avg_rank:number;
        max_rank:number;
        sum_rank:number;
        count_rank : number;
        total_sum:number;
        total_rank:number;   
}

export interface Ranking{
    artist_name_kor_born : string;
        artist_id:number;
        money : number;
        rank : number;
        increased_rate : string;
}


export interface AristRanking{
    avg : Ranking[],
    canvas : Ranking[],
    max :Ranking[],
    sum : Ranking[],
    count :Ranking[],
    recent : {
        artist_name_kor_born : string;
        artist_id:number;
        increased_rate : string;
    }[],
    total :TotalRanking[],
}