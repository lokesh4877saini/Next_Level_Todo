"use client"
import Link from 'next/link';
import React, { useState, useContext, useEffect } from 'react';
import { context } from '../components/Clients';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import './Form.scss';

const Page = () => {
    const router = useRouter();
    const { setUser, isLogin, setIsLogin } = useContext(context)
    const [formData, setFormData] = useState({
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
        setIsLogin(true);
        const { email, password } = formData;
        try {
            const response = await fetch('/api/auth/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            const { success, message, user } = await response.json();

            if (success) {
                toast.success(message);
                setUser(user);
            } else {
                toast.error(message || "Login failed");
                setIsLogin(false);
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong");
            setIsLogin(false);
        }

        setFormData({
            email: "",
            password: ""
        });
    };
    useEffect(() => {
        if (isLogin) {
            router.push('/');
        }
    }, [isLogin]);
    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <h2>Login</h2>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' id="email" placeholder="Enter your email" value={formData.email} onChange={handleFormData} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' id="password" placeholder="Enter your password" value={formData.password} onChange={handleFormData} />
                </div>

                <button type="submit" className="submit-btn">Login</button>
                <div className="form-footer">
                    <p>OR</p>
                    <Link href="/register" className="register-link">Register</Link>
                </div>
            </form>
        </div>
    );
};

export default Page;
