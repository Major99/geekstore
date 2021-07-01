import { useState, useEffect } from 'react';
import { signin, authenticate, isAuth } from '../../actions/auth';
import Router from 'next/router';
import Link from 'next/link';
import {Input, Button} from 'antd'
import { ToastContainer, toast } from 'react-toastify';




const SigninComponent = ({ success }) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { email, password, error, loading, message, showForm } = values;

    useEffect(() => {
        isAuth() && Router.push(`/`);
    }, []);

    const handleSubmit = e => {
        e.preventDefault();

        setValues({ ...values, loading: true, error: false });
        const user = { email, password };

        signin(user).then(data => {
            if (data.error) {
              toast.error(data.error)
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                     success(false)
                    if (isAuth() && isAuth().role === 1) {
                        Router.push(`/`);
                    } else {
                        Router.push(`/`);
                    }
                });
            }
        });
    };

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };



    const signinForm = () => {
        return (
          <div>
            <form onSubmit={handleSubmit} className='text-center'>
                   <Input
                       value={email}
                       addonBefore='Email'
                       onChange={handleChange('email')}
                       type="email"
                       size="large"
                       className='m-1 signin-component-input'
                   />
                   <Input
                       value={password}
                       addonBefore='Password'
                       onChange={handleChange('password')}
                       type="password"
                       size="large"
                       className='m-1  signin-component-input'
                   />
                    <button className='signin-component-btn mt-2'>SIGN IN</button>
            </form>
          </div>
        );
    };

    return<div className="row col justify-content-center signin-component-outer-container">
                  <ToastContainer />
                  <div className="signin-component-inner-container col-md-7">
                      <h1 className="signin-component-title">Sign In</h1>
                      {showForm && signinForm()}
                      <Link href="/auth/password/forgot">
                      <a><Button  className='ml-2 signin-component-forgot-btn'>Forgot password</Button></a>
                      </Link>

                  </div>
          </div>
};

export default SigninComponent;
