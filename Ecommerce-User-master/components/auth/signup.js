import React, { useState, useEffect } from 'react';
import { signup, isAuth, preSignup } from '../../actions/auth';
import Router from 'next/router';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Input } from 'antd'



const SignupComponent = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        showForm: true
    });

    const { name, email, password, error, loading, message, showForm } = values;

    useEffect(() => {
        isAuth() && Router.push(`/`);
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        const user = { name, email, password };
        signup(user).then(data => {
            if (data.error) {
                toast.error(data.error)

            } else {
              console.log(data)
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    showForm: false
                });
            }
        });
    };

    const handleChange = name => e => {
        e.preventDefault()
        setValues({ ...values, error: false, [name]: e.target.value });
    };



    const signupForm = () => {
        return (
            <form onSubmit={handleSubmit} className='text-center'>
                    <Input
                        value={name}
                        onChange={handleChange('name')}
                        type="text"
                        size="large"
                        addonBefore='Name'
                        className="pl-3 pr-3 mb-2"
                    />
                    <Input
                        value={email}
                        onChange={handleChange('email')}
                        type="email"
                        size="large"
                        addonBefore='Email'
                        className="pl-3 pr-3 mb-2"
                    />
                    <Input
                        value={password}
                        onChange={handleChange('password')}
                        type="password"
                        size="large"
                        addonBefore='Password'
                        className='mb-2 pl-3 pr-3'
                    />
                    <button className='signup-component-btn mt-2'>Signup</button>

            </form>
        );
    };

    return (
            <div className="row col justify-content-center p-2">
              <ToastContainer />
              <div className="signup-component-inner-container col-md-5 ">
                  <h1 className="signup-component-title">Sign Up</h1>
                     {showForm && signupForm()}
              </div>
             </div>
    );
};

export default SignupComponent;
