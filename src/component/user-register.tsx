
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

export function UserRegister() {
    
    let navigate=useNavigate()

    const formik=useFormik({
        initialValues:{
            UserId:'',
            Username:'',
            Password:'',
            Email:'',
            Mobile:''
        }, onSubmit:(user)=>{
            axios.post('http://127.0.0.1:3200/register-user',user)
            .then(()=>{
                alert('User Registered Successfully...')
                navigate('/login')
            })
        }
    })

    return (
        <div className="text-start d-flex justify-content-center">
            <form className="bg-light p-3 mt-4" onSubmit={formik.handleSubmit}>
                <h3>Register User</h3>
                <div className="form-floating">
                       <dt> <label >User Id</label></dt>
                   <dd> <input type="text" className="form-control" name="UserId" onChange={formik.handleChange}/> </dd>
                </div>
                <div className="form-floating">
                       <dt> <label >User Name</label></dt>
                   <dd> <input type="text" className="form-control" name="UserName" onChange={formik.handleChange}/> </dd>
                </div>
                <div className="form-floating">
                       <dt> <label >Password</label></dt>
                   <dd> <input type="text" className="form-control" name="Password" onChange={formik.handleChange}/> </dd>
                </div>
                <div className="form-floating">
                       <dt> <label >Email</label></dt>
                   <dd> <input type="email" className="form-control" name="Email" onChange={formik.handleChange}/> </dd>
                </div>
                <div className="form-floating">
                       <dt> <label >Mobile</label></dt>
                   <dd> <input type="text" className="form-control" name="Mobile" onChange={formik.handleChange}/> </dd>
                </div>
                <button className='btn btn-outline-warning w-100'>Register</button>
                <Link to="/" className="mx-4">Home Page</Link>
                <Link to="/login" >Already have Account??</Link>
            </form>
        </div>
    )
}