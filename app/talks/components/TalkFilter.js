"use client";

import styles from "./TalkFilter.module.css";

export default function TalkFilter({
  uniqueTracks,
  selectedTrack,
  setSelectedTrack,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <div className={styles.container}>
      {/* Controls Bar */}
      <div className={styles.controlsBar}>
        <div className={styles.searchInputWrapper}>
          <input
            type="text"
            placeholder="Search by talk title or speaker..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterGroup}>
          {uniqueTracks.map((track) => (
            <button
              key={track}
              onClick={() => setSelectedTrack(track)}
              className={`${styles.filterButton} ${
                selectedTrack === track ? styles.activeButton : ""
              }`}
            >
              {track}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
