import React, { useState } from 'react';
import styles from '../FormAuthorization/FormAuthorization.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { store } from '../../store';

export const FormAuthorization = () => {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formValue;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleClick = async () => {
    store.login = formValue;
    try {
      const params = new URLSearchParams();
      params.set('username', username);
      params.set('password', password);
      const response = await fetch('http://79.143.31.216/login', {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        grant_type: 'authorization_code',
        body: params,
      });
      const data = await response.json();

      if (response.status === 200) {
        store.userToken = data;
        localStorage.clear();
        localStorage.setItem('access_token', `${data.access_token}`);
        localStorage.setItem('token_type', `${data.token_type}`);
        localStorage.setItem('username', `${username}`);
        navigate('/squeeze');
      } else if (response.status === 400) {
        alert('Данные введены неверно! ');
      }
    } catch (e) {
      console.log('Запрос не отправлен!');
    }
  };

  return (
    <div className={styles.FormAuthorization}>
      <div className={styles.mainConteiner}>
        <h1>welcome</h1>
        <div className={styles.inputs}>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={username}
            placeholder="Your username"
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
            placeholder="Password"
          />
        </div>
        <button onClick={handleClick}>Sing up</button>
        <div className={styles.bottomText}>
          <p>Don’t have an account?</p>
          <NavLink to="/Registration" className={styles.reg}>
            register now
          </NavLink>
        </div>
      </div>
    </div>
  );
};
