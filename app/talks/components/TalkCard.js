import styles from "./TalkCard.module.css";

export default function TalkCard({ talk }) {
  return (
    <div className={styles.card}>
      <div>
        <span className={styles.badge}>{talk.track}</span>
        <h3 className={styles.cardTitle}>{talk.title}</h3>
      </div>
      <p className={styles.cardFooter}>
        Speaker: <span className={styles.speakerName}>{talk.speaker}</span>
      </p>
    </div>
  );
}
