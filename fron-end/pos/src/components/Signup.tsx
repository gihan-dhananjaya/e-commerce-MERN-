import  AxiosInstance  from "./config/axiosInstance";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup:React.FC=()=> {

    const [fullName,setFullName] = useState<string>('');
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');

    const signup = async ()=>{
        
        try {
            const response = await AxiosInstance.post('/users/register',{
                fullName,email,password
            });
            console.log(response);

            setEmail('');
            setFullName('');
            setPassword('');
           
        }catch (e){
            console.log(e);
        }

    }

    return(
        
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input onChange={(e)=>{setFullName(e.target.value)}} value={fullName} type="text" className="form-control" placeholder="Full Name here" />
                            </div>
                        </div>

                        <div className="col-12 mb-3">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type="email" className="form-control" placeholder="Email here" />
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type="password" className="form-control" placeholder="Password here" />
                            </div>
                        </div>
                        <div className="col-12 mt-5">
                            <button className="btn btn-primary col-12" onClick={signup}>SignUp</button>
                            <br/>
                            <br/>
                            <Link to='/login' className="btn btn-outline-dark col-12">Login</Link>
                        </div>
                    </div>
                </div>
            </>
    )
}

export default Signup