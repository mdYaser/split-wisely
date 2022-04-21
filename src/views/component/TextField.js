import React from "react";
import styles from "./textfield.module.scss";

const TextField = ({ value, onChange, leftIcon, placeholder, required }) => {
	return (
		<div className={styles.textfield}>
			<div className={styles.left}>{leftIcon}</div>
			<input
				className={styles.input + ` ${leftIcon ? styles.inputWLeft : ""}`}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				required={required}
			/>
		</div>
	);
};

export default TextField;
