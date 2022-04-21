import React from "react";
import { CgDarkMode } from "react-icons/cg";
import ToggleButton from "../component/ToggleButton";
import Header from "../component/Header";
import styles from "./settingspage.module.scss";

const SettingsPage = ({ theme, setTheme }) => {
	const toggle = () => {
		setTheme((v) => !v);
		localStorage.setItem("theme", !theme);
	};
	return (
		<div className={styles.settings}>
			<Header>Settings</Header>
			<section className={styles.theme}>
				<CgDarkMode />
				<span className={styles.text}>Dark theme : </span>
				<ToggleButton on={theme === true} toggle={toggle} />
			</section>
		</div>
	);
};

export default SettingsPage;
