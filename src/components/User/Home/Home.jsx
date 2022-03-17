import React, { useEffect, useState } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [userInfo, setUserInfo] = useState({
        name: null,
        email: ""
    })
    const navigate = useNavigate();
    useEffect(() => {
        let userName = localStorage.getItem("userName")
        let userEmail = localStorage.getItem("userEmail")
        setUserInfo({ ...userInfo, name: userName, email: userEmail })

        if (userInfo.name) {

        } else {
            // navigate('/')
        }
    }, [])

    const handleSignOut = () => {
        localStorage.clear();
        navigate('/')
    }
    return (
        <div className='user-homepage'>
            <div className="user-homepage-cart">
                <img src="https://images.ctfassets.net/j7pfe8y48ry3/5ax9Zl4ZOMoYgg6OieqCQM/057bf91a0a9ef18287cd0d77b5f2968a/homepagevideo.png" alt="" />
                <div className="user-homepage-user-info">
                    <h3 className="user__na">Welcome </h3>
                    <h3 className="user__na">{userInfo ? userInfo.name : 'Plaese login'} </h3>
                    {userInfo.name ? <button onClick={handleSignOut}>Sign Out</button> : ''}
                </div>

            </div>
        </div>
    )
}

export default Home