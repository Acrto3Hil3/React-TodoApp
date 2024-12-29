import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom"
import { AppointmentContract } from "../Contract/AppointmentContract"


export function Dashboard(){

    const [cookies,setCookie,removeCookie]=useCookies(['userid'])

    const[appointments,setAppointments]=useState<AppointmentContract[]>()

    useEffect(()=>{

        axios.get(`http://127.0.0.1:3200/appointments/${cookies['userid']}`)
        .then(response=>{
            setAppointments(response.data)
        })
    },[])

    let navigate=useNavigate()

    function handleSignout(){
        removeCookie('userid')
        navigate('/login')
    }
    
    return(
        <div className="p-2">
            <nav className="d-flex justify-content-between mt-4 p-2">
                <div className="h3 text-light">{cookies['userid']} - Dashboard</div>
                <div className="ms-4"><button onClick={handleSignout} className="btn btn-danger">Sigout</button></div>
            </nav>
            <section className="text-start" style={{height:'100vh'}}>
                <div>
                    <Link to={"/add-appointment"} className="bi bi-calender-date btn btn-dark">Add Appointment</Link>
                </div>
                <div>
                    {
                        appointments?.map(appointment=>
                            <div className="alert w-50 my-4 alert-success" key={appointment.AppointmentId}>
                                <h2>{appointment.Title}</h2>
                                <p>{appointment.Description}</p>
                                <div className="bi bi-calendar-date">{appointment.Date.toString()}
                                </div>
                                <div className="mt-2">
                                    <Link to={`/delete-appointment/${appointment.AppointmentId}`} className="bi bi-trash btn btn-danger me-2">Remove</Link>
                                    <Link to={`/edit-appointment/${appointment.AppointmentId}`} className="bi bi-pen-fill btn btn-warning">Edit</Link>
                                </div>
                            </div>
                        )
                    }
                </div>
            </section>
        </div>    
    )
}