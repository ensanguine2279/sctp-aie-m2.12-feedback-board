import "./globals.css";
import styles from "./layout.module.css";

export const metadata = {
  title: "Event Feedback Board",
  description: "Browse conference talks and share feedback",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <div className={styles.main}>{children}</div>
      </body>
    </html>
  );
}
