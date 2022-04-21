import React from "react";
import styles from "./header.module.scss";

const Header = ({ children }) => {
	return <h2 className={styles.header}>{children}</h2>;
};

export default Header;
