import React, { useState, useEffect } from "react";
import { BiRupee } from "react-icons/bi";
import { IoMdPersonAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import AutoComplete from "../component/AutoComplete";
import TextField from "../component/TextField";
import Select from "../component/Select";
import SplitModal from "../component/SplitModal";
import Button from "../component/Button";
import Header from "../component/Header";
import styles from "./addexpensepage.module.scss";

// const list = [{ id: "1", name: "abc" }];

const AddExpensePage = () => {
	const me = JSON.parse(localStorage.getItem("me"));

	const navigate = useNavigate();
	const [selectedList, setSelectedList] = useState([]);
	const [tags, setTags] = useState([]);
	const [paidByStr, setPaidByStr] = useState(JSON.stringify(me));
	const [isSplitOpen, openModal] = useState(false);
	const [splitType, setSplitType] = useState("equally");
	const [splitByUsers, setSplitByUsers] = useState([]);
	const [totalAmount, setTotalAmount] = useState("");
	const [desc, setDesc] = useState("");

	useEffect(() => {
		setSplitByUsers(
			[me, ...selectedList]?.map((val) => ({
				...val,
				amount: "0",
				percentage: "0",
				checked: true,
			}))
		);
	}, [selectedList]);

	const handleSplitByUsers = (id, checked) => {
		setSplitByUsers((val) => {
			return val.map((item) => {
				if (item.id === id) return { ...item, checked };
				return { ...item };
			});
		});
	};

	const handleAmounts = (id, amt, isExact) => {
		setSplitByUsers((val) => {
			return val.map((item) => {
				if (item.id === id)
					return { ...item, [isExact ? "amount" : "percentage"]: amt };
				return { ...item };
			});
		});
	};

	const initialList = JSON.parse(localStorage.getItem("users"));
	const [list, setList] = useState(initialList);
	const updateList = (newUser) => {
		let users = localStorage.getItem("users");
		if (users) {
			users = JSON.parse(users);
			users.push(newUser);
		} else {
			users = [newUser];
		}
		setList(users);
		localStorage.setItem("users", JSON.stringify(users));
	};

	const validateAdd = () => {
		if (!desc?.trim()) return true;
		if (!totalAmount?.trim()) return true;
		if (!selectedList?.length) return true;
		return false;
	};

	const onAdd = () => {
		const paidBy = JSON.parse(paidByStr);
		const users = initialList;
		let amount = totalAmount;
		let newUsers;
		if (splitType === "equally") {
			const shareableUsers = splitByUsers.filter((v) => v.checked === true);
			const noOfUsers = shareableUsers.length;
			const perShare = Number(totalAmount / noOfUsers);
			const splitByUserIds = shareableUsers.map((v) => v.id);
			if (paidBy.id === me.id) {
				// I paid
				newUsers = users.map((user) => {
					if (splitByUserIds.includes(user.id)) {
						return { ...user, amount: perShare + Number(user.amount) };
					} else {
						return user;
					}
				});
				amount = totalAmount - perShare;
			} else {
				// Someone paid
				newUsers = users.map((user) => {
					if (paidBy.id === user.id) {
						return { ...user, amount: Number(user.amount) - Number(perShare) };
					} else {
						return user;
					}
				});
				amount = perShare;
			}
		} else if (["by percentages", "by exact amounts"].includes(splitType)) {
			let usersObj;
			if (splitType === "by percentages") {
				usersObj = splitByUsers.reduce((acc, v) => {
					return {
						...acc,
						[v.id]: (v.percentage / 100) * totalAmount,
					};
				}, {});
			} else {
				// Paid by exact amount
				usersObj = splitByUsers.reduce((acc, v) => {
					return {
						...acc,
						[v.id]: v.amount,
					};
				}, {});
			}
			if (paidBy.id === me.id) {
				// I paid
				newUsers = users.map((user) => {
					if (user.id in usersObj) {
						return {
							...user,
							amount: Number(usersObj[user.id]) + Number(user.amount),
						};
					} else {
						return user;
					}
				});
				amount = totalAmount - usersObj[me.id];
			} else {
				// Someone paid
				newUsers = users.map((user) => {
					if (paidBy.id === user.id) {
						return {
							...user,
							amount: Number(user.amount) - Number(usersObj[user.id]),
						};
					} else {
						return user;
					}
				});
				amount = usersObj[me.id];
			}
		}
		const expense = {
			id: Date.now(),
			name: paidBy.id === me.id ? "You" : paidBy.name,
			desc,
			paid: totalAmount,
			amount: paidBy.id === me.id ? amount : -amount,
		};
		const expenses = JSON.parse(localStorage.getItem("expenses"));
		expenses.unshift(expense);
		localStorage.setItem("expenses", JSON.stringify(expenses));
		localStorage.setItem("users", JSON.stringify(newUsers));
		navigate("/split-wisely/expenses");
	};

	return (
		<div className={styles.container}>
			<Header>Add a bill</Header>
			<SplitModal
				title={"Choose split options"}
				isOpen={isSplitOpen}
				splitByUsers={splitByUsers}
				splitType={splitType}
				totalAmount={totalAmount}
				setSplitType={setSplitType}
				onClose={() => openModal(false)}
				handleSplitByUsers={handleSplitByUsers}
				handleAmounts={handleAmounts}
			/>
			<section className={styles.users}>
				<label className={styles.userlabel}>
					With <span className={styles.you}>you</span> and
				</label>
				<AutoComplete
					list={list}
					selectedList={selectedList}
					setSelectedList={setSelectedList}
					addItem={updateList}
					placeholder="Search user"
					icon={<IoMdPersonAdd className={styles.icon} />}
				/>
			</section>
			<div className={styles.desc}>
				<TextField
					placeholder="Enter a description"
					value={desc}
					required
					onChange={(e) => setDesc(e.target.value)}
				/>
			</div>
			<div className={styles.amount}>
				<TextField
					leftIcon={<BiRupee />}
					placeholder="0.00"
					value={totalAmount}
					onChange={(e) => setTotalAmount(e.target.value)}
				/>
			</div>
			<div className={styles.tags}>
				<AutoComplete
					selectedList={tags}
					setSelectedList={setTags}
					placeholder="Add Tags"
				/>
			</div>
			<div className={styles.details}>
				<label>Paid by</label>
				<Select
					list={[me, ...selectedList]}
					value={paidByStr}
					onChange={(e) => setPaidByStr(e.target.value)}
				/>
				<label>and split</label>
				<button className={styles.splitBy} onClick={() => openModal(true)}>
					{splitType}.
				</button>
			</div>
			<footer className={styles.footer}>
				<Button onClick={onAdd} disabled={validateAdd()}>
					Add
				</Button>
			</footer>
		</div>
	);
};

export default AddExpensePage;
