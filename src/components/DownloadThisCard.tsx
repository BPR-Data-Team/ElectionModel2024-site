import React from 'react';
import { toPng } from 'html-to-image';
import styles from "./DownloadThisCard.module.css";
import DownloadIcon from './svgs/Download'; // Import the SVG as a component

interface DownloadImageProps {
  targetRef: React.RefObject<HTMLElement>; // A reference to the element to capture
  filename?: string; // Optional filename for the download
}

const DownloadImage: React.FC<DownloadImageProps> = ({
  targetRef,
  filename = 'download.png',
}) => {
  const handleDownload = () => {
    if (targetRef.current === null) return;

    toPng(targetRef.current, { quality: 0.95 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename; // Use the provided filename
        link.click();
      })
      .catch((error) => {
        console.error('Failed to capture and download image:', error);
      });
  };

  return (
    <button onClick={handleDownload} className={styles.downloadThisCard}>
      <DownloadIcon />
    </button>
  );
};

export default DownloadImage;
