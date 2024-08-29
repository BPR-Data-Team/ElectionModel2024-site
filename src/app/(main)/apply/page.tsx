"use client"
import styles from "./page.module.css";
import type { Metadata } from "next";
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function Apply() {

  useEffect(() => {
    redirect("https://forms.gle/9Ey8wnR7s42Jik657");
  }, []);

  return (
    <div className={styles.main}>
      <p><b>Redirecting to the application form&hellip;</b></p>
      <p>If you are not redirected, click <a href="https://forms.gle/9Ey8wnR7s42Jik657">here</a>.</p>
    </div>
  );
}