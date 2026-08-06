import TalkContainer from "./components/TalkContainer";

import styles from "./page.module.css";

async function getTalks() {
  const res = await fetch(`${process.env.API_BASE_URL}/talks`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch talks from the server.");
  }

  return res.json();
}

export default async function TalksPage() {
  const talks = await getTalks();

  //console.log("Fetched talks:", talks); // Log the fetched talks for debugging

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Conference Talks</h1>
      <TalkContainer initialTalks={talks} />
    </div>
  );
}
