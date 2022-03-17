import React, { useEffect, useState } from 'react'
import './AdminEditUser.css'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const AdminEditUser = () => {
    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({
        id: '',
        name: '',
        email: '',
        password: ''
    })

    //get edit user function
    const { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:9000/api/admin/get/edit/user/${id}`)
            .then((response) => {
                if (response.data.nouser) {
                    toast.error(response.data.message)
                } else {
                    setFormValue({
                        ...formValue,
                        id: response.data._id,
                        name: response.data.name,
                        email: response.data.email,
                    })
                }
            }).catch((err) => {
                toast.error(err)
            })
    }, [])

    //handle change function
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    //submit function
    const handleSubmit = () => {
        const { email, id, name, password } = formValue;
        if (!email || !id || !password || !name) {
            toast.warning('Please enter required field')
        } else {
            if (password.length < 6) {
                toast.warning('Please enter atleast 6 characters')
            } else {
                axios.post('http://localhost:9000/api/admin/edit/user', formValue)
                    .then((response) => {
                        if (response.data.status) {
                            toast.success(response.data.message);
                            navigate('/admin/dashbord')
                        }
                    }).catch((err) => {
                        toast.error(err)
                    })
            }
        }
    }

    return (
        <div className="container">
            <div className="frame">
                <div className="nav">
                    <ul className="links">
                        <li className="signin-active"><a className="btn">Edit User Details for Admin</a></li>
                    </ul>
                </div>
                <form className="form-signin" >
                    <label htmlFor="username">Name</label>
                    <input className="form-styling" type="text" name="name" value={formValue.name} onChange={handleChange} />
                    <label htmlFor="username">Email Address</label>
                    <input className="form-styling" type="email" name="email" value={formValue.email}  />
                    <label htmlFor="password">New PAssword</label>
                    <input className="form-styling" type="password" name="password" value={formValue.password} onChange={handleChange} />
                    <Link to='/admin/dashbord' style={{ margin: 0, color: 'white', fontSize: '12px', display: 'flex', justifyContent: 'end' }} >Go Back</Link>
                    <div className="btn-animate">
                        <a onClick={handleSubmit} className="btn-signin">Edit User</a>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default AdminEditUser