import { useState } from "react";
import reactLogo from "./assets/react.svg";

import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Stores from "./pages/Stores";
import ShareKnowledge from "./pages/ShareKnowledge";
import Products from "./pages/Products";
import Tools from "./pages/Tools";
import Contact from "./pages/Contact";
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
				<Route path="/stores" element={<Stores />} />
				<Route path="/products" element={<Products />} />
				<Route path="/share" element={<ShareKnowledge />} />
				<Route path="/tools" element={<Tools />} />
				<Route path="/contact" element={<Contact />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
