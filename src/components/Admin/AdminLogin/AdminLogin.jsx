import React, { useState } from 'react'
import './AdminLogin.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({
        email: '',
        id: '',
        password: ''
    })

    //handle change
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    //submit function
    const handleSubmit = (event) => {
        event.preventDefault();
        const { email, id, password } = formValue;
        if (!email || !id || !password) {
            toast.warning('Please enter required field')
        } else {
            if (password.length < 6) {
                toast.warning('Please enter atleast 6 characters')
            } else {
                axios.post('http://localhost:9000/api/admin/signin', formValue)
                    .then((response) => {
                        if (response.data.admin) {
                            toast.success(response.data.message);
                            navigate('/admin/dashbord')
                        } else {
                            toast.error(response.data.message)
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
            }
        }

    }
    console.log(formValue)
    return (
        <div>
            <div className="login">
                <div className="form">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <i style={{ fontSize: '4rem', margin: '10px 0 30px 0' }} className="fa-solid fa-user-check"></i>
                        <input type="email" placeholder="email" name='email' value={formValue.email} onChange={handleChange} />
                        <input type="number" placeholder="ID" name='id' value={formValue.id} onChange={handleChange} />
                        <input type="password" placeholder="password" name='password' value={formValue.password} onChange={handleChange} />
                        <button type='submit'>login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin