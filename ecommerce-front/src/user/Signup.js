import React, { useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import {payment, authenticate, isAuthenticated, signin, signup} from '../auth';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        isPay: false,
        redirectToReferrer: false
    });

    const { name, email, password, error, redirectToReferrer} = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        console.log("asdfasdf");
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, redirectToReferrer: false });
            } else {
                alert("User Create Sucess");
                signin({ email, password }).then(data => {
                    if (data.error) {
                        setValues({ ...values, error: data.error, loading: false });
                    } else {
                        authenticate(data, () => {
                            setValues({
                                ...values,
                                redirectToReferrer: true
                            });
                        });
                    }
                });
            }
        });
    };

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    // const showSuccess = () => (
    //     <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
    //         New account is created. Please <Link to="/signin">Signin</Link>
    //     </div>
    // );

    const redirectUser = () => {
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    return (
        <Layout
            title="Signup"
            description="Signup to Node React E-commerce App"
            className="container col-md-8 offset-md-2"
        >
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </Layout>
    );
};

export default Signup;
