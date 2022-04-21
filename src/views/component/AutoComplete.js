import React, { useState, useRef } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import Chip from "./Chip";
import styles from "./autocomplete.module.scss";

const ListItem = ({ name, icon, ...rest }) => {
	return (
		<div className={styles.listItem} {...rest}>
			<span className={styles.name}>{name}</span>
			<span className={styles.icon}>{icon}</span>
		</div>
	);
};

const AutoComplete = ({
	list = [],
	selectedList = [],
	setSelectedList,
	addItem,
	icon,
	placeholder = "Search",
}) => {
	const [value, setValue] = useState("");
	const [options, setOptions] = useState([]);
	const inputRef = useRef(null);
	const optionsRef = useRef(null);

	const handleKeyDown = (e) => {
		if (list.length === 0 && e.key === "Enter") addItemToList();
	};

	const handleInput = (e) => {
		const text = e.target.value?.replace(/^\s+/gm, "");
		setValue(text);
		const selectedIds = selectedList.map((item) => item.id);
		if (text) {
			const regex = new RegExp(`${text}`, "gi");
			setOptions(
				list
					.filter((item) => item.name.match(regex))
					.filter((item) => !selectedIds.includes(item.id))
			);
		} else {
			setOptions(list.filter((item) => !selectedIds.includes(item.id)));
		}
	};
	const removeItem = (id) => {
		const selectedIds = selectedList
			.map((item) => item.id)
			.filter((item) => item !== id);
		setSelectedList((li) => li.filter((val) => val.id !== id));
	};
	const addItemToList = () => {
		const newItem = { id: Date.now(), name: value };
		setSelectedList((li) => [...li, newItem]);
		setValue("");
		if (list.length > 0) addItem(newItem);
	};
	const selectItem = (newItem) => {
		setSelectedList((li) => [...li, newItem]);
		setValue("");
		setOptions([]);
		inputRef.current.focus();
	};

	return (
		<div className={styles.autocomplete}>
			<div className={styles.box}>
				{selectedList.map((item) => (
					<Chip
						key={item.id}
						name={item.name}
						rightIcon={<RiCloseCircleLine />}
						onClickRight={() => removeItem(item.id)}
						style={{ margin: "2px 4px" }}
					/>
				))}
				<input
					ref={inputRef}
					className={styles.input}
					placeholder={placeholder}
					value={value}
					onChange={handleInput}
					onKeyDown={handleKeyDown}
				/>
			</div>
			{(options.length > 0 || value) && (
				<div className={styles.list} ref={optionsRef}>
					{value && (
						<ListItem
							name={value}
							icon={icon}
							onClick={addItemToList}
							style={{ opacity: 0.7 }}
						/>
					)}
					{options.map((item) => (
						<ListItem
							key={item.id}
							name={item.name}
							onClick={() => selectItem(item)}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default AutoComplete;
