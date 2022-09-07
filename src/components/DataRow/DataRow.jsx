import React, { useRef, useState } from 'react';
import styles from './DataRow.module.scss';

export const DataRow = ({ link }) => {
  const [copySuccess, setCopySuccess] = useState('');
  const linkShortRef = useRef(null);

  const copyLink = () => {
    let currentlink = `http://79.143.31.216/s/${link.short}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentlink).then(() => {
        alert('Copied to clipboard');
      });
    } else {
      console.log('Browser Not compatible');
    }
  };
  // event.target.focus();
  // setCopySuccess('Coppyed!');

  return (
    <div className={styles.DataRow}>
      <p className={styles.id}>{link.id}</p>
      <div className={styles.link}>
        <a
          href={`http://79.143.31.216/s/${link.short}`}
          target="_blank"
          ref={linkShortRef}
        >
          http://79.143.31.216/s/{link.short}
        </a>
        <button onClick={copyLink}>Copy</button>
      </div>
      <a className={styles.link} href={`${link.target}`} target="_blank">
        {link.target}
      </a>
      <p className={styles.count}>{link.counter}</p>
    </div>
  );
};
