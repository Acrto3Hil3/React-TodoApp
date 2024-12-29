import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import '../index.css';

export function TodoIndexPage(){
    return(
       <div className='d-flex justify-content-around'>
        {/* image container */}
       <div className='container-fluid child1'>
        <div></div>
       </div>

        {/* form container */}

            <form className='mt-4 '>
        <div className=' container-fluid child2  d-flex-column mt-5'>
            <h3 className='text-center m-4'>Welcome to ToDo Application</h3>
           
            <Link to="/login" className='btn btn-outline-primary form-control mt-4 p-4'>Already have Account?</Link>
            <Link to="/register" className='btn btn-outline-primary form-control mt-4 p-4'>Register New Account</Link>
        </div>
           </form>
        </div>
       
    )
}