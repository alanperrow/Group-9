import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';    // custom css stylesheet

const BASE_URL = 'https://mern-morse-code-translator.herokuapp.com/';

function Login()
{
    var email;
    var loginPassword;

    const [message,setMessage] = useState('');

    const doLogin = async event => 
    {
        event.preventDefault();

        if (email.value === '') {
            setMessage("Please enter your email address");
        } else if (loginPassword.value === '') {
            setMessage("Please enter your password");
        }

        var js = '{"email":"'
            + email.value
            + '","password":"'
            + loginPassword.value +'"}';

        try
        {    
            const response = await fetch(BASE_URL + '/login',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            alert(response);

            var res = JSON.parse(await response.text());

            if(res.error)
            {
                setMessage(res.error);
            }
            else if (res.status === 400)
            {
                setMessage(res.data);
            }
            else
            {
                var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                // change later to morsecode UI
                window.location.href = '/user';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };

    return(
        <div id="loginDiv" className="container">
            <div className="jumbotron">
                <h4 id="inner-title">LOG IN</h4>
                <hr />
                <form className="align-center" onSubmit={doLogin}>
                    <div className="form-group">
                        <label for="email">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="name@email.com" ref={(c) => email = c}></input>
                    </div>
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="your super secret password" ref={(c) => loginPassword = c}></input>
                    </div>
                    <button type="submit" className="btn btn-outline-primary" onClick={doLogin}>Sign in</button>
                    <Link to="/forgot" id="textAfterButton">Forgot password?</Link>
                    <br />
                    <Link to="/signup" className="btn btn-outline-info my0">New user? Sign Up</Link>
                </form>
                <p id="loginResult">{message}</p>
            </div>
        </div>
    );
};

export default Login;