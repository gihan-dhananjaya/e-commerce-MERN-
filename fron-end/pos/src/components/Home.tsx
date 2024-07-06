import React, { useEffect, useState } from "react";
import DefaultCard from "./card/DefaultCard.tsx";
import DefaultChart from "./card/DefaultChart.tsx";
import MinQtyChart from "./card/MinQtyChart.tsx"
import  AxiosInstance  from "./config/axiosInstance";
import Product from "./Product.tsx";


const Home: React.FC=()=> {

    const [products,setProducts] = useState<Product[]>([]);
    const [productCount,setProductcount] = useState<number>();
    const [orderCount,setOrdercount] = useState<number>();
    const [customerCount,setCustomerCount] = useState<number>();
    const [income,setIncome] = useState<number>();
    const [chartData, setChartData] = useState<number[]>(new Array(12).fill(0)); 

    useEffect(()=>{
        findMinProduct();
        findAllCounts();
        findIncome();
        findAllOrders();
        findCustomerCount();
        fetchOrderData();
        
    },[])

    const findMinProduct = async ()=>{
        const response = await AxiosInstance.get('/product/find-product-min');
        setProducts(response.data)  
    }


    const findAllCounts = async ()=>{
        const response = await AxiosInstance.get('/product/find-product-count');
        setProductcount(response.data); 
    }

    const findIncome = async ()=>{
        const response = await AxiosInstance.get('/order/find-all-income');
        setIncome(response.data)
    }

    const findAllOrders = async()=>{
        const response = await AxiosInstance.get('/order/find-order-count');
        setOrdercount(response.data)
    }

    const findCustomerCount = async()=>{
        const response = await AxiosInstance.get('/customer/find-customer-count');
        setCustomerCount(response.data)
    }
    const fetchOrderData = async () => {
        const response = await AxiosInstance.get('/order/find-all-order'); // Adjust endpoint as necessary
        const orders = response.data;

        const monthlyData = new Array(12).fill(0);
        orders.forEach((order: any) => {
            const date = new Date(order.date);
            const month = date.getMonth();
            monthlyData[month] += order.totalCost;
        });
        setChartData(monthlyData);
    };

    return(
        <>
            <div className='container'>
                <div className="row">
                    <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
                        <DefaultCard
                            description='Product images are photographs of the product you are selling.'
                            title='Customer'
                            image='https://img.freepik.com/free-vector/white-product-podium-with-green-tropical-palm-leaves-golden-round-arch-green-wall_87521-3023.jpg'
                            qty={customerCount}
                            cardKey={1}
                        />
                    </div>
                    <div className='col-12 col-md-6 col-md-4 col-lg-3'>
                        <DefaultCard
                            description='Product images are photographs of the product you are selling. '
                            title='Product'
                            image='https://pathedits.com/cdn/shop/articles/image29.jpg?v=1610384205'
                            qty={productCount}
                            cardKey={2}
                        />
                    </div>
                    <div className='col-12 col-md-6 col-md-4 col-lg-3'>
                        <DefaultCard
                            description='Product images are photographs of the product you are selling.'
                            title='Order'
                            image='https://jureursicphotography.com/wp-content/uploads/2020/10/2020_02_21_Sephora-Favurite-Box5247.jpg'
                            qty={orderCount}
                            cardKey={3}
                        />
                    </div>
                    <div className='col-12 col-md-6 col-md-4 col-lg-3'>
                        <DefaultCard
                            description='Product images are photographs of the product you are selling.  '
                            title='Income'
                            image='https://www.volusion.com/blog/content/images/2021/09/Product-Photography-1.jpeg'
                            qty={income}
                            cardKey={4}
                        />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-12 col-md-9">
                        <div className="context">
                            <DefaultChart chartData={chartData}/>
                        </div>
                    </div>
                    <div className="col-12 col-md-3 list-group" style={{height:'500px', overflow:'auto'}}>
                        <div className="row">
                            {
                                products.map((product,index)=><MinQtyChart key={index} name={product.name} description={product.description} image={product.image}/>)
                            }
                            
                        </div>

                    </div>
                </div>


            </div>
        </>

    )
}

export default Home