import axios from "axios"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { Link, useNavigate, useParams } from "react-router-dom"
import { AppointmentContract } from "../Contract/AppointmentContract"


export function EditAppointment() {
    const [appointment, setAppointments] = useState<AppointmentContract[]>
        ([{
            AppointmentId: 0,
            Title: '',
            Description: '',
            Date: new Date(),
            UserId: ''
        }])
    const [cookies, setCookie, removeCookie] = useCookies(['userid'])
    let params = useParams()
    let navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://127.0.0.1:3200/get-appointment/${params.id}`)
            .then(response => {
                setAppointments(response.data)
            })
    }, [])
    const formik = useFormik({
        initialValues: {
            AppointmentId: appointment[0].AppointmentId,
            Title: appointment[0].Title,
            Description: appointment[0].Description,
            Date: appointment[0].Date,
            UserId: cookies['userid']

        },
        onSubmit: (appointment) => {
            axios.put(`http://127.0.0.1:3200/edit-appointment/${params.id}`, appointment)
                .then(() => {
                    alert('Appointment Edit Successfully...')
                    navigate('/dashboard')
                })
        },
        enableReinitialize: true
    })
    return (
        <div className="text-start d-flex justify-content-center">
            <form className="bg-light p-3 mt-4" onSubmit={formik.handleSubmit}>
                <h3>Edit Appointment</h3>
                <dl>
                    <dt>Appointment Id</dt>
                    <dl>
                        <dt>Edit Appointment</dt>
                        <dd> <input type="number" name="AppointmentId" onChange={formik.handleChange} value={formik.values.AppointmentId} className="form-control" />
                        </dd>
                        <dt>Title</dt>
                        <dd>
                            <input type="text" name="Title" onChange={formik.handleChange} value={formik.values.Description} className="form-control" />
                        </dd>
                        <dt>Description</dt>
                        <dd>
                            <input type="text" name="Description" onChange={formik.handleChange} value={formik.values.Description} className="form-control" />
                        </dd>
                        <dt>Date</dt>
                        <dd>
                            <input type="date" name="Date" onChange={formik.handleChange} value={formik.values.Date.toString().slice(0,formik.values.Date.toString().indexOf('T'))} className="form-control" />
                        </dd>
                        <button className="btn btn-success">Save</button>
                        <Link to="/dashboard" className="btn btn-danger ms-2 ">Cancel</Link>
                    </dl>
                </dl>

            </form>

        </div>
    )
}