"use client";

import { useState } from "react";

import Link from "next/link";

import styles from "./TrackFilter.module.css";

export default function TrackFilter({ talks }) {
  const [selectedTrack, setSelectedTrack] = useState("All");

  // Extract unique tracks dynamically from the dataset
  const tracks = ["All", ...new Set(talks.map((talk) => talk.track))];

  // Filter talks entirely in memory without network requests
  const filteredTalks =
    selectedTrack === "All"
      ? talks
      : talks.filter((talk) => talk.track === selectedTrack);

  return (
    <div className={styles.container}>
      {/* Track Filter Buttons */}
      <div className={styles.filterGroup}>
        {tracks.map((track) => {
          const isActive = selectedTrack === track;
          return (
            <button
              key={track}
              onClick={() => setSelectedTrack(track)}
              className={`${styles.filterButton} ${
                isActive ? styles.filterButtonActive : ""
              }`}
            >
              {track}
            </button>
          );
        })}
      </div>

      {/* Render Filtered Talks List */}
      <ul className={styles.list}>
        {filteredTalks.map((talk) => (
          <li key={talk.id} className={styles.card}>
            <h3 className={styles.cardTitle}>{talk.title}</h3>
            <p className={styles.cardMeta}>
              <strong>Speaker:</strong> {talk.speaker} &bull;{" "}
              <strong>Track:</strong> {talk.track}
            </p>
            <Link href={`/talks/${talk.id}`} className={styles.detailsLink}>
              View Details &rarr;
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
