import { Route, Routes } from "react-router-dom";

import "./App.css";
import Footer from "./components/layout/Footer";
import Navigation from "./components/layout/Navigation";
import SignUpForm from "./features/SignUpForm";
import Contact from "./pages/Contact";
import Homepage from "./pages/Homepage";
import Products from "./pages/Products";
import ShareKnowledge from "./pages/ShareKnowledge";
import Stores from "./pages/Stores";
import Tools from "./pages/Tools";
import VendorProfile from "./pages/VendorProfile";

function App() {
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
				<Route path="/signup" element={<SignUpForm />} />
				<Route path="/vendors/:name" element={<VendorProfile />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
