class DynamicProgramming {
    constructor(itemList,purpose)
    {
        this.itemList = itemList;
        this.purpose = purpose;
        this.singleResultList = [];
    }

    getSingleResultList(getSingleResultFun) 
    {
        this.singleResultList = [];
        for (let itemKey=0;itemKey<this.itemList.length;itemKey++) 
        {
            this.singleResultList[itemKey] = [];
            for(let nowPurpose=1;nowPurpose<=this.purpose;nowPurpose++)
            {
                this.singleResultList[itemKey][nowPurpose-1] = getSingleResultFun(
                    this.itemList[itemKey],nowPurpose
                );
            }
        }
        return this.singleResultList;
    }
}

module.exports = DynamicProgramming;