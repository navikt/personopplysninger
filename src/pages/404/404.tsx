import { Heading } from "@navikt/ds-react";
import styles from "./404.module.css";

const PageNotFound = () => (
    <div className={styles.container}>
        <Heading size={"large"} level={"1"}>
            404
        </Heading>
    </div>
);
export default PageNotFound;
