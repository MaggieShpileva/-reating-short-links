import React, { useEffect, useState } from 'react';
import styles from './MainPage.module.scss';
import { store } from '../../store';
import { DataRow } from '../DataRow/DataRow';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

export const MainPage = () => {
  const navigate = useNavigate();
  const [inputLink, setinputLink] = useState('');
  const [storeState, setStoreState] = useState([]);
  const [currentSort, setCurrentSort] = useState(' ');

  const handleChange = (event) => {
    setinputLink(event.target.value);
  };

  const linkParts = inputLink.split('://');

  const handleClick = async () => {
    setinputLink('');
    try {
      const params = new URLSearchParams();
      params.set('link', inputLink);

      const response = await fetch(
        `http://79.143.31.216/squeeze?link=${linkParts[0]}%3A%2F%2F${linkParts[1]}%2F`,
        {
          method: 'POST',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            Authorization:
              localStorage.getItem('token_type') +
              ' ' +
              localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: params,
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        setStoreState([...storeState, data]);
        store.dataLinks.push(data);

        //console.log(data);
      } else if (response.status === 401) {
        alert('Токен устарел. Зайдите в аккаунт снова!');
        navigate('/');
      }
    } catch (e) {
      console.log('1234');
    }
  };

  localStorage.getItem('access_token');
  const renderPage = (link) => {
    return link?.map((link, index) => (
      <DataRow key={`${link.text}-${index}`} link={link} />
    ));
  };

  const viewSort = () => {
    setStoreState([...storeState.sort((a, b) => (a.short > b.short ? 1 : -1))]);
  };
  const options = [
    { value: 'id', label: 'id' },
    { value: 'short', label: 'short link' },
    { value: 'target', label: 'full link' },
    { value: 'counter', label: 'counter' },
  ];

  // сортировка
  const getValue = () => {
    return currentSort ? options.find((s) => s.value === currentSort) : '';
  };

  const sortOnChange = (newValue) => {
    setCurrentSort(newValue.value);

    if (newValue.value === 'short') {
      setStoreState([
        ...storeState.sort((a, b) => (a.short > b.short ? 1 : -1)),
      ]);
    } else if (newValue.value === 'id') {
      setStoreState([...storeState.sort((a, b) => (a.id > b.id ? 1 : -1))]);
    } else if (newValue.value === 'target') {
      setStoreState([
        ...storeState.sort((a, b) => (a.target > b.target ? 1 : -1)),
      ]);
    }
  };

  return (
    <div className={styles.MainPage}>
      <div className={styles.username}>
        <p>{localStorage.getItem('username')}</p>
      </div>
      <h1>статистика по созданным ссылкам</h1>
      <div className={styles.inputDiv}>
        <input
          type="text"
          name="inputLink"
          onChange={handleChange}
          value={inputLink}
          placeholder="Enter link"
        />
        <button onClick={handleClick}>Generate</button>
      </div>
      <div className={styles.sort}>
        <Select
          onChange={sortOnChange}
          value={getValue()}
          options={options}
          className={styles.select}
        />
      </div>
      <div className={styles.row}>
        <p className={styles.id}>id</p>
        <p className={styles.link}>Короткая ссылка</p>
        <p className={styles.link}>Исходная ссылка</p>
        <p className={styles.count}>Количество переходов</p>
      </div>
      <div>{renderPage(storeState)}</div>
    </div>
  );
};
