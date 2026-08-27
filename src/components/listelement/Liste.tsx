import type React from "react";
import styles from "./Liste.module.css";

type Props = {
    children: React.ReactNode;
};

export const Liste = ({ children }: Props) => {
    return <dl className={styles.list}>{children}</dl>;
};
