import { useState } from "react";
import reactLogo from "./assets/react.svg";

import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<Navigation />
			<Routes>
				<Route path="/" element={<Homepage />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
