import React, {useEffect, useState} from "react";
import { Modal } from "react-bootstrap";
import  AxiosInstance  from "./config/axiosInstance";

interface Customer{
    _id:string,
    name:string,
    address:string,
    salary:number
}
const Customer:React.FC= () =>{
    const [customers,setCustomers] = useState<Customer[]>([]);
    const [name,setName] = useState('');
    const [address,setAddress] = useState('');
    const [salary,setSalary] = useState<number | ''>('');

    const [modalLoad,setModalLoad] = useState<boolean>(false);

    const [selectedId,setSelectedId] = useState('');

    const [updateName,setUpdateName] = useState('');
    const [updateSalary,setUpdateSalary] = useState<number | ''>('');
    const [updateAddress,setUpdateAddress] = useState('');

    useEffect(()=>{
        findAllCustomer();
    },[])

    const findAllCustomer = async ()=>{
        const response = await AxiosInstance.get('/customer/find-all-customer?searchText=&page=1&size=10');
        setCustomers(response.data)
        
    }

    const deleteCustomer = async (id: string)=>{
        const response = await AxiosInstance.delete("/customer/delete-customer/"+id);
        setCustomers(response.data)
        
    }

    const loadModal = async (id:string)=>{
        const customer = await AxiosInstance.get("/customer/find-customer/"+id);
        console.log(customer);
        setModalLoad(true);
        setSelectedId(customer.data.data._id);
        setUpdateName(customer.data.data.name);
        setUpdateAddress(customer.data.data.address);
        setUpdateSalary(parseFloat(customer.data.data.salary)); 
    }
    

    const saveCustomer = async ()=>{
        
        try {
            const response = await AxiosInstance.post('/customer/create-customer',{
                name,address,salary
            });
            console.log(response);

            setName('');
            setSalary('');
            setAddress('');
            findAllCustomer();
        }catch (e){
            console.log(e);
        }

    }

    const updateCustomer = async ()=>{
        try {
            await AxiosInstance.put('/customer/update-customer/'+selectedId,{
                name:updateName,address:updateAddress,salary:updateSalary
            });
            setModalLoad(false);
            findAllCustomer();
        }catch (e){
            console.log(e);
        }

    }
    
    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group">
                            <label htmlFor='customerName'>Customer Name</label>
                            <input value={name} onChange={(e)=>{setName(e.target.value)}} type='text' className='form-control' id='customerName'/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group">
                            <label htmlFor='customerAddress'>Customer Address</label>
                            <input value={address} onChange={(e)=>{setAddress(e.target.value)}} type='text' className='form-control' id='customerAddress'/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group">
                            <label htmlFor='customerSalary'>Salary</label>
                            <input value={salary} onChange={(e)=>{setSalary(e.target.value==''?'':parseFloat(e.target.value))}} type='number' className='form-control' id='customerSalary'/>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-12">
                        <button onClick={saveCustomer} className='btn btn-primary col-12'>Save Customer</button>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12">
                        <form className='col-12'>
                            <input type='search' className='form-control' placeholder='Search Customer Here'/>
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
                                    <td>Customer Name</td>
                                    <td>Customer Address</td>
                                    <td>Customer Salary</td>
                                    <td>Delete Option</td>
                                    <td>Update Option</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    customers.map((customer,index)=>
                                        <tr key={index}>
                                            <td>#{index}</td>
                                            <td>{customer.name}</td>
                                            <td>{customer.address}</td>
                                            <td>{customer.salary}</td>
                                            <td>
                                                <button 
                                                    onClick={()=>{
                                                        if(confirm("are you sure?")){
                                                            deleteCustomer(customer._id)
                                                        }
                                                        
                                                    }}
                                                    className='btn btn-danger btn-sm'>Delete</button>
                                            </td>
                                            <td>
                                            <button
                                                onClick={()=>{
                                                    loadModal(customer._id);
                                                }}
                                                type="button" 
                                                className="btn btn-warning btn-sm" 
                                                >
                                                Update
                                            </button>
                                            </td>
                                        </tr>
                                    )
                                }
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* =============== modal ============== */}
            <Modal show={modalLoad}>
                <div className="p-4">
                    <div className="header mt-3 ml-4 mr-4 mb-3 text-center">
                        <h2>Customer Update</h2>
                    </div>
                    <hr />
                    <div className="col-12 mb-4">
                        <div className="form-group">
                            <label htmlFor="name" className="mb-2">Name:</label>
                            <input type="text" value={updateName} onChange={(e)=>{setUpdateName(e.target.value)}} className="form-control"/>
                        </div>
                    </div>
                    <div className="col-12 mb-4">
                        <div className="form-group">
                            <label htmlFor="address" className="mb-2">Address:</label>
                            <input type="text" value={updateAddress} onChange={(e)=>{setUpdateAddress(e.target.value)}} className="form-control"/>
                        </div>
                    </div>
                    <div className="col-12 mb-4">
                        <div className="form-group">
                            <label htmlFor="salary" className="mb-2">Salary:</label>
                            <input type="number" value={updateSalary} onChange={(e)=>{setUpdateSalary(parseFloat(e.target.value))}} className="form-control"/>
                        </div>
                    </div>
                    <div className="col-12">
                        <button className="btn-success btn col-12"
                            onClick={()=>{updateCustomer()}}
                        >
                             Update Customer</button>
                        <br />
                        <br />
                        <button className="btn-secondary btn col-12" onClick={()=>{setModalLoad(false)}}>Close Modal</button>
                    </div>
                </div>
               
            </Modal>

            
                            

            {/* ===================================== */}
        </>
    )
}

export default Customer