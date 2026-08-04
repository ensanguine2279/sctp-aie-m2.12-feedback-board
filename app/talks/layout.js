import Link from "next/link";
import styles from "./layout.module.css";

export default function TalksLayout({ children }) {
  return (
    <div className={styles.layoutContainer}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.backLink}>
            &larr; Home
          </Link>
          <h2 className={styles.siteTitle}>Conference Feedback Board</h2>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
