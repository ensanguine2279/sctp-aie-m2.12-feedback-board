"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.css";

export default function TalkDetailsClient({ talk, avatarUrl }) {
  const fallbackAvatar = "/images/default-avatar.png";
  const initialAvatar = useMemo(
    () => avatarUrl || talk.speakerPhotoUrl || fallbackAvatar,
    [avatarUrl, talk.speakerPhotoUrl],
  );
  const [currentAvatar, setCurrentAvatar] = useState(initialAvatar);

  return (
    <main className={styles.container}>
      <div className={styles.navigationRow}>
        <Link href="/talks" className={styles.backLink}>
          &larr; Back to Talks
        </Link>
      </div>

      <article className={styles.article}>
        <header className={styles.header}>
          <div className={styles.badgeRow}>
            <span className={styles.trackBadge}>{talk.track}</span>
            <span className={styles.favouriteBadge}>
              ❤️ {talk.favouriteCount || 0} Favourites
            </span>
          </div>

          <h1 className={styles.title}>{talk.title}</h1>
        </header>

        <section className={styles.speakerSection}>
          <div className={styles.avatarWrapper}>
            <Image
              src={currentAvatar}
              alt={talk.speaker}
              width={77}
              height={77}
              className={styles.speakerPhoto}
              priority
              onError={() => setCurrentAvatar(fallbackAvatar)}
            />
          </div>
          <div className={styles.speakerInfo}>
            <h2 className={styles.speakerName}>{talk.speaker}</h2>
            <p className={styles.speakerRole}>
              Keynote Speaker & Domain Expert
            </p>
          </div>
        </section>

        <section className={styles.contentSection}>
          <h3 className={styles.sectionHeading}>About this Talk</h3>
          <p className={styles.description}>
            {talk.description ||
              "Detailed session description and abstract will be provided soon."}
          </p>
        </section>
      </article>
    </main>
  );
}
