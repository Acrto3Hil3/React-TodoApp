import axios from "axios"
import { useFormik } from "formik"
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom"

export function UserLogin(){

    const[cookies,setCookie,removeCookie]=useCookies(['userid'])
    let navigate=useNavigate()

    const formik=useFormik({
        initialValues:{
            UserId:'',
            Password:''
        },onSubmit:(user)=>{
            axios.get(`http://127.0.0.1:3200/users`)
            .then(response=>{
                var client=response.data.find((item:any)=>item.UserId===user.UserId)

                if(client){
                    if(client.Password===user.Password){
                        setCookie('userid',user.UserId)
                        navigate('/dashboard')
                    }
                    else{
                        alert('Invalid Password')
                    }
                }
                else{
                    alert('User not found')
                }
            })
        }
    })

    return(
       <div className="text-start d-flex justify-content-center">
        <form className="bg-light p-3 mt-4" onSubmit={formik.handleSubmit}>
            <h3>User Login</h3>
            <dl>
                <dt>User Id</dt>
                <dd> <input type="text" onChange={formik.handleChange} className="form-control" name="UserId" /> </dd>
                <dt>Password</dt>
                <dd> <input type="password" onChange={formik.handleChange} className="form-control" name="Password" /> </dd>
            </dl>

            <button type="submit" className="btn btn-warning w-100">Login
            </button>
            <div className="mt-3"> <Link to="/register">REgister New User</Link></div>
        </form>

       </div>
    )
}