"use client"
import styles from "./page.module.css";
import type { Metadata } from "next";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Apply() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to Google Form
    window.location.href = 'https://forms.gle/9Ey8wnR7s42Jik657';
  }, [router]);

  return (
    <div className={styles.main}>
      <p><b>Redirecting to the application form&hellip;</b></p>
      <p>If you are not redirected, click <a href="https://forms.gle/9Ey8wnR7s42Jik657">here</a>.</p>
    </div>
  );
}