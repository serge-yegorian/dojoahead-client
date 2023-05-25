import './Login.scss'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [cookies, setCookies] = useCookies(['access_token'])

    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        axios
          .post('http://localhost:3001/auth/login', { username, password })
          .then((response) => {
            window.localStorage.setItem("userID", response.data.userID)
            setCookies("access_token", response.data.token)
            navigate("/")
          })
          .catch((error) => {
            console.log(error);
            alert('Registration failed. Please try again.');
          });
      };

    return <section className="enter">
        <form className="enter__form" onSubmit={onSubmit}>
            <div className='enter__content'>
                <h1 className='enter__signup'>Log In</h1>
                <div className='enter__input-fields'>
                    <div className="enter__form-input">
                        <label htmlFor="email" className="enter__label">Email:</label>
                        <input className="enter__input" type="email" placeholder="email@gmail.com" onChange={((e) => setUsername(e.target.value))}/>
                    </div>
                    <div className="enter__form-input">
                        <label htmlFor="password" className="enter__label">Password:</label>
                        <input className="enter__input" type="password" minLength='8' placeholder="at least 8 characters" onChange={((e) => setPassword(e.target.value))}/>
                    </div>
                </div>
            </div>
            
            <div className='enter__bottom'>
                <p className='enter__dev-info'>Do not have an account? <Link className='enter__login' to={'/enter'}>Register</Link></p>
                    <button className="enter__button">
                        Log In
                    </button>
            </div>
        </form>
    </section>
}

export default Login;