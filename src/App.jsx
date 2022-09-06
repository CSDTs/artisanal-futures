import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/layout/Footer";
import Navigation from "./components/layout/Navigation";

import ProductSearch from "./features/ProductSearch";
import ShopRateCalculator from "./features/ShopRateCalculator";
import SignInForm from "./features/SignInForm";
// import SignUpForm from "./features/SignUpForm";
import Agreement from "./pages/Agreement";
import ArtisanDetails from "./pages/ArtisanDetails";
import Artisans from "./pages/Artisans";
import Contact from "./pages/Contact";
import Homepage from "./pages/Homepage";
import PolicyInformation from "./pages/PolicyInformation";

import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import SignIn from "./pages/SignIn";

import Tools from "./pages/Tools";

import VendorProfile from "./pages/VendorProfile";

import { chakra } from "@chakra-ui/react";
import { UpdateWizard } from "./features/Profile";
function App() {
	return (
		<div className="App">
			<Navigation />

			<Routes>
				<Route path="/" element={<Homepage />} />

				<Route path="/artisans" element={<Artisans />} />
				<Route path="/artisans/:name" element={<ArtisanDetails />} />

				<Route path="/products" element={<ProductSearch />} />

				<Route path="/tools" element={<Tools />} />
				<Route path="/tools/shop-rate-calculator" element={<ShopRateCalculator />} />

				<Route path="/contact" element={<Contact />} />

				{/* <Route path="/signup" element={<SignUpForm />} /> */}
				<Route path="/signin" element={<SignInForm />} />

				<Route path="/agreement" element={<Agreement />} />

				<Route path="/profile" element={<Profile />} />
				<Route path="/update-profile" element={<UpdateWizard />} />

				<Route path="/policies/" element={<PolicyInformation />} />
				<Route path="/policies/:name" element={<PolicyInformation />} />

				<Route path="/registration" element={<Registration />} />
				<Route path="/login" element={<SignIn />} />
			</Routes>

			<Footer />
		</div>
	);
}

export default App;
