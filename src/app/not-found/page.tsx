"use client";
import styles from "./page.module.css";

const NotFoundPage: React.FC = () => {
    return (
        <div className={styles.center}>
            <h1>404</h1>
            <p><b>The page you are looking for does not exist.</b></p>
            <p>Check the URL for typos or return <a href="/#">home</a>.</p>
        </div>
    );
};


export default NotFoundPage;