import React from "react";
import { MdCallSplit } from "react-icons/md";
import styles from "./navbar.module.scss";

const NavBar = () => {
	return (
		<div className={styles.navbar}>
			<div className={styles.left}>
				<div className={styles.text}>
					SPLIT WISEL
					<MdCallSplit size="23px" className={styles.icon} />
				</div>
			</div>
			<div className={styles.right}>
				<div className={styles.avatar}>MY</div>
				<div className={styles.name}>Mohamed Yaser</div>
			</div>
		</div>
	);
};

export default NavBar;
