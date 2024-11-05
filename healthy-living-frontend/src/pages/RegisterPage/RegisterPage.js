import React from "react";
import { useState, useRef } from "react";
import {useNavigate} from 'react-router-dom';

function RegisterPage(){
    const [userErrorMessage, userErrorMessageSetter] = useState('');
    const [pwordErrorMessage, pwordErrorMessageSetter] = useState('');
    const [rePwordErrorMessage, rePwordErrorMessageSetter] = useState('');
    const [successMessage, successMessageSetter] = useState('');


    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const repeatPasswordRef = useRef(null);

    const navigate = useNavigate();

    const verifyRepeatPassword = (password, repeatPassword) => {
        // verify passswords match
        if (password !== repeatPassword){
            rePwordErrorMessageSetter("Passwords do not match.")
            return false;
        }
        else{
            rePwordErrorMessageSetter('');
            return true;
        }
    }

    const verifyPassword = (password) => {
        // verify password is at least 8 chars with a number
        let checkLength = true;
        if (password.length < 8){
           checkLength = false;
        }

        let checkNum = false;
        for(let i = 0; i < password.length; i++){
            let val = password.charCodeAt(i);

            if(val >= 48 && val <= 57)
                checkNum = true;
        }

        if (!checkNum || !checkLength){
            pwordErrorMessageSetter("Invalid password. Password must be at least 8 characters and contain a number.");
            return false;
        }
        else{
            pwordErrorMessageSetter('');
            return true;
        }
    }

    const verifyUsername = async (user) => {
         // checking username is unique -> made async function (doing fetch) so must return a promise 
         let parameters = {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }
        console.log("verifyUsername called");
        let url = 'http://localhost:8000/api/user_info/check_username';

        try {
            const res = await fetch(url, parameters);
            
            if (res.status === 200) {
                userErrorMessageSetter(''); 
                return true;
            } else if (res.status === 409) {
                throw new Error("Username already exists.");
            } else {
                throw new Error("Error occurred. Please try again.");
            }
        } catch (err) {
            console.log(err);
            userErrorMessageSetter(err.message);
            return false;
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        let user = {};
        user.username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const repeatPassword = repeatPasswordRef.current.value;

        const isUsernameValid = await verifyUsername(user);
        const isPasswordValid = verifyPassword(password);
        const isRepeatPasswordValid = verifyRepeatPassword(password, repeatPassword);

        if (isUsernameValid && isPasswordValid && isRepeatPasswordValid){
            user.password = password;
            
            let parameters = {
                method: "POST",
                headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }

            console.log("handleRegister called");
            let url = 'http://localhost:8000/api/user_info/register';

            fetch(url, parameters)
            .then(res => {
                if (res.status === 201){
                    successMessageSetter("Successfully created account! Navigating to login page...");
                    setTimeout(() => {
                        navigate("/");
                    }, 2000);
                }
                else 
                    throw new Error("Error occured. Please try again.")
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    return(
        <div>
            <h2 className='register-title'> Fill Out Information Below to Create an Account</h2>
            <form className='register-form' onSubmit={handleRegister}>
                <div className="register-form-row" id="input-form-row">
                    <label>
                        Username:
                        <input 
                        type="text" 
                        name="username"
                        ref={usernameRef} />
                    </label>
                    {userErrorMessage && ( // only renders error message if it exists
                    <div className='error-message'>{userErrorMessage}</div>
                    )}
                </div>
                <div className="register-form-row" id="input-form-row">
                    <label>
                        Password:
                        <input 
                        type="text" 
                        name="password"
                        ref={passwordRef} />
                    </label>
                    {pwordErrorMessage && ( 
                    <div className='error-message'>{pwordErrorMessage}</div>
                    )}
                </div>
                <div className="register-form-row" id="input-form-row">
                    <label>
                        Repeat password:
                        <input 
                        type="text" 
                        name="password"
                        ref={repeatPasswordRef} />
                    </label>
                    {rePwordErrorMessage && ( 
                    <div className='error-message'>{rePwordErrorMessage}</div>
                    )}
                </div>
                <div className="register-form-row">
                    <input 
                        type="checkbox" 
                        id="checkbox-register-form"
                        required />
                    <div className="checkbox-register-form-text">I agree to Terms and Conditions and Privacy Policy</div>
                </div>
                <div className="register-form-row">
                    <button type="submit">Register</button>
                </div>
            </form>
            {successMessage && ( 
                    <div className='success-message'>{successMessage}</div>
            )}
        </div>
    )

}

export default RegisterPage;