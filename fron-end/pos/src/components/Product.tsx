import  AxiosInstance  from "./config/axiosInstance";
import React, { ChangeEvent, useEffect, useState } from "react"
import {storage} from './config/firebase'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Modal } from "react-bootstrap";

interface Product{
    _id:string,
    name:string,
    description:string,
    unitPrice:number,
    image:string,
    qtyOnHand:number
}

const Product : React.FC=()=> {

    const [modalLoad,setModalLoad] = useState(false);
    const [selectedId,setSelectedId] = useState('');

    const [products,setProducts] = useState<Product[]>([]);

    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState<number | ''>('');
    const [qtyOnHand,setQtyOnHand] = useState<number | ''>('');
    const [image,setImage] = useState<File | null>(null)

    const [updateName,setUpdateName] = useState('');
    const [updateDescription,setUpdateDescription] = useState('');
    const [updatePrice,setUpdatePrice] = useState<number | ''>('');
    const [updateQtyOnHand,setUpdateQtyOnHand] = useState<number | ''>('');
    

    useEffect(()=>{
        findallProducts();
    },[])

    const findallProducts = async ()=>{
        const response = await AxiosInstance.get('/product/find-all-product?searchText=&page=1&size=10');
        setProducts(response.data)
        
    }

    const deleteProduct = async (id: string)=>{
        const response = await AxiosInstance.delete("/product/delete-product/"+id);
        setProducts(response.data)
        findallProducts()
    }

    const loadModal = async (id:string)=>{
        const product = await AxiosInstance.get("/product/find-product/"+id);
        console.log(product);
        setModalLoad(true);
        setSelectedId(product.data.data._id);
        setUpdateName(product.data.data.name);
        setUpdateDescription(product.data.data.description);
        setUpdatePrice(parseFloat(product.data.data.unitPrice)); 
        setUpdateQtyOnHand(parseFloat(product.data.data.qtyOnHand));
    }

    const updateProduct = async ()=>{
        try {
            await AxiosInstance.put('/product/update-product/'+selectedId,{
                name:updateName,description:updateDescription,unitPrice:updatePrice,qtyOnHand:updateQtyOnHand
            });
            setModalLoad(false);
            findallProducts();
        }catch (e){
            console.log(e);
        }

    }

    const handleImageChange = (e:ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files && e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }

    const saveProduct = async () => {
        if (image) {
            const storageRef = ref(storage, `images/${Math.random() + '-' + image.name}`);
            try {

                const upload = await uploadBytes(storageRef, image);
                console.log('Upload successful', upload);
    
                // Get the download URL
                const downloadURL = await getDownloadURL(storageRef);
                console.log('Download URL:', downloadURL);

                const response = await AxiosInstance.post('/product/create-product',{
                    name,description,unitPrice:price,image:downloadURL,qtyOnHand:qtyOnHand
                });
                console.log(response);
    
                setName('');
                setDescription('');
                setPrice('');
                setImage(null);
                setQtyOnHand('');
                findallProducts();
                
            } catch (error) {
                console.error('Upload failed', error);
            }
        }
    };
    
    
    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group mb-3">
                            <label htmlFor='productName'>Product Name</label>
                            <input value={name} type='text' className='form-control' id='productName' onChange={(e)=>{setName(e.target.value)}}/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group">
                            <label htmlFor='productPrice'>Price</label>
                            <input value={price} type='number' className='form-control' id='productPrice' onChange={(e)=>{setPrice(parseFloat(e.target.value))}}/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group">
                            <label htmlFor='productQty'>Qty on Hand</label>
                            <input value={qtyOnHand} type='number' className='form-control' id='productQty' onChange={(e)=>{setQtyOnHand(parseInt(e.target.value))}}/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group mb-3">
                            <label htmlFor='productImage' className="mb-3">Product Image</label>
                            <input type='file' className='form-control' id='productImage' onChange={handleImageChange} />
                        </div>
                    </div>
        
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor='description' className="mb-3">Description</label>
                            <textarea value={description} rows={5} className='form-control' id='description' onChange={(e)=>{setDescription(e.target.value)}}/>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-12">
                        <button className='btn btn-primary col-12' onClick={saveProduct}>Add Product</button>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12">
                        <form className='col-12'>
                            <input type='search' className='form-control' placeholder='Search Product Here'/>
                        </form>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-12">
                        <table className='table table-hover table-bordered'>
                            <thead>
                            <tr>
                                <td>#ID</td>
                                <td>Product Name</td>
                                <td>QTY on Hand</td>
                                <td>Unit Price</td>
                                <td>Delete Option</td>
                                <td>Update Option</td>
                                <td>See More</td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                products.map((product,index)=>
                                
                                    <tr key={index}>
                                    <td>#{index}</td>
                                    <td>{product.name}</td>
                                    <td>{product.qtyOnHand}</td>
                                    <td>{product.unitPrice}</td>
                                    <td>
                                        <button className='btn btn-danger btn-sm'
                                            onClick={()=>{
                                                if(confirm('Are you Sure?')){
                                                    deleteProduct(product._id)
                                                }
                                                
                                            }}
                                        >Delete</button>
                                    </td>
                                    <td>
                                        <button className='btn btn-warning btn-sm'
                                            onClick={()=>loadModal(product._id)}
                                        >Update</button>
                                    </td>
                                    <td>
                                        <button className='btn btn-secondary btn-sm'>View</button>
                                    </td>
                                </tr>
                                
                                )
                            }
                            
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* ====modal==== */}
            <Modal show={modalLoad}>
                <div className="p-4">
                    <div className="header text-center">
                        <h2>update Product</h2>
                    </div>
                </div>
                
            </Modal>
            {/* ============= */}
        </>
    )
}

export default Product