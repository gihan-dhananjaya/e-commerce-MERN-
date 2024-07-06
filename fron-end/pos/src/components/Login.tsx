
import  AxiosInstance  from "./config/axiosInstance";
import React, { useState } from "react"
import { Link } from "react-router-dom"

const Login:React.FC=()=> {

    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');

    const login = async ()=>{
        
        try {
            const response = await AxiosInstance.post('/users/login',{
                email,password
            });
            console.log(response.data);

            const expirationDte = new Date();
            expirationDte.setDate(expirationDte.getDate()+2);

            const cookieValue = encodeURIComponent('token')+'='+encodeURIComponent(response.data)+'; expires='+expirationDte.toUTCString()+'; path=/';
            document.cookie = cookieValue;
            
            

            setEmail('');
            setPassword('');
           
        }catch (e){
            console.log(e);
        }

    }

    return(
        <>
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type="email" className="form-control" placeholder="Email here" />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type="password" className="form-control" placeholder="Password here" />
                        </div>
                    </div>
                    <div className="col-12 mt-5">
                        <button className="btn btn-primary col-12" onClick={login}>Login</button>
                        <br/>
                        <br/>
                        <Link to='/signup' className="btn btn-outline-dark col-12">SignUp</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login