import TalkCard from "./TalkCard";
import styles from "./TalkList.module.css";

export default function TalkList({ talks }) {
  return (
    <div className={styles.grid}>
      {talks.length > 0 ? (
        talks.map((talk) => <TalkCard key={talk.id} talk={talk} />)
      ) : (
        <div className={styles.emptyState}>No talks found.</div>
      )}
    </div>
  );
}
