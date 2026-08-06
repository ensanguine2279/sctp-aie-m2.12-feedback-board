"use client";

import styles from "./TalkFilter.module.css";

export default function TalkFilter({
  uniqueTracks,
  selectedTrack,
  setSelectedTrack,
  searchQuery,
  setSearchQuery,
  sortBy,
  onSortChange,
}) {
  return (
    <div className={styles.container}>
      {/* Track filter buttons */}
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
          <label htmlFor="trackSelect" className={styles.filterLabel}>
            Track:
          </label>
          <select
            id="trackSelect"
            value={selectedTrack}
            onChange={(e) => setSelectedTrack(e.target.value)}
            className={styles.filterSelect}
          >
            {uniqueTracks.map((track) => (
              <option key={track} value={track}>
                {track}
              </option>
            ))}
          </select>
        </div>

        {/* Sort selection */}
        <div className={styles.sortGroup}>
          <label htmlFor="sortSelect" className={styles.sortLabel}>
            Sort by:
          </label>
          <select
            id="sortSelect"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="default">Default</option>
            <option value="popular">Most popular</option>
          </select>
        </div>
      </div>
    </div>
  );
}
