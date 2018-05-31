# quick-dp
Use dynamic programming quickly <br />

Figure 1. Finding the shortest path in a graph using optimal substructure; a straight line indicates a single edge; a wavy line indicates a shortest path between the two vertices it connects (other nodes on these paths are not shown); the bold line is the overall shortest path from start to goal.
Dynamic programming is both a mathematical optimization method and a computer programming method. The method was developed by Richard Bellman in the 1950s and has found applications in numerous fields, from aerospace engineering to economics. In both contexts it refers to simplifying a complicated problem by breaking it down into simpler sub-problems in a recursive manner. While some decision problems cannot be taken apart this way, decisions that span several points in time do often break apart recursively. Likewise, in computer science, a problem that can be solved optimally by breaking it into sub-problems and then recursively finding the optimal solutions to the sub-problems is said to have optimal substructure. --from [wikipedia's Dynamic_programming](https://en.wikipedia.org/wiki/Dynamic_programming)

# install 
```sh
npm install quick-dp --save
```

# example
```js
const DynamicProgramming = require('quick-dp');
// change coin question by dynamic programming
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
let coinResult = coinDP.run((item,itemKey,nowPurpose)=>{
    return Math.ceil(nowPurpose/item.much);
},(item,itemResult,itemKey,nowPurpose,purpose,result)=>{
    let money = item.much*itemResult;
    if (money<=purpose-totalMoney)
    {
        result.push({coin:item,num:itemResult});
        if (totalMoney+money==purpose){return DynamicProgramming.RETURN_FIND;}
        totalMoney+=money;
        return DynamicProgramming.BREAK_FIND;
    }
});
console.log("change coin question:")
/**
 * coinResult：
 * [ { coin: Coin { much: 5 }, num: 2 },
 * { coin: Coin { much: 2 }, num: 1 },
 * { coin: Coin { much: 1 }, num: 1 } ]
 */
console.log(coinResult)

//01 bag question by dynamic programming
class Bag
{
    constructor(weight)
    {
        this.weight = weight;       
    }
    static getMinWeightThing(ThingList)
    {
        let minWeight = 0;
        for(let i =0;i<ThingList.length;i++)
        {
            if(i==0) {
                minWeight = ThingList[i].weight;
            }else{
                if (minWeight>ThingList[i].weight){minWeight = ThingList[i].weight;}
            }
        }
        return minWeight;
    }
}
class Thing
{
    constructor(weight,value)
    {
        this.weight = weight;
        this.value = value;
    }
}
let bag = new Bag(8);
let ThingList = [new Thing(2,3),new Thing(3,4),new Thing(4,5),new Thing(5,6)];
let minWeight = Bag.getMinWeightThing(ThingList);
let bagDP = new DynamicProgramming(ThingList,bag.weight);
let unusedWeight = bag.weight;
let bagResult = bagDP.run((item,itemKey,nowPurpose,singleResultList)=>{
    let beforeRow = itemKey-1;
    if(nowPurpose<item.weight)
    {
        if (beforeRow==-1)
        {
            return 0;
        } else {
            return singleResultList[beforeRow][nowPurpose];
        }
    } else {
        if (beforeRow==-1){return item.value;}
        let maxWeight = singleResultList[beforeRow][nowPurpose-item.weight]+item.value;
        if(item.value>maxWeight)
        {
            return item.value;
        } else {
            return maxWeight;
        }
    }
},(item,itemResult,itemKey,nowPurpose,purpose,result,singleResultList)=>{
    if(unusedWeight-item.weight>=0){
        if(unusedWeight != nowPurpose){return DynamicProgramming.CONTINUE_FIND;}
        if (
            itemKey-1<0 || 
            singleResultList[itemKey][nowPurpose]>singleResultList[itemKey-1][nowPurpose]
        ){
            result.push(item);
        } else {
            return DynamicProgramming.CONTINUE_FIND;
        }
        unusedWeight = unusedWeight-item.weight;
        if (itemKey ==0 || unusedWeight<minWeight){return DynamicProgramming.RETURN_FIND;}
        return DynamicProgramming.BREAK_FIND;
    } else {
        return DynamicProgramming.BREAK_FIND;
    }
});
console.log("bag question:")
console.log(bagResult);

// sort question by dynamic programming
let needSortList = [1,7,6,8,2,5,4,3];
let sortDP = new DynamicProgramming(needSortList,needSortList.length-1);
let countMap = {};
let countIn;
let sortSingleResultList = sortDP.getSingleResultList((item,itemKey,nowPurpose)=>{
    if (countMap[item]==undefined){countMap[item]=0;}
    if (item>needSortList[nowPurpose]){
        countMap[item]++;
    }
    return countMap[item];
});
countIn = 0;
let sortResultASC = sortDP.findResult((item,itemResult,itemKey,nowPurpose,purpose,result)=>{
    result[itemResult] = item;
    countIn++;
    if (countIn>purpose){return DynamicProgramming.RETURN_FIND;} else {return DynamicProgramming.BREAK_FIND;}
},sortSingleResultList)
countIn = 0;
let sortResultDESC = sortDP.findResult((item,itemResult,itemKey,nowPurpose,purpose,result)=>{
    result[purpose-itemResult] = item;
    countIn++;
    if (countIn>purpose){return DynamicProgramming.RETURN_FIND;} else {return DynamicProgramming.BREAK_FIND;}
},sortSingleResultList)

console.log("sort question:")
/**
 * sortResult：
 * [ 1, 2, 3, 4, 5, 6, 7, 8 ]
 */
console.log(sortResultASC)
/**
 * sortResult：
 * [ 8, 7, 6, 5, 4, 3, 2, 1 ]
 */
console.log(sortResultDESC)
```
