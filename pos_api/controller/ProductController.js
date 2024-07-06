const ProductSchema = require('../model/ProductSchema');
const create =(req,resp)=>{
    const product = new ProductSchema({
        name:req.body.name,
        description:req.body.description,
        unitPrice:req.body.unitPrice,
        image:req.body.image,
        qtyOnHand:req.body.qtyOnHand
    })
    product.save().then(response=>{
        return resp.status(201).json({'message':'Product was created!'})
    }).catch(error=>{
        return resp.status(500).json(error);
    })
}
const updateById = async (req,resp)=>{
    const updateData = await ProductSchema.findOneAndUpdate({'_id': req.params.id},{
        $set:{
            name:req.body.name,
            description:req.body.description,
            unitPrice:req.body.unitPrice,
            image:req.body.image,
            qtyOnHand:req.body.qtyOnHand
        }
    },{new:true})

    if(updateData){
        return resp.status(200).json({'message':'updated!'})
    }
    return  resp.status(500).json({'message':'internal server error!'})
}
const deleteById =async (req,resp)=>{
    const deletedData = await ProductSchema.findOneAndDelete({'_id':req.params.id});

    if (deletedData){
        return resp.status(204).json({'message':'Deleted!'});
    }
    return resp.status(500).json({'message':'internal server error!'});
}
const findById =(req,resp)=>{
    ProductSchema.findOne({'_id':req.params.id}).then(selectedObject=>{
        if(selectedObject!==null){
            return resp.status(200).json({'data':selectedObject});
        }
        return resp.status(400).json({'message':'product not found'})
    })
}
const findAll =(req,resp)=>{
    try {
        const{searchText, page=1,size=10} = req.query;

        const pageNumber = parseInt(page);
        const pageSize = parseInt(size);

        const query = {};
        if(searchText){
            query.$text = {$search:searchText}
        }
        const skip = (pageNumber-1) * pageSize;
        ProductSchema.find(query).limit(pageSize).skip(skip).then(response=>{
            return resp.status(200).json(response);
        });
        
    }catch (error){
        return resp.status(500).json({'message':'internal server error!'});
    }
}

const findMinPro =(req,resp)=>{
    try {
        
        ProductSchema.find({qtyOnHand:{$lt:10}}).then(response=>{
            return resp.status(200).json(response);
        });
        
    }catch (error){
        return resp.status(500).json({'message':'internal server error!'});
    }
}

const findAllCounts =(req,resp)=>{
    try {
        
        ProductSchema.countDocuments().then(response=>{
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
    findMinPro,
    findAllCounts
}