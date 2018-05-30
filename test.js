const DynamicProgramming = require('./index');
//change coin by dynamic programming
class Coin
{
    constructor(much)
    {
        this.much = much;       
    }
}
let coinTypeList = [new Coin(1),new Coin(2),new Coin(5)];
let coinDP = new DynamicProgramming(coinTypeList,13);
let totalMoney = 0;
let coinResult = coinDP.run((item,nowPurpose)=>{
    return Math.ceil(nowPurpose/item.much);
},(item,itemResult,purpose,result)=>{
    let money = item.much*itemResult;
    if (money<=purpose-totalMoney)
    {
        result.push({coin:item,num:itemResult});
        if (totalMoney+money==purpose){return -1;}
        totalMoney+=money;
        return -2;
    }
});
/**
 * coinResult：
 * [ { coin: Coin { much: 5 }, num: 2 },
 * { coin: Coin { much: 2 }, num: 1 },
 * { coin: Coin { much: 1 }, num: 1 } ]
 */
console.log(coinResult)

//sort by dynamic programming
let needSortList = [1,7,6,8,2,5,4,3];
let sortDP = new DynamicProgramming(needSortList,needSortList.length-1);
let countMap = {};
let countIn = 0;
let sortResult = sortDP.run((item,nowPurpose)=>{
    if (countMap[item]==undefined){countMap[item]=0;}
    if (item>needSortList[nowPurpose]){
        countMap[item]++;
    }
    return countMap[item];
},(item,itemResult,purpose,result)=>{
    result[itemResult] = item;
    countIn++;
    if (countIn>purpose){return -1;} else {return -2;}
});
/**
 * sortResult：
 * [ 1, 2, 3, 4, 5, 6, 7, 8 ]
 */
console.log(sortResult)

