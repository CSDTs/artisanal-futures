import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./layout/Footer";
import Navigation from "./layout/Navigation";

import ShopRateCalculator from "./features/ShopRateCalculator";

import CollectiveAgreementPage from "./pages/CollectiveAgreementPage";

import ArtisansPage from "./pages/ArtisansPage";
import Homepage from "./pages/Homepage";
import PolicyInformation from "./pages/PolicyInformation";
import Registration from "./pages/Registration";

import Products from "./pages/Products";
import Profile from "./pages/Profile";

import SignInPage from "./pages/SignInPage";

import Tools from "./pages/Tools";

import PageNotFound from "./pages/PageNotFound";

import OnboardingScreen from "./features/OnboardingScreen";
import ProfileWizard from "./features/ProfileWizard";
import ArtisanProfile from "./pages/ArtisanProfile";
import Remix from "./pages/Remix";
function App() {
	return (
		<div className="h-full App">
			<Routes>
				<Route path="/" element={<Homepage />} />

				<Route path="/artisans" element={<ArtisansPage />} />
				<Route path="/artisans/:name" element={<ArtisanProfile />} />

				<Route path="/products" element={<Products />} />

				<Route path="/tools" element={<Tools />} />
				<Route path="/shop-rate-calculator" element={<ShopRateCalculator />} />

				<Route path="/agreement" element={<CollectiveAgreementPage />} />

				<Route path="/profile" element={<Profile />} />
				<Route path="/update-profile" element={<ProfileWizard />} />

				<Route path="/policies/" element={<PolicyInformation />} />
				<Route path="/policies/:name" element={<PolicyInformation />} />

				<Route path="/registration" element={<Registration />} />
				<Route path="/login" element={<SignInPage />} />
				<Route path="/remix" element={<Remix />} />

				<Route path="*" element={<PageNotFound />} />
				<Route path="/welcome" element={<OnboardingScreen />} />
			</Routes>
		</div>
	);
}

export default App;
