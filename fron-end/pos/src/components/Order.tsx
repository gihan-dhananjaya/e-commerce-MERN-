import  AxiosInstance  from "./config/axiosInstance";
import React, { useEffect, useState } from "react";
import Product from "./Product";
import Customer from "./Customer";

interface Cart {
    _id: string,
    description: string | undefined,
    unitPrice: number | '',
    qty: number | undefined,
    total: number | undefined
}

const Order: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [cart, setCart] = useState<Cart[]>([]);

    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [selectedProduct, setselectedProduct] = useState<Product | null>(null);

    const [address, setAddress] = useState('');
    const [salary, setSalary] = useState<number | ''>('');

    const [price, setPrice] = useState<number | ''>('');
    const [userQty, setUserQty] = useState<number>(0);
    const [qtyOnHand, setQtyOnHand] = useState<number | ''>('');
    const [description, setDescription] = useState('');

    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        findallProducts();
        findAllCustomer();

    }, [])

    const styleObj: React.CSSProperties = {
        marginBottom: '15px'
    }
    const bottomContext: React.CSSProperties = {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
    const totalText: React.CSSProperties = {
        color: 'red',
        margin: '10px'
    }

    const findAllCustomer = async () => {
        const response = await AxiosInstance.get('/customer/find-all-customer?searchText=&page=1&size=10');
        setCustomers(response.data)
    }

    const findallProducts = async () => {
        const response = await AxiosInstance.get('/product/find-all-product?searchText=&page=1&size=10');
        setProducts(response.data)
    }

    const getCustomerDetails = async (id: string) => {
        const customer = await AxiosInstance.get("/customer/find-customer/" + id);
        setAddress(customer.data.data.address);
        setSalary(customer.data.data.salary);
        setSelectedCustomer(customer.data.data);
    }

    const getProductDetails = async (id: string) => {
        const product = await AxiosInstance.get("/product/find-product/" + id);
        console.log(product.data.data);

        setPrice(product.data.data.unitPrice);
        setQtyOnHand(product.data.data.qtyOnHand);
        setDescription(product.data.data.description);
        setselectedProduct(product.data.data)
        console.log(selectedProduct);
    }

    const addToCart = (newItem: Cart) => {
        setCart((prevstate) => {
            const updatedCart = [...prevstate, newItem];
            updateTotal(updatedCart);
            return updatedCart;
        });
    }

    const updateTotal = (cartItems: Cart[]) => {
        let amount = 0;
        cartItems.forEach((data) => {
            amount += data.total || 0;
        });
        setTotal(amount);
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor='customerName'>Select Customer</label>
                            <select name="" id="" className='form-control' onChange={(e) => {
                                getCustomerDetails(e.target.value)
                            }}>
                                {
                                    customers.map((customer, index) => <option key={index} value={customer._id}>{customer.name}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor='customerAddress'>Customer Address</label>
                            <input value={address} type='text' className='form-control' id='customerAddress' disabled />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor='customerSalary'>Salary</label>
                            <input value={salary} type='number' className='form-control' id='customerSalary' disabled />
                        </div>
                    </div>
                    <hr />
                    <div className="col-12 col-sm-6 col-md-3" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor='productName'>Select Product</label>
                            <select name="" id="" className='form-control' onChange={(e) => {
                                getProductDetails(e.target.value)
                                console.log(e.target.value);
                            }}>
                                {
                                    products.map((product, index) => <option key={index} value={product._id}>{product.name}</option>)
                                }
                            </select>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-2" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor='productPrice'>Product Price</label>
                            <input value={price} type='number' className='form-control' id='productPrice' disabled />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-2" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor='QtyOnHand'>QTY on Hand</label>
                            <input value={qtyOnHand} type='text' className='form-control' id='QtyOnHand' disabled />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-2" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor='description'>Description</label >
                            <input value={description} className='form-control' id='description' disabled />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor='qty'>QTY</label>
                            <input onChange={(e) => { setUserQty(parseFloat(e.target.value)) }} type='number' className='form-control' id='qty' />
                        </div>
                    </div>
                </div>
                <hr />
                <br />
                <div className="row">
                    <div className="col-12">
                        <button className='btn btn-primary col-12' onClick={() => {
                            const cartProducts: Cart = {
                                _id: selectedProduct?._id || '',
                                description: description,
                                unitPrice: price,
                                qty: userQty,
                                total: userQty * (price ? price : 0)
                            }
                            addToCart(cartProducts);
                        }}>Add to Cart</button>
                    </div>
                </div>

                <br />
                <div className="row">
                    <div className="col-12">
                        <table className='table table-hover table-bordered'>
                            <thead>
                                <tr>
                                    <td>#ID</td>
                                    <td>Product Description</td>
                                    <td>QTY</td>
                                    <td>Product Price</td>
                                    <td>Total</td>
                                    <td>Delete Option</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart.map((item, index) => (
                                        <tr key={index}>
                                            <td>#{index}</td>
                                            <td>{item.description}</td>
                                            <td>{item.qty}</td>
                                            <td>{item.unitPrice}</td>
                                            <td>{item.total}</td>
                                            <td>
                                                <button className='btn btn-danger btn-sm'
                                                    onClick={() => {
                                                        console.log(item._id);

                                                        setCart((prevState) => {
                                                            const updatedCart = prevState.filter((cartDate) => cartDate._id !== item._id);
                                                            updateTotal(updatedCart);
                                                            return updatedCart;
                                                        });
                                                    }}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                        <br />
                        <div className="bottom-context" style={bottomContext}>
                            <div className="total-outer">
                                <h1 style={totalText}>
                                    Total: Rs: {total}
                                </h1>
                            </div>
                            <div className="place-order-button-context">
                                <button className='btn btn-success'
                                    onClick={async ()=>{
                                        await AxiosInstance.post('/order/create-order',{
                                            date: new Date(),
                                            customerDetails:selectedCustomer,
                                            totalCost:total,
                                            products:cart
                                        });
                                    }}
                                >Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order;
