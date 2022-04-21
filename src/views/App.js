import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./component/NavBar";
import SideBar from "./component/SideBar";
import HomePage from "./container/HomePage";
import ExpensesPage from "./container/ExpensesPage";
import AddExpensePage from "./container/AddExpensePage";
import SettingsPage from "./container/SettingsPage";
import "./styles/globalStyles.scss";

function App() {
	const defaultTheme = JSON.parse(localStorage.getItem("theme"));
	const [theme, setTheme] = useState(defaultTheme);
	return (
		<div className={`app ${theme ? "dark" : "light"}`}>
			<BrowserRouter>
				<NavBar />
				<div className="container">
					<SideBar />
					<div className="content">
						<Routes>
							<Route exact path="/split-wisely" element={<HomePage />} />
							<Route
								exact
								path="/split-wisely/expenses"
								element={<ExpensesPage />}
							/>
							<Route
								exact
								path="/split-wisely/expenses/add"
								element={<AddExpensePage />}
							/>
							<Route
								exact
								path="/split-wisely/settings"
								element={<SettingsPage setTheme={setTheme} theme={theme} />}
							/>
							<Route
								path="*"
								element={
									<main style={{ padding: "1rem" }}>
										<p>There's nothing here!</p>
									</main>
								}
							/>
						</Routes>
						<div className="right"></div>
					</div>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
