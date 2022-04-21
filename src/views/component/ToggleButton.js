import React, { useState } from "react";
import styles from "./togglebutton.module.scss";

const ToggleButton = ({ on, toggle }) => {
	return (
		<div
			className={styles.container + ` ${on ? styles.on : ""}`}
			onClick={toggle}
		>
			<div className={styles.dot} />
		</div>
	);
};

export default ToggleButton;
