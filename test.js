const DynamicProgramming = require('./index');
class Coin
{
    constructor(much)
    {
        this.much = much;       
    }
}
let coinTypeList = [new Coin(1),new Coin(2),new Coin(5)];
let dp = new DynamicProgramming(coinTypeList,13);
// first make singleResultList
let singleResultList = dp.getSingleResultList((item,nowPurpose)=>{
    return Math.ceil(nowPurpose/item.much);
});
console.log(singleResultList)
// second find least Need