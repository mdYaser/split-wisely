import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import styles from "./sidebar.module.scss";

const SideItem = ({ name, icon, onClick, active = false }) => {
	return (
		<div className={styles.itemCont + ` ${active ? styles.active : ""}`}>
			<a className={styles.item} onClick={onClick}>
				{icon}
				<span className={styles.text}>{name}</span>
			</a>
		</div>
	);
};

const SideBar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const handleItem = (path) => {
		if (path !== location.pathname) {
			navigate(path);
		}
	};
	const activeTab = location.pathname?.includes("expenses")
		? 1
		: location.pathname?.includes("settings")
		? 2
		: 0;
	return (
		<div className={styles.sidebar}>
			<SideItem
				active={activeTab === 0}
				icon={<MdDashboard size="24px" />}
				name="Dashoard"
				onClick={() => handleItem("/split-wisely")}
			/>
			<SideItem
				active={activeTab === 1}
				icon={<FaFileInvoiceDollar size="22px" />}
				name="Expenses"
				onClick={() => handleItem("/split-wisely/expenses")}
			/>
			<SideItem
				active={activeTab === 2}
				icon={<IoSettingsSharp size="23px" />}
				name="Settings"
				onClick={() => handleItem("/split-wisely/settings")}
			/>
		</div>
	);
};

export default SideBar;
