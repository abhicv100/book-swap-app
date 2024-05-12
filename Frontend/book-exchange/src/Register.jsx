import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = (props) => {

    let navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        let userPayload = {
            firstName: firstName,
            lastName: lastName,
            emailId: email,
            password: pass
        }

        fetch('http://localhost:8003/user',
            {
                method: 'POST',
                body: JSON.stringify(userPayload),
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => {
                if (response.status == 200) {

                    const headers = {
                        'Authorization': 'Basic ' + btoa(email + ":" + pass)
                    }

                    // make authentication call
                    fetch('http://localhost:8003/auth', { method: 'POST', headers: headers })
                        .then((response) => {
                            if (response.status == 200) {
                                return response.json()
                            } else {
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
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="auth-parent-container">
            <div className="auth-form-container">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>

                    <label htmlFor="firstName">First Name</label>
                    <input value={firstName} name="firstName" id="firstName" onChange={(e) => setFirstName(e.target.value)} />

                    <label htmlFor="lastName">Last Name</label>
                    <input value={lastName} name="lastName" id="lastName" onChange={(e) => setLastName(e.target.value)} />

                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="abc@gmail.com" id="email" name="email" />

                    <label htmlFor="password">password</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="******" id="password" name="password" />

                    <button type="submit">Register</button>
                </form>
                <button className="link-btn" onClick={() => navigate('/login')}>Already have an account? Login here.</button>
            </div>
        </div>
    )
}