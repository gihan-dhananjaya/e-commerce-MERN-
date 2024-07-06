import {BrowserRouter as Router,Route,Routes,Link} from "react-router-dom";
import './App.css'
import Home from "./components/Home.tsx";
import Customer from "./components/Customer.tsx";
import Order from "./components/Order.tsx";
import Product from "./components/Product.tsx";
import Login from "./components/Login.tsx";
import Signup from "./components/Signup.tsx";

function App() {
  return (
    <Router>
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" >
                <div className="container-fluid">
                    <div className="navbar-brand">
                        <img src='https://img.freepik.com/premium-vector/company-logo-business-logo-logo-brand_982550-3.jpg'
                            className='logo' alt='logo'/>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/customer'>Customer</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/order'>Order</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/product'>Product</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/login'>Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <br/>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/customer' element={<Customer/>} />
                <Route path='/Order' element={<Order/>} />
                <Route path='/Product' element={<Product/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/signup' element={<Signup/>} />
            </Routes>
        </div>
    </Router>
  )
}

export default App
