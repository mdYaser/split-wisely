import React from "react";
import styles from "./modal.module.scss";

const Modal = ({ isOpen, children }) => {
	return (
		<div className={styles.modalContainer + ` ${isOpen ? styles.show : ""}`}>
			{children}
		</div>
	);
};

export default Modal;
