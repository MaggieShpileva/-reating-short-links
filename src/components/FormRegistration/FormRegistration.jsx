import React, { useState } from 'react';
import styles from '../FormRegistration/FormRegistration.module.scss';
import { store } from '../../store';
import { NavLink, Link, useNavigate } from 'react-router-dom';

export const FormRegistration = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });
  const { username, email, password1, password2 } = formValue;
  let password;

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
    store.registration = formValue;
    if (password1 === password2) {
      const password = password1;
      try {
        const params = new URLSearchParams();
        params.set('username', username);
        params.set('password', password1);
        const response = await fetch(
          `http://79.143.31.216/register?username=${formValue.username}&password=${formValue.password1}`,
          {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer',
            body: params,
          }
        );
        const data = await response.json();
        console.log(data);
        if (response.status === 200) {
          store.registration = data;
          alert('Вы успешно зарегистрированы!');
          navigate('/');
        } else if (response.status === 400) {
          alert('Пользователь с таким именем уже существует! ');
        }
      } catch (e) {
        console.log('Запрос не отправлен!');
      }
    } else {
      alert('Пароли не совпадают!');
    }
  };
  return (
    <div className={styles.FormRegistration}>
      <div className={styles.mainConteiner}>
        <h1>Create account</h1>
        <div className={styles.inputs}>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={username}
            placeholder="Your username"
          />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={email}
            placeholder="Your email"
          />
          <input
            type="password"
            name="password1"
            onChange={handleChange}
            value={password1}
            placeholder="Password"
          />
          <input
            type="password"
            name="password2"
            onChange={handleChange}
            value={password2}
            placeholder="Repeat your password"
          />
        </div>
        <div className={styles.checkboxInfo}>
          <input type="checkbox" />
          <label htmlFor="">I agree all statements in Terms of service</label>
        </div>
        <button onClick={handleClick}>Sing up</button>
        <div className={styles.bottomText}>
          <p>Have already an account ?</p>

          <NavLink to="/" className={styles.link}>
            Login here
          </NavLink>
        </div>
      </div>
    </div>
  );
};
