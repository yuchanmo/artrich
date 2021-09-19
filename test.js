let xaxis = [...Array(20).keys()];
console.log(xaxis);

console.log(xaxis.map((v,i)=>{
    return {
        x:v,
        y:Math.random()
    }
}));

let a = {
    x:1,y:2
};

Object.keys(a);

a['x']
