import React from "react";
import Header from "../component/Header";
import { avatarText } from "../../services/utils";
import styles from "./homepage.module.scss";

const HomePage = () => {
	const me = JSON.parse(localStorage.getItem("me"));
	const users = JSON.parse(localStorage.getItem("users"))?.filter(
		(user) => user.amount !== 0
	);
	const { lent, owe } = users?.reduce(
		(acc, user) => {
			if (user.amount < 0) {
				return { owe: acc.owe - user.amount, lent: acc.lent };
			} else if (user.amount > 0) {
				return { owe: acc.owe, lent: acc.lent + user.amount };
			} else {
				return acc;
			}
		},
		{ lent: 0, owe: 0 }
	);
	const total = lent - owe;
	let totalText =
		total < 0
			? "you owe ₹" + Math.abs(total)
			: total > 0
			? "you are owed ₹" + Math.abs(total)
			: "₹0";
	return (
		<div className={styles.homepage}>
			<Header>Dashboard</Header>
			<div className={styles.mine}>
				<span className={styles.avatar}>{avatarText(me.name)}</span>
				<span className={styles.total}>
					<h2 className={styles.cell1}>Total balance</h2>
					<div className={styles.cell2 + ` ${total < 0 ? styles.warning : ""}`}>
						{totalText}
					</div>
				</span>

				<span className={styles.divider} />
				<section className={styles.section}>
					<div className={styles.cell}>
						<h4 className={styles.cell1}>lent</h4>
						<h3 className={styles.cell2}>₹{lent}</h3>
					</div>
					<div className={styles.cell}>
						<h4 className={styles.cell1}>owe</h4>
						<h3 className={styles.cell2 + ` ${styles.warning}`}>₹{owe}</h3>
					</div>
				</section>
			</div>
			<div className={styles.others}>
				{users.map((user) => (
					<div key={user.id} className={styles.item}>
						<span className={styles.avatar}>{avatarText(user.name)}</span>
						<span className={styles.name}>{user.name}</span>
						<span className={styles.owe}>
							<div className={styles.owe1}>
								{user.amount < 0 ? "you owe" : "you lent"}
							</div>
							<div
								className={
									styles.owe2 + ` ${user.amount < 0 ? styles.warning : ""}`
								}
							>
								₹{Math.abs(user.amount)}
							</div>
						</span>
					</div>
				))}
			</div>
			<div className="others"></div>
		</div>
	);
};

export default HomePage;
