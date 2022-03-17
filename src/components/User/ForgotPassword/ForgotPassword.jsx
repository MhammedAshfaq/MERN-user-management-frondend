import React, { useState } from 'react';
import './ForgotPassword.css';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios';

const ForgotPassword = () => {
    const [fromValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    //handleChange
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValue({
            ...fromValue,
            [name]: value
        })
    }

    const handleSubmit = () => {
        const { email, password } = fromValue;
        if (!email || !password) {
            toast.warning('Please enter required field')
        } else {
            if (password.length < 6) {
                toast.warning('Please enter atleast 6 characters')
            } else {
                axios.post('http://localhost:9000/api/user/forgot', fromValue)
                    .then((response) => {
                        console.log(response)
                        if (response.data.status) {
                            toast.success(response.data.message)
                            navigate('/')
                        } else {
                            toast.error(response.data.message)
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
                        <li className="signin-active"><Link to='/forgot/password' className="btn">Forgot Password</Link></li>
                    </ul>
                </div>
                <form className="form-signin" >
                    <label htmlFor="username">Email Address</label>
                    <input className="form-styling" type="email" name="email" value={fromValue.email} onChange={handleChange} />
                    <label htmlFor="password">New PAssword</label>
                    <input className="form-styling" type="password" name="password" value={fromValue.password} onChange={handleChange} />
                    <Link to='/' style={{ margin: 0, color: 'white', fontSize: '12px', display: 'flex', justifyContent: 'end' }} href="">Go Back</Link>
                    <div className="btn-animate">
                        <a onClick={handleSubmit} className="btn-signin">Submit new Password</a>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default ForgotPassword