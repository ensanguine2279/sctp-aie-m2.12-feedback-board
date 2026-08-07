"use client";

import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import styles from "./error.module.css";

export default function Error({ error, reset }) {
  const router = useRouter(); // Get the router instance for navigation and refreshing
  const [isPending, startTransition] = useTransition(); // Track the transition state for retrying

  // Log the error to the console for debugging purposes, not required for retry/reset functionality
  useEffect(() => {
    console.error(error);
  }, [error]);

  function handleRetry() {
    // Use startTransition to indicate that the retry action is a non-urgent update,
    // allowing React to prioritize rendering other updates if needed.
    startTransition(() => {
      // Refresh server component data, then retry the failed segment.
      router.refresh();
      reset();
    });
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Something went wrong!</h2>
      <p className={styles.message}>
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={handleRetry}
        className={styles.button}
        disabled={isPending}
      >
        {isPending ? "Retrying..." : "Try again"}
      </button>
    </div>
  );
}
