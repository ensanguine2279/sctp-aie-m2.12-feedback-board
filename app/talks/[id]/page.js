import Link from "next/link";
import styles from "./page.module.css";

async function getTalk(id) {
  const res = await fetch(`${process.env.API_BASE_URL}/talks/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch talk details.");
  }

  return res.json();
}

export default async function TalkDetailPage({ params }) {
  const { id } = await params;
  const talk = await getTalk(id);

  return (
    <div className={styles.container}>
      <Link href="/talks" className={styles.backLink}>
        &larr; Back to all talks
      </Link>

      <h1 className={styles.title}>{talk.title}</h1>

      <p className={styles.meta}>
        <strong>Speaker:</strong> {talk.speaker}
      </p>
      <p className={styles.meta}>
        <strong>Track:</strong> {talk.track}
      </p>

      <hr className={styles.divider} />

      <h3 className={styles.sectionTitle}>Abstract</h3>
      <p className={styles.abstract}>{talk.abstract}</p>
    </div>
  );
}
