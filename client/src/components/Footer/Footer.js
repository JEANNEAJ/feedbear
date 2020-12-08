import React from 'react';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrapper ${styles.wrapper}`}>
        <p>Created by Andre Facey, Evan Wallace, Joey Chau, and Nathan Kanigsberg</p>
        <p>©2020</p>
      </div>
    </footer>
  )
}
