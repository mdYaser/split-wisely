import styles from "./chip.module.scss";

const Chip = ({ name, rightIcon, onClickRight, ...rest }) => {
	return (
		<div className={styles.chip} {...rest}>
			<span className={styles.name}>{name}</span>
			{rightIcon && (
				<span className={styles.icon} onClick={onClickRight}>
					{rightIcon}
				</span>
			)}
		</div>
	);
};

export default Chip;
