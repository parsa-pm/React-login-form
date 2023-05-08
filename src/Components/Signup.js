//SIGNUP
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { notify } from './toast';

import { validate } from './validate';

import styles from '../Signup.module.css'

const Signup = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        isAccepted: false
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
        setErrors(validate(data, "signup"))
    }, [data, touched]);

    const changeHandler = (event) => {
        if(event.target.name === "isAccepted") {
            setData({...data, [event.target.name]: event.target.checked})
        } else (
            setData({...data, [event.target.name]: event.target.value})
        )
    };
    

    const focusHandler = (handler) => {
        setTouched({...touched, [handler.target.name]: true})
    };

    const submitHandler = event => {
        event.preventDefault();
        notify()
        if(!Object.keys(errors).length) {
            notify("You signed in successfully", "success")
        } else {
            notify("Invalid data", "error")
            setTouched({
                name: true,
                email: true,
                password: true,
                confirmPassword: true,
                isAccepted: true
            })
        }
    };

    return (
        <div className={styles.container}>

        <form className={styles.formContainer} onSubmit={submitHandler}>

            <h1 className={styles.header}>SignUp</h1>

            <div className={styles.formField}>
                <label>Name</label>
                <input
                type="text"
                name="name"
                value={data.name}
                className={(errors.name && touched.name) ? styles.uncompleted : styles.formInput}
                onChange={changeHandler}
                onFocus={focusHandler} />
                {errors.name && touched.name && <span>{errors.name}</span>}
            </div>

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

            <div className={styles.formField}>
                <label>Confrim Password</label>
                <input
                type="password"
                name="confirmPassword"
                value={data.confirmPassword}
                className={(errors.confirmPassword && touched.confirmPassword) ? styles.uncompleted : styles.formInput}
                onChange={changeHandler}
                onFocus={focusHandler} />

                {errors.confirmPassword && touched.confirmPassword && <span>{errors.confirmPassword}</span>}
            </div>

            <div className={styles.formField}>
                <div className={styles.checkboxContainer}>
                <label>I Accept Terms Of Privacy Policy</label>
                <input
                type="checkbox"
                name="isAccepted"
                value={data.isAccepted}
                onChange={changeHandler}
                onFocus={focusHandler} />
                </div>

                {errors.isAccepted && touched.isAccepted && <span>{errors.isAccepted}</span>}
            </div>

            <div className={styles.formButtons}>
                    <Link to="/login">Login</Link>
                    <button type="submit">Sign Up</button>
                </div>

        </form>
        <ToastContainer />
            
        </div>
    );
};

export default Signup;