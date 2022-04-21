import React from "react";
import ReactDOM from "react-dom";
import App from "./views/App";

const me = {
	id: "1650204437483",
	name: "Mohamed Yaser",
};
const users = [
	{
		id: "1650204569713",
		name: "Omar",
		amount: 0,
	},
	{
		id: "1650204695339",
		name: "Maryam",
		amount: -150, // I owe
	},
	{
		id: "1650204706681",
		name: "Khalid",
		amount: 500, // I paid
	},
];
const expenses = [
	{
		id: "1650445553443",
		userId: "1650204695339",
		name: "Maryam",
		paid: 200,
		amount: -150,
		desc: "Grocery",
	},
	{
		id: "1650445562505",
		userId: "1650204437483",
		name: "You",
		paid: 1000,
		amount: 500,
		desc: "Food",
	},
];

localStorage.setItem("me", JSON.stringify(me));
localStorage.setItem("users", JSON.stringify(users));
localStorage.setItem("expenses", JSON.stringify(expenses));

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
