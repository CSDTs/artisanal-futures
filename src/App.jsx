import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./layout/Footer";
import Navigation from "./layout/Navigation";

import ShopRateCalculator from "./features/ShopRateCalculator";

import Agreement from "./pages/Agreement";

import Artisans from "./pages/Artisans";
import Homepage from "./pages/Homepage";
import PolicyInformation from "./pages/PolicyInformation";
import Registration from "./pages/Registration";

import Products from "./pages/Products";
import Profile from "./pages/Profile";

import SignIn from "./pages/SignIn";

import Tools from "./pages/Tools";

import PageNotFound from "./pages/PageNotFound";

import UpdateWizard from "./features/UpdateWizard";
import ArtisanProfile from "./pages/ArtisanProfile";
function App() {
	return (
		<div className="App">
			<Navigation />

			<Routes>
				<Route path="/" element={<Homepage />} />

				<Route path="/artisans" element={<Artisans />} />
				<Route path="/artisans/:name" element={<ArtisanProfile />} />

				<Route path="/products" element={<Products />} />

				<Route path="/tools" element={<Tools />} />
				<Route path="/tools/shop-rate-calculator" element={<ShopRateCalculator />} />

				<Route path="/agreement" element={<Agreement />} />

				<Route path="/profile" element={<Profile />} />
				<Route path="/update-profile" element={<UpdateWizard />} />

				<Route path="/policies/" element={<PolicyInformation />} />
				<Route path="/policies/:name" element={<PolicyInformation />} />

				<Route path="/registration" element={<Registration />} />
				<Route path="/login" element={<SignIn />} />

				<Route path="*" element={<PageNotFound />} />
			</Routes>

			<Footer />
		</div>
	);
}

export default App;
