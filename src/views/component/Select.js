import React from "react";
import styles from "./select.module.scss";

const Select = ({ list, value, onChange }) => {
	return (
		<select className={styles.select} value={value} onChange={onChange}>
			{list.map((item) => (
				<option key={item.id} value={JSON.stringify(item)}>
					{item.name}
				</option>
			))}
		</select>
	);
};

export default Select;
