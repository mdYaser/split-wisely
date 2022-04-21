import React from "react";
import styles from "./textarea.module.scss";

const TextArea = ({ value, onChange, placeholder = "Description" }) => {
	return (
		<div className={styles.textfield}>
			<textarea
				className={styles.input}
				value={value}
				onChange={onChange}
				rows="3"
				placeholder={placeholder}
			/>
		</div>
	);
};

export default TextArea;
