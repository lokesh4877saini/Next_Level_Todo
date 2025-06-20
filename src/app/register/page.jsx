"use client"
import Link from 'next/link';
import React,{useState} from 'react';
import './Form.scss';
import {toast} from 'react-hot-toast';

const Page = () => {
    const [formData, setFormData] = useState({
        name:"",
        email: "",
        password: ""
    })
    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name,email, password } = formData;
        try {
            const response = await fetch('/api/auth/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name,email,password})
            })
            const {success,message,user}= await response.json();
            if(success){
                toast.success(message);
            }else{
                toast.error(message);
            }
        } catch (error) {
            console.error(error.message)
        }
        setFormData({
            name:"",
            email: "",
            password: ""
        })
    }
    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name='name' value={formData.name} onChange={handleFormData} placeholder="Enter your name" />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name='email' value={formData.email} onChange={handleFormData} placeholder="Enter your email" />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' value={formData.password} onChange={handleFormData} id="password" placeholder="Enter your password" />
                </div>

                <button type="submit" className="submit-btn">Sign Up</button>
                <div className="form-footer">
                    <p>OR</p>
                    <Link href="/login" className="register-link">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Page;
