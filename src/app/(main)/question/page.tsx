"use client"
import styles from "./page.module.css";
import type { Metadata } from "next";
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function Question() {

  useEffect(() => {
    redirect("https://forms.gle/S6terR8THpMB8MMGA");
  }, []);

  return (
    <div className={styles.main}>
      <p><b>Redirecting to the application form&hellip;</b></p>
      <p>If you are not redirected, click <a href="https://forms.gle/S6terR8THpMB8MMGA">here</a>.</p>
    </div>
  );
}