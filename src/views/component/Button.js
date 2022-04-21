import React from "react";
import styles from "./button.module.scss";

const Button = ({
	children,
	onClick,
	ml,
	mr,
	mt,
	mb,
	secondary,
	disabled,
	type,
}) => {
	const inStyle = {
		marginLeft: ml,
		marginRight: mr,
		marginTop: mt,
		marginBottom: mb,
	};
	return (
		<div style={inStyle}>
			<button
				className={styles.button + ` ${secondary ? styles.secondary : ""}`}
				onClick={onClick}
				disabled={disabled}
				type={type}
			>
				{children}
			</button>
		</div>
	);
};

export default Button;
