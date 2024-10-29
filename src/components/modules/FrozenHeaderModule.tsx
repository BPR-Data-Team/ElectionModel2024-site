import DemocratD from "../svgs/DemocratD";
import RepublicanR from "../svgs/RepublicanR";
import Module from "../Module";
import styles from "./FrozenModule.module.css";
import Trophy from "../svgs/Trophy";
import RingChart from "../svgs/RingChart";
import DownloadThisCard from "../DownloadThisCard";
import { Party } from "@/types/Party";
import { RaceType } from "@/types/RaceType";
import { State, getNumDistricts } from "@/types/State";
import TiedRace from "../svgs/TiedRace";
import ExclamationMark from "../svgs/ExclamationMark";
import { useEffect, useState } from "react";



/**
 *
 * @returns {JSX.Element} The PredictionModule component.
 */
export default function FrozenHeader(
): JSX.Element {

  return (
    <Module className="frozenModule">
      <div className={styles.prediction}>
        <div className={styles.mainPredictionAlt}>
          <span className={styles.mainPredictionTextAlt}>
            Our election predictions below are frozen as of 12am on November 5th.
            <br />
            <a href="#likely-outcomes" className={styles.linkText}>
              Scroll down to see likely electoral outcomes from when we froze them.
            </a>
          </span>
        </div>
      </div>
    </Module>
  );
}
