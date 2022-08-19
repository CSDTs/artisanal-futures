import { Route, Routes } from "react-router-dom";

import "./App.css";
import Footer from "./components/layout/Footer";
import Navigation from "./components/layout/Navigation";
import SignUpForm from "./features/SignUpForm";
import SignInForm from "./features/SignInForm";
import Contact from "./pages/Contact";
import Homepage from "./pages/Homepage";
import Products from "./pages/Products";
import ShareKnowledge from "./pages/ShareKnowledge";
import Stores from "./pages/Stores";
import Tools from "./pages/Tools";
import VendorProfile from "./pages/VendorProfile";
import ShopRateCalculator from "./features/ShopRateCalculator";
import ProductSearch from "./features/ProductSearch";

import TermsOfService from "./pages/TOS";
import Agreement from "./pages/Agreement";
import Privacy from "./pages/Privacy";
import NewArtisanLogin from "./features/NewArtisanLogin";
import Members from "./pages/Members";
import Profile from "./pages/Profile";
import ArtisanDetails from "./pages/ArtisanDetails";
function App() {
	return (
		<div className="App">
			<Navigation />
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/stores" element={<Stores />} />
				<Route path="/products" element={<ProductSearch />} />
				<Route path="/share" element={<ShareKnowledge />} />
				<Route path="/tools" element={<Tools />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/signup" element={<SignUpForm />} />
				<Route path="/signin" element={<SignInForm />} />
				<Route path="/vendors/:name" element={<VendorProfile />} />

				<Route path="/tools/shop-rate-calculator" element={<ShopRateCalculator />} />

				<Route path="/tos" element={<TermsOfService />} />
				<Route path="/agreement" element={<Agreement />} />
				<Route path="/privacy" element={<Privacy />} />

				<Route path="/new" element={<NewArtisanLogin />} />

				<Route path="/artisans" element={<Members />} />
				<Route path="/artisans/:name" element={<ArtisanDetails />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
