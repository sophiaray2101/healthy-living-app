import React from 'react';
import {useState, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import './LoginPage.js';

function LoginPage(){
    const [errorMessage, errorMessageSetter] = useState('');
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        let user = {};
        user.username = usernameRef.current.value;
        user.password = passwordRef.current.value;

        let parameters = {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
          }
        console.log("handleLogin called");
        let url = 'http://localhost:8000/api/user_info/login';

        fetch(url, parameters)
          .then(res => {
            if (res.status === 200)
                return res.json();
            else if (res.status === 401)
                throw new Error("Invalid username or password");
            else 
                throw new Error("Error occured. Please try again.")
          })
          .then(json => {
            errorMessageSetter(''); // clear any old error message
            navigate('/home');
          })
          .catch(err => {
            console.log(err);
            errorMessageSetter(err.message);
          })
    }

    return (
        <div>
            <h2 className='login-title'> Log In Below to Access Application</h2>
            <form className='login-form' onSubmit={handleLogin}>
                <div className="login-form-row" id="input-form-row">
                    <label>
                        Username:
                        <input 
                        type="text" 
                        name="username"
                        ref={usernameRef} />
                    </label>
                </div>
                <div className="login-form-row" id="input-form-row">
                    <label>
                        Password:
                        <input 
                        type="text" 
                        name="password"
                        ref={passwordRef} />
                    </label>
                </div>
                <div className="login-form-row">
                    <button type="submit">Log In</button>
                </div>
            </form>

            {errorMessage && ( // only renders error message if it exists
                <div className='error-message'>{errorMessage}</div>

            )}

            <div id='register-link'> Dont have an account? <Link to="/register">Create Account Here</Link></div>
        </div>
    )

}

export default LoginPage;