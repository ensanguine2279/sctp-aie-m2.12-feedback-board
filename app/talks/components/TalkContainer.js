"use client";

import { useState, useMemo } from "react";
import TalkFilter from "./TalkFilter";
import TalkList from "./TalkList";
import styles from "./TalkContainer.module.css";

export default function TalkContainer({ initialTalks }) {
  const [selectedTrack, setSelectedTrack] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  console.log("Rendering TalkContainer with initialTalks:", initialTalks);

  const filteredTalks = useMemo(() => {
    return initialTalks
      .filter((talk) => {
        const matchesTrack =
          selectedTrack === "All" || talk.track === selectedTrack;
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          talk.title.toLowerCase().includes(query) ||
          talk.speaker.toLowerCase().includes(query);

        return matchesTrack && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "popular") {
          return (b.favouriteCount || 0) - (a.favouriteCount || 0);
        }
        return 0; // keeps default order if not sorting by popular
      });
  }, [initialTalks, selectedTrack, searchQuery, sortBy]);

  const uniqueTracks = [
    "All",
    ...Array.from(
      new Set(
        initialTalks.map((t) => t.track).filter((track) => track), // Filters out null, undefined, or empty strings
      ),
    ),
  ];

  //console.log("Rendering TalkContainer with uniqueTracks:", uniqueTracks);

  return (
    <div className={styles.wrapper}>
      <TalkFilter
        uniqueTracks={uniqueTracks}
        selectedTrack={selectedTrack}
        setSelectedTrack={setSelectedTrack}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <TalkList talks={filteredTalks} />
    </div>
  );
}
