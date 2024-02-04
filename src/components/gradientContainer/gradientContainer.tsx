import { ReactNode } from "react";
import styles from "./gradientContainer.module.css";

const GradientContainer = ({ children }: { children: ReactNode }) => {
  return (
    <section className={styles.gradientContainer}>
      <div className={styles.container}>{children}</div>
    </section>
  );
};

export default GradientContainer;
