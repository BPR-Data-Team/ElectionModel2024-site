import styles from "./page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Terms of Service | 24cast.org',
  };

const TOSPage: React.FC = () => {
    return (
        <div className={styles.overall}>
            <div className={styles.main}>
                <h2>Terms of Use</h2>
                <p>Last Updated: May 1, 2024</p>
            </div>
            <div className={styles.main}>
                <p>These terms and conditions (the &quot;Terms and Conditions&quot;) govern the use of https://24cast.org (&quot;24cast.org&quot;, the &quot;Site&quot;). This Site is owned and operated by The Brown Political Review (&quot;BPR&quot;). </p>
                <p>By using this Site, you indicate that you have read and understand these Terms and Conditions and agree to abide by them at all times.</p>
                <p>24cast.org creates predictions for races in the 2024 general US election using an open-source machine learning model. The predictions on this site are created solely for entertainment purposes in an effort to demonstrate how elections can be modeled and what factors are most crucial to predicting an election.</p>
                <p>24cast.org&apos;s webmaster can be contacted at ariel[underscore]shifrin[at]brown[dot]edu. Please request a mailing address by email if needed.</p>
            </div>
            <div className={styles.main}>
                <p><b>Intellectual Property</b></p>
                <p>All content published and made available on our Site is under the copyright of The Brown Political Review and the Site&apos;s creators. This includes, but is not limited to images, text, logos, documents, downloadable files, and anything that contributes to the composition of our Site. The Site’s underlying codebase is open-source and is subject to a CC BY-SA 4.0 license.</p>
            </div>
            <div className={styles.main}>
                <p><b>Acceptable Use</b></p>
                <p>As a user of our Site, you agree to use our Site legally, not to use our Site for illegal purposes, and not to:</p>
               <ul>
                <li>Violate the intellectual property rights of the Site owners or any third party to the Site</li>
                <li>Attempt to reverse engineer components of the website that are not open-sourced</li>
                <li>Make any financial decisions, including gambling, on the basis of predictions</li>
               </ul>
               <p>If we believe you are using our Site illegally or in a manner that violates these Terms and Conditions, we reserve the right to limit, suspend or terminate your access to our Site. We also reserve the right to take any legal steps necessary to prevent you from accessing our Site.</p>
            </div>
            <div className={styles.main}>
                <p><b>Third-Party Content</b></p>
                <p>By using the Site, you agree to have demographic and usage information collected through Google Analytics. You consent to the use of third-party cookies to collect this information and consent to the transmission of such data to third-party servers, as outlined in our Privacy Policy.</p>
                <p>Any links to third-party services do not constitute endorsements of their content. 24cast.org is not responsible for any content linked on domains other than this one.</p>
            </div>
            <div className={styles.main}>
                <p><b>Modifications</b></p>
                <p>The content on this Site, the machine learning model that underlies it, and any additional components of this Site are subject to change without notice. These terms are also subject to change without notice.</p>
            </div>
            <div className={styles.main}>
                <p><b>Governance and Litigation</b></p>
                <p>24cast.org is based in Rhode Island. These Terms should be considered with regard to the law of Rhode Island and the United States. Any litigation or arbitration against the proprietors of 24cast.org should be brought in Rhode Island.</p>
            </div>
            <div className={styles.main}>
                <p><b>Intended Use</b></p>
                <p>The site is intended for individuals within the United States. 24cast.org does not guarantee compliance with any laws in jurisdictions outside of the United States.</p>
            </div>
        </div>

    );
};


export default TOSPage;