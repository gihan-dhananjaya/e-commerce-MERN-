const CustomerSchema = require('../model/CustomerSchema');
const create =(req,resp)=>{
    const customer = new CustomerSchema({
        name:req.body.name,
        address:req.body.address,
        salary:req.body.salary
    })
    customer.save().then(response=>{
        return resp.status(201).json({'message':'Customer was created!'})
    }).catch(error=>{
        return resp.status(500).json(error);
    })
}
const updateById = async (req,resp)=>{
    const updateData = await CustomerSchema.findOneAndUpdate({'_id':req.params.id},{
            $set:{
                name:req.body.name,
                address:req.body.address,
                salary:req.body.salary
            }
    },{new:true})
    if(updateData){
        return resp.status(200).json({'message':'updated!'})
    }
    return resp.status(500).json({'message':'internal server error!'})
}
const deleteById = async (req,resp)=>{
    const deletedData = await CustomerSchema.findOneAndDelete({'_id':req.params.id});
    
    if(deletedData){
        return resp.status(204).json({'message':'Deleted!'})
    }
    return resp.status(500).json({'message':'internal server error!'})
}
const findById =(req,resp)=>{
    CustomerSchema.findOne({'_id':req.params.id}).then(selectedObject=>{
        if(selectedObject!==null){
            return resp.status(200).json({'data':selectedObject});
        }
        return resp.status(400).json({'message':'customer not found'})
    })
}
const findAll = async (req,resp)=>{
    try {
        const{searchText, page=1,size=10} = req.query;

        const pageNumber = parseInt(page);
        const pageSize = parseInt(size);

        const query = {};
        if(searchText){
            query.$text = {$search:searchText}
        }
        const skip = (pageNumber-1) * pageSize;
        CustomerSchema.find(query).limit(pageSize).skip(skip).then(response=>{
            return resp.status(200).json(response);
        });
        
    }catch (error){
        return resp.status(500).json({'message':'internal server error!'});
    }
}

const findCustomerCount = (req,resp)=>{
    try {
        
        CustomerSchema.countDocuments().then(response=>{
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
    findAll,
    findCustomerCount
}