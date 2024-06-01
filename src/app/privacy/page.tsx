import styles from "./page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Privacy Policy | 24cast.org',
  };

const PrivacyPage: React.FC = () => {
    return (
        <div className={styles.overall}>
            <div className={styles.main}>
                <h2>Privacy Policy</h2>
                <p>Last Updated: June 1, 2024</p>
            </div>
            <div className={styles.main}>
                <p>This privacy notice for 24cast by the Brown Political Review (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), describes how and why we might collect, store, use, and/or share (&quot;process&quot;) your information when you use our services (&quot;Services&quot;).</p>
                <p>In order to provide, improve, and administer our Services, some information&mdash;such as your Internet Protocol (IP) address and/or browser and device characteristics&mdash;is collected automatically when you visit this Site.</p>
                <p>We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is used for our internal analytics and reporting purposes. We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. We collect information using Google Analytics and Microsoft Clarity.</p>
                <p>This policy can be updated without notice. Check the Last Updated date at the top of this page to see when changes were last implemented.</p>
            </div>
        </div>

    );
};


export default PrivacyPage;