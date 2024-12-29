import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
export function AddAppointment(){

    const[cookies,setCookie,removeCookie]=useCookies(['userid'])

    let navigate =useNavigate();

    const formik=useFormik({
        initialValues:{
            AppointmentId:0,
            Title:'',
            Description:'',
            Date:'',
            UserId:cookies['userid']
        },
        onSubmit:(appointment)=>{
            axios.post(`http://127.0.0.1:3200/add-appointment`,appointment)
            .then(()=>{
                alert('Appointment Added Successfully...')
                navigate('/user-dashboard')
            })
        }
    })
    return(
            <div className="text-start d-flex justify-content-center">
                <div>
                    <form className="bg-light p-3 mt-4" onSubmit={formik.handleSubmit}>
                        <h3>Add New Appointment</h3>
                        <dl>
                            <dt> 
                                <dd><input type="number" onChange={formik.handleChange} className="form-control" name="AppointmentId"/></dd>
                            </dt>
                            <dt>Title</dt>
                            <dd>
                                <input type="text" onChange={formik.handleChange} className="form-control" name="Title" />
                            </dd>

                            <dt>Description</dt>
                            <dd> <textarea rows={4} onChange={formik.handleChange} cols={40} name="Description" className="form-control" ></textarea>
                            </dd>

                            <dt>Date</dt>
                            <dd>
                                <input type="date" onChange={formik.handleChange} name="Date" className="form-control"/>
                            </dd>
                        </dl>
                        <button type="submit" className="btn btn-success">Add </button>
                        <div className="mt-2" >
                            <Link to={'/dashboard'}>Back to Dashboard</Link>
                        </div>
                    </form>
                </div>
            </div>
      
    )
}