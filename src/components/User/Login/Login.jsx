import React, { useState } from 'react'
import './Login.css'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate();

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })
    //handle Change
    const handleCahnge = (event) => {
        const { name, value } = event.target;
        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    //submit Action function
    const handleSubmit = () => {
        const { email, password } = formValue;
        if (!email || !password) {
            toast.warning('Please enter required field')
        } else {
            if (password.length < 6) {
                toast.warning('Please enter atleast 6 characters')
            } else {
                axios.post('http://localhost:9000/api/user/signin', formValue)
                    .then((response) => {
                        if (response.data.status === false) {
                            toast.error(response.data.message)
                        } else {
                            let UserData = {
                                id: response.data.id,
                                name: response.data.name,
                                email: response.data.email
                            }
                            // console.log(UserData)
                            localStorage.setItem("userName", JSON.stringify(UserData.name));
                            localStorage.setItem("userEmail", JSON.stringify(UserData.email));
                            localStorage.setItem("userId", JSON.stringify(UserData.id));
                            navigate('/home')
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
                        <li className="signin-active"><a className="btn">Sign in</a></li>
                    </ul>
                </div>
                <form className="form-signin">
                    <label htmlFor="username">Email Address</label>
                    <input className="form-styling" type="email" name="email" value={formValue.email} onChange={handleCahnge} />
                    <label htmlFor="password">Password</label>
                    <input className="form-styling" type="password" name="password" value={formValue.password} onChange={handleCahnge} />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Link to='/forgot/password' style={{ margin: 0, color: 'white', fontSize: '12px', display: 'flex', justifyContent: 'end' }} href="#">Forgot your password?</Link>
                        <Link to='/signup' style={{ margin: 0, color: 'white', fontSize: '12px', display: 'flex', justifyContent: 'end' }} href="#">sign Up</Link>
                    </div>
                    <div className="btn-animate">
                        <a onClick={handleSubmit} className="btn-signin">Sign in</a>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default Login