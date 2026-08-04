import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Event Feedback Board</h1>
      <p className={styles.description}>
        Welcome to the conference portal. Browse scheduled talks and share your
        thoughts.
      </p>
      <Link href="/talks" className={styles.link}>
        View All Talks &rarr;
      </Link>
    </main>
  );
}
