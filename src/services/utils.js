export const avatarText = (name = "") => {
	if (!name) return "";
	const nameArr = name.split(" ");
	let initials = "";
	if (nameArr.length > 1) {
		initials = (nameArr[0][0] + nameArr[1][0]).toUpperCase();
	} else {
		initials = nameArr[0][0].toUpperCase() + nameArr[0][1];
	}
	return initials;
};
