class DynamicProgramming {
    constructor(itemList,purpose)
    {
        this.itemList = itemList;
        this.purpose = purpose;
    }

    getSingleResultList(getSingleResultFunc) 
    {
        let singleResultList = [];
        for (let itemKey=0;itemKey<this.itemList.length;itemKey++) 
        {
            singleResultList[itemKey] = [];
            for(let nowPurpose=0;nowPurpose<=this.purpose;nowPurpose++)
            {
                singleResultList[itemKey][nowPurpose] = getSingleResultFunc(
                    this.itemList[itemKey],itemKey,nowPurpose,singleResultList
                );
            }
        }
        return singleResultList;
    }

    findResult(findResultFunc,singleResultList)
    {
        let result = [];
        for (let itemKey=this.itemList.length-1;itemKey>=0;itemKey--) 
        {
            for(let nowPurpose=this.purpose;nowPurpose>=0;nowPurpose--)
            {
                let isAgainRun = findResultFunc(
                    this.itemList[itemKey],
                    singleResultList[itemKey][nowPurpose],
                    itemKey,nowPurpose,
                    this.purpose,result,singleResultList
                );
                if (isAgainRun<0)
                {
                    if (isAgainRun==DynamicProgramming.RETURN_FIND){return result;}
                    if (isAgainRun==DynamicProgramming.BREAK_FIND){break;}
                    if (isAgainRun==DynamicProgramming.CONTINUE_FIND){continue;}
                }
                
            }
        }
    }

    run(getSingleResultFunc,findResultFunc)
    {
        let singleResultList = this.getSingleResultList(getSingleResultFunc);
        return this.findResult(findResultFunc,singleResultList);
    }
}
DynamicProgramming.RETURN_FIND=-1;
DynamicProgramming.BREAK_FIND = -2;
DynamicProgramming.CONTINUE_FIND = -3;

module.exports = DynamicProgramming;