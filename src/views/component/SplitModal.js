import React from "react";
import { IoClose } from "react-icons/io5";
import { avatarText } from "../../services/utils";
import Modal from "./Modal";
import styles from "./splitmodal.module.scss";

const AmountInput = ({
	id,
	splitType,
	amount,
	percentage,
	totalSelPer,
	totalSelAmt,
	totalAmount,
	handleAmounts,
}) => {
	const handleAmts = (e) => {
		if (splitType === "by exact amounts") {
			if (!e.target.value) {
				handleAmounts(id, e.target.value, true);
				return;
			}
			if (totalSelAmt - Number(amount || 0) <= totalAmount) {
				if (
					Number(e.target.value) <=
					totalAmount - (totalSelAmt - Number(amount || 0))
				) {
					handleAmounts(id, e.target.value, true);
				}
			}
		} else {
			if (!e.target.value) {
				handleAmounts(id, e.target.value, false);
				return;
			}
			if (totalSelPer - Number(percentage || 0) <= 100) {
				if (
					Number(e.target.value) <=
					100 - (totalSelPer - Number(percentage || 0))
				) {
					handleAmounts(id, e.target.value, false);
				}
			}
		}
	};
	return (
		<>
			<input
				className={styles.amount}
				value={splitType === "by exact amounts" ? amount : percentage}
				onChange={handleAmts}
			/>
			<span className={styles.amttype}>
				{splitType === "by exact amounts" ? "₹" : "%"}
			</span>
		</>
	);
};

const Item = ({
	id,
	name,
	checked,
	length,
	totalSelPer,
	totalSelAmt,
	totalAmount,
	onClick,
	splitType,
	percentage,
	amount,
	handleAmounts,
}) => {
	const handleClick = (e) => {
		if (length > 1 || !checked) {
			onClick(e);
		}
	};
	return (
		<section className={styles.item} onClick={handleClick}>
			{splitType === "equally" && (
				<input
					checked={checked}
					onChange={handleClick}
					type="checkbox"
					disabled={length === 1}
				/>
			)}
			<div className={styles.avatar}>{avatarText(name)}</div>
			<h6 className={styles.name}>{name}</h6>
			{splitType === "equally" ? (
				<h6 className={styles.amt}>{"0.00"}</h6>
			) : (
				<AmountInput
					id={id}
					splitType={splitType}
					percentage={percentage}
					amount={amount}
					totalSelPer={totalSelPer}
					totalSelAmt={totalSelAmt}
					totalAmount={totalAmount}
					handleAmounts={handleAmounts}
				/>
			)}
		</section>
	);
};

const SplitModal = ({
	isOpen,
	title,
	splitByUsers = [],
	splitType,
	totalAmount,
	setSplitType,
	onClose,
	handleSplitByUsers,
	handleAmounts,
}) => {
	const handleOption = (e) => {
		setSplitType(e.target.name);
	};
	const selectedUser = splitByUsers.filter((v) => v.checked === true);
	const perShare = Number(totalAmount || 0) / selectedUser.length;
	const [totalSelPer, totalSelAmt] = splitByUsers.reduce(
		(acc, user) => [
			Number(user.percentage) + acc[0],
			Number(user.amount) + acc[1],
		],
		[0, 0]
	);
	let errMsg = "";
	if (splitType === "by percentages" && totalSelPer !== 100) {
		errMsg = "Totally 100% required";
	} else if (
		splitType === "by exact amounts" &&
		totalSelAmt !== Number(totalAmount)
	) {
		errMsg = `Totally ₹${totalAmount} required`;
	} else {
		errMsg = "";
	}

	return (
		<Modal isOpen={isOpen}>
			<div className={styles.modal}>
				<header className={styles.title}>
					<h3>{title}</h3>
					{!errMsg && (
						<IoClose
							className={styles.close}
							disabled
							onClick={onClose}
							size="20px"
						/>
					)}
				</header>
				<section className={styles.content}>
					<nav className={styles.nav}>
						<button
							name="equally"
							className={
								styles.btn + ` ${splitType === "equally" ? styles.btnSel : ""}`
							}
							onClick={handleOption}
						>
							=
						</button>
						<button
							name="by percentages"
							className={
								styles.btn +
								` ${splitType === "by percentages" ? styles.btnSel : ""}`
							}
							onClick={handleOption}
						>
							%
						</button>
						<button
							name="by exact amounts"
							className={
								styles.btn +
								` ${splitType === "by exact amounts" ? styles.btnSel : ""}`
							}
							onClick={handleOption}
						>
							1.23
						</button>
					</nav>
					<h3 className={styles.header}>
						Split <span>{splitType}</span>
					</h3>
					{splitByUsers?.map((item) => (
						<Item
							key={item.id}
							{...item}
							splitType={splitType}
							length={selectedUser.length}
							totalSelPer={totalSelPer}
							totalSelAmt={totalSelAmt}
							totalAmount={Number(totalAmount || 0)}
							handleAmounts={handleAmounts}
							onClick={() => handleSplitByUsers(item.id, !item.checked)}
						/>
					))}
					<h4 className={styles.footer}>
						{splitType === "equally" ? (
							<span>₹{perShare}/person</span>
						) : splitType === "by percentages" ? (
							<span>Total: {totalSelPer}%</span>
						) : (
							<span>
								₹{totalSelAmt} / ₹{totalAmount}
							</span>
						)}
					</h4>
					<footer className={styles.error}>{errMsg}</footer>
				</section>
			</div>
		</Modal>
	);
};

export default SplitModal;
