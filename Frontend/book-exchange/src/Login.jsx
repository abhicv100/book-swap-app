import React, { useState, useEffect } from "react"

import { useNavigate } from "react-router-dom";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const [showErrorMsg, setShowErrorMsg] = useState(false)

    let navigate = useNavigate()

    useEffect(() => {
        // checking if user have signed in by checking the stored access token
        if (localStorage.getItem('access-token') != null) {
            navigate("/")
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        setShowErrorMsg(false)

        const headers = {
            'Authorization': 'Basic ' + btoa(email + ":" + pass)
        }

        fetch('http://localhost:8003/auth', { method: 'POST', headers: headers })
            .then((response) => {
                if (response.status == 200) {
                    return response.json()
                } else {
                    setShowErrorMsg(true)
                    throw Error(response.status)
                }
            })
            .then((json) => {
                localStorage.setItem('access-token', json['data'])
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="auth-parent-container">
            <div className="auth-form-container">
                <h2>Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="abc@gmail.com" id="email" name="email" />
                    <label htmlFor="password">password</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="******" id="password" name="password" />
                    <button>Log In</button>
                </form>
                <button className="link-btn" onClick={() => navigate('/register')}>Don't have an account? Register here.</button>
                {showErrorMsg && <span style={{ color: 'red' }}>Login failed!</span>}
            </div>
        </div>
    )
}