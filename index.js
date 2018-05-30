class DynamicProgramming {
    constructor(itemList,purpose)
    {
        this.itemList = itemList;
        this.purpose = purpose;
        this.singleResultList = [];
    }

    getSingleResultList(getSingleResultFunc) 
    {
        this.singleResultList = [];
        for (let itemKey=0;itemKey<this.itemList.length;itemKey++) 
        {
            this.singleResultList[itemKey] = [];
            for(let nowPurpose=0;nowPurpose<=this.purpose;nowPurpose++)
            {
                this.singleResultList[itemKey][nowPurpose] = getSingleResultFunc(
                    this.itemList[itemKey],nowPurpose
                );
            }
        }
        return this.singleResultList;
    }

    findResult(findResultFunc)
    {
        let result = [];
        for (let itemKey=this.itemList.length-1;itemKey>=0;itemKey--) 
        {
            for(let nowPurpose=this.purpose;nowPurpose>=0;nowPurpose--)
            {
                let isAgainRun = findResultFunc(
                    this.itemList[itemKey],
                    this.singleResultList[itemKey][nowPurpose],
                    this.purpose,result
                );
                if (isAgainRun<0)
                {
                    if (isAgainRun==-1){return result;}
                    if (isAgainRun==-2){break;}
                    if (isAgainRun==-3){continue;}
                }
                
            }
        }
    }

    run(getSingleResultFunc,findResultFunc)
    {
        this.getSingleResultList(getSingleResultFunc);
        return this.findResult(findResultFunc);
    }
}

module.exports = DynamicProgramming;