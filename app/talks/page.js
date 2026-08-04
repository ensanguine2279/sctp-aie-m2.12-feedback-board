import TrackFilter from "./components/TrackFilter";

import styles from "./page.module.css";

async function getTalks() {
  console.log(`Fetching talks from the server... ${process.env.API_BASE_URL}`);

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

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Conference Talks</h1>
      <TrackFilter talks={talks} />
    </div>
  );
}
