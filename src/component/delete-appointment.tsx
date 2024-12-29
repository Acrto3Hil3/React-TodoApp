import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { AppointmentContract } from "../Contract/AppointmentContract"


export function DeleteAppointment(){
    let params =useParams()
    const[appointment,setAppointments]=useState<AppointmentContract[]>([{
        AppointmentId:0,
        Title:'',
        Description:'',
        Date:new Date(),
        UserId:''
    }])
    let navigate =useNavigate()
    useEffect(()=>{
        axios.get(`http://127.0.0.1:3200/get-appointment/${params.id}`)
        .then(response=>{
            setAppointments(response.data)
        })
    },[])

    function handleDeleteClick(){
        axios.delete(`http://127.0.0.1:3200/delete-appointment/${params.id}`)
        .then(()=>{
            navigate('/dashboard')
        })
    }
    return(
        <div className="bg-light mt-3 w-25 text-start p-2">
            <h3>Delete Appointment</h3>
            <dl>
                <dt>Title</dt>
                <dd> {appointment[0].Title} </dd>
                <dt>Description</dt>
                <dd> {appointment[0].Description} </dd>
            </dl>
            <button onClick={handleDeleteClick} className="btn btn-danger me-2">Yes</button>
            <Link className="btn btn-warning" to="/user-dashboard"> No </Link>
        </div>
    )
   
}