import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { notify } from './toast';

import { validate } from './validate';

import styles from '../Signup.module.css'

const Login = () => {

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
        setErrors(validate(data, "login"))
    }, [data, touched]);

    const changeHandler = (event) => {
        setData({...data, [event.target.name]: event.target.value})
    };
    

    const focusHandler = (handler) => {
        setTouched({...touched, [handler.target.name]: true})
    };

    const submitHandler = event => {
        event.preventDefault();
        notify()
        if(!Object.keys(errors).length) {
            notify("You loged in successfully", "success")
        } else {
            notify("Invalid data", "error")
            setTouched({
                email: true,
                password: true,
            })
        }
    };

    return (
        <div className={styles.container}>

        <form className={styles.formContainer} onSubmit={submitHandler}>

            <h1 className={styles.header}>Login</h1>
            
            <div className={styles.formField}>
                <label>Email</label>
                <input
                type="text"
                name="email"
                value={data.email}
                className={(errors.email && touched.email) ? styles.uncompleted : styles.formInput}
                onChange={changeHandler}
                onFocus={focusHandler} />

                {errors.email && touched.email && <span>{errors.email}</span>}
            </div>

            <div className={styles.formField}>
                <label>Password</label>
                <input
                type="password"
                name="password"
                value={data.password}
                className={(errors.password && touched.password) ? styles.uncompleted : styles.formInput}
                onChange={changeHandler}
                onFocus={focusHandler} />

                {errors.password && touched.password && <span>{errors.password}</span>}
            </div>

            <div className={styles.formButtons}>
                <Link to="/signup">Sign Up</Link>
                    <button type="submit">Login</button>
                </div>

        </form>
        <ToastContainer />
            
        </div>
    );
};

export default Login;