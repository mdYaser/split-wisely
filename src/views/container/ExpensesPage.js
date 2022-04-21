import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFileInvoiceDollar } from "react-icons/fa";
import Header from "../component/Header";
import Button from "../component/Button";
import styles from "./expensespage.module.scss";

const ExpensesPage = () => {
	const expenses = JSON.parse(localStorage.getItem("expenses"));
	const navigate = useNavigate();
	const onAdd = () => {
		navigate("/split-wisely/expenses/add");
	};

	return (
		<div className={styles.container}>
			<Header>Expenses</Header>
			<section className={styles.add}>
				<Button onClick={onAdd}>Add a bill</Button>
			</section>
			<div className={styles.list}>
				{expenses.map((user) => (
					<div key={user.id} className={styles.item}>
						<span className={styles.icon}>{<FaFileInvoiceDollar />}</span>
						<span className={styles.about}>
							<div className={styles.desc}>{user.desc}</div>
							<div className={styles.name}>{`${user.name} paid ₹${Math.abs(
								user.paid
							)}`}</div>
						</span>
						<span
							className={
								styles.owe + ` ${user.amount < 0 ? styles.warning : ""}`
							}
						>
							<div className={styles.owe1}>
								{user.amount < 0 ? "you owe" : "you lent"}
							</div>
							<div className={styles.owe2}>₹{Math.abs(user.amount)}</div>
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default ExpensesPage;
