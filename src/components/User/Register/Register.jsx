import React, { useState } from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'


const Register = () => {
    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({
        name: '',
        email: '',
        password: '',
        confirmpassword: ''
    })

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
        const { name, email, password, confirmpassword } = formValue;
        if (name && email && password && confirmpassword) {
            if (password && confirmpassword.length < 6) {
                toast.error('Password must have been 6 characters')

            } else {
                if (password === confirmpassword) {
                    axios.post('http://localhost:9000/api/user/signup', formValue).then((response) => {
                        if (response.data.action) {
                            toast.success(response.data.message)
                            navigate('/')
                        } else {
                            toast.error(response.data.message)
                        }
                    }).catch((err) => {
                        toast.error(err)
                    })
                } else {
                    toast.error('Password not match')
                }
            }
        } else {
            toast.error('Please enter required field');
        }
    }

    return (
        <div>
            <div>
                <div className="container">
                    <div className="frame">
                        <div className="nav">
                            <ul className="links">
                                <li className="signin-active"><a className="btn">Sign Up</a></li>
                            </ul>
                        </div>
                        <form className="form-signin">
                            <label htmlFor="fullname">Full name</label>
                            <input className="form-styling" type="text" name="name" value={formValue.name} onChange={handleChange} />
                            <label htmlFor="email">Email</label>
                            <input className="form-styling" type="email" name="email" value={formValue.email} onChange={handleChange} />
                            <label htmlFor="password">Password</label>
                            <input className="form-styling" type="password" name="password" value={formValue.password} onChange={handleChange} />
                            <label htmlFor="confirmpassword">Confirm password</label>
                            <input className="form-styling" type="password" name="confirmpassword" value={formValue.confirmpassword} onChange={handleChange} />
                            <Link to='/' style={{ margin: 0, color: 'white', fontSize: '12px', display: 'flex', justifyContent: 'end' }} href="">Go Back</Link>
                            <a onClick={handleSubmit} className="btn-signup">Sign Up</a>
                        </form>
                    </div>
                </div >
            </div >
        </div>
    )
}

export default Register