"use client";

import { useEffect } from "react";
import styles from "./error.module.css";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Something went wrong!</h2>
      <p className={styles.message}>
        {error.message || "An unexpected error occurred."}
      </p>
      <button onClick={() => reset()} className={styles.button}>
        Try again
      </button>
    </div>
  );
}
