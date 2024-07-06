const OrderSchema = require('../model/OrderSchema');
const create =(req,resp)=>{
    const order = new OrderSchema({
        date:req.body.date,
        customerDetails:req.body.customerDetails,
        totalCost:req.body.totalCost,
        products:req.body.products
    })
    order.save().then(response=>{
        return resp.status(201).json({'message':'Order was created!'})
    }).catch(error=>{
        return resp.status(500).json(error);
    })
}
const updateById = async (req,resp)=>{
    const updateData = await OrderSchema.findOneAndUpdate({'_id':req.params.id},{
        $set:{
            date:req.body.date,
            customerDetails:req.body.customerDetails,
            totalCost:req.body.totalCost,
            products:req.body.products
        }
    },{new:true})

    if(updateData){
        return resp.status(200).json({'message':'updated!'})
    }
    return resp.status(500).json({'message':'internal server error!'})
}
const deleteById = async (req,resp)=>{
    const deletedData = await OrderSchema.findOneAndDelete({'_id':req.params.id});

    if(deletedData){
        return resp.status(204).json({'message':'Deleted!'})
    }
    return resp.status(500).json({'message':'internal server error!'})
}
const findById =(req,resp)=>{
    OrderSchema.findOne({'_id':req.params.id}).then(selectedObject=>{
        if(selectedObject!==null){
            return resp.status(200).json({'data':selectedObject});
        }
        return resp.status(400).json({'message':'order not found'})
    })
}


const findAllCount = (req,resp)=>{
    try {
        
        OrderSchema.countDocuments().then(response=>{
            return resp.status(200).json(response);
        });
        
    }catch (error){
        return resp.status(500).json({'message':'internal server error!'});
    }
}

const findAllIncome = async (req,resp)=>{
    try{
        const result = await OrderSchema.aggregate([
            {
                $group:{
                    _id:null,
                    totalCostSum:{$sum:"$totalCost"}
                }
            }
        ])
        const totalCost = result.length>0?result[0].totalCostSum:0;
        resp.json(totalCost);
    }catch(error){
        return resp.status(500).json({'message':'internal server error!'});
    }
}

const findAll = (req,resp)=>{
    try {
        const{searchText, page=1,size=10} = req.query;

        const pageNumber = parseInt(page);
        const pageSize = parseInt(size);

        const query = {};
        if(searchText){
            query.$text = {$search:searchText}
        }
        const skip = (pageNumber-1) * pageSize;
        OrderSchema.find(query).limit(pageSize).skip(skip).then(response=>{
            return resp.status(200).json(response);
        });
        
    }catch (error){
        return resp.status(500).json({'message':'internal server error!'});
    }
}
module.exports={
    create,
    findById,
    updateById,
    deleteById,
    findAllIncome,
    findAllCount,
    findAll
}